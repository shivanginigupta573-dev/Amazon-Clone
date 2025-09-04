// SLIDER 
const imgs = document.querySelectorAll('.headerslider img');
const prev_btn = document.querySelector('.control_prev');
const next_btn = document.querySelector('.control_next');

if (imgs.length > 0 && prev_btn && next_btn) {
  let n = 0;

  function changeSlide() {
    imgs.forEach(img => img.style.display = 'none');
    imgs[n].style.display = 'block';
  }

  changeSlide();

  prev_btn.addEventListener('click', () => {
    n = n > 0 ? n - 1 : imgs.length - 1;
    changeSlide();
  });

  next_btn.addEventListener('click', () => {
    n = n < imgs.length - 1 ? n + 1 : 0;
    changeSlide();
  });
}

//  PRODUCT PAGE 
const cart_btn = document.querySelector('.addcart'); 

if (cart_btn) {
  cart_btn.addEventListener('click', () => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    let p = {
      id: "dell-1",
      name: "Dell Inspiron Laptop",
      price: 700,
      qty: 1,
      img: "laptops.jpg",
    };

    let ex = cart.find(i => i.id === p.id);
    if (ex) {
      ex.qty += 1;
    } else {
      cart.push(p);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert("Added to cart!");
  });
}

// CART PAGE 
const cart_box = document.getElementById('cart_box');
const cart_total = document.getElementById('cart_total');

function renderCart() {
  if (cart_box && cart_total) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let total = 0;
    cart_box.innerHTML = "";

    if (cart.length === 0) {
      cart_box.innerHTML = "<p>Your cart is empty.</p>";
      cart_total.innerText = "Subtotal (0 items): $0";
    } else {
      cart.forEach((i, index) => {
        total += i.price * i.qty;

        cart_box.innerHTML += `
          <div class="cart_item">
            <img src="${i.img}" alt="${i.name}">
            <div class="cart_info">
              <h3>${i.name}</h3>
              <p><b>$${i.price}</b></p>
              <p>
                Qty: 
                <select class="qty-select" data-index="${index}">
                  ${[...Array(10).keys()].map(n => 
                    `<option value="${n+1}" ${i.qty === n+1 ? "selected" : ""}>${n+1}</option>`
                  ).join("")}
                </select>
                | <a href="#" class="remove" data-index="${index}">Delete</a>
              </p>
            </div>
          </div>
          <hr>
        `;
      });

      cart_total.innerText = `Subtotal (${cart.length} item${cart.length>1?"s":""}): $${total}`;
    }
  }
}

//  EVENTS 
// Delete item
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("remove")) {
    e.preventDefault();
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let idx = e.target.getAttribute("data-index");
    cart.splice(idx, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
  }
});

// Update quantity
document.addEventListener("change", (e) => {
  if (e.target.classList.contains("qty-select")) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let idx = e.target.getAttribute("data-index");
    let newQty = parseInt(e.target.value);
    if (newQty > 0) {
      cart[idx].qty = newQty;
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCart();
    }
  }
});

//  INITIAL LOAD 
renderCart();
