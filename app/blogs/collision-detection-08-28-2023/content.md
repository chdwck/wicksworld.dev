---
title: Collision Detection and Camera Work
createdAt: 2023-08-28T16:32:00.037Z
series: Kill the Evil Devlogs
description: I added collision detection for the hero and camera in explore mode. It was hard.
---
Holy frijoles.

The last two weeks of Kill the Evil development were challenging. I added a
floor map using [kte-map-builder](/blogs/kte-map-builder-08-18-2023). I
reworked wall rendering and figured out how to support diagonal walls. I implemented
collision detection for the hero and added some camera behaviour to prevent
looking through walls. I'm no experienced game dev, but I learned a ton and had
great time.

## Demo Video
<iframe 
width="100%"
style={{ aspectRatio: '16/9' }}
src="https://www.youtube.com/embed/mhVFJsUS0xw?si=vqu2_DgEYgNSfC3o" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>


## Rendering the map
My first solution was to render the map Minecraft style. Each wall cell in the
2D Array rendered a Mesh with BoxGeometry and a temp wall texture. While this
may have worked, I wasn't satisfied with it. Moving around the map felt
cramped, and I also noticed a slight dip in the frame rate. Given I only rendered the
hero and the walls, the frame rate dip was unacceptable.

<figure>
 <img src="/minecraftwalls.jpg" width="100%" height="auto" />
 <figcaption>Minecraft style walls</figcaption>
</figure>

I wanted to optimize right away, but I decided it would be best to try
collision detection first. I needed to understand how I would handle collision
detection before adding complexity.

The initial collision detection looked something like this
```
// file controlling hero movement .psuedo.ts
const nextPosition : Vector3 = calculateNextPosition();
const xyPositionInMap2dArray = scenePosToXy(nextPosition);
const cellType = map2dArray[xyPositionInMap2dArray];
if (cellType === Wall) {
  return;
}
hero.position.set(nextPosition)
```
That prevented the hero from running through walls, but there were issues. The
hero would get stuck in the walls and could only free himself when moving the
opposite direction.

It became clear that I needed to add some sort of buffer between the hero and
walls. It also became clear that I needed a better way of managing the
collision itself, so hero didn't get stuck.

First things first, I needed to do something about the frame dip and
cramped-ness. Rather, I needed to use fewer and smaller polygons. I was able to
reduce the number of polygons with Three.js's plane geometry and calculating
wall sizes.

I was able to calculate the walls by iterating over the map 2d array in various
directions. When the loop hit a non-wall cell, I rendered a plane geometry
based on the length of previous unbroken wall cells.

* Horizontal
```
for (let y = 0; y < height; y++) 
    for (let x = 0; x < width; x++)
```
* Vertical
```
for (let x = 0; x < width; x++)
    for (let y = 0; y < height; y++)
```
* Diagonal Top Left to Bottom Right
```
// skip the first cell since its always one cell long
for (let y = 1; y < height; y++)
    let curr = [0, y];
    while (isInGrid(curr))
         curr[0] += 1;
         curr[1] -= 1;
```
* Diagonal Bottom Right to Top Left
```
// skip the first cell since its always one cell long
for (let y = height - 2; y > 0; y--)
    let curr = [width - 1, y];
    while (isInGrid(curr))
         curr[0] -= 1;
         curr[1] += 1;
```
* Diagonal Top Right to Bottom Left and vice versa followed the same pattern as
  the other diagonal iterations

If your thinking how I was, you may be wondering why I used 4 iteration
strategies for the diagonals instead of 2. The answer is that there are twice as many
diagonals then rows in a rectangle! I thought that was pretty neat.

The result was less claustrophobic exploration experience, and a silky smooth
framerate. 

## Hero Collision Detection
Next up was collision detection for our brave hero. I'm thankful I built the
collision detection early on. I thought it would be a throwaway version, but it
turned out to be a great base for the final solution.

Now that the walls were smaller than the cell sizes, the hero would collide
with invisible blocks! The solution seemed to be as simple as checking if the
hero was near the center of the cell or not. So I implemented it.

```
// file controlling hero movement .psuedo.ts
const nextPosition : Vector3 = calculateNextPosition();
const xyPositionInMap2dArray = scenePosToXy(nextPosition);
const cellType = map2dArray[xyPositionInMap2dArray];
if (cellType === Wall) {
  // New stuff
  const cellCenter = xyToScenePos(xyPositionInMap2dArray)
  const dist = hero.position.distanceTo(cellCenter);
  if (dist < maxDistance) {
      return;
  }
}
hero.position.set(nextPosition)
```

~~This actually worked great!~~ This worked great for a picket fence. 

I spent way to much time trying to make this work. I toggled the max distance;
I collected the nearby wall centers and tried to draw a line between. I tried a
lot of stuff, and learned a lot of ways to make crappy collision detection. 

I did **not** want to have to add a physics library and I wasn't keen on
building my own.

After starting and pausing a tutorial on Ammo.js. I did what I always do when I
hit a wall. (Hah get it?) I walked into the living room, flopped on the couch
and told my wife how hard the problem was to solve. Then I told her why it was
so hard to solve. In my telling I realized that I was making it way more
difficult than it needed to be.

All I needed to know was the size and orientation of each wall my hero could
be colliding with. I already had those things because I calculated them to
render the walls in the first place! Now, all I needed was to get
the wall based on the cell the hero was standing in. 

I added a few lines of code to the wall rendering loops and built up a hashmap
of cells to wall definitions. The final data structure looks like this:

```
const wall: Wall = {
   // x and z of the wall start in scene
   from: [1.2, -33.2],

   // x and z of the wall end in scene
   to: [0, -33.2],
   dist: 1.2
}

const mapState : MapState = {
    walls: { 'wall-1': wall },
    cellToWall: {
         'cell-0-10': ['wall-1'] // cells can be in multiple walls
     }
}
```

For the actual collision detection, I casted a ray and checked if it
intersected the hero position plus a given collider buffer. 
```
export function isCollidingWithWall(
    mapState: MapState,
    next: Vector3,
    colliderSizeBuffer: number,
): boolean {
    const cellPos = scenePosToXy(mapState.grid, next);
    const nextCellType = getCellType(mapState.grid, cellPos);
    if (nextCellType !== W) {
        return false;
    }
    const [x, y] = cellPos;
    const wallNames = mapState.cellToWall[cellName(W, x, y)];
    if (!wallNames?.length) {
        return false;
    }
    for (let i = 0; i < wallNames.length; i++) {
        const wall = mapState.walls[wallNames[i]];
        for (let j = 0; j < wall.dist; j += 0.1) {
            const fraction = j / wall.dist;
            const [iX, iY] = interpolate(wall.from, wall.to, fraction);
            const isColliding = (
                iX < next.x + colliderSizeBuffer &&
                iX > next.x - colliderSizeBuffer &&
                iY > next.z - colliderSizeBuffer &&
                iY < next.z + colliderSizeBuffer
            );
            if (isColliding) {
                return true;
            }
        }
    }

    return false;
}
```
Woot woot! After this, the hero could crash into all the walls as much as he wanted.

## Camera Work

Now that my hero couldn't run through walls, I needed to prevent the camera
from going through walls. This was one of those problems that involved a lot of
staring at the screen. I struggled to understand how I wanted the camera to
work, so I struggled to come up with a solution. 

I found my solution by playing Ghost of Tsushima. I had Sakai-dono stand next
to wall and spun the camera around. The camera zoomed up to Sakai-dono's world
position. So I did the same, minus the separate camera controls. 

I cast a fat ray from the camera position to the hero position to see if any
walls were in the way. If there were, I zoomed the camera into the hero
position.
```
while (isColliding && offset.z < 0) {
    camera.position.add(offset);
    isColliding = isWallInBetween(camera.position, hero.position)
    offset.z++;
}

if (rotatedTowardsY0) {
    while (isColliding && offset.x >= -1) {
        camera.position.add(offset);
        isColliding = isWallInBetween(camera.position, hero.position)
        offset.x--;
    }
} else {
   while (isColliding && offset.x <= 1) {
        camera.position.add(offset);
        isColliding = isWallInBetween(camera.position, hero.position)
        offset.x++;
    }
}
```
The camera isn't perfect, but it will work well enough for this project. If it
drives me crazy I may circle back and make it better.

And thats pretty much it for now. If you want to test the collision detection
yourself, checkout the [branch](https://github.com/chdwck/kill-the-evil/tree/explore-mode-collision-detection)

If you want to get in touch, my contact info is on the bottom of the page.
Thanks for reading!
