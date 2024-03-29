// Requète des data de l'api

fetch("http://localhost:3000/api/products")
  .then((res) => res.json())
  .then((data) => addProducts(data))


// Ajout des articles sur la page produit
function addProducts(canapes) {

  // Commande qui boucle sur chaque élément de l'api (ici "chaque canape de canapes")
  canapes.forEach((canape) => {
    
    // Récupération des données (ici du premier élément)
    const _id = canape._id
    const imageUrl = canape.imageUrl
    const altTxt = canape.altTxt
    const name = canape.name
    const description = canape.description
    // const {_id, imageUrl, altTxt, name, description} = canape
    
    // Appel des  fonctions de création des éléments html Lien > article > image > titre > description ===>  voir  // Fonction //
    const productLink = makeProductLink(_id)
    const productArticle = document.createElement("article")
    const productImg = makeProductImg(imageUrl, altTxt)
    const productTitle = makeProductTitle(name)
    const productDescription = makeProductDescription(description)

    // Append les éléments à l'article (utilisation d'un array)
    appendElementsToProductArticle(productArticle, [productImg, productTitle, productDescription])
    // Append l'article au lien
    appenProductArticleToProductLink(productLink, productArticle)
})
}


// Fonction //

// fonction d'append des éléments à l'article (on utilise l'array avec une boucle)

function appendElementsToProductArticle(productArticle, array){
  array.forEach((item) =>{
    productArticle.appendChild(item)
  })
  // Code à utiliser si on utilise pas l'array, donc pas la boucle
  //productArticle.appendChild(productImg)
  //productArticle.appendChild(productTitle)
  //productArticle.appendChild(productDescription)
}


// Création du lien

function makeProductLink(id){
  const productLink = document.createElement("a");
  productLink.href = "./product.html?id=" + id;
  return productLink;
}


// fonction d'append de l'article au lien

function appenProductArticleToProductLink(productLink, productArticle){
  const items = document.querySelector("#items")
  items.appendChild(productLink);
  productLink.appendChild(productArticle)
}


// Création de l'image ( avec url et texte alt)

function makeProductImg(imageUrl, altTxt) {
  const productImg = document.createElement("img")
  productImg.src = imageUrl
  productImg.alt = altTxt
  return productImg;
}


// Création du titre de l'image

function makeProductTitle(name) {
  const productTitle = document.createElement("h3")
  productTitle.textContent = name
  productTitle.classList.add("productname")
  return productTitle
}


// Création de la description de l'image

function makeProductDescription(description) {
const productDescription = document.createElement("p")
productDescription.textContent = description
productDescription.classList.add("productDescription")
return productDescription
}