

var fecha = new Date;



        
    


// let url = window.location.href;

// localStorage.setItem("urlPatallaIncial" , url);

// let inicio = localStorage.getItem("urlInicio");
// let pantalla = localStorage.getItem("urlPatallaIncial");
// let admin = localStorage.getItem("urlAdmin");
// let ventas = localStorage.getItem("urlVentas");
// let anulacion = localStorage.getItem("urlAnulacion");
// let movimientos = localStorage.getItem("UrlMovimientos");
// let registrar = localStorage.getItem("urlRegistrarClientes");
// let cobranza = localStorage.getItem("urlCobranza");
// let reportes = localStorage.getItem("urlReportes");

// let urls = [inicio , pantalla , admin , ventas , anulacion , movimientos , registrar , cobranza , reportes ]


// UrlAnterior = document.referrer;

// if( (UrlAnterior !== inicio) ){

//    window.location= "../index.html";
// }

function cierre(){
        axios.put("http://localhost:3001/login/" + 1, {
          logeado: false,
    });
}