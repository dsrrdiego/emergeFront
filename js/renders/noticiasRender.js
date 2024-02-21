function noticias(){
    discosDiv.innerHTML="";
    fetch(direccionApi + "/noticias") //traer los albums.
      .then(response => {
        if (!response.ok) {
          throw new Error('La solicitud no fue exitosa');
        }
        return response.json(); // Convierte la respuesta a un objeto JSON
      })
      .then(noticias => {
        // discosDiv.appendChild(document.createElement('input:search'));

        let btnNotica=[];
        for (let i = 0; i < noticias.length; i++) {
          let noticia = noticias[i];

          let card = document.createElement('article');
          let string = "";
          string += '<img src=' + direccionApi + 'API/images/noticias/' + noticia.imagen + ' alt="' + noticia.titulo + '"></img>';
          string += "<div>";
          string += '<h2>' + noticia.titulo + '</h2>';
          string += '<h4><time>' + noticia.fecha + '</time></h4>';
          string += '<p> ' + noticia.noticia + 'sss '+noticia.album+'</p>';
          if (noticia.cancion) {
            btnNotica[i]=document.createElement('button');
            btnNotica[i].innerHTML+="Ir a Escuhar!!";
            btnNotica[i].addEventListener('click',function (){
              console.log('hola');
              
              // cargarRocola(3,true);
            })
            string+=btnNotica[i].outerHTML;
          }
          string+="</div>";

          // card.id = i;
          card.classList.add('noticia');
          card.innerHTML += string;
          discosDiv.appendChild(card);
        }
      })
      .catch(error => {
        console.error('Ocurrió un error:', error);
      });

  }