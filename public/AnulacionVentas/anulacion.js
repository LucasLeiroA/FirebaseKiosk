window.onload=principal;

import { getItems , modificarItem } from "../firebase.js";


function principal(){
     document.getElementById("btnAceptar").addEventListener("click",mostrarTabla)
}
const fecha = new Date();
const now = fecha.toLocaleTimeString('en-US');

const tablaMuestra = document.getElementById("tablaMuestra");
var var_id;
var var_cliente;

async function mostrarTabla(){
    document.getElementById("cabezaTabla").innerHTML="";
    document.getElementById("tablaMuestra").innerHTML="";

    try {
         
            let articulo;
            let Cliente;
            let nombre;
        
            let TipoVenta=document.getElementById("selector").value;
           
          
            if (TipoVenta == "Contado") {
            
                
                document.getElementById("cabezaTabla").innerHTML+=
                `
                <tr>
                        <th scope="col">#ID</th>
                        <th scope="col">Articulo</th>
                        <th scope="col">Cantidad</th>
                        <th scope="col">total</th>
                </tr>

                `


                let ventaContado=await getItems("ventas");
                
                for (let item of ventaContado) {
                    if (item.tipoVentaId == 1 && item.estadoVenta ==  1 ) {

                        let art=await getItems("articulo");
                         let nuevaCantidad=item.catidad;
                        for (let item2 of art) {
                            if (item2.id==item.articuloId) {
                                nombre=item2.nombre;
                                break;
                            }
                        }
                        document.getElementById("tablaMuestra").innerHTML+=
                        `<tr>
                        <th scope="row">${item.id}</th>
                        <td>${nombre}</td>
                        <td>${item.cantidad}</td>
                        <td>${item.totalVenta}</td>
                        <td><Button id="btn-eliminar" data-id="${item.id}">X</Button></td>
                    </tr>`;
                    }
                }


                // tenemos que modicar el estado de la venta cambiando a anulada 
                // tenemos que  sumar la cantidad del articulo anulado al stock 
                // tenes que modicar el estado de caja restandole el valor de la venta al estado de caja en contado en este caso
                
                const btnsEliminar = tablaMuestra.querySelectorAll("#btn-eliminar");
                btnsEliminar.forEach((btn)=>
                btn.addEventListener("click", async (e) => {  
                  try {
              

                      let id = (e.target.dataset.id);
                    
                   //Traer la venta para agarra el valor de la cantidad del producto y modificar su estado
                   
                    //Variables de la venta

                        let IdVenta;
                        let cantidadVenta;
                        let ArticuloVentaId;
                        let dia;
                        let mes;                   
                        let tipoVentaId;
                        let totalVenta; // totalVenta para luego restar en el estado de caja contado

                        let venta = await getItems("ventas");
                        
                        for (const item of venta) {
                            if (item.id == id) {
                                IdVenta = item.id;
                                ArticuloVentaId = item.articuloId;
                                cantidadVenta = item.cantidad;
                                dia=item.dia;
                                mes=item.mes;
                                tipoVentaId = item.tipoVentaId;
                                totalVenta = item.totalVenta;
                            }
                        }

                        //modifacion de la venta para cambiar el estado
                        let newData = { 
                            articuloId : ArticuloVentaId,
                            cantidad : cantidadVenta,
                            dia : dia,
                            mes:mes,
                            estadoVenta : 2,
                            tipoVentaId : tipoVentaId,
                            totalVenta: totalVenta,
                            hora:now
                        }
                    
                       
                     await modificarItem("ventas", IdVenta , newData );


                      let articulos = await getItems("articulo");

                    // variables para guardar valores del articulo a modificar
                    let nombreArt; 
                    let cantidadArtiAnulado;
                    let precioCompraArtiAnulado
                    let precioVentaArtiAnulado;
                    let categoriaIdArticulo;
                    let idArticulo;

                    

                      for (const item of articulos) {
                            if (item.id == ArticuloVentaId) {
                                nombreArt = item.nombre;
                                cantidadArtiAnulado = item.cantidad;
                                precioCompraArtiAnulado = item.PrecioCompra;
                                precioVentaArtiAnulado = item.PrecioVenta;
                                categoriaIdArticulo  = item.categoriaId;
                                idArticulo = item.id;
                            }                        
                      }

                    // ingresar la nueva cantidad

                    let nuevaCantiadArticulo = parseInt(cantidadArtiAnulado) + parseInt(cantidadVenta)
                    // modificacion del articulo
                   
                   let ingresoData = {
                    nombre : nombreArt,
                    PrecioCompra : precioCompraArtiAnulado,
                    PrecioVenta : precioVentaArtiAnulado,
                    cantidad : nuevaCantiadArticulo,
                    categoriaId: categoriaIdArticulo,    
                   }

                   await modificarItem("articulo" , ArticuloVentaId , ingresoData)


                      //Traer el valor del estado de caja y modificarlo

                      let estado = await getItems("EstadoDeCaja");
                      
                      let estadoContado;

                      for (const item of estado) {
                        if (item.id == "1"){
                            estadoContado = item.efectivo;
                        }
                      }

                      // modificacion del estado de caja

             

                      let nuevoValorContado = parseInt(estadoContado) - parseInt(totalVenta);

                     
                      await modificarItem("EstadoDeCaja" , "1" , {
                        efectivo : nuevoValorContado
                      })

                      swal({
                        title: "Venta en contado Anulada",
                        icon: "success",
                      });

                } catch (err) {
                    console.log(err)
                }          
                  // location.reload();               
                }))  

               


            }
            if (TipoVenta=="CuentaCorriente") {
                document.getElementById("cabezaTabla").innerHTML+=
                `
                <tr>
                        <th scope="col">#ID</th>
                        <th scope="col">Cliente</th>
                        <th scope="col">Articulo</th>
                        <th scope="col">Cantidad</th>
                        <th scope="col">total</th>
                </tr>

                `

                let ventaCuentaCorriente=await getItems("ventas"); 
                
                for (let item of ventaCuentaCorriente) {
                    if (item.tipoVentaId == 2 && item.estadoVenta == 1) {
                        
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
                        <td>${Cliente}</td>
                        <td>${articulo}</td>
                        <td>${item.cantidad}</td>
                        <td>${item.totalVenta}</td>
                        <td><Button id="btn-eliminar" data-id="${item.id}">X</Button></td>
                    </tr>`;
                    }
                    
                }

                //cambiar el estado de la venta a anulada
                //sumar la cantidad del producto de la venta al arituclo para aumentar el stock
                //restar el valor de la venta a la deuda del cliente
                //restar el valor de la venta al estado de caja de cuenta corriente
                

                const btnsEliminar = tablaMuestra.querySelectorAll("#btn-eliminar");
                btnsEliminar.forEach((btn)=>
                btn.addEventListener("click", async (e) => {  
                  try {
                      let id = (e.target.dataset.id);
                        
                    //variables de la venta anulada

                     //Variables de la venta

                     let idCliente; // Variable que guarda la id del cliente para luego acceder a su cuenta corriente
                     let IdVenta;
                     let cantidadVenta;
                     let ArticuloVentaId;
                     let dia;
                     let mes;                   
                     let tipoVentaId;
                     let totalVenta; // totalVenta para luego restar en el estado de caja contado

                     let venta = await getItems("ventas");
                     
                     for (const item of venta) {
                         if (item.id == id) {
                             IdVenta = item.id;
                             ArticuloVentaId = item.articuloId;
                             cantidadVenta = item.cantidad;
                             dia=item.dia;
                             mes=item.mes;
                             tipoVentaId = item.tipoVentaId;
                             totalVenta = item.totalVenta;
                             idCliente = item.clientesId;
                         }
                     }

                     //modifacion de la venta para cambiar el estado
                     let newData = { 
                         articuloId : ArticuloVentaId,
                         cantidad : cantidadVenta,
                         dia:dia,
                         mes:mes,
                         estadoVenta : 2,
                         tipoVentaId : tipoVentaId,
                         totalVenta: totalVenta,
                         clientesId:idCliente,
                         hora:now
                     }
                 
                    
                  await modificarItem("ventas", IdVenta , newData );


                   let articulos = await getItems("articulo");

                 // variables para guardar valores del articulo a modificar
                 let nombreArt; 
                 let cantidadArtiAnulado;
                 let precioCompraArtiAnulado
                 let precioVentaArtiAnulado;
                 let categoriaIdArticulo;
                 let idArticulo;

                 

                   for (const item of articulos) {
                         if (item.id == ArticuloVentaId) {
                             nombreArt = item.nombre;
                             cantidadArtiAnulado = item.cantidad;
                             precioCompraArtiAnulado = item.PrecioCompra;
                             precioVentaArtiAnulado = item.PrecioVenta;
                             categoriaIdArticulo  = item.categoriaId;
                             idArticulo = item.id;
                         }                        
                   }

                 // ingresar la nueva cantidad

                 let nuevaCantiadArticulo = parseInt(cantidadArtiAnulado) + parseInt(cantidadVenta)
                 // modificacion del articulo
                
                let ingresoData = {
                 nombre : nombreArt,
                 PrecioCompra : precioCompraArtiAnulado,
                 PrecioVenta : precioVentaArtiAnulado,
                 cantidad : nuevaCantiadArticulo,
                 categoriaId: categoriaIdArticulo,    
                }

                await modificarItem("articulo" , ArticuloVentaId , ingresoData)

                //acceder a cuenta corriente para traer el cliente y editar su deuda
                //Datos del usario de la cuenta corriente

                let cuentaCorrienteId;
                let cliente;
                let clienteId;
                let deuda;

                let cuentaCorriente = await getItems("cuentaCorriente");

                for (const item of cuentaCorriente) {
                    if(item.clientesId == idCliente ){
                        cuentaCorrienteId = item.id;
                        cliente = item.cliente;
                        clienteId = item.clientesId;
                        deuda = item.deuda;
                    }
                }

                let nuevaDeuda = parseInt(deuda) - parseInt(totalVenta);

                //modicar los datos para ingresar la nueva deuda

                let newCliente = {
                    cliente:cliente,
                    clientesId:clienteId,
                    deuda:nuevaDeuda
                }

                //modificacion de la deuda de cliente

                await modificarItem("cuentaCorriente" , cuentaCorrienteId , newCliente);


                // funcion para restar el valor del estado de caja de cuenta corriente

                let ventasEnCuentaCorriente;

                let estado = await getItems("EstadoDeCaja");

                for (const item of estado) {
                    if(item.id == "2"){
                        ventasEnCuentaCorriente = item.ventasEnCuentaCorriente;
                    }
                }

                //se resta el estado actual con el valor de la venta anulada

                let nuevaCuenta = parseInt(ventasEnCuentaCorriente) - parseInt(totalVenta);

                let nuevoEstado = {
                    ventasEnCuentaCorriente: nuevaCuenta
                }

                await modificarItem("EstadoDeCaja" , "2" , nuevoEstado)

                swal({
                    title: "Venta en cuenta corriente anulada correctamente",
                    icon: "success",
                  });
                } catch (err) {
                    console.log(err)
                }          
                  
                location.reload();               
                  
                }))  



                


            }
            if (TipoVenta=="Trasferencia") {
                document.getElementById("cabezaTabla").innerHTML+=
                `
                <tr>
                        <th scope="col">#ID</th>
                        <th scope="col">Articulo</th>
                        <th scope="col">Cantidad</th>
                        <th scope="col">total</th>
                </tr>

                `

                let ventaCuentaCorriente = await getItems("ventas"); 
                
                for (let item of ventaCuentaCorriente) {
                    if (item.tipoVentaId == 3 && item.estadoVenta == 1 ) {
                        
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
                        <td>${articulo}</td>
                        <td>${item.cantidad}</td>
                        <td>${item.totalVenta}</td>
                        <td><Button id="btn-eliminar" data-id="${item.id}">X</Button></td>
                    </tr>`;
                    }
                    
                }


                const btnsEliminar = tablaMuestra.querySelectorAll("#btn-eliminar");
                btnsEliminar.forEach((btn)=>
                btn.addEventListener("click", async (e) => {  
                  try {
                      let id = (e.target.dataset.id);
                        
                      let IdVenta;
                      let cantidadVenta;
                      let ArticuloVentaId;
                      let dia;
                      let mes;                   
                      let tipoVentaId;
                      let totalVenta; // totalVenta para luego restar en el estado de caja contado

                      let venta = await getItems("ventas");
                      
                      for (const item of venta) {
                          if (item.id == id) {
                              IdVenta = item.id;
                              ArticuloVentaId = item.articuloId;
                              cantidadVenta = item.cantidad;
                              dia=item.dia;
                              mes=item.mes;
                              tipoVentaId = item.tipoVentaId;
                              totalVenta = item.totalVenta;
                          }
                      }

                      //modifacion de la venta para cambiar el estado
                      let newData = { 
                          articuloId : ArticuloVentaId,
                          cantidad : cantidadVenta,
                          dia : dia,
                          mes:mes,
                          estadoVenta : 2,
                          tipoVentaId : tipoVentaId,
                          totalVenta: totalVenta,
                      }
                  
                     
                   await modificarItem("ventas", IdVenta , newData );


                    let articulos = await getItems("articulo");

                  // variables para guardar valores del articulo a modificar
                  let nombreArt; 
                  let cantidadArtiAnulado;
                  let precioCompraArtiAnulado
                  let precioVentaArtiAnulado;
                  let categoriaIdArticulo;
                  let idArticulo;

                  

                    for (const item of articulos) {
                          if (item.id == ArticuloVentaId) {
                              nombreArt = item.nombre;
                              cantidadArtiAnulado = item.cantidad;
                              precioCompraArtiAnulado = item.PrecioCompra;
                              precioVentaArtiAnulado = item.PrecioVenta;
                              categoriaIdArticulo  = item.categoriaId;
                              idArticulo = item.id;
                          }                        
                    }

                  // ingresar la nueva cantidad

                  let nuevaCantiadArticulo = parseInt(cantidadArtiAnulado) + parseInt(cantidadVenta)
                  // modificacion del articulo
                 
                 let ingresoData = {
                  nombre : nombreArt,
                  PrecioCompra : precioCompraArtiAnulado,
                  PrecioVenta : precioVentaArtiAnulado,
                  cantidad : nuevaCantiadArticulo,
                  categoriaId: categoriaIdArticulo,    
                 }

                 await modificarItem("articulo" , ArticuloVentaId , ingresoData)


                    //Traer el valor del estado de caja y modificarlo

                    let estado = await getItems("EstadoDeCaja");
                    
                    let estadoContado;

                    for (const item of estado) {
                      if (item.id == "3"){
                          estadoContado = item.VentasTrasferencias;
                      }
                    }

                    // modificacion del estado de caja

               
                    let nuevoValorContado = parseInt(estadoContado) - parseInt(totalVenta);

                
                    await modificarItem("EstadoDeCaja" , "3" , {
                        VentasTrasferencias : nuevoValorContado
                    })

             
                    swal({
                        title: "venta en Tarjeta o Trasferencia Anulada",
                        icon: "success",
                      });


                } catch (err) {
                    console.log(err);
                }          
                  location.reload();               
                }))  



            }     


            

    } catch (err) {
       console.log(err);
    }
}


// async function elimVenta(id){

//     try {
        
//         let cliente;
//             var_id=id;
//         let ventaTOTAL;
//         let cli;
//         let deuda;
//         let modificarSaldo;
//         let nuevaDeuda;
//         let tipoVenta=document.getElementById("selector").value;
//         let venta=await axios.get("http://localhost:3001/ventas");
        

  

     
    
    
//         if (tipoVenta=="CuentaCorriente") {
//             let nuevaCantidad;
//             for (let item of venta.data) {
//                     if (item.id==var_id) {
//                         ventaTOTAL=parseInt(item.totalVenta)
//                         cliente=item.clientesId ;
//                 }
               
//             }
            

//             deudaCliente=await axios.get("http://localhost:3001/cuentaCorriente")
//             for (let item of deudaCliente.data) {
//                 if (item.clientesId==cliente) {
//                     nombre=item.cliente;
//                     deuda=parseInt(item.deuda);
//                     cli=item.id;
//                 }
//             }

//             nuevaDeuda=deuda-ventaTOTAL;
       
            

//             modificarSaldo=await axios.put("http://localhost:3001/cuentaCorriente/"+cli,{
//                 cliente:nombre,
//                 deuda: nuevaDeuda,
//                 clientesId:cliente,
//                 estadoVentaId:2
//                 });
                
            
//          }
//               let ventass=await axios.get("http://localhost:3001/ventas");  
//               let tip;
//               let artId;
//               let cantidad;
//               let ventaT;
//               let client;

//             for (let item of ventass.data) {
//                 if (item.id==var_id) {
//                     tip=item.tipoVentaId;
//                     artId=item.articuloId;
//                     cantidad=item.cantidad;
//                     ventaT=item.totalVenta;
//                     client=item.clientesId;
//                     nuevaCantidad=item.cantidad;

//                 }
//             }

//         const borrar = await axios.put("http://localhost:3001/ventas/"+var_id,{
//             tipoVentaId:2,
//             articuloId: artId,
//             cantidad: cantidad,
//             totalVenta:ventaT,
//             clientesId:client,
//             estadoVentaId:2
//         }); 

//         let idArticulo;
//         let nombreArt;
//         let cantidad3;
//         let PC;
//         let PV;
//         let CatID;
        
     
//         let articulo=await axios.get("http://localhost:3001/articulo");
//         for (let item of articulo.data) {
//             if (item.id==artId) {
//                 idArticulo=item.id;
//                 nombreArt=item.nombre;
//                 cantidad3=item.cantidad;
//                 PC=item.PrecioCompra;
//                 PV=item.PrecioVenta;
//                 CatID=item.categoriaId;
//                break; 
//             }
            
//         }
        
//         let modArcticulo=await axios.put("http://localhost:3001/articulo/"+idArticulo,{
//             nombre:nombreArt,
//             cantidad:parseInt(cantidad3+nuevaCantidad),
//             PrecioCompra:PC,
//             PrecioVenta:PV,
//             categoriaId:CatID,
//         })

//         if (tipoVenta=="CuentaCorriente") {
//              let estado=await axios.get("http://localhost:3001/EstadoDeCaja")
//         let totales;
//         let final;
//         for (let item of estado.data) {
//             if (item.id==2) {
//                 totales=item.ventasEnCuentaCorriente;
//             }
//         }
//         final=parseInt(totales)-parseInt(ventaT);

//         let modiEstado=await axios.put("http://localhost:3001/EstadoDeCaja/2",{
//             ventasEnCuentaCorriente:final
//         })
//         }
//         if (tipoVenta=="Contado") {
//             let estado=await axios.get("http://localhost:3001/EstadoDeCaja")
//             let totales;
//             let final;
//             for (let item of estado.data) {
//                 if (item.id==1) {
//                     totales=item.efectivo;
//                 }
//             }
//             final=parseInt(totales)-parseInt(ventaT);
//             let modiEstado=await axios.put("http://localhost:3001/EstadoDeCaja/1",{
//                 efectivo:final
//             })

//         }
       


//     } catch (err) {
//         alert(err)
//     }

// }

