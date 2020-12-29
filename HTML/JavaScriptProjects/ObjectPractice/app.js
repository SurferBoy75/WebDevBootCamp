console.info("Object Practice app.js is logging...")

// function hex(r, g, b) {
//     return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
// }

// function rgb(r, g, b) {
//     return `rgb(${r}, ${g}, ${b})`;
// }

//this is a FACTORY function... no longer commonly used.

function makeColor(r, g, b) {
    //define the object from values passed in... 
    const color = {};
    color.r = r;
    color.g = g;
    color.b = b;

    //define a couple methods to be created with the object...
    color.rgb = function () {
        const { r, g, b } = this;
        return `rgb(${r}, ${g}, ${b})`;
    }
    color.hex = function () {
        const { r, g, b } = this;
        return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    }

    //return the object itself.
    return color;
}

// This is an example of a CONSTRUCTOR object of the same type... 

function ColorConstruct(r, g, b) {
    this.r = r;
    this.g = g;
    this.b = b;
}

ColorConstruct.prototype.rgb = function () {
    const { r, g, b } = this;
    return `rgb(${r}, ${g}, ${b})`;
}
ColorConstruct.prototype.hex = function () {
    const { r, g, b } = this;
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}
ColorConstruct.prototype.rgba = function (a = 1.0) {
    const { r, g, b } = this;
    return `rgba(${r}, ${g}, ${b}, ${a})`;
}

// this is the new class structure (syntax candy for creating constructor objects)

class Color {
    constructor(r, g, b, name = "someShit") {
        this.r = r;
        this.g = g;
        this.b = b;
        this.name = name;
        this.calcHSL();
    }
    innerRGB() {
        const { r, g, b } = this;
        return `${r}, ${g}, ${b}`
    }
    rgb() {
        return `rgb(${this.innerRGB()})`;
    }
    hex() {
        const { r, g, b } = this;
        return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    }
    rgba(a = 1.0) {
        return `rgba(${this.innerRGB()}, ${a})`;
    }
    hsl() {
        const { h, s, l } = this;
        return `hsl(${h}, ${s}%, ${l}%)`
    }
    opposite() {
        const { h, s, l } = this;
        const newHue = (h + 180) % 360;
        return `hsl(${newHue}, ${s}%, ${l}%)`
    }
    fullySaturated() {
        const { h, l } = this;
        return `hsl(${h}, 100%, ${l}%)`
    }
    calcHSL() {
        let { r, g, b } = this;

        // Make r, g, and b fractions of 1
        r /= 255;
        g /= 255;
        b /= 255;

        // find greatest and smallest channel values
        let cmin = Math.min(r, g, b),
            cmax = Math.max(r, g, b),
            delta = cmax - cmin,
            h = 0,
            s = 0,
            l = 0;

        if (delta == 0) h = 0;
        else if (cmax == r)
            // Red is max
            h = ((g - b) / delta) % 6;
        else if (cmax == g)
            // Green is max
            h = (b - r) / delta + 2;
        else
            // Blue is max
            h = (r - g) / delta + 4;

        h = Math.round(h * 60);

        // Make negative hues positive behind 360 degrees
        if (h < 0) h += 360;

        // Calculate lightness
        l = (cmax + cmin) / 2;

        // Calculate saturation
        s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

        // Multiply l and s by 100
        s = +(s * 100).toFixed(1);
        l = +(l * 100).toFixed(1);

        this.h = h;
        this.s = s;
        this.l = l;
    }
}

class Pet {
    constructor(name, age) {
        console.log('in pet... ');
        this.name = name;
        this.age = age;
    }
    eat() {
        return `${this.name} is eating!`;
    }
}

class Cat extends Pet {
    constructor(name, age, livesLeft = 9) {
        console.log('in cat... ');
        super(name, age);
        console.log('after the super... ');
        this.livesLeft = livesLeft;
    }
    meow() {
        return 'MEOOWW!!';
    }
}

class Dog extends Pet {
    bark() {
        return 'WOOF WOOF!!';
    }
    eat() {
        return `${this.name} is scarfing his food!!`;
    }
}
