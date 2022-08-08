// Declaration de variable dans laquelle on met les keys et values qui sont dans le local storage
let productSaveToLocalStorage = JSON.parse(localStorage.getItem("produit"));
// .parse transforme un "objet" JSON en langage javascript






//////////////// Affichage des produits ///////////////////////




// On selectionne l'élément d'id #cart__items pour injecter l'html
const blockProduit = document.querySelector("#cart__items");
let panier = [];
// Si le panier est vide
if (productSaveToLocalStorage === null || productSaveToLocalStorage == 0) {
    let titreIfPanierVide = document.querySelector("h1");
    let sectionCart = document.querySelector(".cart");

    titreIfPanierVide.innerHTML = "Votre panier est vide";
    sectionCart.style.display = "none";
} 
// Si le panier n'est pas vide
else {
    
    for (i = 0; i < productSaveToLocalStorage.length; i++){
    panier = panier + `\
    <article class="cart__item" data-id="${productSaveToLocalStorage[i].id}" data-color="${productSaveToLocalStorage[i].color}">\
    <div class="cart__item__img">\
        <img src="${productSaveToLocalStorage[i].imageUrl}" alt="${productSaveToLocalStorage[i].altTxt}">\
    </div>\
    <div class="cart__item__content">\
        <div class="cart__item__content__description">\
        <h2>${productSaveToLocalStorage[i].name}</h2>\
        <p>${productSaveToLocalStorage[i].color}</p>\
        <p>${productSaveToLocalStorage[i].price} €</p>\
        </div>\
        <div class="cart__item__content__settings">\
            <div class="cart__item__content__settings__quantity">\
            <p>Qté :</p>\
            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${productSaveToLocalStorage[i].quantity}">\
            </div>\
            <div class="cart__item__content__settings__delete">\
            <p class="deleteItem">Supprimer</p>\
            </div>\
        </div>\
    </div>\
    </article>`;
    }

    //injection html dans la page panier
    blockProduit.innerHTML = panier;
}





////////////// Suppression d'un article ///////////////


// Selection du bouton supprimer et mise en forme d'Array pour pouvoir utiliser addeventListener
buttonSupr = Array.from(document.querySelectorAll(".deleteItem")); // Mise en forme nodeliste ===> Array
let tab = [];

// supprimer l'élément
for (let i = 0; i < buttonSupr.length; i++){
    buttonSupr[i].addEventListener("click", (e) => {
        e.preventDefault();
        buttonSupr[i].parentElement.style.display = "none";

        let tab = productSaveToLocalStorage;
        tab.splice([i],1);

        productSaveToLocalStorage = localStorage.setItem("produit", JSON.stringify(tab));

        window.location.href = "cart.html";
    })
};



//////////////// Total prix du panier ////////////////////////

// déclaration variable en tableau pour y mettre les prix et quantités qui sont présents dans le panier
let calculTotalPrix = []
let calculTotalQuantity = []


// aller chercher les prix et les quantités
pickPriceAndQuantity()
function pickPriceAndQuantity(){
    for (let j = 0; j < productSaveToLocalStorage.length; j++){
        // On déclare le prix unitaire des articles
        let prixArticleUnitairePanier = productSaveToLocalStorage[j].price;
        // On déclare la quantité des articles
        let quantiteArticle = productSaveToLocalStorage[j].quantity;
        // On multiplie le prix unitaire par la quantité (Pour un article, la boucle se charge de le faire sur touts les produits présents)
        let prixParArticle = prixArticleUnitairePanier * quantiteArticle;
        // On push les résultats dans le tableau variable ( un résultat de multiplication pour chaque produit unique)
        calculTotalPrix.push(prixParArticle)
        // On push le total de la quantité uniquement pour pouvoir calculer uniquement la quantité
        calculTotalQuantity.push(quantiteArticle);
    }
}

// On additionne les résultats des multiplication pour obtenir le total et on l'affiche
displayTotalPrice();
function displayTotalPrice(){
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    // On utilise la method reduce pour aditionner les prix
    const prixTotal = calculTotalPrix.reduce(reducer, 0);
    //Affichage du total du prix
    let totalPrice = document.querySelector("#totalPrice");
    totalPrice.textContent = prixTotal;
}


// On aditionne les résultats de la quantité pour obtenir la quantité totale et on l'affiche
displayTotalQuantity();
function displayTotalQuantity(){
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    // on utilise la méthod reduce à nouveau, ici pour additionner les quantitées
    const quantiteTotale = calculTotalQuantity.reduce(reducer, 0);
    // Affichage du total de la quantité
    let totalQuantity = document.querySelector("#totalQuantity");
    totalQuantity.textContent = quantiteTotale;
}