//import fetchJson from "./character";

const charId = localStorage.getItem("Character Id");
console.log(charId);

export default async function fetchJson() {
    const json = "json/character.json";
    const response = await fetch(json);
    return await response.json();
  }

const res = await fetchJson();

displayCharInfo(res);

function displayCharInfo(objects) {

    objects.forEach(object => {
        if (object.id == charId) {
            const charName = document.createElement("h1");
            const charHomeWorld = document.createElement("p");
            const charImage = document.createElement("img");
            const affiliations = document.createElement("ul");
    
            charName.textContent = object.name;
            charHomeWorld.textContent = `Home World: ${object.homeworld}`;
            charImage.setAttribute("src", object.image);
            charImage.setAttribute("width", "300px");
            affiliations.textContent = `Affiliations: ${object.affiliations}`;
    
            const info = document.querySelector(".characterInfo");
            info.appendChild(charImage);
            info.appendChild(charName);
            info.appendChild(charHomeWorld);
            info.appendChild(affiliations);
        }
    })
  

}



