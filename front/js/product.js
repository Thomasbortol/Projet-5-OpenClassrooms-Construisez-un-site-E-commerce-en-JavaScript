// Récupération de l'id du produit
const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
const productId = urlParams.get("id")
let prix = 0
let imgLink, imgAltTxt

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
    if (checkErrorValue(color, quantity)) return  // * vérifie si les valeurs sont correctes ( bloque la redirection si valeurs nulles) *
    saveOrder(color, quantity)                    // ** Enregistre les data **
    rootToCart()                                  // *** Redirige sur la page panier ***
}




// * Verifie si il y a des erreurs dans les valeurs ( null)  Alert et bloque la redirection si présence d'un null *
function checkErrorValue(color, quantity){
    if (color == null || color === "" || quantity == null || quantity == 0){
        alert("Selectionnez une couleur et une quantité")
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
    altTxt : imgAltTxt
    }
    localStorage.setItem(productId, JSON.stringify(productData))
}




// *** Redirige vers la page panier ***
function rootToCart(){
    window.location.href = "cart.html"
}