// Récupération de l'id du produit
const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
const productId = urlParams.get("id")
let prix = 0
let imgLink, imgAltTxt, productName

//Résupération de l'objet grâce à l'id dans l'api
fetch(`http://localhost:3000/api/products/${productId}`)
    .then((res) => res.json())
    .then(res => uniqueObject(res))



//Ajout des éléments de l'objet dans l'api
function uniqueObject(canape) {
    // On récupère toutes les données du canapé
    const { altTxt, colors, description, imageUrl, name, price } = canape
    prix = price
    imgLink = imageUrl
    imgAltTxt = altTxt
    productName = name
    // On appelle nos fonctions qui vont creer ou s'imbriquer dans les éléments html
    makeProductImg(imageUrl, altTxt)
    makeProductTitle(name)
    makeProductPrice(price)
    makeProductDescription(description)
    makeProductColors(colors)
}


// Fonctions //


// Création de l'img ( avec url et textalt)
function makeProductImg(imageUrl, altTxt){
    const  productImg = document.createElement("img")
    productImg.src = imageUrl
    productImg.alt = altTxt
    const parent = document.querySelector(".item__img")
    parent.appendChild(productImg)
}


// Imbrication du titre dans l'élément #title
function makeProductTitle(name){
    const productTitle = document.querySelector("#title")
    productTitle.textContent = name
}


// Imbrication du prix dans l'élément #price
function makeProductPrice(price){
    const productPrice = document.querySelector("#price")
    productPrice.textContent = price
}


// Imbrication de la déscription dans l'élément #déscription
function makeProductDescription(description){
    const productDescription = document.querySelector("#description")
    productDescription.textContent = description
}


// Création de différentes otpion dans l'élément #colors
function makeProductColors(colors){
    const productColors = document.querySelector ("#colors")  //imbricattion des couleurs dans l'élément #colors
    colors.forEach((color) => {                               // loop sur les couleurs (valeurs)
        const option = document.createElement ("option")      // création d'une option pour chaque valeur
        option.value = color
        option.textContent = color
        productColors.appendChild(option)                     // imbrication de chaque option à sa valeur
    })
    
}




//    LOCAL STORAGE    ///




// On séléctionne le bouton et on lui donne un événement au click
const button = document.querySelector("#addToCart")
button.addEventListener("click", orderClick)




// Fonction qui détermine l'évènement du click
function orderClick(){
    const color = document.querySelector("#colors").value
    const quantity = document.querySelector("#quantity").value  // Va chercher les valeurs ( au moment du click) de couleur et quantité
    if (checkErrorValue(color, quantity)) return  // * vérifie si les valeurs sont incorrectes ( bloque la redirection si valeurs nulles) *
    saveOrder(color, quantity)                    // ** Enregistre les data **
    //rootToCart()                                  // *** Redirige sur la page panier ***
}




// * Verifie si il y a des erreurs dans les valeurs ( null)  Alerte, change de couleur et bloque la redirection si présence d'un null *
function checkErrorValue(color, quantity){
    let checkColor = document.querySelector("#colors");
    let checkQuantity = document.querySelector("#quantity");
    if (color == null || color === "" || quantity == null || quantity == 0){
        alert("Selectionnez une couleur et une quantité")
        checkColor.style.backgroundColor = "#FBBCBC"
        checkQuantity.style.backgroundColor = "#FBBCBC"
        return true
    }
}



// **  Enregistre les data et les transformes en objet JSON **
function saveOrder(color, quantity){
    const productData = {
    id : productId,
    color : color,
    quantity : Number(quantity),
    price : prix,
    imageUrl : imgLink,
    altTxt : imgAltTxt,
    name : productName
    }


    // Declaration de variable dans laquelle on met les keys et values qui sont dans le local storage
    let productSaveToLocalStorage = JSON.parse(localStorage.getItem("produit"));
    // .parse transforme un "objet" JSON en langage javascript

    //fonction ajouter un produit dans le localstorage ( Ajout des productData dans le tableau (l.146) et transformation en JSON)
    const ajoutProduitLocalStorage = () => {
        productSaveToLocalStorage.push(productData);
        localStorage.setItem("produit", JSON.stringify(productSaveToLocalStorage));
        // .stringify transforme en format JSON
    }

    // Si il y a dejà un produit enregistré dans le local storage On push les données dans le tableau (Key + value)
    if (productSaveToLocalStorage) {
        ajoutProduitLocalStorage();
    } 
    // Si il n'y a pas de produit enregistré dans le local storage On crée un tableau, et on push les données (Key + Value)
    else {
        productSaveToLocalStorage = [];
        ajoutProduitLocalStorage();
    }
}




// *** Redirige vers la page panier ***
function rootToCart(){
    window.location.href = "cart.html"
}