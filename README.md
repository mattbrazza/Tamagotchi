Tamagotchi
==================
**Massive shout-out and thanks to** [Jenn Creighton](https://github.com/jcreighton) whose Tamagotchi project and associated [talk](https://www.youtube.com/watch?v=09V_JAGTs2E) was a massive influence for the structure and style of this project.

# Goals
+ Learn about generator functions and coroutines
+ Learn more about HTML5 canvas and 2D context
+ Learn about Sprite animations

# Lessons Learned
+ I had to really understand the event loop and queues of the browser and understand when things were a Main Task, Micro Task, or going to be Painted and needed `requestAnimationFrame()`
+ I had to really, really understand `this` and the scope of functions and use `call()`, `bind()`, and the such to control the flow of data

# Reasoning for some decisions
+ I thought about just using HTML elements and CSS to display and animate sprites (i.e., CSS Sprites), but as this was my first pass, I wanted to focus more on the concepts and less on animations, keyframes, and etc.

# Assumptions for use
+ Many... This was made with a fair amount of specific values
+ For future spritesheets, I expect them to be evenly spaced grids, where the rows are the animations, and the columns are the individual image to display

# TODOs
+ I want to be able to have multiple, independent creatures animating on the same canvas
+ Expand `move()` to `moveAbs()` and `moveRel()` to allow movement to an absolute position or a relative position, respectively
+ Figure out how to make Spritesheet initialization async due to image loading
+ Increase `stats.hugner` every few minutes until it reaches `stats.maxHunger` (which should also increase as the Tamagotchi ages/evolves, thus requiring more food)

