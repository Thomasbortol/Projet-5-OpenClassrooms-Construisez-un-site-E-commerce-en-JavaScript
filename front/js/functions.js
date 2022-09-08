
// get ONE product by given productId
function getProduct(productId)
{
    fetch(`http://localhost:3000/api/products/${productId}`)
        .then((res) => res.json())
        .then((res) => uniqueObject(res))
}