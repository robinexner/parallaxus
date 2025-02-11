
# Parallaxus

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Parallaxus is an open-source project designed to create stunning parallax scroll animations by reacting to the visibility of elements within the browser window, rather than using the absolute scroll position. It supports smooth scroll animations and the ability to trigger JavaScript functions when elements enter or leave the viewport.

See Parallaxus in action: [parallaxus.net](https://parallaxus.net)

## Installation

Simply include the following script in your HTML file:

```html
<script src="path/to/parallaxus.js"></script>
```

## Attributes

### `data-parallaxus-transform`

The `data-parallaxus-transform` attribute allows you to apply CSS transformations based on the position of an element in the browser window. 

#### Example:

```html
<div data-parallaxus-transform='{"from": {"translateY": "0%"}, "to": {"translateY": "20%"}}'>
  <!-- Content here -->
</div>
```

In this example, the element will start with a translateY of 0% and scale 1, and as it moves through the viewport, it will move 20% down.

#### Additional Examples:

```html

<!-- Multiple steps with translation and scaling -->
<div data-parallaxus-transform='{"0": {"translateY": "0%", "scale": 1}, "50": {"translateY": "30%", "scale": 1.8}, "100": {"translateY": "50%", "scale": 1.5}}'></div>

<!-- Fade in and back out -->
<div data-parallaxus-transform='{"0": {"opacity": "0"}, "20": {"opacity": "1"}, "80": {"opacity": "1"}, "0": {"opacity": "0"} }'></div>

```

### `data-parallaxus-hitpoint`

This attribute allows you to trigger JavaScript functions when elements enter or leave the viewport.

```js
function triggerOnEnter(delta){
  console.log("Entered!")
}
function triggerOnLeave(delta){
  console.log("Left!")
}
```
```html
<div data-parallaxus-hitpoint='{"enter": "triggerOnEnter", "leave": "triggerOnLeave"}'>
  <!-- Content here -->
</div>
```

In this example, when the element enters the viewport, the triggerOnEnter function will be called and "Entered!" will be logged. When the element leaves the viewport, the triggerOnLeave will be called and "Left!" will be logged.

## Example HTML Structure

```html
<div data-parallaxus-easing>
  <div id="testHero">
    <div id="test1" data-parallaxus-transform='{"from": {"height": "10vw"}, "to": {"height": "50vw"}}'>
      <!-- Content here -->
    </div>
  </div>

  <div id="test2" data-parallaxus-transform='{
    "0": {"translateY": "0%", "scale": 1, "rotate": "-30deg"},
    "25": {"translateY": "25%", "scale": 1.2},
    "75": {"translateY": "20%", "scale": 1.2},
    "100": {"translateY": "0%", "scale": 1, "rotate": "30deg"}
  }'>
    <!-- Content here -->
  </div>
</div>
```

## Options Breakdown

1. **`from` / `to`**: Define the start and end transformation points.
2. **`0 to 100`**: Use percentages for transformation steps across the element's scroll.
3. **`easing`**: Customize the scroll behavior for smoother animations.
