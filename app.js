const botonTema = document.querySelector(".theme-btn")
const texto1 = document.querySelector(".text1")
const mensajeError = document.querySelector(".error")
const botonEncriptar = document.querySelector(".btn-encriptar")
const botonDesencriptar = document.querySelector(".btn-desencriptar")
const mensajes = document.querySelector(".messages")

const contenedor = document.createElement("div")
const textArea = document.createElement("textarea")
const botonCopiar = document.createElement("button")

let moon = "🌙"
let sun = "☀️"


const lightMode = () => {

  document.body.classList.remove("dark")
  document.body.classList.add("light")

  botonTema.textContent = moon

  localStorage.setItem("theme", "light")
  
}


const darkMode = () => {

  document.body.classList.remove("light")
  document.body.classList.add("dark")

  botonTema.textContent = sun

  localStorage.setItem("theme", "dark")
  
}


document.addEventListener("click", e => {

  if (e.target.matches(".theme-btn")) {

    if (botonTema.textContent === moon) {

      darkMode()

    } else {

      lightMode()

    }
  }
})


document.addEventListener("DOMContentLoaded", () => {
  
  if (localStorage.getItem("theme") === null) {
    localStorage.setItem("theme", "light")
  }

  if (localStorage.getItem("theme") === "light") {
    lightMode()
  }

  if (localStorage.getItem("theme") === "dark") {
    darkMode()
  }
  
})


texto1.addEventListener("keyup", e => {
  
  let expReg = /^[a-zñ\s.,]*$/

  if (!expReg.test(e.target.value)) {

    document.querySelector(".exclamation").classList.add("exclamation-invalid")
    document.querySelector(".information").classList.add("information-invalid")

    botonEncriptar.setAttribute("disabled", "")
    botonDesencriptar.setAttribute("disabled", "")
    
  } else {

    document.querySelector(".exclamation").classList.remove("exclamation-invalid")
    document.querySelector(".information").classList.remove("information-invalid")

    botonEncriptar.removeAttribute("disabled")
    botonDesencriptar.removeAttribute("disabled")
    
  }
  
})


texto1.addEventListener("input", () => {

  if (texto1.validity.valid) {

    mensajeError.textContent = ""
    mensajeError.classList.remove("activo")


  } else {

    showError()

  }
  
})


function showError() {

  if (texto1.validity.valueMissing) {

    texto1.focus()

    mensajeError.classList.add("activo")
    mensajeError.textContent = "Debe introducir texto para poder encriptarlo o desencriptarlo"

    setTimeout(() => {

      mensajeError.textContent = ""
      mensajeError.classList.remove("activo")

    }, 3000)
    
  } else if (texto1.validity.tooShort) {

    texto1.focus()

    mensajeError.classList.add("activo")
    mensajeError.textContent = `El texto debe tener al menos ${texto1.minLength} caracteres; Ha introducido ${texto1.value.length}.`

  }
  
}


botonEncriptar.addEventListener("click", () => {

  if (!texto1.validity.valid) {

    showError()

  } else {

    let textoOriginal = texto1.value
    
    let textoEncriptado = textoOriginal.replace(/e/g, "enter").replace(/i/g, "imes").replace(/a/g, "ai").replace(/o/g, "ober").replace(/u/g, "ufat")
    
    // let textoEncriptado = textoOriginal.replaceAll("e", "enter").replaceAll("i", "imes").replaceAll("a", "ai").replaceAll("o", "ober").replaceAll("u", "ufat")
    
    textArea.classList.add("text2")
    textArea.setAttribute("readonly", true)
    textArea.value = textoEncriptado
    
    botonCopiar.classList.add("btn-copiar")
    botonCopiar.textContent = "Copiar"
    
    contenedor.classList.add("encryption-message")
    contenedor.appendChild(textArea)
    contenedor.appendChild(botonCopiar)
    
    mensajes.replaceChildren(contenedor)

    texto1.value = ""
  }

})


botonDesencriptar.addEventListener("click", () => {

  if (!texto1.validity.valid) {

    showError()

  } else { 

    
    let textoEncriptado = texto1.value
    
    let textoDesencriptado = textoEncriptado.replace(/enter/g, "e").replace(/imes/g, "i").replace(/ai/g, "a").replace(/ober/g, "o").replace(/ufat/g, "u")
    
    textArea.classList.add("text2")
    textArea.setAttribute("readonly", true)
    textArea.value = textoDesencriptado
    
    botonCopiar.classList.add("btn-copiar")
    botonCopiar.textContent = "Copiar"
    
    contenedor.classList.add("encryption-message")
    contenedor.appendChild(textArea)
    contenedor.appendChild(botonCopiar)
    
    mensajes.replaceChildren(contenedor)

    texto1.value = ""

  }

})


botonCopiar.addEventListener("click", () => {
  
  textArea.select()

  navigator.clipboard.writeText(textArea.value)

})


// Desencripta nuestro mensaje secreto!

// fenterlimescimesdaidenters poberr enternfrenterntair enterstenter dentersaifimesober y haibenterrlober cobernclufatimesdober cobern enterximestober!
