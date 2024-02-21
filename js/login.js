function login() {


  document.querySelector('#entrarBtn').addEventListener('click', function (e) { solicitarAcceso(e, 'entrar') })
  document.querySelector('#registrarBtn').addEventListener('click', function (e) { solicitarAcceso(e, 'registrar') })
  document.querySelector('#cerrarBtn').addEventListener('click', function (e) { solicitarAcceso(e, 'cerrar') })

  console.log(document.querySelector('#login').innerHTML);
  if (document.querySelector('#login').innerHTML == 'LogIn') {

    document.querySelector('#loginForm').style.display = "block"
    document.querySelector('#cerrarBtn').style.display = "none"

  } else {
    console.log('ya esta log');

    document.querySelector('#loginForm').style.display = "none"
    document.querySelector('#cerrarBtn').style.display = "block"

  }
  let loginDiv = document.querySelector('#loginDiv');
  if (window.getComputedStyle(loginDiv).getPropertyValue("display") == 'none') loginDivMostrar();
  else loginDivOcultar();




}
function loginDivMostrar() {
  loginDiv.style.display = 'block';

}
function loginDivOcultar() {

  loginDiv.style.display = 'none';
}

function solicitarAcceso(e, ruta) {

  e.preventDefault();

  let form = document.getElementById('loginForm');
  var formData = new FormData(form);

  fetch("../" + ruta, {
    method: 'POST',
    body: formData

  })
    .then(response => response.text())
    .then(data => {
      if (data.trim() === "ok") {
        document.querySelector('#login').innerHTML = form.nombre.value;
        // document.querySelector('#discosDiv').removeChild(document.querySelector('#loginDiv'));
        loginDivOcultar();
      }
      else if (data.trim() === 'cerrado'){
        document.querySelector('#login').innerHTML = 'LogIn';
        loginDivOcultar();
      }
      else
        alert(data);
      // cargarPagina('artistas')
    })
    .catch(error => {
      console.error('Error:', error);
    });


};



function yaEstavaLogueado() {
  // fetch("../estaLogueado")
  //   .then(response => response.text())
  //   .then(data => {
  //     if (data.trim() != "null") document.querySelector('#login').innerHTML = data.trim();

  //     // }
  //     // else if (data.trim() === 'cerrado') document.querySelector('#login').innerHTML = 'LogIn';
  //     // else
  //     // alert(data);
  //     // cargarPagina('artistas')
  //     // console.log(data);

  //   })
  //   .catch(error => {
  //     console.error('Error:', error);
  //   });

}
