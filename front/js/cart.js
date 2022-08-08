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



/////////////////////// Mise en place du formulaire ///////////////////////////



let form = document.querySelector(".cart__order__form")
let inputFirstName = document.querySelector("#firstName");
let inputLastName = document.querySelector("#lastName");
let inputAddress = document.querySelector("#address");
let inputCity = document.querySelector("#city");
let inputEmail = document.querySelector("#email")
let submit = document.querySelector("#order")


////// Validation du formulaire par les expressions régulières (RegExp)

// REGEX Création de 3 objets regex  (Besoin d'un regex spécifique pour l'adresse, et pour l'email)
let regularRegExp = new RegExp("^[a-zA-Z ,.'-]+$");
let addressRegExp = new RegExp("^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+");
let emailRegExp = new RegExp("^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,20}$");


// method .test permet de tester la compatibilité entre l'objet regex et la chaine de caractère
// FIRST NAME
function valueFirstName() {
    let firstNameErrorMsg = document.getElementById("firstNameErrorMsg");
    let inputFirstName = document.querySelector("#firstName");

    if (regularRegExp.test(inputFirstName.value)) {
        firstNameErrorMsg.innerHTML = '';
        inputFirstName.style.backgroundColor = "white";
        return true
    } else {
        firstNameErrorMsg.innerHTML = 'Veuillez renseigner votre prénom.';
        inputFirstName.style.backgroundColor = "#FBBCBC";
        return false
    }
}

// LAST NAME
function valueLastName() {
    let lastNameErrorMsg = document.getElementById("lastNameErrorMsg");
    let inputLastName = document.querySelector("#lastName");

    if (regularRegExp.test(inputLastName.value)) {
        lastNameErrorMsg.innerHTML = '';
        inputLastName.style.backgroundColor = "white";
        return true
    } else {
        lastNameErrorMsg.innerHTML = 'Veuillez renseigner votre nom.';
        inputLastName.style.backgroundColor = "#FBBCBC";
        return false
    }
}


// ADRESSE
function valueAddress() {
    let addressErrorMsg = document.getElementById("addressErrorMsg");
    let inputAddress = document.querySelector("#address");

    if (addressRegExp.test(inputAddress.value)) {
        addressErrorMsg.innerHTML = '';
        inputAddress.style.backgroundColor = "white";
        return true
    } else {
        addressErrorMsg.innerHTML = 'Veuillez renseigner une adresse valide.';
        inputAddress.style.backgroundColor = "#FBBCBC";
        return false
    }
}

// VILLE
function valueCity() {
    let cityErrorMsg = document.getElementById("cityErrorMsg");
    let inputCity = document.querySelector("#city");

    if (regularRegExp.test(inputCity.value)) {
        cityErrorMsg.innerHTML = '';
        inputCity.style.backgroundColor = "white";
        return true
    } else {
        cityErrorMsg.innerHTML = 'Veuillez renseigner une ville.';
        inputCity.style.backgroundColor = "#FBBCBC";
        return false
    }
} 


// EMAIL
function valueEmail() {
    let emailErrorMsg = document.getElementById("emailErrorMsg");
    let inputEmail = document.querySelector("#email")

    if (emailRegExp.test(inputEmail.value)) {
        emailErrorMsg.innerHTML = '';
        inputEmail.style.backgroundColor = "white";
        return true
    } else {
        emailErrorMsg.innerHTML = 'Veuillez renseigner un email valide.';
        inputEmail.style.backgroundColor = "#FBBCBC";
        return false
    }
}

// Inscription dans le formulaire 
getForm()
function getForm() { 

    form.firstName.addEventListener('change', () => {
        valueFirstName(this);
    })

    form.lastName.addEventListener('change', () => {
        valueLastName(this);
    })

    form.address.addEventListener('change', () => {
        valueAddress(this);
    })

    form.city.addEventListener('change', () => {
        valueCity(this);
    })

    form.email.addEventListener('change', () => {
        valueEmail(this);
    })

}

// Envoie de la requête au back
submitForm();
function submitForm() {

    submit.addEventListener('click', (e) => {
        e.preventDefault();

        let formValues = {
            firstName : inputFirstName.value,
            lastName : inputLastName.value,
            address : inputAddress.value,
            city : inputCity.value,
            email : inputEmail.value
        }

        if (
            !formValues.firstName || 
            !valueFirstName() || 
            !formValues.lastName || 
            !valueLastName() ||
            !formValues.address || 
            !valueAddress() ||
            !formValues.city || 
            !valueCity() ||
            !formValues.email ||
            !valueEmail()) {
            alert("Merci de renseigner toutes les informations")
            return
        } else {

            let products = [];
            for (let i=0; i < productSaveToLocalStorage.length; i++) {
                products.push(productSaveToLocalStorage[i].id);
                products.push(productSaveToLocalStorage[i].color);
                products.push(productSaveToLocalStorage[i].quantity);
            }

            let formData = {
                products : products,
                contact : formValues,
            }
            console.log(formData);
            // fetch("http://localhost:3000/api/products/order", {
            //     method: "POST",
            //     body: JSON.stringify(formData),
            //     headers: {
            //         "Content-Type": "application/json"
            //     }
            // })
            //     .then((res) => res.json())
            //     .then((data) => {
            //         window.location.href = './confirmation.html?id='+ data.orderId;
            //     })
        }
    })
}