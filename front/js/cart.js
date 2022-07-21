const cart = []; // Pour récupérer les données dans un tableau

recupDataFromLocalStorage()                 // On récupère les item et leurs données du localstorage, on traduit en JSON et on déclare nos produits en "item"
cart.forEach((item) => displayItem(item))   // Pour chaque item on apelle la fonction display (affichage du contenu)



// On traduit les données reçues en JSON
function recupDataFromLocalStorage() {
    const numberOfItems = localStorage.length
    for (let i = 0; i < numberOfItems; i++ ){
        const item = localStorage.getItem(localStorage.key(i)) || ""
        const itemObject = JSON.parse(item)
        cart.push(itemObject)
    } 
}



// fonction qui englobe la création des éléments de la page cart
function displayItem(item){
    const article = makeArticle(item)               // déclaration et appel de la Creation de l'article *
    const imagediv = makeImageDiv(item)             // déclaration et appel de la creation de l'image **
    article.appendChild(imagediv)                   // l'image devient l'enfant de l'article
    
    const cartItemContent = makeCartContent(item)   // déclaration et appel du contenu du produit
    article.appendChild(cartItemContent)            // Le contenu deviens enfant de l'article
    displayArticle(article)                         // on apelle la fonction qui display l'article (affiche tout son contenu)
    displayTotalQuantity()                          // on apelle la fonction qui va faire apparaitre le total de la quantité
    displayTotalPrice()                             // on apelle la fonction qui va faire apparaitre le total du prix
}


// fonction qui stocke la quantité, calcul le total, et fait le fait apparaitre   //fonction écrite dans un version alternative
function displayTotalQuantity(){
    const totalQuantiy = document.querySelector("#totalQuantity")               // on séléctionne l'élément d' id #totalQuantity
    const total = cart.reduce((total, item) => total + item.quantity, 0)        // On stock la donnée dans la constante "total" / cart.reduce remplace ici la boucle foreach (voir fonction "displayTotalPrice")
    totalQuantiy.textContent = total
}


// fonction qui stocke le prix, en calcul le total, et le fait apparaître
function displayTotalPrice(){
    let total = 0                                                      // on crée une variable "total" qui contiendra le prix du total des items
    const totalPrice = document.querySelector("#totalPrice")           // on selectionne l'élément d' id "#totalPrice"
    cart.forEach(item => {                                             // boucle qui va calculer le montant total pour touts les items du panier (price * quantity)
    const totalUnitPrice = item.price * item.quantity                  // Constante qui va contenir le résultat du calcul
    total += totalUnitPrice                                            // on modifie la variable "total" pour qu'elle soit égale au résultat du calcul
})
    totalPrice.textContent = total                                     // on injecte le résultat dans la balise html
}



// creation de la div qui contient les infos produit
function makeCartContent(item){
    const cartItemContent = document.createElement("div")   // création de la div
    cartItemContent.classList.add("cart__item__content")    // On lui donne la classe "cart__item__content"

    const description = makeDescription(item)               // appel de la descritpion du produit
    const settings = makeSettings(item)                     // appel des "settings" du nombre de produits

    cartItemContent.appendChild(description)                // description devient enfant de la div cart__item__content
    cartItemContent.appendChild(settings)                   // settings devient enfant de la div cart__item__content
    return cartItemContent
}


// Function qui permet de choisir le nombre de produits directement au panier
function makeSettings(item){
    const settings = document.createElement("div")                  // Creation
    settings.classList.add("cart__item__content__settings")         // Ajout de class "cart__item__content__settings"

    addQuantityToSettings(settings, item)                           // appel de fonction qui permet de choisir un nombre de produit (par le biais d'un input)
    addSuppressionToSettings(settings)                              // appel de fonction qui permet de supprimer un produit       
    return settings
}



// Fonction qui créee le raccourcis pour supprimer un produit
function addSuppressionToSettings(settings){
    const div = document.createElement("div")
    div.classList.add("cart__item__content__settings__delete")
    const p = document.createElement("p")
    p.textContent = "Supprimer"
    div.appendChild(p)
    settings.appendChild(div)
}


// fonction qui créer l'input pour choisir le nombre de produits
function addQuantityToSettings(settings, item){
    const quantity = document.createElement("div")
    quantity.classList.add("cart__item__content__settings__quantity")           // création de la div et ajout de class
    const p = document.createElement("p")
    p.textContent = "Quantité : "
    quantity.appendChild(p)
    const input = document.createElement("input")                               // création de l'input
    input.type = "number"
    input.classList.add("itemQuantity")
    input.name = "itemQuantity"
    input.min = "1"
    input.max = "100"
    input.value = item.quantity
    input.addEventListener("input", () => updatePriceQuantity(item.id, input.value)) //
    // Quand un changement est déctecté dans l'input, appel la fonction qui met à jour le changement de quantité
    quantity.appendChild(input)
    settings.appendChild(quantity)
}


// fonction qui met à jour le changement de quantité (quantity + price)
function updatePriceQuantity(id, newValue){
    const itemToUpdate = cart.find((item) => item.id === id)        // Quand évenement, cherche dans le cart l'id du produit qui correpond à l'enevement
    itemToUpdate.quantity = Number(newValue)                        // update la nouvelle quantité
    displayTotalQuantity()                                          // Appel les fonctions qui recalculent le prix et la quantité totale
    displayTotalPrice()                                             //                   et fait appraitre
}

// Function qui va créer la description ( nom + couleur + prix unitaire) 
function makeDescription(item){
    const description = document.createElement("div")
    description.classList.add("cart__item__content__description")
    
    const h2 = document.createElement("h2")
    h2.textContent = item.name
    const p = document.createElement("p")
    p.textContent = item.color
    const p2 = document.createElement("p")
    p2.textContent = item.price + " €"
    
    description.appendChild(h2)
    description.appendChild(p)
    description.appendChild(p2)
    return description
}

/////////////////////////////////////////////////////////////////////////////////////////  a remonter




// fonction elle enfante tout le contenu de l'item (article) à la balise qui possède l'id cart__items (balise parente de tout le contenu)
function displayArticle(article){
    document.querySelector("#cart__items").appendChild(article)
}


// fonction création de l'article
function makeArticle(item){
    const article = document.createElement("article")           // création de la balise article
    article.classList.add("cart__item")                         // ajout de la class cart__item
    article.dataset.id = item.id                                
    article.dataset.color = item.color
    return article
}


// fonction création de l'image
function makeImageDiv(item){
    const div = document.createElement("div")               // création d'une balise div qui contiendra l'image
    div.classList.add("cart__item__img")                    // ajout de la class cart__item__img
    const image = document.createElement("img")             // creation de la balise image
    image.src = item.imageUrl                               // ajout de sourrce et text alt
    image.alt = item.altTxt
    div.appendChild(image)                                  // la balise img devient enfant de la balise div
    return div
}

