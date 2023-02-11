 window.onload=principal;

import { getItems } from "../firebase.js";

function principal(){
    document.getElementById("btn_admin").addEventListener("click",ingresoAdmin)
}


let url = window.location.href;

localStorage.setItem("urlAdmin" , url);



 

async function ingresoAdmin(){

    const usuarios = await getItems("usuarios");


    let correo;
    let password;
    let nom_usuario;

    for (const item of usuarios) {
        if (item.id == "1") {
            correo = item.correo;
            password = item.password;
            nom_usuario = item.username;
        }
    }

    let input_usuario = document.getElementById("nombre_admin").value;
    let input_password = document.getElementById("contrasena_admin").value;

    if ((input_usuario == correo || input_usuario == nom_usuario)&& input_password == password) {
        
      swal({
        title: "Acceso Permitido!",
        icon: "success",
      });
         window.location="./RegistrarStock.html";
    }else{
        
      swal({
        title: "Usuario o Contraseña Incorrectos",
        icon: "error",
      })
      let input_usuario = document.getElementById("nombre_admin").value="";
    let input_password = document.getElementById("contrasena_admin").value="";
    }


}