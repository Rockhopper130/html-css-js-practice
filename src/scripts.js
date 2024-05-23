import data from "./img_data.js";

let imageData = data;

imageData.forEach((image,i) => {

    if(i < 4){
        let div = document.createElement('div');
        div.className = "thumbnail";
        div.innerHTML = "<img src=" + image.previewImage + " class=\"thumbnail-image\" >";
        div.innerHTML += "<p class=\"thumbnail-caption\">" + image.title + "</p>";
        let element = document.getElementsByClassName("gallery")[0];
        element.prepend(div);
    }

});