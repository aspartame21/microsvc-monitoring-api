const Sqrl = require('squirrelly');

Sqrl.defineHelper("returnColor", function (arg) { // In our case, the argument will be the value of 'options.color'
    var colorScheme = { // This just maps the written colors to hex codes. Try editing or adding more colors!
        brightgreen: "#4c1",
        green: "#97CA00",
        orange: "#fe7d37",
        red: "#e05d44",
        blue: "#007ec6",
    }
    if (colorScheme.hasOwnProperty(arg)) { // Then the color has a valid hex code associated with it
        var result = colorScheme[arg] // Get the hex code
        console.log("Resulting Hex: " + result)
        return result // Return the hex code
    } else { // If the color doesn't have a valid hex code associated with it
        return arg // Just in case it's one of the built-in SVG colors
    }
})

function badgify(label, message, color) {
    return Sqrl.renderFile(__dirname + '/template.svg', { left: label, right: message, color });
}
exports.badgify = badgify;
