function subir(){
    discosDiv.innerHTML="";
    fetch("subir.html") 
      .then(response => {
        if (!response.ok) {
          throw new Error('La solicitud no fue exitosa');
        }
        return response.text(); // Convierte la respuesta a un objeto JSON
      })
      .then(respuesta => {
        discosDiv.innerHTML=respuesta;

        // subirCodigo();
        // cargarForm();
        Subir.ini();
        
      })
      .catch(error => {
        console.error('Ocurrió un error:', error);
      });



  }