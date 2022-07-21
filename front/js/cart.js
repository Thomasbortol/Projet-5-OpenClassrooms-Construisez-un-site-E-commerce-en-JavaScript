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

////////////////////////////////////////////////////////////  Création et affichage des élément ///////////////////////////////////////////////////////////////////



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



// Function qui permet de choisir le nombre de produits directement au panier
function makeSettings(item){
    const settings = document.createElement("div")                  // Creation
    settings.classList.add("cart__item__content__settings")         // Ajout de class "cart__item__content__settings"

    addQuantityToSettings(settings, item)                           // appel de fonction qui permet de choisir un nombre de produit (par le biais d'un input)
    addSuppressionToSettings(settings, item)                              // appel de fonction qui permet de supprimer un produit       
    return settings
}



// fonction elle enfante tout le contenu de l'item (article) à la balise qui possède l'id cart__items (balise parente de tout le contenu)
function displayArticle(article){
    document.querySelector("#cart__items").appendChild(article)
}

// fonction qui stocke la quantité, calcul le total, et fait le fait apparaitre
function displayTotalQuantity(){
    let total = 0
    const totalQuantiy = document.querySelector("#totalQuantity")
    cart.forEach(item => {
        const totalUnitQuantity = total + item.quantity
        total = totalUnitQuantity
    })
    totalQuantiy.textContent = total
}
// Même fonction écrite dans un version alternative

//function displayTotalQuantity(){
    //const totalQuantiy = document.querySelector("#totalQuantity")               // on séléctionne l'élément d' id #totalQuantity
    //const total = cart.reduce((total, item) => total + item.quantity, 0)        // On stock la donnée dans la constante "total" / cart.reduce remplace ici la boucle foreach 
    //totalQuantiy.textContent = total
//}


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


///////////////////////////////////////////////////////////////////////   Gestion de la quantité    /////////////////////////////////////////////////////////////////////////////


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
    input.addEventListener("input", () => updatePriceQuantity(item.id, input.value, item)) //
    // Quand un changement est déctecté dans l'input, appel la fonction qui met à jour le changement de quantité
    quantity.appendChild(input)
    settings.appendChild(quantity)
}


// fonction qui met à jour le changement de quantité (quantity + price)
function updatePriceQuantity(id, newValue, item){
    const itemToUpdate = cart.find((item) => item.id === id)        // Quand évenement, cherche dans le cart l'id du produit qui correpond à l'enevement
    itemToUpdate.quantity = Number(newValue)                        // update la nouvelle quantité
    item.quantity = itemToUpdate.quantity
    displayTotalQuantity()                                          // Appel les fonctions qui recalculent le prix et la quantité totale
    displayTotalPrice()                                             //                   et fait appraitre
    saveNewDataToCache(item)                                        // Apelle la fonction qui enregistre les modifications de quantité dans le local storage
}

// fonction qui enregistre les modification dans le localStorage
function saveNewDataToCache(item){
    const dataToSave = JSON.stringify(item)             // traduit les données en json et lui donne accés à la quantité
    const key = `${item.id}-${item.color}`    
    localStorage.setItem(key, dataToSave)               // cherche l'id du produit concerné par l'évènement et enregistre sa nouvelle quantité
}




//////////////////////////////////////////////////////////////////////////// Suppression de produit /////////////////////////////////////////////////////////////////////////////////


// Fonction qui créee le raccourcis pour supprimer un produit
function addSuppressionToSettings(settings, item){
    const div = document.createElement("div")
    div.classList.add("cart__item__content__settings__delete")
    div.addEventListener("click", () => deleteItem(item))       // au click sur ce raccourcis, appelle la fonction qui supprime le produit
    const p = document.createElement("p")
    p.textContent = "Supprimer"
    div.appendChild(p)
    settings.appendChild(div)
}


// fonction qui va reconnaitre le produit a supprimer
function deleteItem(item){
    const itemToDelete = cart.findIndex(product => product.id === item.id && product.color === item.color)
    cart.splice(itemToDelete, 1)            // splice selectionne l'item en supprime 1 à partir de l'item séléctionné (donc uniquement ce dernier)
    displayTotalPrice()
    displayTotalQuantity()                  // on appelle les deux fonctions pour recalculer le prix et la quantité totale
    deleteDataFromCache(item)               // appel de la fonction qui supprime le produit du local storage
    deleteArticle(item)                     // appel de la fonction qui va supprimer l'article qui contient le produit (suppression dans la page)
}


// fonction qui supprime l'article
function deleteArticle(item){
    const articleToDelete = document.querySelector(`article[data-id="${item.id}"][data-color="${item.color}"]`)  
    // on séléctionne l'article qui possède l'élément avec l'id et la couleur
    articleToDelete.remove()        // remove supprime l'élément
}


// fonction qui supprime le produit du local storage
function deleteDataFromCache(item){
    const key = `${item.id}-${item.color}`      // on séléctionne la key qui possède l'id et la couleur
    localStorage.removeItem(key)                // remove supprime l'élément (la key)
}





/////////////////////////////////////////////////////////////////////////////////////////  a remonter






