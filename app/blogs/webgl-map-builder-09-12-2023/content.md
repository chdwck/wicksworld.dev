---
title: WebGL for web apps - rebuilding kte-map-builder 
createdAt: 2023-09-12T18:12:03.568Z
series: Kill the Evil Devlogs
description: A summary of how I handled state management with my WebGL powered map builder.
---
WebGl is so cool. It's daunting, but worth the learning curve.
I avoided it for years because I thought it would only be useful
for 3D creative programming. I now see 2D WebGL as the secret to unlocking
native performance in web apps for complex UIs.

If you are new to WebGL and want to understand how it works, I strongly recommend [WebGL Fundamentals](https://webglfundamentals.org/webgl/lessons/webgl-fundamentals.html).

This post is a short and sweet summary of how I setup [kte-map-builder]() to use
WebGL with [Solid.js](). This post and the relevant Git repo could be used as "real world" 
example of how to use WebGL with a modern FE framework.

Lets go.

<figure>
 <img width="100%" height="61" alt="Map Builder Diagram" src="/ktediagram.png" />
 <figcaption style={{ textAlign: 'center' }}>KTE Map Builder State Management</figcaption>
</figure>

WebGL is an API to render graphics with the GPU. It uses compiled shaders to run on
every pixel in a canvas. It is very fast, but static compared to modern FE frameworks.

I observed two rules while building this. First, the canvas dimensions must be
set before initializing the WebGL context. Second, re-rendering the canvas clears
the WebGL context. These rules influenced a few attributes of state that could be present on any given field.
* State that effects canvas dimensions (cell counts and size)
* State that needed to be accessed on each `requestAnimationFrame()`
* Temporary state that could be cleared at any point without inconviencing the user (me). This includes fields for uniform locations and drag coordinates
* Persisted state that the user (me) uses to build a map in multiple sessions

I ended up with two state "sources of truth". First, I wrote a state module that initialized
based on localstorage for persisted state. Second, I added some `window.__kteField`s to the window
for temporary state.

I initialized the state in the `<App />` and passed it to the main WebGL function `initBuilder`.
Since state was being passed as reference and referenced every frame, all I had to do was use my state updater functions to
mutate the state based on user actions.

If a piece of state required a re-init of the WebGL context, I just called `initBuilder`
again with the updated state.

```
const App = () => {
    const state = initState();
    const [foo, setFoo] = createSignal(state.foo);
    const [bar, setBar] = createSignal(state.bar);

    onMount(() => {
        initBuilder(state);
    })
    
    function handleFooChange(nextVal) {
        stateModule.setFoo(nextVal); // mutation
        setFoo(nextVal);

        // foo affects canvas size, re init webgl
        initBuilder(state);
    }

    function handleBarChange(nextVal) {
       stateModule.convertAndUpdateBar(nextVal); // mutation 
       setBar(state.bar);
    
       // bar only affects rendering, will be accessed through the
       // the reference to state. No re-init is required
    }

    return <jsx />
}
```

And thats it! I almost didn't write a blog post about this, but I am super
stoked about the performance gains on my map builder and I wanted to share something about it.

Thanks!
