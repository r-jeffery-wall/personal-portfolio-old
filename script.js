const sliders = document.querySelectorAll('.slider');
const langLogos = document.querySelectorAll('.lang-logo');
const searchElements = document.querySelectorAll('p');
// Initialisation of values for the background.
const canvas = document.getElementById('matrix');
const context = canvas.getContext('2d');
const button = document.getElementById('background-off');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const nums = '0123456789';

const alphabet = katakana + latin + nums;

const fontSize = 16;
const columns = canvas.width / fontSize; // This uses the font size to calculate how many columns can fit on the screen.

const rainDrops = []; // The index of each element in the array will represent the x axis, the value the y.
for (let x = 0; x < columns; x++ ) {
    rainDrops[x] = 1; // The y axis for each column is initialised to 1.
}

// This acts as the toggle for the raindrop background.
let backgroundActivated = true;

const sliderHover = (event) => {
    //console.log("sliding")
    let target;
    if (event.target.classList.contains("lang-logo")) {
        target = event.target.parentElement.children.item(1); // The event target will almost always be the <img> element, so the sliding text is the element's sibling.
    } else if (event.target.classList.contains("social-logo")) {
        target = event.target.parentElement.parentElement.children.item(1); // The social logos are nested within <a> tags, so we need to go one lever higher up the DOM to find the correct child element.        
    }
    
    if (target.classList.contains("slider-text")) {
        target.style.opacity = 100;
        target.style.bottom = 0;
    }
}

const sliderHoverOff = (event) => {
   //console.log("sliding off.")
   if (event.target.classList.contains("highlighted")) { // Highlighted labels will not be hidden.
        return;
   }
   let target;
    if (event.target.classList.contains("lang-logo")) {
        target = event.target.parentElement.children.item(1); // The event target will almost always be the <img> element, so the sliding text is the element's sibling.
    } else if (event.target.classList.contains("social-logo")) {
        target = event.target.parentElement.parentElement.children.item(1); // The social logos are nested within <a> tags, so we need to go one lever higher up the DOM to find the correct child element.        
    }

   if (target.classList.contains("slider-text")) {
        setTimeout(function() {
            target.style.bottom = "30px";
            target.style.opacity = 0;
        }, 1000)
   }
}

// Below could probably be better achieved using a framework. Come back to this.
const highlight = (event) => { //https://stackoverflow.com/questions/52743841/find-and-highlight-word-in-text-using-js
    const targetText = event.target.id;
    let regex = new RegExp(targetText, 'g');

    if (event.target.classList.contains("highlighted")) { //Turns the text highlight off if it is already enabled.
        event.target.classList.remove("highlighted");
        highlightOff(targetText);
    } else {
        searchElements.forEach(element => {
            event.target.classList.add("highlighted"); // This is a non-styled class that is just used as a marker.
            let innerText = element.innerHTML;
            element.innerHTML = innerText.replace(regex, `<mark>$&</mark>`);
        });
    };
}

const highlightOff = (targetText) => { // Helper function to turn off text-highlighting.
    let regex = new RegExp(`<mark>${targetText}</mark>`, 'g');
    searchElements.forEach(element => {
        let innerText = element.innerHTML;
        element.innerHTML = innerText.replace(regex, targetText);
    })
}

const matrixRain = () => { // https://medium.com/@javascriptacademy.dev/matrix-raining-code-effect-using-javascript-3da1e4cdf3da
    if (backgroundActivated !== true) { // Logic that I added for the user to toggle the background animation on or off.
        context.fillStyle = 'rgba(0, 0, 0, 0.05)';
	    context.fillRect(0, 0, canvas.width, canvas.height);
        return
    }
    // Function for drawing the 'raindrops'.
    context.fillStyle = 'rgba(0, 0, 0, 0.05)';
	context.fillRect(0, 0, canvas.width, canvas.height);
	
	context.fillStyle = '#0F0';
	context.font = fontSize + 'px monospace';

	for(let i = 0; i < rainDrops.length; i++)
	{
		const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length)); // A random character is chosen from our alphabet.
		context.fillText(text, i*fontSize, rainDrops[i]*fontSize); // The random character is drawn at specified coordinates.
		
		if(rainDrops[i]*fontSize > canvas.height && Math.random() > 0.975){ //This handles what happens when the raindrops scroll off the screen.
			rainDrops[i] = 0;
        }
		rainDrops[i]++; // Increases the x axis.
	}
}

const canvasResize = () => { // Helper function to handle resizing of the window for the background effect.
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

sliders.forEach(element => {
    element.addEventListener('mouseover', sliderHover);
    element.addEventListener('mouseleave', sliderHoverOff);
});

langLogos.forEach(element => {
    element.addEventListener('click', highlight)
})

button.onclick = () => { // Toggles background on/off.
    backgroundActivated = !backgroundActivated;
}

window.onresize = canvasResize; // Upon resizing of the window the canvas will automatically resize, allowing the background effect to display properly.

setInterval(matrixRain, 50);