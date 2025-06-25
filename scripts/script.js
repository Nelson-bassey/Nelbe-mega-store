let cart = JSON.parse(localStorage.getItem('neltech_cart')) || [];

    function updateCartCount() {
      document.getElementById('cartCount').textContent = cart.length;
    }

    function logout() {
      localStorage.removeItem('neltech_logged_in');
      window.location.href = 'login.html';
    }

    function toggleTheme() {
      const html = document.documentElement;
      const theme = html.getAttribute("data-theme") === "light" ? "dark" : "light";
      html.setAttribute("data-theme", theme);
    }

    async function fetchProducts(query = '') {
      const res = await fetch(`https://dummyjson.com/products/search?q=${query}`);
      const data = await res.json();
      displayProducts(data.products);
    }

    function displayProducts(products) {
      const container = document.getElementById('productList');
      container.innerHTML = '';

      if (!products.length) {
        container.innerHTML = '<p>No products found.</p>';
        return;
      }

      products.forEach(p => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
          <img src="${p.thumbnail}" alt="${p.title}" />
          <h4>${p.title}</h4>
          <div class="price">₦${(p.price * 800).toLocaleString()}</div>
          <button class="cart-btn" onclick='addToCart(${JSON.stringify(p)})'>Add to Cart</button>
        `;
        container.appendChild(card);
      });
    }

    function addToCart(product) {
      cart.push(product);
      localStorage.setItem('neltech_cart', JSON.stringify(cart));
      updateCartCount();
      alert('Added to cart!');
    }

    function showCart() {
      if (!cart.length) {
        alert('Cart is empty.');
        return;
      }

      let total = 0;
      let items = cart.map((item, i) => {
        const price = item.price * 800;
        total += price;
        return `${i + 1}. ${item.title} - ₦${price.toLocaleString()}`;
      }).join('\n');

      items += `\n\n🧾 Total: ₦${total.toLocaleString()}`;
      items += `\n\nClick OK to clear cart.`;

      if (confirm(items)) {
        cart = [];
        localStorage.setItem('neltech_cart', JSON.stringify(cart));
        updateCartCount();
      }
    }

    document.getElementById('searchInput').addEventListener('input', e => {
      fetchProducts(e.target.value);
    });

    updateCartCount();
    fetchProducts();

