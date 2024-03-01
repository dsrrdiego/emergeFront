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
        document.querySelector('#btnSubir').addEventListener('click', (event) => {
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