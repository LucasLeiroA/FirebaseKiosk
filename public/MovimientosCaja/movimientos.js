window.onload=principal;
var date = new Date();
var mes = date.getMonth();
var fecha = date.getDate();
var hora = date.getHours()

import { IngresarDatos , getItems , modificarItem} from "../firebase.js";
function principal(){

    document.getElementById("aceptar").addEventListener("click", aceptarTipo)
    document.getElementById("cancelar").addEventListener("click" , cancelar);
}

var TipoVenta;

document.getElementById("opcion").addEventListener("change" , ()=>{
     

    let tipo = document.getElementById("opcion").value;
    
    TipoVenta = tipo;

    if (tipo == "Efectivo") {
        document.getElementById("movimientos").innerHTML=`
        
        <select name="" id="selector">
        <option value="IngresoDinero">Ingreso Efectivo</option>
        <option value="SalidaDinero">Salida Efectivo</option>
        </select>  
        
        `
        
    }
    if (tipo == "Transferencia") {
        document.getElementById("movimientos").innerHTML=`

        <select name="" id="selector">
        <option value="IngresoTrasferencia">Ingreso Transferencia</option>
        <option value="SalidaTransferencia">Salida Transferencia</option>
        </select>  
        
        `
    }
})


async function aceptarTipo(){
    
    try {
    document.getElementById("cabezaTabla").innerHTML="";
    document.getElementById("tablaMuestra").innerHTML="";

   

    let opcion = document.getElementById("selector").value;
    
         if (TipoVenta == "Efectivo") {
                        if (opcion == "IngresoDinero") {
                                document.getElementById("salida1").style.background="#3b4652"
                                document.getElementById("salida1").innerHTML="";
                                document.getElementById("pieTabla").innerHTML="";
                                document.getElementById("salida1").innerHTML+=
                            `
                            <h3>Ingreso de Dinero Contado</h3>
                            <label for="">Monto</label>
                            <input type="number" id="ingreso1" name="age" pattern="[0-9]+" /> 
                            <label for="">Descipcion</label>
                            <textarea name="" id="areatext" cols="30" rows="3"></textarea>
                            <button id="confirmar">Confirmar</button>
                            `
                            document.getElementById("confirmar").addEventListener("click",IngresoDeDineroContado)
                            
                        }
                        if (opcion == "SalidaDinero") {

                            document.getElementById("salida1").style.background="#3b4652"
                            document.getElementById("salida1").innerHTML="";
                            document.getElementById("pieTabla").innerHTML="";
                            document.getElementById("salida1").innerHTML+=
                            `
                            <h3>Salida de Dinero Contado</h3>
                            <label for="">Monto:</label>
                            <input type="number" id="ingreso1" name="age" pattern="[0-9]+" /> 
                            <label for="">Descipcion:</label>
                            <textarea name="" id="areatext" cols="30" rows="3"></textarea>
                            <button id="confirmar1">Confirmar</button>

                            `

                            document.getElementById("confirmar1").addEventListener("click",salidaDeDineroContado)
                        } 
                }else if(TipoVenta == "Transferencia"){

                        if (opcion == "IngresoTrasferencia") {
                            document.getElementById("salida1").style.background="#3b4652"
                            document.getElementById("salida1").innerHTML="";
                            document.getElementById("pieTabla").innerHTML="";
                            document.getElementById("salida1").innerHTML+=
                        `
                        <h3>Ingreso de Dinero Trasnferencia</h3>
                        <label for="">Monto</label>
                        <input type="number" id="ingreso1" name="age" pattern="[0-9]+" /> 
                        <label for="">Descipcion</label>
                        <textarea name="" id="areatext" cols="30" rows="3"></textarea>
                        <button id="confirmar">Confirmar</button>
                        `
                        document.getElementById("confirmar").addEventListener("click",IngresoDeDineroTrasnferencia)
                        
                        }
                        if (opcion == "SalidaTransferencia") {

                            document.getElementById("salida1").style.background="#3b4652"
                            document.getElementById("salida1").innerHTML="";
                            document.getElementById("pieTabla").innerHTML="";
                            document.getElementById("salida1").innerHTML+=
                            `
                            <h3>Salida de Dinero Transferencia</h3>
                            <label for="">Monto:</label>
                            <input type="number" id="ingreso1" name="age" pattern="[0-9]+" /> 
                            <label for="">Descipcion:</label>
                            <textarea name="" id="areatext" cols="30" rows="3"></textarea>
                            <button id="confirmar1">Confirmar</button>

                            `

                            document.getElementById("confirmar1").addEventListener("click",salidaDeDineroTransferencia)
                        } 
            }

    





    } catch (err) {
        
      swal({
        title: err,
        icon: "error",
      });
    }


          
}   
async function IngresoDeDineroContado(){

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
        hora:hora,
        tipo:"1"

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
async function salidaDeDineroContado(){
    
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
        hora:hora,
        tipo:"1"
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
async function IngresoDeDineroTrasnferencia(){

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
        hora:hora,
        tipo:"3"

    })}else(
        
      swal({
        title: "Debe cargar ambos campos",
        icon: "error",
      })
    )

    let estado = await getItems("EstadoDeCaja");
    for (let item of estado) {

        if (item.id== "3") {
            total=item.VentasTrasferencias ;    
        }
    }

     final = total+parseInt(money);

    await modificarItem("EstadoDeCaja", "3" ,{
        VentasTrasferencias :final
    });

    swal({
        title: "Ingreso de dinero Correcto en Trasnferencia",
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
async function salidaDeDineroTransferencia(){
    
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
        hora:hora,
        tipo:"3"
        }
     
    )}else(
        swal({
            title: "Debe cargar ambos campos",
            icon: "error",
          })
      
    )

    let estado = await getItems("EstadoDeCaja");
    for (let item of estado) {

        if (item.id == "3") {
            total=item.VentasTrasferencias ;    
        }
    }
     final=total-parseInt(money);
    await modificarItem("EstadoDeCaja", "3" ,{
        VentasTrasferencias :final
    });

    swal({
        title: "Salida de dinero Correcto En Transferencia",
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



function cancelar(){
    location.reload(); 
}