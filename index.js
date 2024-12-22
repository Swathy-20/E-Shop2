const apiUrl = 'https://fakestoreapi.com/products'
let products = []

fetch(apiUrl)
.then(response => response.json())
.then(data => {
    products = data
    displayProducts(products)
})
.catch(error => console.error('Error fetching products:', error));

       
function displayProducts(products) {
    const productList = document.getElementById('product-list')
     productList.innerHTML = ''

    if(products.length === 0) {
        productList.innerHTML = '<p>No products found.</p>';
    } else {
        products.forEach(product => {
            const productCard = `
            <div class="col-md-4 col-sm-6 mb-4">
                <div class="product-card">
                    <img src="${product.image}" alt="${product.title}">
                    <h5>${product.title}</h5>
                    <p>${product.description.slice(0, 60)}...</p>
                    <div class="price">$${product.price}</div>
                </div>
            </div>
            `;
            productList.insertAdjacentHTML('beforeend', productCard);
        });
    }}

        
    document.getElementById('searchBtn').addEventListener('click', function() {
        const searchTerm = document.getElementById('searchBar').value.toLowerCase();
        const filteredProducts = products.filter(product =>
            product.title.toLowerCase().includes(searchTerm)
        );
        displayProducts(filteredProducts);
    });
    document.getElementById('searchBar').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            document.getElementById('searchBtn').click();
        }
    });