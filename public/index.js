window.onload = principal;

import {getItems} from "./firebase.js"


function principal() {
  document
    .getElementById("btn_incio")
    .addEventListener("click", loginFormulario);
}



let url = window.location.href;

localStorage.setItem("urlInicio", url);

async function loginFormulario() {
  
  const usuarios = await getItems("usuarios");

  //constantes donde se guardos los datos del usuario

  let correo;
  let password;
  let nom_usuario;


  for (const item of usuarios) {
    if(item.id == "2"){
      correo = item.correo;
      password = item.password;
      nom_usuario = item.username;
    }
  }


  let usuario = document.getElementById("input_usuario").value;
  let contrasena = document.getElementById("input_contrasena").value;

  try {
    if ((usuario == correo || usuario == nom_usuario) && contrasena == password) {

      


      swal({
        title: "Acceso Permitido!",
        icon: "success",
      });

        
         window.location="./PantallaInicial/principal.html"




    } else {
      swal({
        title: "Usuario o Contraseña Incorrectos!",
        icon: "error",
      });
      let usuario = document.getElementById("input_usuario").value="";
      let contrasena = document.getElementById("input_contrasena").value="";
    }
  } catch (err) {
    alert(err);
  }
}



