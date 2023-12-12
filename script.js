const sliders = document.querySelectorAll('.slider')

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
   const target = event.target.children.item(1);

   if (target.classList.contains("slider-text")) {
        setTimeout(function() {
            target.style.bottom = "30px";
            target.style.opacity = 0;
        }, 1000)
   }
}

sliders.forEach(element => {
    element.addEventListener('mouseover', sliderHover);
    element.addEventListener('mouseleave', sliderHoverOff);
});