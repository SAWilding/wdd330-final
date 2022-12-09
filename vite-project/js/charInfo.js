import { fetchJson } from "./character.js";

const charId = localStorage.getItem("Character Id");
console.log(charId);

const res = await fetchJson();

displayCharInfo(res);

function displayCharInfo(objects) {
  objects.forEach((object) => {
    if (object.id == charId) {
      const charName = document.createElement("h1");
      const charHomeWorld = document.createElement("p");
      const charImage = document.createElement("img");
      const affiliations = document.createElement("ul");
      const affiliationLabel = document.createElement("p");
      const masters = document.createElement("ul");
      const mastersLabel = document.createElement("p");
      const apprentices = document.createElement("ul");
      const apprenticesLabel = document.createElement("p");
      const species = document.createElement("p");

      charName.textContent = object.name.toLowerCase();
      if (object.homeworld != null) {
      charHomeWorld.textContent = `Home World: ${object.homeworld.toLowerCase()}`;
      }
      species.textContent = `Species: ${object.species.toLowerCase()}`;
      charImage.setAttribute("src", object.image);
      charImage.setAttribute("width", "300px");

      const charAffiliations = object.affiliations;
      const charMasters = object.masters;
      const charApprentices = object.apprentices;

      if (charAffiliations != null) {
        charAffiliations.forEach((affiliation) => {
          affiliationLabel.textContent = "Affiliations: ";
          const li = document.createElement("li");
          li.textContent = affiliation.toLowerCase();
          affiliations.appendChild(li);
        });
      }
      if (charMasters != null) {
        if (Array.isArray(charMasters)) {
          charMasters.forEach((master) => {
            mastersLabel.textContent = "Masters: ";
            const li = document.createElement("li");
            li.textContent = master.toLowerCase();
            masters.appendChild(li);
          });
        } else {
          mastersLabel.textContent = "Masters: ";
          const li = document.createElement("li");
          li.textContent = charMasters.toLowerCase();
          masters.appendChild(li);
        }
      }
      if (charApprentices != null) {
        if (Array.isArray(charApprentices)) {
          charApprentices.forEach((apprentice) => {
            apprenticesLabel.textContent = "Apprentices: ";
            const li = document.createElement("li");
            li.textContent = apprentice.toLowerCase();
            apprentices.appendChild(li);
          });
        } else {
          apprenticesLabel.textContent = "Apprentices: ";
          const li = document.createElement("li");
          li.textContent = charApprentices.toLowerCase();
          apprentices.appendChild(li);
        }
      }

      const info = document.querySelector(".characterInfo");
      info.appendChild(charImage);
      info.appendChild(charName);
      info.appendChild(species);
      info.appendChild(charHomeWorld);
      info.appendChild(affiliationLabel);
      info.appendChild(affiliations);
      info.appendChild(mastersLabel);
      info.appendChild(masters);
      info.appendChild(apprenticesLabel);
      info.appendChild(apprentices);
    }
  });
}

const signInId = sessionStorage.getItem("user");

if (signInId) {
    const galleryPage = document.querySelector("#sign-up");
    galleryPage.textContent = "Gallery";
    galleryPage.setAttribute("href", "userGallery.html");
}
