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
            const affiliationLabel = document.createElement("p");
            const species = document.createElement("p");
        
    
            charName.textContent = object.name;
            charHomeWorld.textContent = `Home World: ${object.homeworld}`;
            species.textContent = `Species: ${object.species}`;
            charImage.setAttribute("src", object.image);
            charImage.setAttribute("width", "300px");
            
            
        
            const charAffiliations = object.affiliations;

            if (charAffiliations != null) {
            charAffiliations.forEach(affiliation => {
                affiliationLabel.textContent = "Affiliations: "
                const li = document.createElement("li");
                li.textContent = affiliation;
                affiliations.appendChild(li);
            });
        }

            
    
            const info = document.querySelector(".characterInfo");
            info.appendChild(charImage);
            info.appendChild(charName);
            info.appendChild(species);
            info.appendChild(charHomeWorld);
            info.appendChild(affiliationLabel);
            info.appendChild(affiliations);
        }
    })
  

}



