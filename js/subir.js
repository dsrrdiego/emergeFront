class Subir {
    mapeoAlbumId = [];
    imagen;
    fechaInput;
    artistaInput;
    albumSelect;
    artistaSelect;
    descripcion;
    tabla;
    cancionesInput;
    imagenURL;
    static instancia;
    static ini() {//singleton
        if (this.instancia == null) {
            this.instancia = new Subir();
        }
        else {
            this.instancia.construir();
        }
    }
    constructor() { this.construir(); }
    construir() {
        let mapeoAlbumId = [];

        this.imagen = document.querySelector('#imagen');
        this.fechaInput = document.querySelector('#fechaInput');
        this.descripcion = document.querySelector('#descripcion');
        this.artistaInput = document.querySelector('#artistaInput');
        this.albumSelect = document.querySelector('#albumSelect')
        this.artistaSelect = document.querySelector('#artista')
        this.tabla = document.querySelector('#tabla')
        this.cancionesInput = document.querySelector('#canciones')


        // input file
        let imgInput = document.createElement('input');
        imgInput.type = 'file';
        imgInput.accept = 'image/*';
        imgInput.addEventListener('input', () => {

            const URLIm = URL.createObjectURL(imgInput.files[0]);
            this.imagenURL = imgInput.files[0];
            this.imagen.style.backgroundImage = 'url(' + URLIm + ')'


        })

        // click al boton subir
        let botonSubir= document.querySelector('#btnSubir')
        botonSubir.addEventListener('click', (event) => {
            event.preventDefault();
            let form = document.getElementById('subirForm');
            let inputs = form.querySelectorAll('input');
            let valido = true;
            inputs.forEach(inp => {
                if (inp.value === '') {
                    valido = false;
                    console.log('falta llenar este campo: ' + inp);
                }

                // console.log(inp.value);

            })
            if (valido) {
                let filesTag = document.querySelector('#canciones');
                const files = filesTag.files;

                let form = new FormData();
                for (let i = 0; i < files.length; i++) {
                    form.append('files', files[i]);
                }
                // this.imagenURL= (typeof this.imagenURL !== 'undefined')? this.imagenURL : null;
                console.log(this.imagenURL);
                form.append('img', this.imagenURL);

                console.log(form);
                // alert("acordarse de descomentar abajo")
                let miUri =
                    encodeURIComponent(inputs[0].value) + "/" +
                    encodeURIComponent(inputs[1].value) + "/" +
                    encodeURIComponent(inputs[2].value) + "/" +
                    encodeURIComponent(inputs[3].value);
                console.log(miUri);

                fetch(direccionApi + "/subir/" + miUri, {
                    method: 'POST',
                    mode: 'no-cors',
                    body: form,

                })
                    .then(response => response.text())
                    .then(data => {
                        console.log(data);

                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
            } else {
                alert("faltan llenar campos");
            }
        })

        // cuando cambia el input artista
        this.artistaSelect.addEventListener('input', function () {
            fetch(direccionApi + "/albumXArtista/" + this.value)
                .then(response => response.json())
                .then(data => {
                    let i = 0;
                    data.forEach(album => {
                        let option = document.createElement('option');
                        option.innerHTML = album.titulo;
                        albumSelect.appendChild(option);
                        fechaInput.value = album.fecha;
                        i++;

                        // mapeoAlbumId[album.titulo] = i;
                        mapeoAlbumId[album.titulo] = album.id;

                    });
                })
                .catch(error => {
                    console.error('Error:', error);
                });
            // console.log(this.value);


            if (this.value == 'Nuevo') {
                artistaInput.style.display = "block";
            } else {
                artistaInput.style.display = "none";
                artistaInput.value = this.value;
            }
            // console.log(this.value);

        });

        // cuando cambia el Input Album
        this.albumSelect.addEventListener('input', () => {
            if (this.albumSelect.value == 'Nuevo') {
                albumInput.style.display = "block";
                botonSubir.style.display="block";
                this.imagen.setAttribute("style", "background-image: ");
                this.cargarAlbum();

            } else {
                botonSubir.style.display="none";
                albumInput.style.display = "none";
                albumInput.value = this.value;
                console.log(albumInput.innerHTML);

                this.cargarAlbum(mapeoAlbumId[this.albumSelect.value]);
                // this.cargarAlbum(this.albumSelect.value);
            }
        })

        //boton Elegir archivos
        this.cancionesInput.addEventListener('input', () => {

            let canciones = [];


            let archivo = this.cancionesInput.files;
            for (let x = 0; x < archivo.length; x++) {
                let cancion = {};
                cancion.titulo = archivo[x].name.split(".")[0];
                // cancion.direccion = archivo[x].name
                canciones.push(cancion);
            }
            console.log(canciones);

            this.crearTabla(canciones);
        })

        //imagen clik
        this.imagen.addEventListener('click', () => {


            imgInput.click();

        })

        this.cargarForm();

    }

    cargarForm() {
        fetch(direccionApi + "/artista")
            .then(response => response.json())
            .then(data => {

                data.forEach(art => {
                    let option = document.createElement('option');
                    option.innerHTML = art.nombre;
                    this.artistaSelect.appendChild(option);

                });

            })
            .catch(error => {
                console.error('Estas logueado?:');
                cargarPagina('login');
            });

    }




    cargarAlbum(albumId) {
        console.log(albumId);
        fetch(direccionApi + '/dameAlbumXId/' + albumId)
            .then(respuesta => { return respuesta.json() })
            .then(respuesta => {
                let src = encodeURIComponent(respuesta.artista.nombre) + "/" +
                    encodeURIComponent(respuesta.titulo) + "/" +
                    encodeURIComponent(respuesta.img);
                // console.log(respuesta);
                // console.log(src);

                this.imagen.setAttribute("style", "background-image: " +
                    "url(" + direccionApi + "/dameImagen/" + src + ")");
                this.imagenURL= direccionApi + "/dameImagen/" + src;
                // fetch(direccionApi+"/dameImagen/"+src)
                //     .then(response => response.blob())
                //     .then(blob => {
                //         // Crear una URL de objeto para el objeto Blob
                //         const imageUrlObject = URL.createObjectURL(blob);

                //         // Asignar la URL de objeto al elemento input
                //         // const inputElement = document.getElementById('fileInput');
                //         this.imgInput.src= imageUrlObject;
                //     })
                //     .catch(error => console.error('Error al cargar la imagen:', error));



                this.fechaInput.innerHTML = respuesta.fecha;
                this.descripcion.value = respuesta.descripcion;


            })
        fetch(direccionApi + '/canciones/' + albumId)
            .then(response => {
                return response.json();
            })
            .then(respuesta => {
                // canciones = respuesta;
                console.log(respuesta);
                this.crearTabla(respuesta);

                // albumEnRocola = albumId;
                // cargarRocola(1, false);
                // if (!refresh) temaNro = 0;
                // discoSonando = idAlbum;
                // item = [];
                // listaDeReproduccion.innerHTML = "";


                // artista.innerHTML = albumEnRocola.artista;
                // for (let x = 0; x < canciones.length; x++) {
                //     item[x] = document.createElement("li");
                //     item[x].addEventListener("click", () => clickTema(x));
                //     item[x].innerText = canciones[x].nombre;
                //     listaDeReproduccion.append(item[x]);
                // }
                // if (!refresh) clickTema(0);
                // item[temaNro].classList.add("cancionClick");
                // if (refresh) play();
                // window.scrollTo(0, 0);
            });
    }
    crearTabla(canciones) {
        //crear encabezado y borrar
        this.tabla.innerHTML = "";
        let filaTitulos = document.createElement('th');
        let tit1 = document.createElement('td');
        // let tit2 = document.createElement('td');
        tit1.innerHTML = "Nombre";
        // tit2.innerHTML = "Archivo";
        filaTitulos.appendChild(tit1);
        // filaTitulos.appendChild(tit2);
        tabla.appendChild(filaTitulos);
        //


        canciones.forEach(c => {
            let fila = document.createElement('tr');
            let td1 = document.createElement('td');
            // let td2 = document.createElement('td');
            td1.innerHTML = c.titulo;
            // td2.innerHTML = c.direccion;
            fila.appendChild(td1);
            // fila.appendChild(td2);
            this.tabla.appendChild(fila);


        })
    }
}