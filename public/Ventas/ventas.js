import { getItems, IngresarDatos, modificarItem } from "../firebase.js";

window.onload = principal;

function principal() {
  document
    .getElementById("mostrar_ventaContado")
    .addEventListener("click", mostarContado);
  document
    .getElementById("mostrar_ventaCuentaCorriente")
    .addEventListener("click", mostrarCuentaCorriente);
  document
    .getElementById("mostrar_ventaTarjeta")
    .addEventListener("click", mostrarTarjeta);

  document
    .getElementById("aceptarVenta")
    .addEventListener("click", aceptarVentaContado);
  document
    .getElementById("buscador")
    .addEventListener("click", buscarArticuloContado);

  document
    .getElementById("cancelarVenta")
    .addEventListener("click", cancelarVentaContado);

  document
    .getElementById("cancelarVenta2")
    .addEventListener("click", cancelarVentaContado);
  document
    .getElementById("cancelarVenta2")
    .addEventListener("click", cancelarVentaCuentaCorriente);
  document
    .getElementById("aceptarVenta2")
    .addEventListener("click", aceptarVentaCuentaCorriente);

  document
    .getElementById("buscador1")
    .addEventListener("click", buscardorArticulosCuentaCorriente);
  document
    .getElementById("buscarClientes")
    .addEventListener("click", buscadorClienteCuentaCorriente);

  document
    .getElementById("buscador_articulo_transferencia")
    .addEventListener("click", buscadorArticuloTarjeta);

  document
    .getElementById("cancelarVenta_tarjeta")
    .addEventListener("click", cancelarVentaTarjeta);
  document
    .getElementById("aceptarVenta_tarjeta")
    .addEventListener("click", aceptarVentaTarjeta);
}
var var_id;
var var_idCliente;
var fecha = new Date();
var dia = fecha.getDate();
var mes = 1 + fecha.getMonth();
var ano = fecha.getFullYear()

console.log(dia);
console.log(mes);
console.log(ano);
function mostarContado() {
  document.getElementById("seccion1").style.display = "block";
  document.getElementById("seccion2").style.display = "none";
  document.getElementById("seccion3").style.display = "none";
  document.getElementById("titulo_resultado").style.display = "none";
  document.getElementById("selectorArticulos").innerHTML = "";
  document.getElementById("seccion1").style.backgroundColor = "green";
  document.getElementById("div1").style.backgroundColor = "white";
}
function mostrarCuentaCorriente() {
  document.getElementById("seccion1").style.display = "none";
  document.getElementById("seccion2").style.display = "block";
  document.getElementById("seccion3").style.display = "none";
  document.getElementById("titulo_resultado").style.display = "none";
  document.getElementById("selectorArticulos").innerHTML = "";
  document.getElementById("seccion2").style.backgroundColor =
    "rgb(27, 156, 199)";
  document.getElementById("div1").style.backgroundColor = "white";
}
function mostrarTarjeta() {
  document.getElementById("seccion1").style.display = "none";
  document.getElementById("seccion2").style.display = "none";
  document.getElementById("seccion3").style.display = "block";
  document.getElementById("titulo_resultado").style.display = "none";
  document.getElementById("selectorArticulos").innerHTML = "";
  document.getElementById("seccion3").style.backgroundColor =
    "rgb(223, 199, 17)";
  document.getElementById("div1").style.backgroundColor = "white";
}

const selectorArticulos = document.getElementById("selectorArticulos");

async function buscarArticuloContado() {
  document.getElementById("div1").style.backgroundColor = "beige";
  document.getElementById("titulo_resultado").style.display = "block";
  document.getElementById("selectorArticulos").innerHTML = `<td></td>`;

  let productos = await getItems("articulo");

  let nombreSolicitado = document.getElementById("articuloContado").value;

  let texto = nombreSolicitado.toLowerCase();
  let nombre;

  for (let item of productos) {
    nombre = item.nombre.toLowerCase();
    if (nombre.indexOf(texto) != -1) {
      document.getElementById(
        "selectorArticulos"
      ).innerHTML += `<td><Button class="btn btn-outline-dark" id="btn-seleccionar"  data-id="${item.id}">${item.nombre}</Button></td><br>`;
    }
  }
  const btnsSeleccionar =
    selectorArticulos.querySelectorAll("#btn-seleccionar");
  btnsSeleccionar.forEach((btn) =>
    btn.addEventListener("click", async (e) => {
      try {
        let id = e.target.dataset.id;
        var_id = id;
        let articulo = await getItems("articulo");
        for (const item of articulo) {
          if (item.id == id) {
            document.getElementById("articuloContado").value = item.nombre;
          }
        }
      } catch (error) {
        console.log(error);
      }
    })
  );

  if (nombre == "") {
    document.getElementById(
      "selectorArticulos"
    ).innerHTML += ` <td>No se encontraron resultados de la busqueda</td>`;
  }
}

let cambioContado = document.getElementById("cantidadContado")
let intervaloContado;
cambioContado.addEventListener("keyup", function(){
  clearInterval(intervaloContado); //Al escribir, limpio el intervalo
  intervaloContado = setInterval(async function(){ //Y vuelve a iniciar
    let precio;

    let total;
    let nombreArt = document.getElementById("articuloContado").value;
    let articulo = await getItems("articulo");
    let cantidad = document.getElementById("cantidadContado").value;
  
    for (let item of articulo) {
      if (nombreArt == item.nombre) {
        precio = item.PrecioVenta;
      }
    }
  
    total = parseInt(precio * cantidad);
  
    document.getElementById("totalContado").value = total;
      clearInterval(intervaloContado); //Limpio el intervalo
  }, 500);
}, false);



function cancelarVentaContado() {
  document.getElementById("cliente").value = "";
  document.getElementById("articuloContado").value = "";
  document.getElementById("cantidadContado").value = "";
  document.getElementById("totalContado").value = "0";
}

async function aceptarVentaContado() {
  let articulo = await getItems("articulo");

  let nombre = document.getElementById("articuloContado").value;
  let cantidad = parseInt(document.getElementById("cantidadContado").value);
  let total = document.getElementById("totalContado").value;
  let PC;
  let PV;
  let idCat;
  let artId;
  let cant;

  for (let item of articulo) {
    if (item.nombre == nombre) {
      artId = item.id;
      cant = item.cantidad;
      PV = item.PrecioVenta;
      PC = item.PrecioCompra;
      idCat = item.categoriaId;
    }
  }
if (nombre != "") {

          if (cantidad > 0 && cantidad <= cant && total > 0 ) {
            let EstadoCaja = await getItems("EstadoDeCaja");
            let totalViejo;

            for (let item of EstadoCaja) {
              if (item.id == 1) {
                totalViejo = item.efectivo;
              }
            }

            let total1 = parseInt(totalViejo) + parseInt(total);

            let nuevoDato = {
              efectivo: total1,
            };
            let idEstado = "1";
            await modificarItem("EstadoDeCaja", idEstado, nuevoDato);

            await IngresarDatos("ventas", {
              tipoVentaId: 1,
              articuloId: artId,
              cantidad: cantidad,
              totalVenta: total,
              estadoVenta: 1,
              dia: dia,
              mes: mes,
              ano:ano
            });

            let nuevaCantidad = cant - cantidad;

            let newData = {
              nombre: nombre,
              cantidad: nuevaCantidad,
              PrecioCompra: PC,
              PrecioVenta: PV,
              categoriaId: idCat,
            };

            await modificarItem("articulo", artId, newData);

            swal({
              title: "Venta Realizada",
              icon: "success",
            });
          

            document.getElementById("articuloContado").value = "";
            document.getElementById("cantidadContado").value = "";
            document.getElementById("totalContado").value = "0";
          } else if (cant == 0) {
            swal({
              title: "NO hay stock de este procuto",
              icon: "error",
            });
          
          } else {
            swal({
              title: "La cantidad selecciona tiene que se mayor a 0 o menor que " +
              cant +
              " ya que esa es la cantidad de " +
              nombre +
              " disponible.",
              icon: "error",
            });
          
            document.getElementById("articuloContado").value = "";
            document.getElementById("cantidadContado").value = "";
            document.getElementById("totalContado").value = "0";
          }
}else{
  swal({
    title: "Tiene que ingresar un producto",
    icon: "error",
  });
}
  
}

async function buscadorClienteCuentaCorriente() {
  document.getElementById("div1").style.backgroundColor = "beige";
  document.getElementById("titulo_resultado").style.display = "block";
  document.getElementById("selectorArticulos").innerHTML = `<td></td>`;

  let clientes = await getItems("clientes");

  let nombresolicitado = document.getElementById("cliente").value;

  let texto = nombresolicitado.toLowerCase();

  let nombre;

  for (let item of clientes) {
    nombre = item.nomYape.toLowerCase();
    if (nombre.indexOf(texto) != -1) {
      document.getElementById(
        "selectorArticulos"
      ).innerHTML += `<td><Button class="btn btn-outline-dark" id="btn-selec-cliente" data-id="${item.id}">${item.nomYape}</Button></td><br>`;
    }
  }

  const btnsSeleccionarCliente =
    selectorArticulos.querySelectorAll("#btn-selec-cliente");
  btnsSeleccionarCliente.forEach((btn) =>
    btn.addEventListener("click", async (e) => {
      try {
        let id = e.target.dataset.id;
        var_id = id;
        let clientes = await getItems("clientes");
        for (const item of clientes) {
          if (item.id == id) {
            document.getElementById("cliente").value = item.nomYape;
          }
        }
      } catch (error) {
        console.log(error);
      }
    })
  );
}

async function buscardorArticulosCuentaCorriente() {
    
  document.getElementById("div1").style.backgroundColor = "beige";
  document.getElementById("selectorArticulos").innerHTML = `<td></td>`;
  document.getElementById("titulo_resultado").style.display = "block";

  let productos = await getItems("articulo");

  let nombreSolicitado = document.getElementById(
    "articuloCuentaCorriente"
  ).value;
  let texto = nombreSolicitado.toLowerCase();
  let nombre;

  for (let item of productos) {
    nombre = item.nombre.toLowerCase();
    if (nombre.indexOf(texto) != -1) {
      document.getElementById(
        "selectorArticulos"
      ).innerHTML += `<td><Button class="btn btn-outline-dark" id="btn-selec-articulo" data-id="${item.id}">${item.nombre}</Button></td><br>`;
    }
  }

  const btnsSeleccionarArticulo =
  selectorArticulos.querySelectorAll("#btn-selec-articulo");
  btnsSeleccionarArticulo.forEach((btn) =>
  btn.addEventListener("click", async (e) => {
    try {
      let id = e.target.dataset.id;
      var_id = id;
      let articulo = await getItems("articulo");
      for (const item of articulo) {
        if (item.id == id) {

          document.getElementById("articuloCuentaCorriente").value = item.nombre;

        }
      }
    } catch (error) {
      console.log(error);
    }
  })
);




  if (nombre == "") {
    document.getElementById(
      "selectorArticulos"
    ).innerHTML += ` <td>No se encontraron resultados de la busqueda</td>`;
  }
}



async function aceptarVentaCuentaCorriente() {
  let articulo = await getItems("articulo");

  let nombreCliente = document.getElementById("cliente").value;

  let nombre = document.getElementById("articuloCuentaCorriente").value;
  let cantidad = parseInt(
    document.getElementById("cantidadCuentaCorriente").value
  );

  let total = document.getElementById("TotalCuentaCorriente").value;
  let PC;
  let PV;
  let idCat;
  let artId;
  let cant;
  let comprobacion;
  let idCuenta;
  let TotalCuenta;
  let total1;
  let clienteid;

  try {
    let cliente = await getItems("clientes");
    for (let item of cliente) {
      if (item.nomYape == nombreCliente) {
        clienteid = item.id;
      }
    }

    for (let item of articulo) {
      if (item.nombre == nombre) {
        artId = item.id;
        cant = item.cantidad;
        PV = item.PrecioVenta;
        PC = item.PrecioCompra;
        idCat = item.categoriaId;
      }
    }
          if (nombreCliente != "") {
             if (nombre != "") {

                  if (cantidad > 0 && cantidad <= cant && total > 0 ) {
                    let estado = await getItems("EstadoDeCaja");
                    let totales;
                    let final;
                    for (let item of estado) {
                      if (item.id == 2) {
                        totales = item.ventasEnCuentaCorriente;
                      }
                    }
                    final = parseInt(totales) + parseInt(total);
                    let idEstado = "2";
                    let newEstado = {
                      ventasEnCuentaCorriente: final,
                    }
                    await modificarItem ("EstadoDeCaja" , idEstado , newEstado);

                    let newVenta={
                      tipoVentaId: 2,
                      articuloId: artId,
                      cantidad: cantidad,
                      totalVenta: total,
                      clientesId: clienteid,
                      estadoVenta: 1,
                      dia: dia,
                      mes: mes,
                      ano:ano
                    }
                    let article = await IngresarDatos("ventas", newVenta );

                    let nuevaCantidad = cant - cantidad;
                    let ArtiModificado = {
                      nombre: nombre,
                        cantidad: nuevaCantidad,
                        PrecioCompra: PC,
                        PrecioVenta: PV,
                        categoriaId: idCat,
                    }
                    let restaDeCantidad = await modificarItem("articulo" , artId , ArtiModificado );

                    let cuenta = await getItems("cuentaCorriente");

                    for (let item of cuenta) {
                      if (item.cliente == nombreCliente) {
                        idCuenta = item.id;
                        comprobacion = true;
                        total1 = item.deuda;
                      }
                    }

                    TotalCuenta = parseInt(total1) + parseInt(total);

                    if (comprobacion == true) {
                    await modificarItem("cuentaCorriente" , idCuenta ,
                      {   cliente: nombreCliente,
                          clientesId: clienteid,
                          deuda: TotalCuenta,
                        }
                      );
                    } else {
                      await IngresarDatos("cuentaCorriente", {
                        cliente: nombreCliente,
                        clientesId: clienteid,
                        deuda: total,
                      });
                    }
                    document.getElementById("articuloCuentaCorriente").value = "";
                    document.getElementById("cantidadCuentaCorriente").value = "";
                    document.getElementById("TotalCuentaCorriente").value = "0";
                    swal({
                      title: "Venta Realizada",
                      icon: "success",
                    });
                  } else if (cant == 0) {
                  swal({
                    title: "NO hay stock de este procuto",
                    icon: "error",
                  });
                  } else {
                  swal({
                    title: "La cantidad selecciona tiene que se mayor a 0 o menor que " +
                    cant +
                    " ya que esa es la cantidad de " +
                    nombre +
                    " disponible.",
                    icon: "error",
                  });
                
                  document.getElementById("cliente").value = "";
                  document.getElementById("articuloCuentaCorriente").value = "";
                  document.getElementById("cantidadCuentaCorriente").value = "";
                  document.getElementById("TotalCuentaCorriente").value = "0";
                }
      }else{
        swal({
          title: "Tiene que ingresar un producto",
          icon: "error",
        });
      }
    }else{
      swal({
        title: "Tiene que ingresar el cliente",
        icon: "error",
      });
    }
            
  } catch (err) {
    console.log(err);
  }
}

let cambioCuentaCorriente = document.getElementById("cantidadCuentaCorriente")
let intervaloCC;
cambioCuentaCorriente.addEventListener("keyup", function(){
  clearInterval(intervaloCC); //Al escribir, limpio el intervalo
  intervaloCC = setInterval(async function(){ //Y vuelve a iniciar
    let precio;

    let total;
    let nombreArt = document.getElementById("articuloCuentaCorriente").value;
    let articulo = await getItems("articulo");
    let cantidad = document.getElementById("cantidadCuentaCorriente").value;
  
    for (let item of articulo) {
      if (nombreArt == item.nombre) {
        precio = item.PrecioVenta;
      }
    }
  
    total = parseInt(precio * cantidad);
  
    document.getElementById("TotalCuentaCorriente").value = total;
      clearInterval(intervaloCC); //Limpio el intervalo
  }, 500);
}, false);


function cancelarVentaCuentaCorriente() {
  document.getElementById("cliente").value = "";
  document.getElementById("articuloCuentaCorriente").value = "";
  document.getElementById("cantidadCuentaCorriente").value = "";
  document.getElementById("TotalCuentaCorriente").value = "0";
}



async function buscadorArticuloTarjeta() {
  document.getElementById("div1").style.backgroundColor = "beige";
  document.getElementById("titulo_resultado").style.display = "block";
  document.getElementById("selectorArticulos").innerHTML = `<td></td>`;

  let productos = await getItems("articulo");

  let nombreSolicitado = document.getElementById("articuloContado").value;

  let texto = nombreSolicitado.toLowerCase();
  let nombre;

  for (let item of productos) {
    nombre = item.nombre.toLowerCase();
    if (nombre.indexOf(texto) != -1) {
      document.getElementById(
        "selectorArticulos"
      ).innerHTML += `<td><Button  class="btn btn-outline-dark" id="btn-art-tarjeta" data-id="${item.id}">${item.nombre}</Button></td><br>`;  
    
    } 
 }

        const btnsSelecArtTarjeta =
        selectorArticulos.querySelectorAll("#btn-art-tarjeta");
        btnsSelecArtTarjeta.forEach((btn) =>    
            btn.addEventListener("click", async (e) => {
                try {
                    let id = e.target.dataset.id;
                    var_id = id;
                    let articulo = await getItems("articulo");
                    for (const item of articulo) {
                    if (item.id == id) {
                        document.getElementById("articuloTarjeta").value = item.nombre;
                    }
                    }
                } catch (error) {
                    console.log(error);
                }
        })
);





  if (nombre == "") {
    document.getElementById(
      "selectorArticulos"
    ).innerHTML += ` <td>No se encontraron resultados de la busqueda</td>`;
  }
}



let cambioTarjeta = document.getElementById("cantidad_tarjeta")
let intervaloTarjeta;
cambioTarjeta.addEventListener("keyup", function(){
  clearInterval(intervaloTarjeta); //Al escribir, limpio el intervalo
  intervaloTarjeta = setInterval(async function(){ //Y vuelve a iniciar
    let precio;
    let total;
  
    let nombreArt = document.getElementById("articuloTarjeta").value;
  
    let articulo = await getItems("articulo");
    
    let cantidad = document.getElementById("cantidad_tarjeta").value;
  
    for (let item of articulo) {
      if (nombreArt == item.nombre) {
        precio = item.PrecioVenta;
      }
    }
  
    total = parseInt(precio * cantidad);
  
    document.getElementById("total_tarjeta").value = total;
      clearInterval(intervaloTarjeta); //Limpio el intervalo
  }, 500);
}, false);


function cancelarVentaTarjeta() {
  document.getElementById("articuloTarjeta").value = "";
  document.getElementById("cantidad_tarjeta").value = "";
  document.getElementById("total_tarjeta").value = "0";
}

async function aceptarVentaTarjeta() {

  let articulo = await getItems("articulo");

  let nombre = document.getElementById("articuloTarjeta").value;
  let cantidad = parseInt(document.getElementById("cantidad_tarjeta").value);
  let total = document.getElementById("total_tarjeta").value;
  let PC;
  let PV;
  let idCat;
  let artId;
  let cant;

  for (let item of articulo) {
    if (item.nombre == nombre) {
      artId = item.id;
      cant = item.cantidad;
      PV = item.PrecioVenta;
      PC = item.PrecioCompra;
      idCat = item.categoriaId;
    }
  }

  if (nombre != "") {
    if (cantidad > 0 && cantidad <= cant && total > 0 ) {
    try {
      let totales = await getItems("EstadoDeCaja");

      let totalViejo;

      for (let item of totales) {
        if (item.id == 3) {
          totalViejo = item.VentasTrasferencias;
        }
      }

      let total1 = parseInt(totalViejo) + parseInt(total);

       await modificarItem("EstadoDeCaja", "3", {
        VentasTrasferencias: total1,
      });

       await IngresarDatos("ventas", {
        tipoVentaId: 3,
        articuloId: artId,
        cantidad: cantidad,
        totalVenta: total,
        estadoVenta: 1,
        dia: dia,
        mes: mes,
        ano:ano
      });

      let nuevaCantidad = cant - cantidad;

      await modificarItem("articulo" , artId ,
        {
          nombre: nombre,
          cantidad: nuevaCantidad,
          PrecioCompra: PC,
          PrecioVenta: PV,
          categoriaId: idCat,
        }
      );

      swal({
        title: "Venta Realizada",
        icon: "sucess",
      });
      document.getElementById("articuloTarjeta").value = "";
      document.getElementById("cantidad_tarjeta").value = "";
      document.getElementById("total_tarjeta").value = "0";
    } catch (err) {
      alert(err);
    }
  } else if (cant == 0) {
    swal({
      title: "NO hay stock de este procuto",
      icon: "error",
    });
  } else {
    swal({
      title:   "La cantidad selecciona tiene que se mayor a 0 o menor que " +
      cant +
      " ya que esa es la cantidad de " +
      nombre +
      " disponible.",
      icon: "error",
    });

    document.getElementById("articuloTarjeta").value = "";
    document.getElementById("cantidad_tarjeta").value = "";
    document.getElementById("total_tarjeta").value = "0";
  }
  }else{
    swal({
      title: "Tiene que ingresar un producto",
      icon: "error",
    });
  }
  
}
