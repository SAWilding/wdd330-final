import { fetchJson } from "./character";

const chars = localStorage.getItem("charList");
const charList = chars.split(",");
const res = await fetchJson();


document.querySelector(".movieTitle").textContent = localStorage.getItem("title");
document.querySelector(".story").textContent = localStorage.getItem("story");
document.querySelector(".part1").textContent = localStorage.getItem("par1");
document.querySelector(".part2").textContent = localStorage.getItem("par2");
document.querySelector(".part3").textContent = localStorage.getItem("par3");

function makeCastList() {
    const cast = document.querySelector(".cast");
    
    for (let i = 0; i < charList.length; i++) {
        const name = charList[i];
        res.forEach((object) => {
          if (name == object.name) {
              const img = document.createElement("img");
              const charName = document.createElement("h3");
              charName.textContent = object.name.toLowerCase();
              charName.style.textAlign = "center";
              img.setAttribute("alt", object.name);
              img.setAttribute("src", object.image);
              img.setAttribute("width", "200px");
              img.setAttribute("height", "200px");
              const charSection = document.createElement("section");
              charSection.appendChild(img);
              charSection.appendChild(charName);
              cast.appendChild(charSection);
            }
        });
      }
}

makeCastList();

const signInId = sessionStorage.getItem("user");

if (signInId) {
    const galleryPage = document.querySelector("#sign-up");
    galleryPage.textContent = "Gallery";
    galleryPage.setAttribute("href", "userGallery.html");
}
