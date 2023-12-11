const sliders = document.querySelectorAll('.slider')

const sliderHover = (event) => {
    //console.log("sliding")
    console.log(event.target)
    const target = event.target.parentElement.children.item(1); // The event target will almost always be the <img> element, so the sliding text is the element's sibling.
    console.log(target)

    if (target.classList.contains("slider-text")) {
        target.style.opacity = 100;
        target.style.bottom = 0;
    }
}

const sliderHoverOff = (event) => {
   //console.log("sliding off.")
   const target = event.target.children.item(1);

   if (target.classList.contains("slider-text")) {
        target.style.bottom = "30px";
        target.style.opacity = 0;
   }
}

sliders.forEach(element => {
    element.addEventListener('mouseover', sliderHover);
    element.addEventListener('mouseleave', sliderHoverOff);
});