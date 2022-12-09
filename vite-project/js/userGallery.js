import DataService from "./dataService";

const service = new DataService("userData");

const users = await service.getData();

const userId = sessionStorage.getItem("user");

const gallery = document.querySelector(".gallery");

users.forEach(user => {
   if (userId == user.user) {
    const movieTitle = document.createElement("h3");
    movieTitle.textContent = user.title.toLowerCase();
    const movieSection = document.createElement("section");
    const movieImg = document.createElement("img");
    movieImg.setAttribute("src", "../images/movieIcon.png");
    movieImg.setAttribute('alt', "movie icon");
    movieImg.setAttribute("width", "100px");
    movieSection.appendChild(movieTitle);
    movieSection.appendChild(movieImg);
    gallery.appendChild(movieSection);
    
    movieSection.addEventListener("click", () => {
        localStorage.setItem("story", user.story);
        localStorage.setItem("title", user.title);
        localStorage.setItem("charList", user.cast);
        localStorage.setItem("par1", user.par1);
        localStorage.setItem("par2", user.par2);
        localStorage.setItem("par3", user.par3);
        location.href = "userMovie.html";
    })
    
   }
})

const signInId = sessionStorage.getItem("user");

if (signInId) {
    const galleryPage = document.querySelector("#sign-up");
    galleryPage.textContent = "Gallery";
    galleryPage.setAttribute("href", "userGallery.html");
}

