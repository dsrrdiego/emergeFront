
"use strict";

let albumEnRocola;
// window.onload = (event) => {
  // window.addEventListener("popstate",(event)=>{
  //     let id=event.state.id;
  //     cargar(id);
  // });

  let menuItm = document.querySelectorAll('.menuItm');
  menuItm.forEach(a => a.addEventListener('click', (event) => cargarPagina(event.target.id)));


  // menu hamburguesa
  let botonMenu = document.querySelector("#botonMenu");
  botonMenu.addEventListener('click', menuClick);
  let menu = document.querySelector("#menu");
  let logo = document.querySelector(".logo");
  let ajaxDiv = document.querySelector("#ajaxDiv");

  function menuClick() {
    menu.classList.remove("ocultar");
    logo.classList.toggle("ocultar");
    botonMenu.classList.toggle("ocultar");
  }

  // crear la pestania correspondiente
  function cargarPagina(id) {
    loginDivOcultar(); 
    menu.classList.add("ocultar");
    botonMenu.classList.remove("ocultar");
    menuItm.forEach(a => a.classList.remove("activa")); 
    let item = document.querySelector("#" + id).classList.add("activa");
    
    window[id]();
  }

  let discosDiv = document.getElementById('discosDiv'); //o noticias dv

  
  
  // cargarPagina("artistas");
  // cargarPagina("contacto");
  cargarPagina("subir");

  // yaEstavaLogueado();