function filterButtonClicked() {
  var brand = document.getElementById("serchData").value;
  var productType = document.getElementById("productType").value;
  var sortBy = document.getElementById("sortBy").value;

  fetch(`http://makeup-api.herokuapp.com/api/v1/products.json?brand=${brand}&product_type=${productType}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      document.getElementById("results").innerHTML = "";

      if (data.length === 0) {
        document.getElementById("results").innerHTML = "No products found.";
      } else {
        if (sortBy === "name") {
          data.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortBy === "rating") {
          data.sort((a, b) => b.rating - a.rating);
        }

        data.forEach((product) => {
          var productContainer = document.createElement("div");
          productContainer.classList.add("product-container");

          var productBox = document.createElement("div");
          productBox.classList.add("product-box");

          var imageElement = document.createElement("img");
          imageElement.src = product.image_link;
          imageElement.alt = "Product Image";
          imageElement.classList.add("product-image");
          productBox.appendChild(imageElement);

          productBox.innerHTML += `
            <p>Brand: ${product.brand}</p>
            <p>Name: ${product.name}</p>
            <p>Price: £${product.price}</p>
            <p>Description: ${product.description}</p>
            <p>Category: ${product.category}</p>
            <p>Rating: ${product.rating}</p>
            <button onclick="openLink('${product.product_link}')">Product Link</button>
            <button onclick="openLink('${product.website_link}')">Website Link</button>
          `;

          productContainer.appendChild(productBox);

          document.getElementById("results").appendChild(productContainer);
        });
      }
    });
}

function openLink(link) {
  if (link) {
    window.open(link, '_blank');
  }
}

function goToAnotherPage() {
  window.location.href = 'index2.html';
}
