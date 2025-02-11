/*
 * This file is part of the parallaxus.js project.
 * Copyright (c) 2025 Robin Exner (https://robinexner.de)
 * GitHub: https://github.com/robinexner/parallaxus
 * This software is licensed under the MIT License.
 * See the LICENSE file for more information.
 */

var windowWidth, windowHeight, containerHeight;

// Check for prefers-reduced-motion
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Returns the two neighbouring key-values in an object.
 * @param {Object} a - The object to search.
 * @param {number} x - The value to find neighbours for.
 * @returns {Array|null} An array with two neighbouring keys or null if not found.
 */
function getNeighbourKeys(a, x) {
    var c1, c2;
    var keys = Object.keys(a);

    //if x is 0, the function fails
    if (x == 0) {
        return [keys[0], keys[1]];
    }

    var keyLength = keys.length;

    for (var i = 0; i < keyLength - 1; i++) {
        c1 = keys[i];
        c2 = keys[i + 1];
        if (x > c1 && x < c2) return [c1, c2];
    }

    return null;
}

class ParallaxusOptions {

    /**
     * Creates an instance of ParallaxusOptions.
     * @param {Object} optionsParameter - A JSON array including all wanted CSS properties with regarding values.
     */
    constructor(optionsParameter) {
        this.options = {};
        this.transformOptions = {};
        this.retString = "";

        const optionTypes = {
            scale: { type: 'transform', stringStart: 'scale(', stringEnd: ')' },
            translateX: { type: 'transform', stringStart: 'translateX(', stringEnd: ')' },
            translateY: { type: 'transform', stringStart: 'translateY(', stringEnd: ')' },
            rotate: { type: 'transform', stringStart: 'rotate(', stringEnd: ')' },
            opacity: { type: 'style', stringStart: 'opacity: ', stringEnd: ';' },
            backgroundColor: { type: 'style', stringStart: 'background-color: ', stringEnd: ';' },
            width: { type: 'style', stringStart: 'width: ', stringEnd: ';' },
            height: { type: 'style', stringStart: 'height: ', stringEnd: ';' },
            boxShadow: { type: 'style', stringStart: 'box-shadow: ', stringEnd: ';' },
            textShadow: { type: 'style', stringStart: 'text-shadow: ', stringEnd: ';' },
            outline: { type: 'style', stringStart: 'outline: ', stringEnd: ';' },
            backgroundPosition: { type: 'style', stringStart: 'background-position: ', stringEnd: ';' }
        };

        for (const key in optionsParameter) {
            let realKey = (key == "from") ? 0 : (key == "to") ? 100 : key;

            for (const transformOptionKey in optionsParameter[key]) {
                const optionType = optionTypes[transformOptionKey];
                if (!optionType) continue;

                const target = optionType.type === 'transform' ? this.transformOptions : this.options;
                if (!target[transformOptionKey]) {
                    target[transformOptionKey] = {
                        points: {},
                        stringStart: optionType.stringStart,
                        stringEnd: optionType.stringEnd
                    };
                }
                target[transformOptionKey].points[realKey] = optionsParameter[key][transformOptionKey];
            }
        }

        if (Object.keys(this.options).length === 0) {
            this.options = null;
        }
        if (Object.keys(this.transformOptions).length === 0) {
            this.transformOptions = null;
        }
    }

    /**
     * Generates the CSS transform string based on the ratio.
     * @param {number} ratio - The ratio to calculate the transform string.
     * @returns {string} The CSS transform string.
     */
    getCssTransformString(ratio) {
        this.retString = "translateZ(0) ";
        for (const key in this.transformOptions) {
            const neighbourKeys = getNeighbourKeys(this.transformOptions[key].points, ratio * 100);
            if (!neighbourKeys) return;

            const p1 = this.transformOptions[key].points[neighbourKeys[0]];
            const p2 = this.transformOptions[key].points[neighbourKeys[1]];
            const movement = this.calculateMovement(p1, p2, neighbourKeys, ratio);

            this.retString += this.transformOptions[key].stringStart + movement + this.transformOptions[key].stringEnd + " ";
        }
        return this.retString.trim();
    }

    /**
     * Generates the CSS string based on the ratio.
     * @param {number} ratio - The ratio to calculate the CSS string.
     * @returns {string} The CSS string.
     */
    getCssString(ratio) {
        this.retString = "";
        for (const key in this.options) {
            const neighbourKeys = getNeighbourKeys(this.options[key].points, ratio * 100);
            if (!neighbourKeys) return;

            const p1 = this.options[key].points[neighbourKeys[0]];
            const p2 = this.options[key].points[neighbourKeys[1]];
            const movement = this.calculateMovement(p1, p2, neighbourKeys, ratio, key);

            this.retString += this.options[key].stringStart + movement + this.options[key].stringEnd + " ";
        }
        return this.retString.trim();
    }

    /**
     * Calculates the movement based on the points and ratio.
     * @param {number|string} p1 - The first point.
     * @param {number|string} p2 - The second point.
     * @param {Array} neighbourKeys - The neighbouring keys.
     * @param {number} ratio - The ratio to calculate the movement.
     * @param {string} key - The key for the option.
     * @returns {string} The calculated movement.
     */
    calculateMovement(p1, p2, neighbourKeys, ratio, key) {
        if (key === 'boxShadow' || key === 'textShadow' || key === 'backgroundColor') {
            return this.calculateComplexMovement(p1, p2, neighbourKeys, ratio, key);
        }

        const dis = neighbourKeys[1] - neighbourKeys[0];
        const localRatio = Math.abs(neighbourKeys[1] - ratio * 100);
        const tmpRatio = dis / localRatio;
        const diff = Math.abs(parseFloat(p1) - parseFloat(p2)).toFixed(4);

        const unit = String(p1).replace(/[0-9.-]/g, '') || String(p2).replace(/[0-9.-]/g, '');

        const movement = parseFloat(p1) > parseFloat(p2) ? (parseFloat(p2) + diff / tmpRatio).toFixed(4) : (parseFloat(p2) - diff / tmpRatio).toFixed(4);
        return movement + unit;
    }

    /**
     * Calculates complex movement for properties like boxShadow, textShadow, and backgroundColor.
     * @param {string} p1 - The first point.
     * @param {string} p2 - The second point.
     * @param {Array} neighbourKeys - The neighbouring keys.
     * @param {number} ratio - The ratio to calculate the movement.
     * @param {string} key - The key for the option.
     * @returns {string} The calculated complex movement.
     */
    calculateComplexMovement(p1, p2, neighbourKeys, ratio, key) {
        const dis = neighbourKeys[1] - neighbourKeys[0];
        const localRatio = (ratio * 100 - neighbourKeys[0]) / dis;

        if (key === 'backgroundColor') {
            return this.interpolateColor(p1, p2, localRatio);
        }

        const p1Parts = p1.split(/,\s*/);
        const p2Parts = p2.split(/,\s*/);

        const result = p1Parts.map((part, index) => {
            const p1Values = part.match(/-?\d*\.?\d+(px|em|rem|%|vh|vw)?|#[0-9a-fA-F]{3,6}|rgba?\(\d+,\s*\d+,\s*\d+(?:,\s*\d+)?\)/g);
            const p2Values = p2Parts[index].match(/-?\d*\.?\d+(px|em|rem|%|vh|vw)?|#[0-9a-fA-F]{3,6}|rgba?\(\d+,\s*\d+,\s*\d+(?:,\s*\d+)?\)/g);

            const interpolatedValues = p1Values.map((value, i) => {
                if (value.match(/#[0-9a-fA-F]{3,6}|rgba?\(\d+,\s*\d+,\s*\d+(?:,\s*\d+)?\)/)) {
                    return this.interpolateColor(value, p2Values[i], localRatio);
                } else {
                    const unit = value.replace(/[0-9.-]/g, '') || p2Values[i].replace(/[0-9.-]/g, '');
                    const diff = parseFloat(p2Values[i]) - parseFloat(value);
                    const movement = parseFloat(value) + diff * localRatio;
                    return movement.toFixed(4) + unit;
                }
            });

            return interpolatedValues.join(' ');
        });

        return result.join(', ');
    }

    /**
     * Interpolates between two colors.
     * @param {string} color1 - The first color.
     * @param {string} color2 - The second color.
     * @param {number} ratio - The ratio to interpolate.
     * @returns {string} The interpolated color.
     */
    interpolateColor(color1, color2, ratio) {
        const hexToRgb = (hex) => {
            let r = 0,
                g = 0,
                b = 0;
            if (hex.length == 4) {
                r = parseInt(hex[1] + hex[1], 16);
                g = parseInt(hex[2] + hex[2], 16);
                b = parseInt(hex[3] + hex[3], 16);
            } else if (hex.length == 7) {
                r = parseInt(hex[1] + hex[2], 16);
                g = parseInt(hex[3] + hex[4], 16);
                b = parseInt(hex[5] + hex[6], 16);
            }
            return [r, g, b];
        };

        const rgbToHex = (r, g, b) => {
            return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
        };

        const [r1, g1, b1] = hexToRgb(color1);
        const [r2, g2, b2] = hexToRgb(color2);

        const r = Math.round(r1 + (r2 - r1) * ratio);
        const g = Math.round(g1 + (g2 - g1) * ratio);
        const b = Math.round(b1 + (b2 - b1) * ratio);

        return rgbToHex(r, g, b);
    }

    /**
     * Generates the full CSS string based on the ratio.
     * @param {number} ratio - The ratio to calculate the CSS string.
     * @returns {string} The full CSS string.
     */
    getFullCssString(ratio) {
        const cssString = this.getCssString(ratio);
        const transformString = this.getCssTransformString(ratio);
        if (cssString && transformString) {
            return `${cssString} transform: ${transformString};`;
        } else if (cssString) {
            return cssString;
        }
        return `transform: ${transformString};`;
    }
}

var absRatio;

class ParallaxusElement {
    /**
     * Creates an instance of ParallaxusElement.
     * @param {HTMLElement} elm - The DOM element.
     */
    constructor(elm) {
        this.transformScaleOptions = new Object();
        this.transformTranslateXOptions = new Object();
        this.transformTranslateYOptions = new Object();
        this.transformRotateOptions = new Object();

        //store access to DOM Element as _this
        this._this = elm;
        //parse the data-parallaxus-transform parameter (STRING) to JSON
        this.transformdata = JSON.parse(elm.dataset.parallaxusTransform);
        //setup Options Object - will be used to store and access all Options
        this.parallaxusOptions = new ParallaxusOptions(this.transformdata);

        // Set will-change based on transform and style options
        const willChangeProps = ['transform'];
        if (this.transformdata.opacity !== undefined) {
            willChangeProps.push('opacity');
        }
        this._this.style.willChange = willChangeProps.join(', ');

        this.elmHeight = this._this.getBoundingClientRect().height;
    }

    /**
     * Sets the transform style of the element.
     * @param {string} transform - The transform string.
     */
    setTransform(transform) {
        this._this.style.transform = transform;
        this._this.style.WebkitTransform = transform;
    }

    /**
     * Sets the style of the element.
     * @param {string} style - The style string.
     */
    setStyle(style) {
        const styleObj = style.split(';').reduce((acc, style) => {
            const [key, value] = style.split(':');
            if (key && value) {
                acc[key.trim()] = value.trim();
            }
            return acc;
        }, {});
        Object.assign(this._this.style, styleObj);
    }

    /**
     * Applies the style to the element based on the ratio.
     * @param {number} ratio - The ratio to calculate the style.
     */
    applyStyle(ratio) {
        //console.trace("ratio", ratio)
        //if there are only transform options, dont alter the complete style tag
        if (this.parallaxusOptions.options) {
            this.setStyle(this.parallaxusOptions.getFullCssString(ratio));
        } else {
            this.setTransform(this.parallaxusOptions.getCssTransformString(ratio));
        }
    }

    /**
     * Animates the element based on its position in the viewport.
     */
    animate() {
        var elmOffsetY = this._this.getBoundingClientRect().y;

        var tmpWindowHeight = windowHeight;
        //For elements initialy in view
        if (elmOffsetY + pageYOffset < tmpWindowHeight) {
            tmpWindowHeight = elmOffsetY + pageYOffset;
        }
        //Only if the Element is visible, the computition of the transform string will be executed
        if (elmOffsetY < windowHeight && elmOffsetY + this.elmHeight > 0) {
            //absRatio is the real position of the Element on the screen, while 0 is just touching the lower end of the screen and 1 is just left the screen
            absRatio = 1 - (elmOffsetY + this.elmHeight) / (this.elmHeight + tmpWindowHeight);

            this.applyStyle(absRatio.toFixed(4));
        }
    }
}

class ParallaxusHitpoint {
    /**
     * Creates an instance of ParallaxusHitpoint.
     * @param {HTMLElement} elm - The DOM element.
     */
    constructor(elm) {
        //store access to DOM Element as _this
        this._this = elm;
        //parse the data-parallaxus-hitpoint parameter (STRING) to JSON
        this.transformdata = JSON.parse(elm.dataset.parallaxusHitpoint);

        this.enterCallback = new Function('delta', this.transformdata.enter || "");
        this.leaveCallback = new Function('delta', this.transformdata.leave || "");

        this.triggerOnce = elm.dataset.parallaxusTriggerOnce || false;

        this.elmHeight = this._this.getBoundingClientRect().height;

        this.triggered = false;
    }

    /**
     * Updates the hitpoint element based on its position in the viewport.
     * @param {number} delta - The scroll delta.
     */
    update(delta) {
        var elmOffsetY = this._this.getBoundingClientRect().y;

        //Element is visible on Screen
        if (elmOffsetY < windowHeight && elmOffsetY + this.elmHeight > 0) {
            //callback
            //Only call once
            if (!this.triggerOnce || (this.triggerOnce && !this.triggered)) {
                this.triggered = true;
                this.enterCallback(delta);
            }
        } else if (this.triggered) {
            //Element left screen
            //delta tells us, if scrolled up or down (positive - scroll down; negative - scroll up)
            this.leaveCallback(delta);
            this.triggered = false;
        }
    }
}

/**
 * Sets the transform style of the element.
 * @param {HTMLElement} elm - The DOM element.
 * @param {string} transform - The transform string.
 */
function setTransform(elm, transform) {
    elm.style.transform = transform;
    elm.style.WebkitTransform = transform;
}

// Current scroll position
var current = 0;
// Target scroll position
var target = 0;
// Ease or speed for moving from `current` to `target`
var ease = 0.1; // Adjusted for smoother animation

var lastScrollTop = 0;

// Utility variables for `requestAnimationFrame`
var rafId = undefined;
var rafActive = false;

let elementArr = [];
let hitpointElementArr = [];

/**
 * Updates the scroll target and starts the animation if it is not running already.
 */
function updateScroll() {
    target = window.scrollY || window.pageYOffset;
    startAnimation();
}

/**
 * Starts the animation, if it is not running already.
 */
function startAnimation() {
    if (!rafActive) {
        rafActive = true;
        rafId = requestAnimationFrame(updateAnimation);
    }
}

/**
 * Performs calculations and applies CSS transforms accordingly.
 * Uses `requestAnimationFrame` for smooth animations.
 */
function updateAnimation() {
    // Use a smaller ease value for smoother animation
    const ease = 0.075;

    // Calculate diff with higher precision
    const diff = target - current;
    const delta = Math.abs(diff) < 0.05 ? 0 : diff * ease;

    if (delta) {
        current += delta;
        // Avoid unnecessary precision
        current = Math.round(current * 100) / 100;

        // Update elements in batches
        const visibleElements = elementArr.filter(elm => {
            const rect = elm._this.getBoundingClientRect();
            return rect.top < windowHeight && rect.bottom > 0;
        });

        // Use requestAnimationFrame before updating elements
        rafId = requestAnimationFrame(() => {
            visibleElements.forEach(elm => elm.animate());
            updateAnimation();
        });
    } else {
        current = target;
        rafActive = false;
        cancelAnimationFrame(rafId);
    }

    // Handle hitpoints less frequently
    if (Math.abs(lastScrollTop - current) > 10) {
        const st = current;
        if (st > lastScrollTop) {
            hitpointElementArr.forEach(elm => elm.update(1));
        } else {
            hitpointElementArr.forEach(elm => elm.update(-1));
        }
        lastScrollTop = st <= 0 ? 0 : st;
    }
}

/**
 * Sets up the Parallaxus elements and hitpoints.
 * Initializes the elements and starts the animation.
 */
function parallaxusSetup() {
    var domElements = Array.prototype.slice.call(document.querySelectorAll('[data-parallaxus-transform]'));
    var domHitpointElements = Array.prototype.slice.call(document.querySelectorAll('[data-parallaxus-hitpoint]'));

    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;

    startAnimation()

    elementArr = [];
    domElements.forEach(function(elm) {
        elementArr.push(new ParallaxusElement(elm));
    });

    hitpointElementArr = [];
    domHitpointElements.forEach(function(elm) {
        hitpointElementArr.push(new ParallaxusHitpoint(elm));
    });
}

/**
 * Throttles a function to limit the rate at which it can fire.
 * @param {Function} func - The function to throttle.
 * @param {number} limit - The number of milliseconds to wait before invoking the function again.
 * @returns {Function} The throttled function.
 */
function throttle(func, limit) {
    let lastFunc;
    let lastRan;
    return function(...args) {
        const context = this;
        if (!lastRan) {
            func.apply(context, args);
            lastRan = Date.now();
        } else {
            clearTimeout(lastFunc);
            lastFunc = setTimeout(function() {
                if ((Date.now() - lastRan) >= limit) {
                    func.apply(context, args);
                    lastRan = Date.now();
                }
            }, limit - (Date.now() - lastRan));
        }
    };
}

window.addEventListener('resize', throttle(parallaxusSetup, 200));
window.addEventListener('scroll', throttle(updateScroll, 16)); // ~60fps

window.onload = (event) => {
    elementArr.forEach(elm => elm.applyStyle(0));
};

if (!prefersReducedMotion) {
    parallaxusSetup();
}