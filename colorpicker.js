"use strict";

/*

let r = document.getElementById("myRangeR");
let g = document.getElementById("myRangeR");
let b = document.getElementById("myRangeR");



console.log(r.value);
console.log(r.value);
console.log(r.value);

document.querySelector(".slidecontainer1 span").textContent = r.value;
document.querySelector(".slidecontainer2 span").textContent = g.value;
document.querySelector(".slidecontainer3 span").textContent = b.value;

*/



// Selecting color blocks

let block1 = document.getElementById("color-1");
let block2 = document.getElementById("color-2");
let blockBase = document.getElementById("color-base");
let block4 = document.getElementById("color-4");
let block5 = document.getElementById("color-5");

 // Setting default color of the block for when the page loads
 let defaultColor = "#0000ff";

 // Color selector
 let colorSelect = document.getElementById("colorSelect");
 
 // Harmony selector
 let harmonySelect = document.querySelector('#harmonySelect');

// Updating page when the color picker changes

window.addEventListener("load", init, false);

function init(){
    
    
    colorSelect.addEventListener("input", updateFirst, false);
    // colorSelect.addEventListener("change", updateAll, false);

    harmonySelect.addEventListener("input", updateFirst, false);

}

// Setting base block to equal the colorPicker, when a color is selected

function updateFirst() {
    blockBase.style.backgroundColor = colorSelect.value;

    // After updating the color in the color selector, it is changing the hex of the selected color to their r, g, and b values below using the hexToRgb function we created down below. We are referencing these r, g, b values to variables baseR, baseG and baseB.

    let baseR = hexToRgb(colorSelect.value).r;
    let baseG = hexToRgb(colorSelect.value).g;
    let baseB = hexToRgb(colorSelect.value).b;

    // Using the RGB to HSL function we created earlier to define the HSL. Using the parameters.
    console.log(rgbToHSL(baseR, baseG, baseB));

    // Defining what the baseH baseS and baseL will be from using the RGB to HSL function given by Peter.
    let baseH = rgbToHSL(baseR, baseG, baseB).h;
    let baseS = rgbToHSL(baseR, baseG, baseB).s;
    let baseL = rgbToHSL(baseR, baseG, baseB).l;

    console.log(baseH);

    // Now testing to see the value of the harmony selector and running the function based on which value it is.
    if (harmonySelect.value === "analogous") {
        analogous(baseH, baseS, baseL);
    } else if (harmonySelect.value === "monochromatic") {
        monochromatic(baseH, baseS, baseL);

    }
    


  } 
// Hex code to RGB function

  function hexToRgb(hex) {
    let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

console.log(hexToRgb("#0000ff"));

// r,g,b to HSL function below

function rgbToHSL(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;
  
    let h, s, l;
 
    const min = Math.min(r,g,b);
    const max = Math.max(r,g,b);
   
    if( max === min ) {
      h = 0;
    } else
    if (max === r) {
      h = 60 * (0 + (g - b) / (max - min) );
    } else
    if (max === g) {
      h = 60 * (2 + (b - r) / (max - min) );
    } else
    if (max === b) {
      h = 60 * (4 + (r - g) / (max - min) );
    }
   
    if (h < 0) {h = h + 360; }
   
    l = (min + max) / 2;
   
    if (max === 0 || min === 1 ) {
      s = 0;
    } else {
      s = (max - l) / ( Math.min(l,1-l));
    }
    // multiply s and l by 100 to get the value in percent, rather than [0,1]
    s *= 100;
    l *= 100;
 
 
    // console.log("hsl(%f,%f%,%f%)", h, s, l); // just for testing
    return {
        h: h,
        s: s,
        l: l
    };
}

// Reusable function to set the 4 surrounding color blocks to analogous colours, based on the h, s, l of the base used as the parameters.

function analogous (h, s, l) {
    let color1h = h + 25;
    let color2h = h - 50;
    let color4h = h + 34;
    let color5h = h - 25;

    block1.style.backgroundColor = "hsl(" + color1h + ", " + s + "%, " + l + "%)";
    block2.style.backgroundColor = "hsl(" + color2h + ", " + s + "%, " + l + "%)";
    block4.style.backgroundColor = "hsl(" + color4h + ", " + s + "%, " + l + "%)";
    block5.style.backgroundColor = "hsl(" + color5h + ", " + s + "%, " + l + "%)";
}

// Reusable function to set the 4 surrounding color blocks to monochromatic colours, based on the h, s, l of the base used as the parameters.

function monochromatic (h, s, l) {
    let color1l = l + 25;
    let color2l = l - 50;
    let color4l = l + 34;
    let color5l = l - 25;

    block1.style.backgroundColor = "hsl(" + h + ", " + s + "%, " + color1l + "%)";
    block2.style.backgroundColor = "hsl(" + h + ", " + s + "%, " + color2l + "%)";
    block4.style.backgroundColor = "hsl(" + h + ", " + s + "%, " + color4l + "%)";
    block5.style.backgroundColor = "hsl(" + h + ", " + s + "%, " + color5l + "%)";
}

function triad(h, s, l){
    let color1l = l + 25;
    let color2l = l - 50;
    let color4l = l + 34;
    let color5l = l - 25;

    block1.style.backgroundColor = "hsl(" + h + ", " + s + "%, " + color1l + "%)";
    block2.style.backgroundColor = "hsl(" + h + ", " + s + "%, " + color2l + "%)";
    block4.style.backgroundColor = "hsl(" + h + ", " + s + "%, " + color4l + "%)";
    block5.style.backgroundColor = "hsl(" + h + ", " + s + "%, " + color5l + "%)";
}

function shades(h, s, l){
    let color1s = s + 25;
    let color2s = s - 50;
    let color4s = s + 34;
    let color5s = s - 25;

    block1.style.backgroundColor = "hsl(" + h + ", " + color1s + "%, " + l + "%)";
    block2.style.backgroundColor = "hsl(" + h + ", " + color2s + "%, " + l + "%)";
    block4.style.backgroundColor = "hsl(" + h + ", " + color4s + "%, " + l + "%)";
    block5.style.backgroundColor = "hsl(" + h + ", " + color5s + "%, " + l + "%)";
}

