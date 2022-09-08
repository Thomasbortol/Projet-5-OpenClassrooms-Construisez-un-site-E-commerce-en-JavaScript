
// get ONE product by given productId
function getProduct(productId)
{
    fetch(`http://localhost:3000/api/products/${productId}`)
        .then((res) => res.json())
        .then((res) => uniqueObject(res))
}

// get severals products by given productId
function getProducts(productIds)
{
    
    getProduct(productIds)
}





///////////// cour de mohamed à voir sur ww3school  JavaScript Array delete()  dans JavaScript Array Methods

/* <html>
<body>

<h2>JavaScript Array Methods</h2>
<p>Deleting elements leaves undefined holes in an array:</p>

<p id="demo1"></p>
<p id="demo2"></p>

<button id="1" onClick="reply_click(this.id)">B1</button>
<button id="2" onClick="reply_click(this.id)">B2</button>
<button id="3" onClick="reply_click(this.id)">B3</button>  
    


<script>
const products = ["idNumber1", "idNumber2", "idNumber3", "idNumber4"];

document.getElementById("demo1").innerHTML =
"The first product is: " + products[1];



document.getElementById("demo2").innerHTML =

 function reply_click(x)
  {
  	
    delete products[x];
      alert("l'élément supprimé est " + x + "removed");
      "The first fruit is: " + products[0 + " " + products[1] + " " + products[2]"
  }
</script>

</body>
</html> */
