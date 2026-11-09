const config = {
  ateliers: [
    { id: 1, titre: "Créer une affiche avec Figma", places: 8 },
    { id: 2, titre: "Découvrir les raccourcis VS Code", places: 0 },
    { id: 3, titre: "Construire un quiz en JavaScript", places: 5 },
    { id: 4, titre: "Créer une page responsive avec Tailwind CSS", places: 12 },
    { id: 6, titre: "Animer une interface avec CSS", places: 0 },
  ],
  modes: {
    presentiel: "En présentiel",
    distance: "À distance",
  },
  campus: ["Youssoufia", "Asfi", "Nador"],
};

const selectedConfig = {
  atelierId: null,
  mode: "",
  campus: "",
  email: "",
};

let atelier = document.getElementById("liste-ateliers")
let modes = document.getElementById("liste-modes")
let campus = document.getElementById("liste-campus")
let field = document.getElementById("champ-campus")
let email = document.getElementById("champ-email")
let recap = document.getElementById("recapitulatif-contenu")
let recapfin = document.getElementById("recapitulatif")
let form = document.getElementById("inscription-form")


displayatelier()
function displayatelier() {
  atelier.textContent = ""
  for (let i = 0; i < config.ateliers.length; i++) {
    if (config.ateliers[i].places > 0) {
      let label = document.createElement("label")
      let input = document.createElement("input")
      let span1 = document.createElement("span")
      let strong = document.createElement("strong")
      let span2 = document.createElement("span")

      label.classList.add("carte-choix")
      input.setAttribute("type", "radio")
      input.setAttribute("name", "atelier")
      input.setAttribute("value", "")
      input.setAttribute("required", "true")
      input.setAttribute("aria-describedby", "erreur-atelier")
      strong.classList.add("atelier-titre")
      span2.classList.add("atelier-places")
      span2.classList.add("detail")

      strong.textContent = config.ateliers[i].titre
      span2.textContent = config.ateliers[i].places

      input.addEventListener("change", () => {
        displaymodes()
        selectedConfig.atelierId = config.ateliers[i].id
      })

      span1.append(strong, span2)
      label.append(input, span1)
      atelier.append(label)
    }
  }
}

function displaymodes() {
  modes.textContent = ""
  let label = document.createElement("label")
  let input = document.createElement("input")
  let span = document.createElement("span")

  label.classList.add("carte-choix")
  input.setAttribute("type", "radio")
  input.setAttribute("name", "mode")
  input.setAttribute("value", "")
  input.setAttribute("required", "true")
  input.setAttribute("aria-describedby", "erreur-mode")
  span.classList.add("mode-libelle")

  span.textContent = "En présentiel"

  input.addEventListener("change",()=>{
    displaycampus()
    field.removeAttribute("hidden")
    field.removeAttribute("disabled")
    email.setAttribute("hidden","true")
    selectedConfig.mode = "En présentiel"
    selectedConfig.email = ""
  })

  label.append(input, span)
  modes.append(label)

  let label2 = document.createElement("label")
  let input2 = document.createElement("input")
  let span2 = document.createElement("span")

  label2.classList.add("carte-choix")
  input2.setAttribute("type", "radio")
  input2.setAttribute("name", "mode")
  input2.setAttribute("value", "")
  input2.setAttribute("required", "true")
  input2.setAttribute("aria-describedby", "erreur-mode")
  span2.classList.add("mode-libelle")

  span2.textContent = "À distance"

  input2.addEventListener("change",()=>{
    email.removeAttribute("hidden")
    campus.textContent = ""
    selectedConfig.mode = "À distance"
    selectedConfig.campus = ""
  })

  label2.append(input2, span2)
  modes.append(label2)
}

function displaycampus() {
  campus.textContent = ""
  for (let i = 0; i < config.campus.length; i++) {
    let label = document.createElement("label")
    let input = document.createElement("input")
    let span = document.createElement("span")

    label.classList.add("carte-choix")
    input.setAttribute("type", "radio")
    input.setAttribute("name", "campus")
    input.setAttribute("value", "")
    input.setAttribute("required", "true")
    input.setAttribute("aria-describedby", "erreur-campus")
    span.classList.add("campus-libelle")

    span.textContent = config.campus[i]

    input.addEventListener("change",()=>{
      selectedConfig.campus = config.campus[i]
    })

    label.append(input,span)
    campus.append(label)
  }
}

function displayconfig(){
  recap.textContent = ""
  let dl = document.createElement("dl")
  let div = document.createElement("div")
  let dt = document.createElement("dt")
  let dd = document.createElement("dd")
  let div2 = document.createElement("div")
  let dt2 = document.createElement("dt")
  let dd2 = document.createElement("dd")
  let div3 = document.createElement("div")
  let dt3 = document.createElement("dt")
  let dd3 = document.createElement("dd")

  dl.classList.add("recap-liste")
  dd.classList.add("recap-atelier")
  dd2.classList.add("recap-mode")
  dt3.classList.add("recap-detail-libelle")
  dd3.classList.add("recap-detail-valeur")

  dt.textContent = "Atelier"
  dt2.textContent = "Participation"
  dd.textContent = selectedConfig.atelierId
  dd2.textContent = selectedConfig.mode
  if(selectedConfig.campus != ""){
    dt3.textContent = "campus"
    dd3.textContent = selectedConfig.campus
  }else if(selectedConfig.email != ""){
    dt3.textContent = "email"
    dd3.textContent = selectedConfig.email
  }

  div.append(dt,dd)
  div2.append(dt2,dd2)
  div3.append(dt3,dd3)
  dl.append(div,div2,div3)
  recap.append(dl)
}
form.addEventListener("submit",(e)=>{
  e.preventDefault()
  displayconfig()
  recapfin.removeAttribute("hidden")
})