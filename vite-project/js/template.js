import { fetchJson } from "./character";

const charSelect = document.querySelector("#characterSelect");
const planetSelect = document.querySelector("#planetSelect");
const shipSelect = document.querySelector("#starshipSelect");
const apiUrl = "https://swapi.py4e.com/api/";

//Json src
const res = await fetchJson();
//API extensions
const planetsPath = "planets";
const shipsPath = "starships";

function fillSelectMenu(objects, select) {

    objects.forEach(object => {
        const newOption = document.createElement("option");
        newOption.setAttribute("value", object.name);
        newOption.textContent = object.name;
        select.appendChild(newOption);

    })
}

async function apiConnect(ext) {
    try {
        const response = await fetch(apiUrl + ext);
        if(response.ok){
            return await response.json();
        }
        else {
            const error = await response.text()
            throw new Error(error);
        }
    }
    catch (err){
        console.log(err);
    }
}

const planetDetails = await apiConnect(planetsPath);
const shipDetails = await apiConnect(shipsPath);
const planets = planetDetails.results;
const ships = shipDetails.results;



fillSelectMenu(res, charSelect);
fillSelectMenu(planets, planetSelect);
fillSelectMenu(ships, shipSelect);