import { fetchJson } from "./character";
import DataService from "./dataService";

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

function displayCast(spans, objects, list) {
  document.querySelector(".templateForm").style.display = "none";
  const cast = document.querySelector(".cast");
  castList.style.display = "block";
  castList.style.fontFamily = "JediFont";
  for (let i = 0; i < spans.length; i++) {
    const name = spans[i].textContent;
    objects.forEach((object) => {
      if (name == object.name) {
        if (!list.includes(object.name)) {
          list.push(object.name);
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

const dataService = new DataService("userData");

var canSaveData = false;
const userId = sessionStorage.getItem("user");

if (userId !== null) {
  canSaveData = true;
  console.log("The user can save data");
}

export function createCrawl() {
  const story = document.querySelector(".template");

  story.style.textTransform = "uppercase";
  const crawl = document.querySelector(".crawl");
  const crawlContent = document.querySelector(".crawlContent");
  crawl.style.transform = "rotate3d(1, 0, 0, 45deg)";
  crawl.style.transformOrigin = "50% 100%";
  crawlContent.style.animation = "titlecrawl 60s linear infinite";
  story.style.height = "300px";
  story.style.fontSize = "2vw";
  story.style.color = "yellow";
  story.style.perspective = "calc(100vh * 0.6)";
}

function addPronouns(objects) {
  objects.forEach(object => {
    if (document.querySelector("#char1").textContent == object.name) {
      if (object.gender == "male") {
      document.querySelector("#pn1").textContent = "his";
      document.querySelector("#pn2").textContent = "his";
      document.querySelector("#pn3").textContent = "he";
      document.querySelector("#pn4").textContent = "him";
      document.querySelector("#pn5").textContent = "he";
      
      }
      else {
        document.querySelector("#pn1").textContent = "her";
        document.querySelector("#pn2").textContent = "her";
        document.querySelector("#pn3").textContent = "she";
        document.querySelector("#pn4").textContent = "her";
        document.querySelector("#pn5").textContent = "she";
      }
    }
    if (document.querySelector("#char2").textContent == object.name) {
      if (object.gender == "male") {
        document.querySelector("#pn6").textContent = "he";
        document.querySelector("#pn7").textContent = "his";
      }
      else {
        document.querySelector("#pn6").textContent = "she";
        document.querySelector("#pn7").textContent = "her";
      }
    }
    if (document.querySelector("#char3").textContent == object.name) {
      if (object.gender == "male") {
        document.querySelector("#pn8").textContent = "his";
        document.querySelector("#pn9").textContent = "he";
        document.querySelector("#pn10").textContent = "he";
      }
      else {
        document.querySelector("#pn8").textContent = "her";
        document.querySelector("#pn9").textContent = "she";
        document.querySelector("#pn10").textContent = "she";
      }
    }
  })

}

const swAudio = document.querySelector("#SWTheme");
const submitButton = document.querySelector(".finish");
submitButton.addEventListener("click", () => {
  swAudio.play();
  const charList = [];
  const ending = document.querySelector("#option").value;
  const finalOption = document.querySelector("#finalOption");
  finalOption.textContent = ending;
  displayFinalStory(charMenu);
  displayFinalStory(planetMenu);
  displayFinalStory(shipMenu);
  displayFinalStory(affilMenu);
  submitButton.style.display = "none";
  displayCast(charMenu, res, charList);
  addPronouns(res);
  const storyText = document.querySelector(".template1").textContent;
  const storyTitle = document.querySelector("#title").value;
  const plot1 = document.querySelector(".plot1").textContent;
  const plot2 = document.querySelector(".plot2").textContent;
  const plot3 = document.querySelector(".plot3").textContent;

  console.log(storyTitle);

  if (canSaveData) {
    const saveData = {
      user: userId,
      title: storyTitle,
      story: storyText,
      cast: charList,
      par1: plot1,
      par2: plot2,
      par3: plot3,
    };
    dataService.postData(saveData);
  }
  //Title Crawl
  createCrawl();
});

const signInId = sessionStorage.getItem("user");

if (signInId) {
  const galleryPage = document.querySelector("#sign-up");
  galleryPage.textContent = "Gallery";
  galleryPage.setAttribute("href", "userGallery.html");
}
