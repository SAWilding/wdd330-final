

export default async function fetchJson() {
  const json = "json/character.json";
  const response = await fetch(json);
  return await response.json();
}

  function displayName(characters) {

    console.log(characters.name);
    const section = document.createElement("section");
    const name = document.createElement("h3");
    const charImage = document.createElement("img");
    name.textContent = characters.name;
    name.style.textAlign = "center";
    charImage.setAttribute("src", characters.image);
    charImage.setAttribute("width", "200px");
    charImage.setAttribute("height", "200px");
    section.appendChild(charImage);
    section.appendChild(name);
    section.setAttribute("width", "200px");
    section.setAttribute("height", "400px");

    const char = document.querySelector(".characters");
    char.appendChild(section);

    section.addEventListener("click", ()=>{
      localStorage.setItem("Character Id", characters.id);
      location.href = "charInfo.html";
    })
  }

  const res = await fetchJson();

  res.forEach(displayName);