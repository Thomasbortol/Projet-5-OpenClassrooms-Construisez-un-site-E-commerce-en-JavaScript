// Declaration de variable dans laquelle on met les keys et values qui sont dans le local storage
let productSaveToLocalStorage = JSON.parse(localStorage.getItem("produit"));
// .parse transforme un "objet" JSON en langage javascript


let panier = []


function getProduct(product) {
    fetch("http://localhost:3000/api/products/" + product.id)
    .then((res) => res.json())
    .then((data) => addProduct({...product, ...data}))
}

////// ************* Affichage des produits dans le panier ************* //////
function addProduct(product) {
        // Création de l'élément "article"
        let cartItems = document.getElementById("cart__items");
        let cartItem = document.createElement("article");
        cartItem.classList.add("cart__item");
        cartItems.appendChild(cartItem);

        // Création de l'élément "img"
        let cartImg = document.createElement("div");
        cartImg.classList.add("cart__item__img");
        let img = document.createElement("img");
        img.src = product.imageUrl;
        img.alt = product.altTxt;
        cartImg.appendChild(img);
        cartItem.appendChild(cartImg);
        
        // Création des éléments "description" pour le nom, la couleur et le prix         
        let cartContent = document.createElement("div");
        cartContent.classList.add("cart__item__content");
        cartItem.appendChild(cartContent);

        let cartContentDescription = document.createElement("div");
        cartContentDescription.classList.add("cart__item__content__description")
        cartContent.appendChild(cartContentDescription)
        let productName = document.createElement("h2");
        let productInfo = document.createElement("p");
        let productPrice = document.createElement("p")
        productName.textContent = product.name;
        productInfo.textContent = product.color;
        productPrice.textContent = product.price + "€";
        cartContentDescription.appendChild(productName);
        cartContentDescription.appendChild(productInfo);
        cartContentDescription.appendChild(productPrice);

        // Création des éléments "settings" pour la quantité et la suppression
        let settings = document.createElement("div");
        settings.classList.add("cart__item__content__settings");
        cartItem.appendChild(settings);

        let settingsQty = document.createElement("div");
        settingsQty.classList.add("cart__item__content__settings__quantity");
        settings.appendChild(settingsQty);

        let qty = document.createElement("p");
        settingsQty.appendChild(qty);
        qty.textContent = "Qté : "

        let qtyNumber = document.createElement("input");
        qtyNumber.classList.add("itemQuantity");
        settingsQty.appendChild(qtyNumber);
        qtyNumber.setAttribute("type", "number");
        qtyNumber.setAttribute("min", "1");
        qtyNumber.setAttribute("max", "100");
        qtyNumber.setAttribute ("value", product.quantity)

        // Au changement de la quantité 
        qtyNumber.addEventListener("change", (e) => {
            // On récupère le panier qui est dans le Local Storage
            let panierLocalStorage = JSON.parse(localStorage.getItem("produit"));
            // On récupère l'ancienne quantité 
            let oldQty = Number(product.quantity)
            // On modifie la quantité du local storage
            panierLocalStorage = panierLocalStorage.map(el => {
                if (el.id == product.id && el.color == product.color) {
                    return {...el, quantity:Number(e.target.value)}
                }
                return el;
            })
            product.quantity = Number(e.target.value)
            localStorage.setItem("produit", JSON.stringify(panierLocalStorage));
            majTotals(oldQty, product.quantity, product.price)
        })

        // A la suppression d'un article
        let settingsDelete = document.createElement("div");
        settingsDelete.classList.add("cart__item__content__settings__delete");
        settings.appendChild(settingsDelete);

        let deleteItem = document.createElement("p");
        deleteItem.classList.add("deleteItem");
        settingsDelete.appendChild(deleteItem);
        deleteItem.textContent = "Supprimer";

        // Au clic sur le bouton "Supprimer"
        deleteItem.addEventListener("click", () => { 
            // On récupère le panier qui est dans le Local Storage
            let panierLocalStorage = JSON.parse(localStorage.getItem("produit"));
            // .parse transforme un "objet" JSON en langage javascript

            panierLocalStorage = panierLocalStorage.filter(el => (el.id !== product.id || el.color !== product.color));
            localStorage.setItem("produit", JSON.stringify(panierLocalStorage));
            alert("Votre article a bien été supprimé");
            cartItem.remove();
            location.reload();
            majTotals(product.quantity, product.price);
        })  
}

// Modification du prix total et de la quantité totale 
function majTotals(oldValue, newValue, price) {
    let productTotalQuantity = document.getElementById("totalQuantity");
    let totalMajProductQte = productTotalQuantity.textContent;
    productTotalQuantity.textContent = totalMajProductQte - oldValue + newValue;

    let productTotalPrice = document.getElementById("totalPrice");
    let totalMajProductPrix = productTotalPrice.textContent;
    productTotalPrice.textContent = totalMajProductPrix - (oldValue * price) + newValue * price;    
}

// Affichage du prix total et de la quantité totale
async function totals(panier) {
    let totalQty = 0;
    let totalPrice = 0;

    for (let i=0; i < panier.length; i++){
        const response = await fetch("http://localhost:3000/api/products/" + panier[i].id)
        const p = await response.json()
        addProduct({...panier[i], ...p});

        totalQty += panier[i].quantity 
        totalPrice += panier[i].quantity * p.price
    }

    let productTotalQuantity = document.getElementById("totalQuantity");
    productTotalQuantity.textContent = totalQty;

    let productTotalPrice = document.getElementById("totalPrice");
    productTotalPrice.textContent = totalPrice;
}
// Si le panier est vide 
if (productSaveToLocalStorage === null || productSaveToLocalStorage.length === 0) {

    let titleCart = document.querySelector("h1");
    let sectionCart = document.querySelector(".cart");

    titleCart.innerHTML = "Votre panier est vide";
    sectionCart.style.display = "none";

} 
// Si le panier n'est pas vide
else {

    totals(productSaveToLocalStorage)
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
let addressRegExp = new RegExp("^[0-9]{1,4}(?:(?:[,.' ]){1}[-a-zA-Zàâäéèêëïîôöùûüç0-9]+)+$");
let emailRegExp = new RegExp("^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$");


// method .test permet de tester la compatibilité entre l'objet regex et la chaine de caractère
// FIRST NAME
function valueFirstName() {
    let firstNameErrorMsg = document.getElementById("firstNameErrorMsg");
    let inputFirstName = document.querySelector("#firstName");

    if (regularRegExp.test(inputFirstName.value)) {             // method .test
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

    form.firstName.addEventListener('input', () => {
        valueFirstName(this);
    })

    form.lastName.addEventListener('input', () => {
        valueLastName(this);
    })

    form.address.addEventListener('input', () => {
        valueAddress(this);
    })

    form.city.addEventListener('input', () => {
        valueCity(this);
    })

    form.email.addEventListener('input', () => {
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
        // Utilisation du NON logique (!) Retourne l'opposé de la valeur boléene reçue
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
            }

            let formData = {
                products : products,
                contact : formValues,
            }
            
            fetch("http://localhost:3000/api/products/order", {
                method: "POST",
                body: JSON.stringify(formData),
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then((res) => res.json())
                .then((data) => {
                    window.location.href = './confirmation.html?id='+ data.orderId;
                })
        }
    })
}