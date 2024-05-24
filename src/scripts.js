import { data as imageData } from "./img_data.js";

const totalPages = Math.floor(imageData.length / 4);
var currentPage;
setCurrentPage(1);
setActiveThumbnail(0)
setMainImage(imageData[0].previewImage);


let logoDiv = document.getElementsByClassName("logo-symbol")[0];
logoDiv.onclick = function () {
    changeColor();
};

var clickCount = 0, repeatCount = 0;
var disco;

function changeColor() {
    if(repeatCount == 10) {
        logoDiv.className = "logo-symbol";
        return;
    }
    clickCount++;
    logoDiv.className = "logo-symbol click" + clickCount;
    if (clickCount == 5) {
        repeatCount++;
        clickCount = 0;
        setInterval(changeColor, 1000);
    }
}

function showImages(currentPage) {

    let element = document.getElementsByClassName("gallery")[0];

    let prevImages = element.getElementsByClassName("thumbnail");
    Array.from(prevImages).forEach(prevImage => {
        prevImage.remove();
    });

    for (let i = 4 * (currentPage) - 1; i >= 4 * (currentPage - 1); --i) {
        let image = imageData[i];

        let div = document.createElement('div');
        div.className = "thumbnail";
        div.innerHTML = "<img src=" + image.previewImage + " class=\"thumbnail-image\" >";
        div.innerHTML += "<p class=\"thumbnail-caption\">" + image.title + "</p>";
        div.onclick = function () {
            setActiveThumbnail(i);
        };
        element.prepend(div);
    }
}

function setActiveThumbnail(i) {
    let pathToImage = imageData[i].previewImage;
    let thumbnails = document.getElementsByClassName("thumbnail");
    Array.from(thumbnails).forEach(thumbnail => {
        if (thumbnail.className == "thumbnail active") {
            thumbnail.className = "thumbnail";
        }
    });
    thumbnails[i%4].className = "thumbnail active";
}

function generatePageButton(pageNumber, isActive) {
    let pageSelector = document.getElementsByClassName("page-selector")[0];

    let pageButton = document.createElement('div');
    pageButton.className = "page-button";
    pageButton.onclick = function () {
        setCurrentPage(pageNumber);
    };
    pageButton.innerHTML = pageNumber;

    if (isActive) {
        pageButton.className += " active";
        showImages(pageNumber);
    }

    pageSelector.appendChild(pageButton);
}

function setCurrentPage(clickedPage) {
    currentPage = clickedPage;
    buildPageSelector(currentPage, totalPages);
}

function buildPageSelector(currentPage, totalPages) {

    let prevButtons = document.getElementsByClassName("page-button");
    Array.from(prevButtons).forEach(prevButton => {
        prevButton.remove();
    });

    let arrows = document.getElementsByClassName("arrow-button");
    arrows[1].onclick = function () {
        if (currentPage != totalPages) setCurrentPage(currentPage + 1);
    };
    arrows[0].onclick = function () {
        if (currentPage != 1) setCurrentPage(currentPage - 1);
    };

    let pageSelector = document.getElementsByClassName("page-selector")[0];

    pageSelector.appendChild(arrows[1]);
    if (currentPage == totalPages) generatePageButton(currentPage - 2, false);
    if (currentPage > 1) generatePageButton(currentPage - 1, false);
    generatePageButton(currentPage, true);
    if (currentPage < totalPages) generatePageButton(currentPage + 1, false);
    if (currentPage == 1) generatePageButton(currentPage + 2, false);
    pageSelector.appendChild(arrows[1]);
}

function setMainImage(imagePath) {
    let mainDisplay = document.getElementsByClassName("main-image")[0];
    mainDisplay.src = imagePath;
}