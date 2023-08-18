---
title: KTE Map Builder - Building a tool to build a map
createdAt: 2023-08-18T17:04:50.838Z
series: Kill the Evil Devlogs
description: I built a map builder for Kill the Evil in Solid.js. This is a breakdown of the problems I needed to solve and how I solved them.
---
I'm ready to build Kill the Evil's map. I'm going to use a 2d arrays to as a template and positional source of truth for my 3d world. I was planning on only using 2d matrices for encounters in rooms, but I realized that could be a massive time sink. I would have to handle 3d collision detection and build a robust solution to switch from 3d to 2d space. I also think it would make performance harder to manage as well. It is running in the browser after all.

If I only had to create the 2d arrays for the rooms, I would use my code editor. Now that I need to create a 2d array to drive large sections of my epic adventure, I decided a needed to build a tool.

Hello, [kte-map-builder](https://github.com/chdwck/kte-map-builder).

My user, me, had a few problems that I needed to solve.

First, they needed to be able to control the dimensions. Ye olde number inputs to the rescue.

Second, they needed to be able to control the cell values on the maps. I solved this with an interactive grid that supports clicks and drag selections. I used a table and the [Solid.js For element](https://docs.solidjs.com/references/api-reference/control-flow/For) to render the array, and I am disappointed in its performance at scale. I'm on a MacBook Pro M1 and the site can only handle a 100x100 cell table. I wasn't completely surprised by this, but it was disappointing none the less.

In the future, I may try to allow people to build adventures for Kill the Evil. If I end up doing that, I'll replace the table with a canvas to support larger maps.

Third, they needed to be able to persist the map data in case they closed the browser on accident. I solved this by saving the stringified array to LocalStorage on every action. I considered allowing saving many maps, but my user will be backing up all these maps as code anyways. Which brings me to my user's final issue.

They needed to be able to copy the array to their clipboard. They also needed the array to be formatted so they could understand it after pasting.

```js
  function copyDataToClipboard() {
    let str = "[";
    const height = mapHeight(); // Solid.js reactive variable
    const width = mapWidth();
    for (let y = 0; y < height; y++) {
      str += "\n    [";
      for (let x = 0; x < width; x++) {
        str += getCellId(x, y); // Get the string id of the cell
        if (x !== width - 1) {
          str += ", ";
        }
      }
      str += "],";
    }
    str += "\n]";

    navigator.clipboard
      .writeText(str)
      .then(() => {
        alert("Copied to clipboard");
      })
      .catch(() => {
        alert("Failed to Copy to clipboard");
      });
  }
```

And that's pretty much it. Check it out [here](/tools/kte-map-builder)

[Source](https://github.com/chdwck/kte-map-builder)

