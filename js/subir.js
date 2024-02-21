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
    // mapeoAlbumId;
    static instancia;
    static ini() {
        if (this.instancia == null) {
            this.instancia = new Subir();

        }
        else {
            console.log('noes null');
            // console.log(this.instancia.imagen);
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

        document.querySelector('#btnSubir').addEventListener('click', function (event) {
            event.preventDefault();

            

            let form = document.getElementById('subirForm');
            let inputs=form.querySelectorAll('input');
            let valido=true;
            inputs.forEach(inp =>{
                if (inp.value==='') {
                    valido=false;
                    console.log('falta llenar este campo: '+inp);
                }
                    
                // console.log(inp.value);
                
            })
            if (valido){
            
            var formData = new FormData(form);
            // console.log(formData);
            alert("acordarse de descomentar abajo")
            
            // fetch("../vaDisco", {
            //     method: 'POST',
            //     body: formData

            // })
            //     .then(response => response.text())
            //     .then(data => {
            //         console.log(data);

            //     })
            //     .catch(error => {
            //         console.error('Error:', error);
            //     });
            }else{
                alert("faltan llenar campos");
            }
        })

        this.artistaSelect.addEventListener('input', function () {
            fetch("../dameAlbumes/" + this.value)
                .then(response => response.json())
                .then(data => {
                    let i = 0;
                    data.forEach(album => {
                        let option = document.createElement('option');
                        option.innerHTML = album.titulo;
                        albumSelect.appendChild(option);
                        fechaInput.value = album.fecha;
                        i++;

                        mapeoAlbumId[album.titulo] = i;

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

        this.albumSelect.addEventListener('input', () => {
            if (this.albumSelect.value == 'Nuevo') {
                albumInput.style.display = "block";
            } else {
                albumInput.style.display = "none";
                albumInput.value = this.value;
                this.cargarAlbum(mapeoAlbumId[this.albumSelect.value]);
            }
        })

        this.cancionesInput.addEventListener('input',()=>{
            
            let canciones=[];
            let archivo=this.cancionesInput.files;
            for (let x=0;x<archivo.length;x++){
                let cancion={};
                cancion.nombre=archivo[x].name.split(".")[0];
                cancion.direccion=archivo[x].name
                canciones.push(cancion);
            }
            
            this.crearTabla(canciones);
        })

        this.imagen.addEventListener('click',()=>{
            let fila=document.createElement('input');
            fila.type='file';
            fila.accept = 'image/*';
            console.log('entro');
            fila.addEventListener('input', ()=>{
                // console.log(fila.files[0].name);
                // const cargarla=new FileReader();
                // cargarla.onload=()=>{
                //     const ima=new Image();
                //     ima.src=fila.files[0];
                //     imagen.ndChild(ima);
                // }
                const URLIm=URL.createObjectURL(fila.files[0]);
                this.imagen.style.backgroundImage='url('+URLIm+')'

            })
            fila.click();
            
        })

        this.cargarForm();
        
    }

    cargarForm() {
        fetch("../dameArtistas")
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




    cargarAlbum(idAlbum) {
        console.log(idAlbum);
        fetch(direccionApi + 'dameAlbum/' + idAlbum)
            .then(respuesta => { return respuesta.json() })
            .then(respuesta => {
                this.imagen.setAttribute("style", "background-image: " +
                    "url(" + direccionApi + "API/images/discos/" + respuesta.img + ")");
                this.fechaInput.innerHTML = respuesta.fecha;
                this.descripcion.value = respuesta.descripcion;


            })
        fetch(direccionApi + 'canciones/' + idAlbum)
            .then(response => {
                return response.json();
            })
            .then(respuesta => {
                // canciones = respuesta;
                console.log(respuesta);
                this.crearTabla(respuesta);
                
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
    crearTabla(canciones){
        //crear encabezado y borrar
        this.tabla.innerHTML="";
        let filaTitulos=document.createElement('th');
        let tit1=document.createElement('td');
        let tit2=document.createElement('td');
        tit1.innerHTML="Nombre";
        tit2.innerHTML="Archivo";
        filaTitulos.appendChild(tit1);
        filaTitulos.appendChild(tit2);
        tabla.appendChild(filaTitulos);
        //


        canciones.forEach(c=>{
            let fila=document.createElement('tr');
            let td1=document.createElement('td');
            let td2=document.createElement('td');
            td1.innerHTML=c.nombre;
            td2.innerHTML=c.direccion;
            fila.appendChild(td1);
            fila.appendChild(td2);
            this.tabla.appendChild(fila);


        })
    }
}