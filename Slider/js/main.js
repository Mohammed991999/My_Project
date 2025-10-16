let imgList = Array.from(document.querySelectorAll('.item img'));
let lightBoxContainer = document.querySelector('.lightBoxContainer');
let lightboxItem = document.querySelector('.lightboxItem');
let nextBtn = document.querySelector('#next');
let close = document.querySelector('#close');
let prevBtn = document.querySelector('#previos');
let currentSlideIndex = 0;

for (let i = 0; i < imgList.length; i++) {
    imgList[i].addEventListener('click' , function (e) {
    let imgSrc = e.target.getAttribute('src');
    currentSlideIndex = imgList.indexOf(e.target);
    lightBoxContainer.classList.replace('d-none' , 'd-flex');
    lightboxItem.style.backgroundImage = `url(${imgSrc})`
    
})
}

function nextSlide() {
    currentSlideIndex++;
    if (currentSlideIndex == imgList.length) {
        currentSlideIndex = 0;
}
    let imgSrc = imgList[currentSlideIndex].getAttribute('src');
    lightboxItem.style.backgroundImage = `url(${imgSrc})`;

}
nextBtn.addEventListener('click' , nextSlide);

function prevSlide() {
    currentSlideIndex--;
    if (currentSlideIndex < 0) {
        currentSlideIndex = imgList.length -1;
}
    let imgSrc = imgList[currentSlideIndex].getAttribute('src');
    lightboxItem.style.backgroundImage = `url(${imgSrc})`;

}
prevBtn.addEventListener('click' , prevSlide);

close.addEventListener('click' , function () {
    lightBoxContainer.classList.replace('d-flex' , 'd-none');

})

document.addEventListener('keydown' , function (e) {
    if(e.key == "Escape")  {
        lightBoxContainer.classList.replace('d-flex' , 'd-none');
    }
})