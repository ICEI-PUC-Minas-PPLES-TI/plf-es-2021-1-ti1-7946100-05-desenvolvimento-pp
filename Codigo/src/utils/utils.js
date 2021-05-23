import { db, auth } from "../config/firebase.config"

export function updateDoc(colecao, valores, documento, setFeito, setErros) {
  setFeito(false)
  return db
    .collection(colecao)
    .doc(documento)
    .update(valores)
    .then(() => {
      console.log("Document successfully written!")
      setFeito(true)
    })
    .catch(error => {
      // setErros(error)
      console.error("Error writing document: ", error)
    })
}

export function createDoc(colecao, valores, setFeito, setErros) {
  return db
    .collection(colecao)
    .add(valores)
    .then(() => {
      setFeito(true)
      console.log("Document successfully written!")
    })
    .catch(error => {
      setErros(error)
      console.error("Error writing document: ", error)
    })
}

export function removeDoc(colecao, documento, setFeito, setErros) {
  setFeito(false)
  db.collection(colecao)
    .doc(documento)
    .delete()
    .then(() => {
      setFeito(true)
      console.log("Document successfully deleted!")
    })
    .catch(error => {
      setErros(error)
      console.error("Error removing document: ", error)
    })
}

export function readDoc(colecao, documento, setValores, setFeito, setErros) {
  return db
    .collection(colecao)
    .doc(documento)
    .get()
    .then(doc => {
      if (doc.exists) {
        setFeito(true)
        setValores(doc.data())
        console.log("Document data:", doc.data())
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!")
      }
    })
    .catch(error => {
      setErros(error)
      console.log("Error getting document:", error)
    })
}

export function readDocsUmaCondicao(
  colecao,
  propriedade,
  valorPropriedade,
  setValores,
  setFeito,
  setErros
) {
  return db
    .collection(colecao)
    .where(propriedade, "==", valorPropriedade)
    .get()
    .then(querySnapshot => {
      let valores = []
      querySnapshot.forEach(doc => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data())
        valores.push({ ...doc.data(), docId: doc.id })
      })
      setValores(valores)
      setFeito(true)
    })
    .catch(error => {
      setErros(error)
      console.log("Error getting document:", error)
    })
}

export function readDocsDuasCondicoes(
  colecao,
  propriedade1,
  valorPropriedade1,
  propriedade2,
  valorPropriedade2,
  setValores,
  setFeito,
  setErros
) {
  return db
    .collection(colecao)
    .where(propriedade1, "==", valorPropriedade1)
    .where(propriedade2, "==", valorPropriedade2)
    .get()
    .then(querySnapshot => {
      let valores = []
      querySnapshot.forEach(doc => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data())
        valores.push({ ...doc.data(), docId: doc.id })
      })
      setValores(valores)
      setFeito(true)
    })
    .catch(error => {
      setErros(error)
      console.log("Error getting document:", error)
    })
}

export function login(email, password, setErros) {
  return auth
    .signInWithEmailAndPassword(email, password)
    .then(userCredential => {
      // Signed in
      // var user = userCredential.user
      console.log(userCredential)
      // ...
    })
    .catch(error => {
      // var errorCode = error.code
      var errorMessage = error.message
      setErros(errorMessage)
    })
}

export function signUp(email, password, setErros){
    return auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      // var user = userCredential.user;
    })
    .catch((error) => {
      // var errorCode = error.code;
      var errorMessage = error.message;
      setErros(errorMessage)
    });
}


export function logout(){
    return auth.signOut().then(() => {
        // Sign-out successful.
      }).catch((error) => {
        // An error happened.
      });
}