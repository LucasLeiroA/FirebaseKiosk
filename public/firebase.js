import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { collection , addDoc , getFirestore , getDocs , deleteDoc , doc , updateDoc} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js"

// TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyDKwjL-AXdLXSK0-W0FE_0oCi5TnY7ejAA",
    authDomain: "kioskohotel-99a87.firebaseapp.com",
    projectId: "kioskohotel-99a87",
    storageBucket: "kioskohotel-99a87.appspot.com",
    messagingSenderId: "141256873590",
    appId: "1:141256873590:web:aa5500b3f273f2deb8f157"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  const db = getFirestore(app);


 // Aca se deben escribir todas las funciones para exportarlas


 // Funcion para traer los datos de la DB
  export async function getItems(coleccion) {

    const miCollecion = collection(db, `${coleccion}`);
    
    let respuesta = await getDocs(miCollecion);

    let dataDocs = respuesta.docs.map((documento) => {
      let docFormateado = { ...documento.data(), id: documento.id };
      return docFormateado;
    });

    return dataDocs;

  }

 //FUncion para ingresar datos a la base de datos

 export async function IngresarDatos(coleccion , oderData){
  
  const collectionRef = collection(db , `${coleccion}`);

  let respuesta = await addDoc(collectionRef,oderData);

  return respuesta.id;
}


  //Funcion para traer un solo item

  export async function getSingleItem(coleccion,id) {
    try {
      const docRef = doc(db, `${coleccion}`, id);
      const docSnapshot = await getDoc(docRef);
  
      const docFormateado = { ...docSnapshot.data(), id: docSnapshot.id };
      return docFormateado;
    } catch (error) {
      console.log(error);
    }
  }

  export async function getItemsByCategoty(coleccion , id){
    const collectionRef = collection(db,`${coleccion}`) ;
    const queryCategory = query(collectionRef , where("id" , "==" , id));

    const respuesta = await getDocs(queryCategory);
    
    let dataDocs = respuesta.docs.map((documento) => {
        let docFormateado = {...documento.data(), id: documento.id}
        return docFormateado;
    })


    return dataDocs;
}

export const deleteSingleItem = (coleccion , id) => deleteDoc(doc(db, `${coleccion}`, id));

export const modificarItem = (coleccion , id ,  nuevaData) =>

  updateDoc(doc(db, `${coleccion}` , id), nuevaData);