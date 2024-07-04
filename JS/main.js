/*******************************************************************************************************
 *                                                                                                      *
 *                                           Navbar                                                     *
 *                                                                                                      *
 *******************************************************************************************************/
const topBar = document.querySelector(".top-bar");
const header = document.querySelector("header");
const navLinks = document.querySelectorAll(".nav-links li a");
const sections = document.querySelectorAll("section");

const whatsapp = document.querySelector(".whatsapp")
const lang = document.querySelector(".lang")

// Function to handle scroll event
function onScroll() {
  let scrollTop = window.pageYOffset;

  // Show/hide top bar and adjust header position
  if (scrollTop > 0) {
    topBar.style.top = "-50px";
    header.classList.add("with-bg");
    whatsapp.style.opacity = "1";
    lang.style.opacity = "1";
  } else {
    if (scrollTop === 0) {
      topBar.style.top = "0";
      header.classList.remove("with-bg");
      whatsapp.style.opacity = "0";
      lang.style.opacity = "0";
    }
  }

  // Update active nav link based on scroll position
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute("id");

    if (
      scrollTop >= sectionTop - 50 &&
      scrollTop < sectionTop + sectionHeight - 50
    ) {
      navLinks.forEach((link) => {
        link.classList.remove("active-nav");
        if (link.getAttribute("href").includes(sectionId)) {
          link.classList.add("active-nav");
        }
      });
    }
  });
}

// Function to handle click event on nav links
function onClick(event) {
  navLinks.forEach((link) => link.classList.remove("active-nav"));
  event.target.classList.add("active-nav");
}

// Attach scroll event listener
window.addEventListener("scroll", onScroll);

// Attach click event listeners to nav links
navLinks.forEach((link) => {
  link.addEventListener("click", onClick);
});

/*******************************************************************************************************
 *                                                                                                      *
 *                                         Custom Alert                                                 *
 *                                                                                                      *
 *******************************************************************************************************/

let customAlert = document.getElementById("custom-alert");
let alertMessage = document.getElementById("alert-message");

function showAlert(message, bg) {
  alertMessage.innerText = message;
  customAlert.style.backgroundColor = bg;
  customAlert.classList.add("show");
  setTimeout(function () {
    customAlert.classList.remove("show");
  }, 2000);
}

// Lang Buttons
const english = document.getElementById("english");

english.addEventListener('click', function () {
  showAlert('You are on the English page!', 'black');
});


/*******************************************************************************************************
 *                                                                                                      *
 *                                           Slider                                                     *
 *                                                                                                      *
 *******************************************************************************************************/

const sliderItems = document.querySelectorAll(".home .slide-list .slide-item");
const sliderPrev = document.querySelector(".slider-btn.prev");
const sliderNext = document.querySelector(".slider-btn.next");

let sliderCount = sliderItems.length;
let slideActive = 0;

let refreshIntervel = setInterval(function () {
  nextSlide();
}, 6000);

function prevSlide() {
  slideActive = slideActive - 1;
  if (slideActive < 0) {
    slideActive = sliderCount - 1;
  }
  showSLider();
}

function nextSlide() {
  slideActive = slideActive + 1;
  if (slideActive >= sliderCount) {
    slideActive = 0;
  }
  showSLider();
}

function showSLider() {
  let slideActiveOld = document.querySelector(
    ".home .slide-list .active-slide"
  );

  slideActiveOld.classList.remove("active-slide");
  sliderItems[slideActive].classList.add("active-slide");

  clearInterval(refreshIntervel);
  refreshIntervel = setInterval(function () {
    nextSlide();
  }, 6000);

  // Reset Animation
  sliderItems[slideActive].querySelector("img").style.animation = "none";
  sliderItems[slideActive].querySelector("img").offsetHeight;
  sliderItems[slideActive].querySelector("img").style.animation = "";
}

/*******************************************************************************************************
 *                                                                                                      *
 *                                         Slide Cart                                                   *
 *                                                                                                      *
 *******************************************************************************************************/
// Define variables
let cartItems = [];
let cartCount = 0;
let totalPrice = 0;
const phoneNumber = '528123681120';

// DOM Elements
const cartBody = document.querySelector('.cart-body');
const cartIconCount = document.querySelector('.cart-icon .cart-count span');
const cartTitleCount = document.querySelector('.cart-title span');
const totalPriceElement = document.querySelector('.cart-bottom .total span');
const cartIcon = document.querySelector('.cart-icon');
const cart = document.querySelector('.cart');
const closeBtn = document.querySelector('.close-btn');
const addToCartButtons = document.querySelectorAll('.add-to-cart');
const checkoutButton = document.getElementById('checkout');

// Open and close cart event listeners
cartIcon.addEventListener('click', () => {
  cart.classList.add('open');
});

closeBtn.addEventListener('click', () => {
  cart.classList.remove('open');
});

// Function to add item to cart
function addToCart(event) {
  const menuItem = event.target.closest('.menu-item');
  const title = menuItem.querySelector('h2').textContent;
  const priceText = menuItem.querySelector(".price").innerText;
  const price = parseFloat(priceText.replace("$", ""));
  const imgSrc = menuItem.querySelector('img').src;

  // Check if item already in cart
  const existingItemIndex = cartItems.findIndex(item => item.title === title);

  if (existingItemIndex !== -1) {
    cartItems[existingItemIndex].count += 1;
  } else {
    cartItems.push({ title, price, imgSrc, count: 1 });
  }

  updateCart();
}

// Function to update the cart display
function updateCart() {
  cartBody.innerHTML = '';
  cartCount = 0;
  totalPrice = 0;

  cartItems.forEach(item => {
    cartCount += item.count;
    totalPrice += item.price * item.count;

    cartBody.innerHTML += `
      <div class="cart-item">
        <button class="remove-btn" onclick="removeFromCart('${item.title}')">
          <ion-icon name="close-circle-outline"></ion-icon>
        </button>
        <div class="item-img">
          <img src="${item.imgSrc}" alt="cart item image">
        </div>
        <div class="item-content">
          <div class="item-info">
            <h2 class="item-title">${item.title}</h2>
            <p class="item-price">Price: <span>$${item.price.toFixed(2)}</span></p>
          </div>
          <div class="item-action">
            <button class="item-btn" onclick="changeItemCount('${item.title}', -1)"><ion-icon name="remove-outline"></ion-icon></button>
            <div class="item-count"><span>${item.count}</span></div>
            <button class="item-btn" onclick="changeItemCount('${item.title}', 1)"><ion-icon name="add-outline"></ion-icon></button>
          </div>
        </div>
      </div>
    `;
  });

  // Update cart count in header and cart title
  cartIconCount.textContent = cartCount;
  cartTitleCount.textContent = cartCount;

  // Display empty message if cart is empty
  if (totalPrice === 0) {
    cartBody.innerHTML = `
      <div class="empty">
        <p class="empty-message">Your cart is currently empty.</p>
        <a href="#menu" class="btn">View Our Menu</a>
      </div>
    `;
  }

  // Update total price in cart
  totalPriceElement.textContent = `$${totalPrice.toFixed(2)}`;
}

// Function to remove item from cart
function removeFromCart(title) {
  cartItems = cartItems.filter(item => item.title !== title);
  updateCart();
}

// Function to change item count
function changeItemCount(title, countChange) {
  const item = cartItems.find(item => item.title === title);
  item.count += countChange;

  if (item.count <= 0) {
    removeFromCart(title);
  } else {
    updateCart();
  }
}

// Add event listeners to menu buttons
addToCartButtons.forEach(button => {
  button.addEventListener('click', addToCart);
});

// Event listener to close the cart when clicking outside of it
document.addEventListener('click', (event) => {
  if (!cart.contains(event.target) && !cartIcon.contains(event.target)) {
    cart.classList.remove('open');
  }
});

// Stop propagation for clicks inside the cart
cart.addEventListener('click', (event) => {
  event.stopPropagation();
});

// Stop propagation for cart icon clicks
cartIcon.addEventListener('click', (event) => {
  event.stopPropagation();
});

function formatCart(cartItems, totalPrice) {
  let message = 'Cart Details:\n \n';

  cartItems.forEach(item => {
      message += `${item.title} (x${item.count}): $${(item.price * item.count).toFixed(2)}\n \n`;
  });

  message += `Subtotal: $${totalPrice.toFixed(2)}`;

  return message;
}

function getWhatsAppURL(cartItems, totalPrice, phoneNumber) {
  const message = formatCart(cartItems, totalPrice);
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${phoneNumber}/?text=${encodedMessage}`;
}

checkoutButton.addEventListener('click', () => {
  const whatsappURL = getWhatsAppURL(cartItems, totalPrice, phoneNumber);
  window.open(whatsappURL, '_blank');
});

/*******************************************************************************************************
 *                                                                                                      *
 *                                           Menu Filter                                                *
 *                                                                                                      *
 *******************************************************************************************************/

const filterButtons = document.querySelectorAll(".filter-btn");
const menuItems = document.querySelectorAll(".menu-item");

filterButtons.forEach(button => {
  button.addEventListener("click", function () {
    filterButtons.forEach(btn => btn.classList.remove("active"));
    this.classList.add("active");

    const filter = this.getAttribute("data-filter");

    menuItems.forEach(item => {
      if (filter === "all" || item.classList.contains(filter)) {
        item.classList.add("all");
      } else {
        item.classList.remove("all");
      }
    });
  });
});
