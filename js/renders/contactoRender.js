function contacto(){
    discosDiv.innerHTML="";
    fetch(direccionApi + "/contacto") //traer los albums.
      .then(response => {
        if (!response.ok) {
          throw new Error('La solicitud no fue exitosa');
        }
        return response.text(); // Convierte la respuesta a un objeto JSON
      })
      .then(respuesta => {
        discosDiv.innerHTML=respuesta;
      })
      .catch(error => {
        console.error('Ocurrió un error:', error);
      });


  }