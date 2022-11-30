import { fetchJson } from "./character";

const charSelect = document.querySelector("#characterSelect");

const res = await fetchJson();

function fillSelectMenu(objects) {

    objects.forEach(object => {
        const newOption = document.createElement("option");
        newOption.setAttribute("value", object.name);
        newOption.textContent = object.name;
        charSelect.appendChild(newOption);

    })
}

function connectToSwapi() {

}

fillSelectMenu(res);