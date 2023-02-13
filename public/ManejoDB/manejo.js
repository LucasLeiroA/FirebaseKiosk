window.onload = principal;

import { getItems } from "../firebase.js";

let urlRegistrar = localStorage.getItem("urlRegistrar");

let urlActual = window.location.href;
let UrlAnterior = document.referrer;

if (UrlAnterior !== urlActual) {
    
    if(UrlAnterior !== urlRegistrar ){
        
        alert('Acceso denegado!')
        window.location= "../RegistrarStock/Admin.html";
    }
}




function principal(){
    document.getElementById("btn_option").addEventListener("click", manejo)
    
}


async function manejo(){

    document.getElementById("div_selector").innerHTML="";
    document.getElementById("cabeza_tabla").innerHTML="";
    document.getElementById("cuerpo_tabla").innerHTML="";
    document.getElementById("pie_tabla").innerHTML="";
    let opcion = document.getElementById("selector").value;

    if(opcion == "ingreso_dinero"){
        document.getElementById("cuerpo_tabla").innerHTML ="";
                
        try {
            let ingreso =await axios.get("http://localhost:3001/ingresoDinero")

            document.getElementById("cabeza_tabla").innerHTML = `
            <tr>
                <th scope="col">Id</th>
                <th scope="col">Dinero</th>
                <th scope="col">Descipcion</th>
                <th scope="col">Boton</th>
            </tr>
            ` ;
    
            for (let item of ingreso.data) {
                document.getElementById("cuerpo_tabla").innerHTML += `<tr>
                <th scope="row">${item.id}</th>
                <td>${item.dinero}</td>
                <td>${item.descripcion}</td>
                <td><button onclick="elimIngreso(${item.id})">X</button></td>
            </tr>`;
            }

            document.getElementById("pie_tabla").innerHTML = `
                <tr>
                    <td>Eliminar todos lo ingresos</td>
                    <td><button onclick="elimTotalIngresos()">X</button></td>
                </tr>`
        } catch (err) {
            console.log(err);
        }


        
     }

     if(opcion == "salida_dinero"){
        document.getElementById("cuerpo_tabla").innerHTML ="";
            
    try {
        let ingreso =await axios.get("http://localhost:3001/salidaDinero")

        document.getElementById("cabeza_tabla").innerHTML = `
        <tr>
            <th scope="col">Id</th>
            <th scope="col">Dinero</th>
            <th scope="col">Descipcion</th>
            <th scope="col">Boton</th>
        </tr>
        ` ;

        for (let item of ingreso.data) {
            document.getElementById("cuerpo_tabla").innerHTML += `<tr>
            <th scope="row">${item.id}</th>
            <td>${item.dinero}</td>
            <td>${item.descripcion}</td>
            <td><button onclick="elimSalida(${item.id})">X</button></td>
        </tr>`;
        }

        document.getElementById("pie_tabla").innerHTML = `
            <tr>
                <td>Eliminar todos lo ingresos</td>
                <td><button onclick="elimTotalSalida()">X</button></td>
            </tr>`
    } catch (err) {
        console.log(err);
    }

    }

        
    if(opcion == "estado_contado"){
        
        try {
            
            let contado = await axios.get("http://localhost:3001/EstadoDeCaja/1");
            document.getElementById("cabeza_tabla").innerHTML=
            `
            <tr>
                <th scope="col">Estado de Caja Contado</th>
                <th scope="col">Dinero</th>
             </tr>
            
            `;
            document.getElementById("cuerpo_tabla").innerHTML=
            `
            <tr>
                <th scope="col">Total</th>
                <th scope="col">${contado.data.efectivo}</th>
             </tr>
            
            `;
            document.getElementById("pie_tabla").innerHTML=
            `
            <tr>
                <th scope="col">Dejar en 0</th>
                <th scope="col"><button onclick="borrarContado()">Borrar Estado</button></th>
             </tr>
            
            `;

        } catch (err) {
            alert(err)
        }

    }

    if (opcion == "estado_cuentaCorriente") {

        try {
            
            let contado = await axios.get("http://localhost:3001/EstadoDeCaja/2");
            document.getElementById("cabeza_tabla").innerHTML=
            `
            <tr>
                <th scope="col">Estado de Caja CuentaCorriente</th>
                <th scope="col">Dinero</th>
             </tr>
            
            `;
            document.getElementById("cuerpo_tabla").innerHTML=
            `
            <tr>
                <th scope="col">Total</th>
                <th scope="col">${contado.data.ventasEnCuentaCorriente}</th>
             </tr>
            
            `;
            document.getElementById("pie_tabla").innerHTML=
            `
            <tr>
                <th scope="col">Dejar en 0</th>
                <th scope="col"><button onclick="borrarCuentaCorriente()">Borrar Estado</button></th>
             </tr>
            
            `;

        } catch (err) {
            alert(err)
        }
    }

    if (opcion == "estado_tarjeta") {
        
        try {
            
            let contado = await axios.get("http://localhost:3001/EstadoDeCaja/3");
            document.getElementById("cabeza_tabla").innerHTML=
            `
            <tr>
                <th scope="col">Estado de Caja Transferencias/Tarjetas</th>
                <th scope="col">Dinero</th>
             </tr>
            
            `;
            document.getElementById("cuerpo_tabla").innerHTML=
            `
            <tr>
                <th scope="col">Total</th>
                <th scope="col">${contado.data.VentasTrasferencias}</th>
             </tr>
            
            `;
            document.getElementById("pie_tabla").innerHTML=
            `
            <tr>
                <th scope="col">Dejar en 0</th>
                <th scope="col"><button onclick="borrarTarjeta()">Borrar Estado</button></th>
             </tr>
            
            `;

        } catch (err) {
            alert(err)
        }
        
    }

    if(opcion == "deudas_clientes"){

        let cuentas = await axios.get("http://localhost:3001/cuentaCorriente");

        document.getElementById("cabeza_tabla").innerHTML=  `
        <tr>
            <th scope="col">ID Cliente</th>
            <th scope="col">Cliente</th>
            <th scope="col">Deuda</th>
            <th scope="col">Eliminar Deuda</th>
         </tr>
        
        `;
        let totalDeudas = 0;
        for (let item of cuentas.data){

            let precio = parseInt(item.deuda);

            totalDeudas = totalDeudas + precio;

            document.getElementById("cuerpo_tabla").innerHTML+=  `
                    <tr>
                        <th scope="col">${item.id}</th>
                        <th scope="col">${item.cliente}</th>
                        <th scope="col">${item.deuda}</th>
                        <th><Button onclick="eliminarDeuda(${item.id})">X</Button></th>
                    </tr>
                    
                    `;

        }

        document.getElementById("pie_tabla").innerHTML=  `
        <tr>
            <th scope="col">Total de Deudas --></th>
            <th scope="col">${totalDeudas}}</th>
            <th scope="col">Eliminar todas las deudas --> </th>
            <th><Button onclick="eliminarTotalDeudas()">Eliminar Deuda</Button></th>
         </tr>`;

    }


    if(opcion == "ventas_anuladas"){
        try {
            document.getElementById("cabeza_tabla").innerHTML+=
            `
            <tr>
                    <th scope="col">#ID</th>
                    <th scope="col">Articulo</th>
                    <th scope="col">Cantidad</th>
                    <th scope="col">total</th>
            </tr>

            `
            let venta=await axios.get("http://localhost:3001/ventas"); 
            let total1=0;
            let articulo;
                for (let item of venta.data) {
                    if (item.estadoVentaId==2) {
                        
                        let total=parseInt(item.totalVenta)

                        total1=total1+total;

                        let arti=await axios.get("http://localhost:3001/articulo");
                    
                        for (let item2 of arti.data) {
                            if (item2.id==item.articuloId) {
                                articulo=item2.nombre;
                                break;

                            }
                        }

                        let cli=await axios.get("http://localhost:3001/clientes");

                        for (let item3 of cli.data) {
                            if (item3.id==item.clientesId) {
                                Cliente=item3.nomYape;
                                break;
                            }
                        }

                        document.getElementById("cuerpo_tabla").innerHTML+=
                        `<tr>
                            <th scope="row">${item.id}</th>
                            <td>${articulo}</td>
                            <td>${item.cantidad}</td>
                            <td>${item.totalVenta}</td>
                            <td><Button onclick="elimVentaAnulada(${item.id})">X</Button></td>
                        </tr>`;
                    }
                    document.getElementById("pie_tabla").innerHTML=
                    `<tr>
                    <th scope="row">Total Anuladas-></th>
                    <td>${total1}</td>
                    <td>Boton borrar anuladas--> </td>
                    <td><Button onclick="borrarTotalVentasAnuladas()">Borrar Todo</Button></td>
                </tr>`;
                    
                }



        } catch (err) {
            alert(err)
        }



    }


    if(opcion == "ventas"){

        document.getElementById("cabeza_tabla").innerHTML=
            `
            <tr>
                <th scope="col">ID#</th>
                <th scope="col">Tipo</th>
                <th scope="col">Articulo</th>
                <th scope="col">cantidad</th>
                <th scope="col">total</th>
                <th scope="col">Eliminar venta</th>
            </tr>
            `
            let ventas=await axios.get("http://localhost:3001/ventas");
            let articulos=await axios.get("http://localhost:3001/articulo");
            let tipoVenta=await axios.get("http://localhost:3001/tipoVenta")
            let nom;
            let tipo;
            let finalPrice = 0;
            
         
            for (let item of ventas.data) {
                if (item.estadoVentaId !== 2) {
                  
                    let parceado = parseInt(item.totalVenta);
                    finalPrice = finalPrice + parceado;

                                    
                    for (let item2 of articulos.data) {
                        if (item.articuloId==item2.id) {
                            nom=item2.nombre;
                        }
                    }
    
                    for (let item3 of tipoVenta.data) {
                        if (item.tipoVentaId==item3.id) {
                            tipo=item3.tipo;
                        }
                    }
                   
    
    
                    document.getElementById("cuerpo_tabla").innerHTML+=
                    `<tr>
                        <th scope="row">${item.id}</th>
                        <td>${tipo}</td>
                        <td>${nom}</td>
                        <td>${item.cantidad}</td>
                        <td>${item.totalVenta}</td>  
                        <td><Button onclick="elimVenta(${item.id})">X</Button></td>                    
                    </tr>`;
                }
            }

            document.getElementById("pie_tabla").innerHTML+=
            `<tr>
                <th scope="row">Total Ventas --></th>
                <td>${finalPrice}</td>
                <td>Eliminar Todas las ventas</td>
                <td><Button onclick="elimTotalVentas()">Eliminar</Button></td>                    
            </tr>`;


    }

    if(opcion == "dineroEnStock"){
        let stock = await getItems("articulo");

        document.getElementById("cabeza_tabla").innerHTML=`
        
                <tr>
                <th scope="col">#ID</th>
                <th scope="col">Articulo</th>
                <th scope="col">Cantidad</th>
                <th scope="col">Precio</th>
                <th scope="col">total</th>
                </tr>

        `

        let total;
        let totalFinal = 0;       

        for (const item of stock) {
            if (item.cantidad > 0) {

                total = item.cantidad * item.PrecioVenta;
                totalFinal = totalFinal + total;

                document.getElementById("cuerpo_tabla").innerHTML+=`
                
                    <tr>
                        <th scope="row">${item.id}</th>
                        <td>${item.nombre}</td>
                        <td>${item.cantidad}</td>
                        <td>${item.PrecioVenta}</td>
                        <td>${total}</td>
                </tr>

                `
            }
        }

        document.getElementById("pie_tabla").innerHTML = `
        
            <tr>
                    <th></th>
                    <td></td>
                    <td></td>
                    <td>Total Dinero Stock-----></td>    
                    <td>${totalFinal}</td>                    
            </tr>   

        `


    }


}




            

            
                      

   
    
    


async function elimIngreso(id) {
    try {
        
        const borrar = await axios.delete("http://localhost:3001/ingresoDinero/"+id);
        alert("Ingreso Eliminado Correctamente")
    } catch (err) {
        alert(err)
    }    
}

async function elimTotalIngresos(){
    var resultado = window.confirm("Estas Seguro de Borrar estos datos?");
    if (resultado === true) {

        try {
            totalIngresos = await axios.get("http://localhost:3001/ingresoDinero")
    
            
            for (let item of totalIngresos.data) {
                let borrar = await axios.delete("http://localhost:3001/ingresoDinero/" + item.id)
            }
    
    
    
            alert("Ingreso Eliminado Correctamente")
        } catch (err) {
            console.log(err);
        }
    }
}

async function elimSalida(id) {
    try {
        
        const borrar = await axios.delete("http://localhost:3001/salidaDinero/"+id);
        alert("Ingreso Eliminado Correctamente")
    } catch (err) {
        alert(err)
    }    
}

async function elimTotalSalida(){
    var resultado = window.confirm("Estas Seguro de Borrar estos datos?");
    if (resultado === true) {
        try {
                totalIngresos = await axios.get("http://localhost:3001/salidaDinero")
                
                for (let item of totalIngresos.data) {
                    let borrar = await axios.delete("http://localhost:3001/salidaDinero/" + item.id)
                }
                alert("Ingreso Eliminado Correctamente")

            } catch (err) {
                console.log(err);
            }
    }
   
}

async function borrarContado(){
    var resultado = window.confirm("Estas Seguro de Borrar estos datos?");
    if (resultado === true) {
        try {
                
            await axios.put("http://localhost:3001/EstadoDeCaja/1",{
                efectivo: 0,
            })

            } catch (err) {
                alert(err)
            }
    }
  
}

async function borrarCuentaCorriente(){
    var resultado = window.confirm("Estas Seguro de Borrar estos datos?");
    if (resultado === true) {
        try {
                
            await axios.put("http://localhost:3001/EstadoDeCaja/2",{
                ventasEnCuentaCorriente: 0,
            })

            } catch (err) {
                alert(err)
            }
    }
}

async function borrarTarjeta(){

    var resultado = window.confirm("Estas Seguro de Borrar estos datos?");
    if (resultado === true) {
        try {
                
            await axios.put("http://localhost:3001/EstadoDeCaja/3",{
                VentasTrasferencias: 0,
            })

            } catch (err) {
                alert(err)
            }
    }

}

async function eliminarDeuda(id) {
    try {
        
        const borrar = await axios.delete("http://localhost:3001/cuentaCorriente/"+id);
        alert("Ingreso Eliminado Correctamente")
    } catch (err) {
        alert(err)
    }    
}

async function eliminarTotalDeudas() {
    var resultado = window.confirm("Estas Seguro de Borrar estos datos?");
    if (resultado === true) {
        try {
                totalIngresos = await axios.get("http://localhost:3001/cuentaCorriente")
                
                for (let item of totalIngresos.data) {
                    let borrar = await axios.delete("http://localhost:3001/cuentaCorriente/" + item.id)
                }
                alert("Ingreso Eliminado Correctamente")

            } catch (err) {
                console.log(err);
            }
    }
}

async function elimVentaAnulada(id) {
    try {
        
        const borrar = await axios.delete("http://localhost:3001/ventas/"+id);
        alert("Venta Eliminado Correctamente")
    } catch (err) {
        alert(err)
    }    
}

async function borrarTotalVentasAnuladas(){

    var resultado = window.confirm("Estas Seguro de Borrar estos datos?");
    if (resultado === true) {
        try {
                totalIngresos = await axios.get("http://localhost:3001/ventas")
                
                for (let item of totalIngresos.data) {
                    if (item.estadoVentaId == 2) {
                        
                        let borrar = await axios.delete("http://localhost:3001/ventas/" + item.id)
                    }
                }
                alert("Ingreso Eliminado Correctamente")

            } catch (err) {
                console.log(err);
            }
    }
}

async function elimVenta(id){
    try {
        
        const borrar = await axios.delete("http://localhost:3001/ventas/"+id);
        alert("Venta Eliminado Correctamente")
    } catch (err) {
        alert(err)
    }    
}

async function elimTotalVentas(){
    var resultado = window.confirm("Estas Seguro de Borrar estos datos?");
    if (resultado === true) {
        try {
                totalIngresos = await axios.get("http://localhost:3001/ventas")
                
                for (let item of totalIngresos.data) {
                    if (item.estadoVentaId !== 2) {
                        
                        let borrar = await axios.delete("http://localhost:3001/ventas/" + item.id)
                    }
                }
                alert("Ingreso Eliminado Correctamente")

            } catch (err) {
                console.log(err);
            }
    }
}


