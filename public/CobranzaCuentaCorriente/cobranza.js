window.onload=principal;

import { getItems, IngresarDatos, modificarItem } from "../firebase.js";

function principal(){
    document.getElementById("btnpagar").addEventListener("click", pagaoDeuda)
    document.getElementById("btn-buscador").addEventListener("click",filtroCliente)
}
var var_id;

const cuerpoTabla = document.getElementById("cuerpoTabla");

window.addEventListener("DOMContentLoaded",async (e) => {
    document.getElementById("cuerpoTabla").innerHTML="";
   let cuentaCorriente = await getItems("cuentaCorriente");
   let cliente=await getItems("clientes");

   for (let item2 of cuentaCorriente) {
       for (let item of cliente) {
            if (item2.clientesId==item.id && item2.deuda > 0) {
            document.getElementById("cuerpoTabla").innerHTML+=
            `
            <td><button id="btn-seleccionar" class="btn btn-outline-dark" data-id="${item.id}"">${item.nomYape}</button></td><br>
            `
          }
   }
   }

   const btnsSeleccionar =
   cuerpoTabla.querySelectorAll("#btn-seleccionar");
 btnsSeleccionar.forEach((btn) =>
   btn.addEventListener("click", async (e) => {
     try {
       let id = e.target.dataset.id;

       var_id=id;

       let cli=await getItems("clientes");
       let cc=await getItems("cuentaCorriente");
       let deuda;
   
       for (let item of cc) {
           if (item.clientesId==var_id) {
           deuda=parseInt(item.deuda)       
           }
       }
   
       for (let item of cli) {
           if (item.id==var_id) {
               document.getElementById("inpu").value=item.nomYape;
               document.getElementById("inpu1").value=item.dni;
               document.getElementById("inpu2").value=item.direccion;
               document.getElementById("inpu3").value=deuda ;
           }
       }
   
     } catch (error) {
       console.log(error);
     }
   })
 );

  
 } )

async function filtroCliente(){
    document.getElementById("cuerpoTabla").innerHTML="";
   let cuentaCorriente = await getItems("cuentaCorriente");
   let cliente=await getItems("clientes");

    let nombreSolicitado = document.getElementById("input-buscador").value;
    let texto = nombreSolicitado.toLowerCase();
    let nombre;



   for (let item2 of cuentaCorriente) {
       for (let item of cliente) {
        nombre = item.nomYape.toLowerCase();
        if (nombre.indexOf(texto) != -1) {
            
            if (item2.clientesId==item.id && item2.deuda > 0) {
            document.getElementById("cuerpoTabla").innerHTML+=
            `
            <td><button id="btn-seleccionar" class="btn btn-outline-dark" data-id="${item.id}"">${item.nomYape}</button></td><br>
            `
          }
        }
   }
   }

   const btnsSeleccionar =
   cuerpoTabla.querySelectorAll("#btn-seleccionar");
 btnsSeleccionar.forEach((btn) =>
   btn.addEventListener("click", async (e) => {
     try {
       let id = e.target.dataset.id;

       var_id=id;

       let cli=await getItems("clientes");
       let cc=await getItems("cuentaCorriente");
       let deuda;
   
       for (let item of cc) {
           if (item.clientesId==var_id) {
           deuda=parseInt(item.deuda)       
           }
       }
   
       for (let item of cli) {
           if (item.id==var_id) {
               document.getElementById("inpu").value=item.nomYape;
               document.getElementById("inpu1").value=item.dni;
               document.getElementById("inpu2").value=item.direccion;
               document.getElementById("inpu3").value=deuda ;
           }
       }
   
     } catch (error) {
       console.log(error);
     }
   })
 );

}

async function pagaoDeuda(){
    try {
           let pago = parseInt(document.getElementById("inpu4").value);
           let cliente;
           let clienteId;
           let deuda;
           let idCuentaCorriente;
           let cc = await getItems("cuentaCorriente");

    for (let item of cc) {
        if (item.clientesId==var_id) {
            cliente=item.cliente;
            clienteId=item.clientesId;
            deuda=item.deuda;
           idCuentaCorriente=item.id;
        }
    }

    let nuevaDeuda=deuda-pago;
    if (deuda>=pago) {
         await modificarItem("cuentaCorriente" , idCuentaCorriente,{
        cliente:cliente ,
        clientesId:clienteId,
        deuda: nuevaDeuda
      },
    );

    await IngresarDatos("pagosCuentaCorriente",{
        clientesId:clienteId,
        pago:pago
    })

    let totalEfec;
    let final=0;
    let efec=await getItems("EstadoDeCaja");
    for (let item of efec) {
        if (item.id==1) {
            totalEfec=item.efectivo;
        }
    }
    final=parseInt(totalEfec)+pago;

    await modificarItem("EstadoDeCaja", "1" , {
        efectivo:final
    })

    let cc= await getItems("EstadoDeCaja");
    let valorcc;
    let finalCC=0;
    for (let item of cc) {
        if (item.id==2) {
            valorcc=item.ventasEnCuentaCorriente;
        }
    }
    finalCC=parseInt(valorcc)-pago;

    await modificarItem("EstadoDeCaja", "2" ,{
        ventasEnCuentaCorriente:finalCC
    })

    swal({
        title: "Pago Realizado Correctamente",
        icon: "success",
      });
      document.getElementById("inpu").value="";
      document.getElementById("inpu1").value="";
      document.getElementById("inpu2").value="";
      document.getElementById("inpu3").value="";
      document.getElementById("inpu4").value="";
    }else{
        swal({
            title: "No puede pagar mas de lo que debe",
            icon: "error",
          });
    }
   

    } catch (err) {
        swal({
            title: err,
            icon: "error",
          });
    }
 

}