import { data as imageData } from "./img_data.js";

const totalPages = Math.floor(imageData.length / 4);

let allCaptions = Array(imageData.length);
imageData.forEach((element,index) => {
    allCaptions[index] = element.title;
});

let currentPage, currentImage = 0;
setCurrentPage(1);
setActiveThumbnail(currentImage);
setMainImage(imageData[0].previewImage, imageData[0].title);

const captionEdit = document.getElementsByClassName("image-caption")[0];
captionEdit.addEventListener("input", function() {
    // console.log(event.target.textContent);
    allCaptions[currentImage] = event.target.textContent;
    changeCaption();
});

function showImages(currentPage) {

    const element = document.getElementsByClassName("gallery")[0];

    const prevImages = element.getElementsByClassName("thumbnail");
    Array.from(prevImages).forEach(prevImage => {
        prevImage.remove();
    });

    for (let i = 4 * (currentPage) - 1; i >= 4 * (currentPage - 1); --i) {
        const image = imageData[i];

        const imageButton = document.createElement('button');
        imageButton.className = "thumbnail";

        const imageThumbnail = document.createElement("img");
        imageThumbnail.className = "thumbnail-image"
        imageThumbnail.src = image.previewImage;

        const imageName = document.createElement("p");
        imageName.className = "thumbnail-caption";
        imageName.textContent = allCaptions[i];

        imageButton.appendChild(imageThumbnail);
        imageButton.appendChild(imageName);

        imageButton.onclick = function () {
            setActiveThumbnail(i);
        };
        element.prepend(imageButton);
    }
}

function setActiveThumbnail(i) {
    currentImage = i;
    setMainImage(imageData[i].previewImage, allCaptions[i]);
    const thumbnails = document.getElementsByClassName("thumbnail");
    Array.from(thumbnails).forEach(thumbnail => {
        thumbnail.classList.remove("active");
    });
    thumbnails[i % 4].classList.add("active");
}

function generatePageButton(pageNumber, isActive) {
    const pageSelector = document.getElementsByClassName("page-selector")[0];

    const pageButton = document.createElement('button');
    pageButton.className = "page-button";
    pageButton.onclick = function () {
        setCurrentPage(pageNumber);
    };
    pageButton.innerHTML = pageNumber;

    if (isActive) {
        pageButton.classList.add("active")
        showImages(pageNumber);
    }

    pageSelector.appendChild(pageButton);
}

function setCurrentPage(clickedPage) {
    currentPage = clickedPage;
    buildPageSelector(currentPage, totalPages);
}

function buildPageSelector(currentPage, totalPages) {

    const prevButtons = document.getElementsByClassName("page-button");
    Array.from(prevButtons).forEach(prevButton => {
        prevButton.remove();
    });

    const arrows = document.getElementsByClassName("arrow-button");
    arrows[1].onclick = function () {
        arrows[1].classList.remove("disabled");
        if (currentPage != totalPages) setCurrentPage(currentPage + 1);
        else arrows[1].classList.add("disabled");
    };
    arrows[0].onclick = function () {
        arrows[0].classList.remove("disabled");
        if (currentPage != 1) setCurrentPage(currentPage - 1);
        else arrows[0].classList.add("disabled");
    };

    const pageSelector = document.getElementsByClassName("page-selector")[0];

    pageSelector.appendChild(arrows[1]);
    if (currentPage == totalPages) generatePageButton(currentPage - 2, false);
    if (currentPage > 1) generatePageButton(currentPage - 1, false);

    generatePageButton(currentPage, true);

    if (currentPage < totalPages) generatePageButton(currentPage + 1, false);
    if (currentPage == 1) generatePageButton(currentPage + 2, false);
    pageSelector.appendChild(arrows[1]);
}

function setMainImage(imagePath, imageCaption) {
    const mainDisplay = document.getElementsByClassName("main-image")[0];
    const caption = document.getElementsByClassName("image-caption")[0];
    caption.textContent = imageCaption;
    mainDisplay.src = imagePath;
}

function changeCaption(){
    const thumbnailCaptions = document.getElementsByClassName("thumbnail-caption");
    thumbnailCaptions[currentImage % 4].textContent = allCaptions[currentImage];

    const caption = document.getElementsByClassName("image-caption")[0];
    caption.textContent = allCaptions[currentImage];
}