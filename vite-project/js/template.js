import { fetchJson } from "./character";


const charMenu = document.getElementsByClassName("character");
const planetMenu = document.getElementsByClassName("planet");
const shipMenu = document.getElementsByClassName("starship");
const affilMenu = document.getElementsByClassName("affiliation");
const castList = document.querySelector(".castHeader");
castList.style.display = "none";

const apiUrl = "https://swapi.py4e.com/api/";

//Json src
const res = await fetchJson();
//API extensions
const planetsPath = "planets";
const shipsPath = "starships";
const affiliations = [
  "Galactic Republic",
  "Resistance",
  "Galactic Empire",
  "Jedi Order",
  "Sith",
  "Trade Federation",
  "Shadow Collective",
];

function addSelectMenus(menus, objects) {
  for (let i = 0; i < menus.length; i++) {
    const select = document.createElement("select");
    menus[i].appendChild(select);
    objects.forEach((object) => {
      const newOption = document.createElement("option");
      newOption.setAttribute("value", object.name);
      newOption.textContent = object.name.toLowerCase();

      select.appendChild(newOption);
    });
  }
}

function selectAffilMenu(menus) {
  for (let i = 0; i < menus.length; i++) {
    const select = document.createElement("select");
    menus[i].appendChild(select);
    affiliations.forEach((affiliation) => {
      const newOption = document.createElement("option");
      newOption.setAttribute("value", affiliation);
      newOption.textContent = affiliation;

      select.appendChild(newOption);
    });
  }
}

function displayFinalStory(spans) {
  const title = document.querySelector("#title").value;
  const titleDisplay = document.querySelector(".movieTitle");
  titleDisplay.textContent = title.toLowerCase();
  titleDisplay.style.textAlign = "center";
  for (let i = 0; i < spans.length; i++) {
    spans[i].textContent = spans[i].querySelector("select").value;
  }
}

function displayCast(spans, objects) {
  const charList = [];
  document.querySelector(".templateForm").style.display = "none";
  const cast = document.querySelector(".cast");
  castList.style.display = "block";
  castList.style.fontFamily = "JediFont";
  for (let i = 0; i < spans.length; i++) {
    const name = spans[i].textContent;
    objects.forEach((object) => {
      if (name == object.name) {
        if (!charList.includes(object.name)) {
          charList.push(object.name);
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
        
      }
    });
  }
}

async function apiConnect(ext) {
  try {
    const response = await fetch(apiUrl + ext);
    if (response.ok) {
      return await response.json();
    } else {
      const error = await response.text();
      throw new Error(error);
    }
  } catch (err) {
    console.log(err);
  }
}

const planetDetails = await apiConnect(planetsPath);
const shipDetails = await apiConnect(shipsPath);
const planets = planetDetails.results;
const ships = shipDetails.results;

addSelectMenus(charMenu, res);
addSelectMenus(planetMenu, planets);
addSelectMenus(shipMenu, ships);
selectAffilMenu(affilMenu);

const submitButton = document.querySelector(".finish");
submitButton.addEventListener("click", () => {
  displayFinalStory(charMenu);
  displayFinalStory(planetMenu);
  displayFinalStory(shipMenu);
  displayFinalStory(affilMenu);
  //const final = document.querySelector(".template1");
  //console.log(final);
  submitButton.style.display = "none";
  displayCast(charMenu, res);
  const story = document.querySelector(".template")
  story.style.textTransform = "uppercase";
  //Title Crawl
  const crawl = document.querySelector(".crawl");
  const crawlContent = document.querySelector(".crawlContent");
  crawl.style.transform = "rotate3d(1, 0, 0, 45deg)";
  crawl.style.transformOrigin = "50% 100%";
  crawlContent.style.animation = "titlecrawl 60s linear infinite";
  story.style.height = "300px";
  story.style.fontSize = "2vw";
  story.style.color = "yellow";
  story.style.perspective= "calc(100vh * 0.6)";


});
