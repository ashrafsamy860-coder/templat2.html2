document.addEventListener('DOMContentLoaded', () => {
  const productListContainer = document.getElementById('products');

  fetch('https://dummyjson.com/products')
    .then(res => res.json())
    .then(data => {
      const products = data.products;
      productListContainer.innerHTML = '';

      products.forEach(product => {
        const card = `
          <div class="col-md-4 mb-4">
            <div class="card h-100">
              <img src="${product.thumbnail}" 
                   class="card-img-top p-3" 
                   height="250" 
                   alt="${product.title}">
              <div class="card-body d-flex flex-column">
                <h5 class="card-title">${product.title}</h5>
                <p class="card-text flex-grow-1">
                  ${product.description.substring(0, 80)}...
                </p>
                <p class="card-text fw-bold">$${product.price}</p>
                <button class="btn btn-primary mt-auto">
                  أضف للسلة
                </button>
              </div>
            </div>
          </div>
        `;
        productListContainer.innerHTML += card;
      });
    })
    .catch(() => {
      productListContainer.innerHTML =
        '<p class="text-danger text-center">حدث خطأ في تحميل المنتجات</p>';
    });
});
