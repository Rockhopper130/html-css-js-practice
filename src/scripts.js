import { data as imageData } from "./img_data.js";

const totalPages = Math.floor(imageData.length / 4);
var currentPage;

setCurrentPage(1);

function showImages(currentPage) {

    let element = document.getElementsByClassName("gallery")[0];

    let prevImages = element.getElementsByClassName("thumbnail");
    Array.from(prevImages).forEach(prevImage => {
        prevImage.remove();
    });

    for (let i = 4 * (currentPage - 1); i < 4 * (currentPage); i++) {
        let image = imageData[i];
        console.log(image);

        let div = document.createElement('div');
        div.className = "thumbnail";
        div.innerHTML = "<img src=" + image.previewImage + " class=\"thumbnail-image\" >";
        div.innerHTML += "<p class=\"thumbnail-caption\">" + image.title + "</p>";
        element.prepend(div);
    }
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
    console.log(clickedPage);
    currentPage = clickedPage;
    buildPageSelector(currentPage, totalPages);
}

function buildPageSelector(currentPage, totalPages) {

    let prevButtons = document.getElementsByClassName("page-button");
    Array.from(prevButtons).forEach(prevButton => {
        prevButton.remove();
    });    

    if (currentPage == totalPages) generatePageButton(currentPage - 2, false);
    if (currentPage > 1) generatePageButton(currentPage - 1, false);
    generatePageButton(currentPage, true);
    if (currentPage < totalPages) generatePageButton(currentPage + 1, false);
    if (currentPage == 1) generatePageButton(currentPage + 2, false);

}
