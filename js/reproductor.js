"use strict";

    let discoSonando = 0;
    let sonando = false;
    let temaNro = 0;
    let item = []; //lista html
    let canciones = [];
    let audioTag;
    // function reproductor(idAlbum, card) {
    let barra = document.querySelector("#barraTexto");

    // cargar elementos visuales del reproductor
    let TapaDisco = document.querySelector("#tapa");
    TapaDisco.addEventListener('click', botonPlay);
    let artista = document.querySelector("#artista");
    
    let titulo = document.querySelector("#titulo");
    let listaDeReproduccion = document.querySelector("#listaDeReproduccion");



    //de acuerdo al seleccionado cargo todos los temas en el reproductor y en la pagina
    // let inicializado = false;

    function cargarRocola(idAlbum, refresh) {
        fetch(direccionApi + '/canciones/' + idAlbum)
            .then(response => {
                return response.json();
            })
            .then(respuesta => {

                canciones = respuesta;

                if (!refresh) temaNro = 0;
                discoSonando = idAlbum;
                item = [];
                listaDeReproduccion.innerHTML = "";
                let tapaSrc= encodeURIComponent(albumEnRocola.artista)+"/"+
                    encodeURIComponent(albumEnRocola.titulo)+"/"+
                    encodeURIComponent(albumEnRocola.img);
                TapaDisco.setAttribute("style", "background-image: " +
                    "url(" + direccionApi + "/dameImagen/" + tapaSrc+ ")");


                artista.innerHTML = albumEnRocola.artista;
                for (let x = 0; x < canciones.length; x++) {
                    item[x] = document.createElement("li");
                    item[x].addEventListener("click", () => clickTema(x));
                    item[x].innerText = canciones[x].titulo;
                    listaDeReproduccion.append(item[x]);
                }
                if (!refresh) clickTema(0);
                item[temaNro].classList.add("cancionClick");
                if (refresh) play();
                window.scrollTo(0, 0);
            });
    }

    ////REPRODUCTOR


    let btnPlay = document.querySelector("#btnPlay");
    let btnVolMas = document.querySelector("#btnVolMas");
    let btnVolMenos = document.querySelector("#btnVolMenos");
    let btnNext = document.querySelector("#btnNext");
    let vol = document.querySelector("#vol");

    btnPlay.addEventListener('click', botonPlay);
    btnVolMas.addEventListener('click', () => Volumen(0.1));
    btnVolMenos.addEventListener('click', () => Volumen(-0.1));
    btnNext.addEventListener('click', () => next(1));
    btnPrev.addEventListener('click', () => next(-1));


    Volumen(0);


    //pasar de tema
    function next(n) {

        temaNro = parseInt(temaNro) + parseInt(n);
        if (temaNro == canciones.length) temaNro = 0;
        if (temaNro == -1) { temaNro = canciones.length - 1 };
        seleccionarTema(temaNro);
        siEstabaSonandoQueSigaSonando();
    }

    function siEstabaSonandoQueSigaSonando() {
        if (btnPlay.innerHTML == "Pausa") audioTag.play();
    }

    //borra el estilo de la lista
    function borrarMarcado() {
        for (let c of item) {
            c.classList.remove("cancionClick");
        }
    }

    function clickTema(t) {
        seleccionarTema(t);
        siEstabaSonandoQueSigaSonando();
    }

    function seleccionarTema(t) {

        let tit = albumEnRocola.artista + " | " + canciones[t].titulo;
        titulo.innerHTML = tit;
        if (audioTag) {
            audioTag.pause();
            audioTag.remove();
        }
        audioTag = document.createElement('audio');
        let audioSrc=encodeURIComponent(albumEnRocola.artista)+"/"+
            encodeURIComponent(albumEnRocola.titulo)+"/"+
            encodeURIComponent(canciones[t].titulo);
        

        audioTag.src = direccionApi + "/dameCancion/"+audioSrc;
       
        audioTag.addEventListener('ended', () => next(1));

        borrarMarcado();
        item[t].classList.add("cancionClick");
        temaNro = t;
        barra.innerHTML = albumEnRocola.artista + " | " + tit;
    }

    function play() {
        audioTag.play();
        btnPlay.innerHTML = "Pausa";
        titulo.classList.add("cancionAnimacion");
        TapaDisco.classList.add("tapaAnimacion");
        sonando = true;
    }

    function botonPlay() {
        let textBoton = btnPlay.innerHTML;
        if (!sonando) {
            play();
        } else {
            audioTag.pause();
            btnPlay.innerHTML = "Play";
            TapaDisco.classList.remove("tapaAnimacion");
            titulo.classList.remove("cancionAnimacion");
            sonando = false;
        }

    }




    function Volumen(v) {
        if (audioTag){
        let ex = audioTag.volume + v;
        if (ex <= 1 && ex >= 0) audioTag.volume = ex;
        vol.innerHTML = "Vol " + Math.trunc(audioTag.volume * 10);
        }
    }