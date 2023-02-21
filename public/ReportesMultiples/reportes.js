window.onload=principal;

import { getItems } from "../firebase.js";


function principal(){
    document.getElementById("brnAceptar").addEventListener("click", aceptarOpcion)
}


 
// obtener la hora en la configuración regional de EE. UU.

const fecha = new Date();
var dia = fecha.getDate()
var mes = 1 + fecha.getMonth();
var ano = fecha.getFullYear();


async function aceptarOpcion(){

    document.getElementById("tablaMuestra").innerHTML="";
    document.getElementById("cabezaTabla").innerHTML="";
    document.getElementById("tablaMuestra2").innerHTML="";
    document.getElementById("cabezaTabla2").innerHTML="";
    document.getElementById("pieTabla").innerHTML ="";
    try {

        let articulo;
        let Cliente;
        let nombre;
        let reporte = document.getElementById("selector").value;

        if (reporte=="estadoDeCaja") {
            document.getElementById("cabezaTabla").innerHTML=
            `
            <tr>
                <th scope="col">EstadoDeCaja</th>
                <th scope="col">Contado</th>
                <th scope="col">CuentaCorriente</th>
                <th scope="col">Transferecia/Tarjetas</th>
            </tr>
            `
    
            let estado=await getItems("EstadoDeCaja");
            let efectivo;
            let cc;
            let tarjeta;
            for (let item of estado) {
                if (item.id==1) {
                   efectivo=item.efectivo;
                    
                }
                if (item.id==2) {
                  cc=item.ventasEnCuentaCorriente;
                }
                if (item.id==3) {
                    tarjeta=item.VentasTrasferencias;
                  }
            }
            document.getElementById("tablaMuestra").innerHTML+=
            `<tr>
                <th scope="row"></th>
                <td>${efectivo}</td>
                <td>${cc}</td>
                <td>${tarjeta}</td>
            </tr>`;
        }
    
        if (reporte=="ventasTotales") {
            
            document.getElementById("cabezaTabla").innerHTML=
            `
            <tr>
                <th scope="col">ID#</th>
                <th scope="col">Dia</th>
                <th scope="col">Hora</th>
                <th scope="col">Tipo</th>
                <th scope="col">Articulo</th>
                <th scope="col">cantidad</th>
                <th scope="col">total</th>
            </tr>
            `
            let ventas=await getItems("ventas");
            let articulos=await getItems("articulo");
            let tipoVenta=await getItems("tipoVenta")
            let nom;
            let tipo;
         
            for (let item of ventas) {
                if (item.estadoVentaId !== 2){ 
                  
                                    
                    for (let item2 of articulos) {
                        if (item.articuloId==item2.id) {
                            nom=item2.nombre;
                        }
                    }
    
                    for (let item3 of tipoVenta) {
                        if (item.tipoVentaId==item3.id) {
                            tipo=item3.tipo;
                        }
                    }
                   
    
    
                    document.getElementById("tablaMuestra").innerHTML+=
                    `<tr id="${tipo}">
                        <th scope="row">${item.id}</th>
                        <td>${item.dia}/${item.mes}/${item.ano}</td>
                        <td>${item.hora}</td>
                        <td>${tipo}</td>
                        <td>${nom}</td>
                        <td>${item.cantidad}</td>
                        <td>${item.totalVenta}</td>                    
                    </tr>`;
                }
            }
              
        }
        if (reporte=="ventasDelDia") {
            


            document.getElementById("cabezaTabla").innerHTML=
            `
            <tr>
                <th scope="col">ID#</th>
                <th>Dia</th>
                <th>Hora</th>
                <th scope="col">Tipo</th>
                <th scope="col">Articulo</th>
                <th scope="col">cantidad</th>
                <th scope="col">total</th>
            </tr>
            `
            let ventas=await getItems("ventas");
            let articulos=await getItems("articulo");
            let tipoVenta=await getItems("tipoVenta")
            let total_dia = 0;
            let nom;
            let tipo;
            

      

            for (let item of ventas) {
                if (item.tipoVentaId == "1" || item.tipoVentaId =="3") {
                     if ((item.dia == dia && item.mes == mes)) {
                        if (item.estadoVenta == "1"){
                            
                    let precio = parseInt( item.totalVenta)
                     total_dia = total_dia + precio;

                    for (let item2 of articulos) {
                        if (item.articuloId==item2.id) {
                            nom=item2.nombre;
                        }
                    }
    
                    for (let item3 of tipoVenta) {
                        if (item.tipoVentaId==item3.id) {
                            tipo=item3.tipo;
                        }
                    }
                   
    
    
                    document.getElementById("tablaMuestra").innerHTML+=
                    `<tr id="${tipo}">
                        <th scope="row">${item.id}</th>
                        <td>${item.dia}/${item.mes}/${item.ano}</td>
                        <td>${item.hora}</td>          
                        <td>${tipo}</td>
                        <td>${nom}</td>
                        <td>${item.cantidad}</td>
                        <td>${item.totalVenta}</td>                    
                    </tr>`;
                }
                }
              
                    document.getElementById("pieTabla").innerHTML =  `<tr>
                    <th scope="row"></th>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>Total-></td>
                    <td>${total_dia}</td>
                </tr>`;
                }
                   
            
            }  
        }
        if (reporte=="ventasDelMes") {
         
            document.getElementById("cabezaTabla").innerHTML=
            `
            <tr>
                <th scope="col">ID#</th>
                <th>Dia</th>
                <th>Hora</th>
                <th scope="col">Tipo</th>
                <th scope="col">Articulo</th>
                <th scope="col">cantidad</th>
                <th scope="col">total</th>
            </tr>
            `
            let ventas=await getItems("ventas");
            let articulos=await getItems("articulo");
            let tipoVenta=await getItems("tipoVenta")
            let nom;
            let tipo;
            let total_mes = 0;

            for (let item of ventas) {
                if (item.mes==mes && item.estadoVenta==1) {
                  
                    let precio = parseInt(item.totalVenta);
                    total_mes = total_mes + precio;  
                     
                    for (let item2 of articulos) {
                        if (item.articuloId==item2.id) {
                            nom=item2.nombre;
                        }
                    }
    
                    for (let item3 of tipoVenta) {
                        if (item.tipoVentaId==item3.id) {
                            tipo=item3.tipo;
                        }
                    }
                   
    
    
                    document.getElementById("tablaMuestra").innerHTML+=
                    `<tr>
                        <th scope="row">${item.id}</th>
                        <td>${item.dia}/${item.mes}/${item.ano}</td>
                        <td>${item.hora}</td>
                        <td>${tipo}</td>
                        <td>${nom}</td>
                        <td>${item.cantidad}</td>
                        <td>${item.totalVenta}</td>                    
                    </tr>`;
                }

                document.getElementById("pieTabla").innerHTML =  `<tr>
                <th scope="row"></th>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>Total mes-></td>
                <td>${total_mes}</td>
            </tr>`;

            }
              
        }
        if (reporte=="ventasContado") {
           
            document.getElementById("cabezaTabla").innerHTML+=
            `
            <tr>
                    <th scope="col">#ID</th>
                    <th scope="col">Dia</th>
                    <th scope="col">Hora</th>
                    <th scope="col">Articulo</th>
                    <th scope="col">Cantidad</th>
                    <th scope="col">total</th>
            </tr>
    
            `
    
    
            let ventaContado=await getItems("ventas");
            let total1=0;
            for (let item of ventaContado) {
                if (item.tipoVentaId=="1" && item.estadoVenta!="2") {
                    
                    let total=parseInt(item.totalVenta)
    
                    total1=total1+total;
    
                    let art=await getItems("articulo");
    
                    for (let item2 of art) {
                        if (item2.id==item.articuloId) {
                            nombre=item2.nombre;
                            break;
                        }
                    }
                    document.getElementById("tablaMuestra").innerHTML+=
                    `<tr>
                    <th scope="row">${item.id}</th>
                    <td>${item.dia}/${item.mes}/${item.ano}</td>
                    <td>${item.hora}</td>
                    <td>${nombre}</td>
                    <td>${item.cantidad}</td>
                    <td>${item.totalVenta}</td>
                  
                </tr>`;
                }
                document.getElementById("pieTabla").innerHTML=
                `<tr>
                <th scope="row"></th>
                <td></td>
                <td></td>
                <td></td>
                <td>Total Contado-></td>
                <td>${total1}</td>
            </tr>`;
            }
            
        }

        if (reporte=="ventasCuentaCorriente") {
            
            document.getElementById("cabezaTabla").innerHTML+=
            `
            <tr>
                    <th scope="col">#ID</th>
                    <th scope="col">Dia</th>
                    <th scope="col">Hora</th>
                    <th scope="col">Cliente</th>
                    <th scope="col">Articulo</th>
                    <th scope="col">Cantidad</th>
                    <th scope="col">total</th>
            </tr>
    
            `
    
            let ventaCuentaCorriente=await getItems("ventas"); 
            let total1=0;
            for (let item of ventaCuentaCorriente) {
                if (item.tipoVentaId=="2" && item.estadoVenta!="2") {
                    
                    let total=parseInt(item.totalVenta)
    
                    total1=total1+total;
    
                    let arti=await getItems("articulo");
                
                    for (let item2 of arti) {
                        if (item2.id==item.articuloId) {
                            articulo=item2.nombre;
                            break;
    
                        }
                    }
    
                    let cli=await getItems("clientes");
    
                    for (let item3 of cli) {
                        if (item3.id==item.clientesId) {
                            Cliente=item3.nomYape;
                            break;
                        }
                    }
    
                    document.getElementById("tablaMuestra").innerHTML+=
                    `<tr>
                        <th scope="row">${item.id}</th>
                        <td>${item.dia}/${item.mes}/${item.ano}</td>
                        <td>${item.hora}</td>
                        <td>${Cliente}</td>
                        <td>${articulo}</td>
                        <td>${item.cantidad}</td>
                        <td>${item.totalVenta}</td>
                    </tr>`;
                }
                document.getElementById("pieTabla").innerHTML=
                `<tr>
                <th scope="row"></th>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>Total CuentaCorriente-></td>
                <td>${total1}</td>
            </tr>`;
                
            }
        }
        if (reporte=="ventasTarjeta") {
           
            document.getElementById("cabezaTabla").innerHTML+=
            `
            <tr>
                <th scope="col">ID#</th>
                <th>Dia</th>
                <th>Hora</th>
                <th scope="col">Articulo</th>
                <th scope="col">cantidad</th>
                <th scope="col">total</th>
            </tr>
    
            `
    
    
            let ventaContado=await getItems("ventas");
            let total1=0;
            for (let item of ventaContado) {
                if (item.tipoVentaId=="3" && item.estadoVenta!="2") {
                    
                    let total=parseInt(item.totalVenta)
    
                    total1=total1+total;
    
                    let art=await getItems("articulo");
    
                    for (let item2 of art) {
                        if (item2.id==item.articuloId) {
                            nombre=item2.nombre;
                            break;
                        }
                    }
                    document.getElementById("tablaMuestra").innerHTML+=
                    `<tr>
                        <td scope="row">${item.id}</td>
                        <td>${item.dia}/${item.mes}/${item.ano}</td>
                        <td>${item.hora}</td>
                        <td>${nombre}</td>
                        <td>${item.cantidad}</td>
                        <td>${item.totalVenta}</td>
                  
                     </tr>`;
                }
                document.getElementById("pieTabla").innerHTML=
                `<tr>
                <th scope="row"></th>
                <td></td>
                <td></td>
                <td></td>
                <td>Total Tarjeta-></td>
                <td>${total1}</td>
            </tr>`;
            }
            
        }
        if (reporte=="ventaAnuladas") {
           
            document.getElementById("cabezaTabla").innerHTML+=
            `
            <tr>
                    <th scope="col">#ID</th>
                    <th>Dia</th>
                    <th>Hora</th>
                    <th scope="col">Articulo</th>
                    <th scope="col">Cantidad</th>
                    <th scope="col">total</th>
            </tr>

            `
            let venta=await getItems("ventas"); 
            let total1=0;
            let articulo;
                for (let item of venta) {
                    if (item.estadoVenta == "2") {
                        
                        let total=parseInt(item.totalVenta)

                        total1=total1+total;

                        let arti=await getItems("articulo");
                    
                        for (let item2 of arti) {
                            if (item2.id==item.articuloId) {
                                articulo=item2.nombre;
                                break;

                            }
                        }

                        let cli=await getItems("clientes");

                        for (let item3 of cli) {
                            if (item3.id==item.clientesId) {
                                Cliente=item3.nomYape;
                                break;
                            }
                        }

                        document.getElementById("tablaMuestra").innerHTML+=
                        `<tr>
                            <th scope="row">${item.id}</th>
                            <td>${item.dia}/${item.mes}/${item.ano}</td>
                            <td>${item.hora}</td>
                            <td>${articulo}</td>
                            <td>${item.cantidad}</td>
                            <td>${item.totalVenta}</td>
                        </tr>`;
                    }
                    document.getElementById("pieTabla").innerHTML=
                    `<tr>
                    <th scope="row"></th>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>Total Anuladas-></td>
                    <td>${total1}</td>
                </tr>`;
                    
                }
                
            }
            if (reporte=="deudaDeCuentasCorrientes") {
               
          
                    document.getElementById("cabezaTabla").innerHTML+=
                    `
                    <tr>
                            <th scope="col">#ID</th>
                            <th scope="col">Cliente</th>
                            <th scope="col">Deuda</th>
                    </tr>

                    `

                    let clientes=await getItems("clientes");
                    let cc=await getItems("cuentaCorriente");
                    let total1=0;
                    let total;
                    let nombre;

                    for (let item of cc) {
                        for (let item2 of clientes) {
                            if (item.clientesId==item2.id) {
                                nombre=item2.nomYape;
                                break;
                            }
                            
                        }
                        total=parseInt(item.deuda);
                        total1=total1+total;
                        if (item.deuda!=0) {
                            

                            document.getElementById("tablaMuestra").innerHTML+=
                            `<tr>
                                <th scope="row">${item.clientesId}</th>
                                <td>${nombre}</td>
                                <td>${item.deuda}</td>
                                
                            </tr>`;


                        }
                        


                        document.getElementById("pieTabla").innerHTML=
                        `<tr>
                        <th scope="row"></th>
                        <td>Total anulado-></td>
                        <td>${total1}</td>
                    </tr>`;
                        
                }
             }
             if (reporte=="pagosDeCuentasCorrientes") {

              
                document.getElementById("pieTabla").innerHTML="";
                document.getElementById("cabezaTabla").innerHTML+=
                `
                <tr>
                        <th scope="col">#ID</th>
                        <th>Dia</th>
                        <th>Hora</th>
                        <th scope="col">Cliente</th>
                        <th scope="col">Pago</th>
                </tr>
        
                `
                let nombrcliente;
                let pagos=await getItems("pagosCuentaCorriente");
                let cliente=await getItems("clientes");
                for (let item2 of cliente) {
                    
                    for (let item of pagos) {
        
                        if (item.clientesId==item2.id) {
                                document.getElementById("tablaMuestra").innerHTML+=
                            `<tr>
                                <th scope="row">${item.id}</th>
                                <td>${item.dia}/${item.mes}/${item.ano}</td>
                                <td>${item.hora}</td>
                                <td>${item2.nomYape}</td>
                                <td>${item.pago}</td>
                                
                            </tr>`;
                         }  
                    }
                   
                 }
             }
             if (reporte=="stockCompleto") {
                let cat;
                document.getElementById("cabezaTabla").innerHTML+=
                `
                <tr>
                        <th scope="col">#ID</th>
                        <th scope="col">Articulo</th>
                        <th scope="col">Cantidad</th>
                        <th scope="col">Tipo</th>
                        <th scope="col">Precio Compra</th>
                        <th scope="col">Precio Venta</th>
                </tr>
        
                `
                 let stock=await getItems("articulo");
                 for (let item of stock) {
                    switch (item.categoriaId) {
                        case "1":
                             cat="comestibles";
                             break;
                       case "2":
                             cat="bebidas";
                          break;
                      case "3":
                             cat="cigarrilos";
                          break;
                    case "4":
                            cat="golosinas";
                        break;
                     
                         default:
                             break;
                     }
           
                            document.getElementById("tablaMuestra").innerHTML+= 
                           `<tr>
                               <th scope="row">${item.id}</th>
                               <td>${item.nombre}</td>
                               <td>${item.cantidad}</td>
                               <td>${cat}</td>
                               <td>$${item.PrecioCompra}</td>
                               <td>$${item.PrecioVenta}</td>
                           </tr>`;
                 }
             }
             if (reporte=="stockCritico") {
                let cat;
                document.getElementById("cabezaTabla").innerHTML+=
                `
                <tr>
                        <th scope="col">#ID</th>
                        <th scope="col">Articulo</th>
                        <th scope="col">Cantidad</th>
                        <th scope="col">Tipo</th>
                        <th scope="col">Precio Compra</th>
                        <th scope="col">Precio Venta</th>
                </tr>
        
                `
                 let stock=await getItems("articulo");
                 for (let item of stock) {
                    switch (item.categoriaId) {
                        case "1":
                             cat="comestibles";
                             break;
                       case "2":
                             cat="bebidas";
                          break;
                      case "3":
                             cat="cigarrilos";
                          break;
                    case "4":
                            cat="golosinas";
                        break;
                     
                         default:
                             break;
                     }
                     
                     if (item.cantidad<=5) {
                          document.getElementById("tablaMuestra").innerHTML+= 
                           `<tr>
                               <th scope="row">${item.id}</th>
                               <td>${item.nombre}</td>
                               <td>${item.cantidad}</td>
                               <td>${cat}</td>
                               <td>$${item.PrecioCompra}</td>
                               <td>$${item.PrecioVenta}</td>
                           </tr>`;
                     }
                           
                 }
             }
             if (reporte=="stockCero") {
                 let cat;

                document.getElementById("cabezaTabla").innerHTML+=
                `
                <tr>
                        <th scope="col">#ID</th>
                        <th scope="col">Articulo</th>
                        <th scope="col">Cantidad</th>
                        <th scope="col">Tipo</th>
                        <th scope="col">Precio Compra</th>
                        <th scope="col">Precio Venta</th>
                </tr>
        
                `
                 let stock=await getItems("articulo");
                 for (let item of stock) {
                    switch (item.categoriaId) {
                        case "1":
                             cat="comestibles";
                             break;
                       case "2":
                             cat="bebidas";
                          break;
                      case "3":
                             cat="cigarrilos";
                          break;
                    case "4":
                            cat="golosinas";
                        break;
                     
                         default:
                             break;
                     }
                     
                     if (item.cantidad==0) {
                          document.getElementById("tablaMuestra").innerHTML+= 
                           `<tr>
                               <th scope="row">${item.id}</th>
                               <td>${item.nombre}</td>
                               <td>${item.cantidad}</td>
                               <td>${cat}</td>
                               <td>$${item.PrecioCompra}</td>
                               <td>$${item.PrecioVenta}</td>
                           </tr>`;
                     }
                           
                 }

             }
             if (reporte=="movimientosDeCajaTarjeta") {
                   
                document.getElementById("cabezaTabla").innerHTML+=
                `
                <tr>
                        <th scope="col">#ID</th>
                        <th scope="col">Dinero</th>
                        <th scope="col">Descripcion</th>
                        <th scope="col">Tipo</th>
                </tr>
        
                `

                let movEntrada=await getItems("ingresoDinero");
            
                for (let item of movEntrada) {
                    if (item.tipo == "3") {
                        
                        document.getElementById("tablaMuestra").innerHTML+= 
                             `
                             <tr>
                                   <th scope="row">${item.id}</th>
                                   <td>${item.dinero}</td>
                                   <td>${item.descripcion}</td>  
                                   <td>Ingreso De Dinero</td>                                                    
                               </tr>`;
                    }

                }

            

                let salDinero=await getItems("salidaDinero");
           
                for (let item of salDinero) {
                    if(item.tipo == "3"){

                        document.getElementById("tablaMuestra").innerHTML+= 
                        `
                        
                            <tr>
                                   <th scope="row">${item.id}</th>
                                   <td>-${item.dinero}</td>
                                   <td>${item.descripcion}</td>  
                                   <td>Salida De Dinero</td>                           
                               </tr>
                        
                        `;
                    }

                }
                 
             }
             if (reporte=="movimientosDeCajaEfectivo") {
                   
                document.getElementById("cabezaTabla").innerHTML+=
                `
                <tr>
                        <th scope="col">#ID</th>
                        <th scope="col">Dinero</th>
                        <th scope="col">Descripcion</th>
                        <th scope="col">Tipo</th>
                </tr>
        
                `

                let movEntrada=await getItems("ingresoDinero");
            
                for (let item of movEntrada) {
                    if (item.tipo == "1") {
                        
                        document.getElementById("tablaMuestra").innerHTML+= 
                             `
                             <tr>
                                   <th scope="row">${item.id}</th>
                                   <td>${item.dinero}</td>
                                   <td>${item.descripcion}</td>  
                                   <td>Ingreso De Dinero</td>                                                    
                               </tr>`;
                    }

                }

            

                let salDinero=await getItems("salidaDinero");
           
                for (let item of salDinero) {
                    if (item.tipo == "1") {
                        
                        document.getElementById("tablaMuestra").innerHTML+= 
                        `
                        
                            <tr>
                                   <th scope="row">${item.id}</th>
                                   <td>-${item.dinero}</td>
                                   <td>${item.descripcion}</td>  
                                   <td>Salida De Dinero</td>                           
                               </tr>
                        
                        `;
                    }

                }
                 
             }

             if (reporte == "ventasPorFecha") {
                
                    const cabezaTabla = document.getElementById("cabezaTabla");
                    
                    document.getElementById("cabezaTabla").innerHTML=`
                    <label for="start">Fecha inicial:   </label>

                    <input type="date" id="input-fecha" name="trip-start"
                        value="2023-02-12"
                    >
                    <Button id="btn-fecha"> Buscar </Button>
                    `;

                    const btnBuscar =  document.getElementById("btn-fecha");
                    btnBuscar.addEventListener("click" ,  async () => {         
                        let diass = document.getElementById("input-fecha").value;
                        document.getElementById("tablaMuestra2").innerHTML="";

                        let vec = diass.split('-');
                    
                        let diaSolicitado = vec[2];
                        let mesSolicitado = vec[1];
                        let anoSolicitado = vec[0];
                    
                        
                        document.getElementById("cabezaTabla2").innerHTML=
                        `
                        <tr>
                            <th scope="col">ID#</th>                   
                            <th scope="col">Tipo</th>
                            <th scope="col">Hora</th>
                            <th scope="col">Articulo</th>
                            <th scope="col">cantidad</th>
                            <th scope="col">total</th>
                        </tr>
                        `

                        let ventas = await getItems("ventas");
                        let articulos = await getItems("articulo");
                        let tipoVenta = await getItems("tipoVenta")
                        let total_dia = 0;
                        let nom;
                        let tipo;
                        
            
                  
            
                        for (let item of ventas) {
                                if (((item.dia == diaSolicitado) && (item.mes == mesSolicitado) && (item.ano == anoSolicitado))) {
                                    if (item.estadoVenta == "1"){
                                        
                                let precio = parseInt( item.totalVenta)
                                 total_dia = total_dia + precio;
            
                                for (let item2 of articulos) {
                                    if (item.articuloId==item2.id) {
                                        nom=item2.nombre;
                                    }
                                }
                
                                for (let item3 of tipoVenta) {
                                    if (item.tipoVentaId==item3.id) {
                                        tipo=item3.tipo;
                                    }
                                }
                               
                
                
                                document.getElementById("tablaMuestra2").innerHTML+=
                                `<tr>
                                    <th scope="row">${item.id}</th>
                                    <td>${tipo}</td>
                                    <td>${item.hora}</td>
                                    <td>${nom}</td>
                                    <td>${item.cantidad}</td>
                                    <td>${item.totalVenta}</td>                    
                                </tr>`;
                            }
                            }
                          
                                document.getElementById("pieTabla").innerHTML =  `<tr>
                                <th scope="row"></th>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>Total-></td>
                                <td>${total_dia}</td>
                            </tr>`;
                        
                        }  





                  })
                 


                   

             }
             if (reporte == "ventasPorFechaContado") {
                
                const cabezaTabla = document.getElementById("cabezaTabla");
                
                document.getElementById("cabezaTabla").innerHTML=`
                <label for="start">Fecha inicial:   </label>

                <input type="date" id="input-fecha" name="trip-start"
                    value="2023-02-12"
                >
                <Button id="btn-fecha"> Buscar </Button>
                `;

                const btnBuscar =  document.getElementById("btn-fecha");
                btnBuscar.addEventListener("click" ,  async () => {         
                    let diass = document.getElementById("input-fecha").value;
                    document.getElementById("tablaMuestra2").innerHTML="";

                    let vec = diass.split('-');
                
                    let diaSolicitado = vec[2];
                    let mesSolicitado = vec[1];
                    let anoSolicitado = vec[0];
                
                    
                    document.getElementById("cabezaTabla2").innerHTML=
                    `
                    <tr>
                        <th scope="col">ID#</th>
                        <th scope="col">Tipo</th>
                        <th scope="col">Hora</th>
                        <th scope="col">Articulo</th>
                        <th scope="col">cantidad</th>
                        <th scope="col">total</th>
                    </tr>
                    `

                    let ventas = await getItems("ventas");
                    let articulos = await getItems("articulo");
                    let tipoVenta = await getItems("tipoVenta")
                    let total_dia = 0;
                    let nom;
                    let tipo;
                    
        
              
        
                    for (let item of ventas) {
                            if (((item.dia == diaSolicitado) && (item.mes == mesSolicitado) && (item.ano == anoSolicitado))) {
                                if (item.estadoVenta == "1" &&  item.tipoVentaId == "1"){
                                    
                            let precio = parseInt( item.totalVenta)
                             total_dia = total_dia + precio;
        
                            for (let item2 of articulos) {
                                if (item.articuloId==item2.id) {
                                    nom=item2.nombre;
                                }
                            }
            
                            for (let item3 of tipoVenta) {
                                if (item.tipoVentaId==item3.id) {
                                    tipo=item3.tipo;
                                }
                            }
                           
            
            
                            document.getElementById("tablaMuestra2").innerHTML+=
                            `<tr>
                                <th scope="row">${item.id}</th>
                                <td>${tipo}</td>
                                <td>${item.hora}</td>
                                <td>${nom}</td>
                                <td>${item.cantidad}</td>
                                <td>${item.totalVenta}</td>                    
                            </tr>`;
                        }
                        }
                      
                            document.getElementById("pieTabla").innerHTML =  `<tr>
                            <th scope="row"></th>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>Total-></td>
                            <td>${total_dia}</td>
                        </tr>`;
                    
                    }  





              })
             


               

         }
         if (reporte == "ventasPorFechaTransferencia") {
                
            const cabezaTabla = document.getElementById("cabezaTabla");
            
            document.getElementById("cabezaTabla").innerHTML=`
            <label for="start">Fecha inicial:   </label>

            <input type="date" id="input-fecha" name="trip-start"
                value="2023-02-12"
            >
            <Button id="btn-fecha"> Buscar </Button>
            `;

            const btnBuscar =  document.getElementById("btn-fecha");
            btnBuscar.addEventListener("click" ,  async () => {         
                let diass = document.getElementById("input-fecha").value;
                document.getElementById("tablaMuestra2").innerHTML="";

                let vec = diass.split('-');
            
                let diaSolicitado = vec[2];
                let mesSolicitado = vec[1];
                let anoSolicitado = vec[0];
            
                
                document.getElementById("cabezaTabla2").innerHTML=
                `
                <tr>
                    <th scope="col">ID#</th>
                    <th scope="col">Tipo</th>
                    <th scope="col">Hora</th>
                    <th scope="col">Articulo</th>
                    <th scope="col">cantidad</th>
                    <th scope="col">total</th>
                </tr>
                `

                let ventas = await getItems("ventas");
                let articulos = await getItems("articulo");
                let tipoVenta = await getItems("tipoVenta")
                let total_dia = 0;
                let nom;
                let tipo;
                
    
          
    
                for (let item of ventas) {
                        if (((item.dia == diaSolicitado) && (item.mes == mesSolicitado) && (item.ano == anoSolicitado))) {
                            if (item.estadoVenta == "1" && item.tipoVentaId == "3"){
                                
                        let precio = parseInt( item.totalVenta)
                         total_dia = total_dia + precio;
    
                        for (let item2 of articulos) {
                            if (item.articuloId==item2.id) {
                                nom=item2.nombre;
                            }
                        }
        
                        for (let item3 of tipoVenta) {
                            if (item.tipoVentaId==item3.id) {
                                tipo=item3.tipo;
                            }
                        }
                       
        
        
                        document.getElementById("tablaMuestra2").innerHTML+=
                        `<tr>
                            <th scope="row">${item.id}</th>
                            <td>${tipo}</td>
                            <td>${item.hora}</td>
                            <td>${nom}</td>
                            <td>${item.cantidad}</td>
                            <td>${item.totalVenta}</td>                    
                        </tr>`;
                    }
                    }
                  
                        document.getElementById("pieTabla").innerHTML =  `<tr>
                        <th scope="row"></th>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>Total-></td>
                        <td>${total_dia}</td>
                    </tr>`;
                
                }  





          })
         


           

     }

        
        
    } catch (err) {
        alert(err)
    }
}

