const sliders = document.querySelectorAll('.slider');
const langLogos = document.querySelectorAll('.lang-logo');
const searchElements = document.querySelectorAll('p');

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
    let regex = new RegExp(targetText, 'gi');

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
    let regex = new RegExp(`<mark>${targetText}</mark>`, 'gi');
    searchElements.forEach(element => {
        let innerText = element.innerHTML;
        element.innerHTML = innerText.replace(regex, targetText);
    })
}

sliders.forEach(element => {
    element.addEventListener('mouseover', sliderHover);
    element.addEventListener('mouseleave', sliderHoverOff);
});

langLogos.forEach(element => {
    element.addEventListener('click', highlight)
})