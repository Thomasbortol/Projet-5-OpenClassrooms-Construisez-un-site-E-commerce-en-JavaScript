let queryString = window.location.href;
queryString = new URL(queryString);
orderId = document.getElementById('orderId');
orderId.innerHTML = queryString.searchParams.get("id");

// Vide le local storage
function removeCache() {
    const cache = window.localStorage
    cache.clear()
}

removeCache();