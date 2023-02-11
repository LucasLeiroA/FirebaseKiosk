window.onload=principal;
var date = new Date();
var mes = date.getMonth();
var fecha = date.getDate();
var hora = date.getHours()

import { IngresarDatos , getItems , modificarItem} from "../firebase.js";
function principal(){

    document.getElementById("aceptar").addEventListener("click", aceptarTipo)
}

async function aceptarTipo(){

    document.getElementById("cabezaTabla").innerHTML="";
    document.getElementById("tablaMuestra").innerHTML="";

    try {
        let TipoVenta=document.getElementById("selector").value;

        if (TipoVenta=="IngreDinero") {
            document.getElementById("salida1").style.background="#3b4652"
            document.getElementById("salida1").innerHTML="";
            document.getElementById("pieTabla").innerHTML="";
            document.getElementById("salida1").innerHTML+=
            `
            <h3>Ingreso de Dinero</h3>
            <label for="">Monto</label>
            <input type="number" id="ingreso1" name="age" pattern="[0-9]+" /> 
            <label for="">Descipcion</label>
            <textarea name="" id="areatext" cols="30" rows="3"></textarea>
            <button id="confirmar">Confirmar</button>
            `
            document.getElementById("confirmar").addEventListener("click",IngresoDeDinero)
            
        }
        if (TipoVenta=="SalidaDinero") {

            document.getElementById("salida1").style.background="#3b4652"
            document.getElementById("salida1").innerHTML="";
            document.getElementById("pieTabla").innerHTML="";
            document.getElementById("salida1").innerHTML+=
            `
            <h3>Salida de Dinero</h3>
            <label for="">Monto:</label>
            <input type="number" id="ingreso1" name="age" pattern="[0-9]+" /> 
            <label for="">Descipcion:</label>
            <textarea name="" id="areatext" cols="30" rows="3"></textarea>
            <button id="confirmar1">Confirmar</button>

            `

            document.getElementById("confirmar1").addEventListener("click",salidaDeDinero)
        }

    } catch (err) {
        
      swal({
        title: err,
        icon: "error",
      });
    }
          
}   
async function IngresoDeDinero(){

    let descripcion=document.getElementById("areatext").value;
    let money=document.getElementById("ingreso1").value;
    let total;
    let final;
try {
    if( descripcion != "" && money > 0){
        await IngresarDatos("ingresoDinero",{
        dinero:parseInt(money),
        descripcion:descripcion,
        mes:mes,
        fecha:fecha,
        hora:hora

    })}else(
        
      swal({
        title: "Debe cargar ambos campos",
        icon: "error",
      })
    )

    let estado = await getItems("EstadoDeCaja");
    for (let item of estado) {

        if (item.id== "1") {
            total=item.efectivo;    
        }
    }
     final = total+parseInt(money);

    await modificarItem("EstadoDeCaja", "1" ,{
        efectivo:final
    });

    swal({
        title: "Ingreso de dinero Correcto",
        icon: "success",
      })

   limpiar();
} catch (err) {
    swal({
        title: err,
        icon: "error",
      })
}

}
async function salidaDeDinero(){
    
    let descripcion = document.getElementById("areatext").value;
    let money = document.getElementById("ingreso1").value;
    let total;
    let final;

    try {
        if( descripcion != "" && money  > 0){
        await IngresarDatos("salidaDinero",{
        dinero:parseInt(money),
        descripcion:descripcion,
        mes:mes,
        fecha:fecha,
        hora:hora 
        }
     
    )}else(
        swal({
            title: "Debe cargar ambos campos",
            icon: "error",
          })
      
    )

    let estado = await getItems("EstadoDeCaja");
    for (let item of estado) {

        if (item.id == "1") {
            total=item.efectivo;    
        }
    }
     final=total-parseInt(money);
    await modificarItem("EstadoDeCaja", "1" ,{
        efectivo:final
    });

    swal({
        title: "Salida de dinero Correcto",
        icon: "success",
      })

    limpiar();
} catch (err) {
    swal({
        title: err,
        icon: "error",
      })
}
}

function limpiar(){
    document.getElementById("areatext").value = "";
    document.getElementById("ingreso1").value = "";
}