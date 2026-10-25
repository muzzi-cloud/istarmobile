const cartItems=[];
const toast=document.getElementById("toast");
let toastTimer;
const money=n=>"Rs. "+Number(n).toLocaleString("en-PK");
function notify(msg){toast.textContent=msg;toast.classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove("show"),2200);}
function renderCart(){const qty=cartItems.reduce((n,x)=>n+x.qty,0);document.getElementById("bagCount").textContent=qty;document.getElementById("cartQty").textContent=`(${qty})`;document.getElementById("subtotal").textContent=money(cartItems.reduce((n,x)=>n+x.price*x.qty,0));const list=document.getElementById("cartList");if(!cartItems.length){list.innerHTML="<p>Your bag is looking a little empty.</p>";return;}list.innerHTML=cartItems.map((x,i)=>`<div class="cart-line"><div><strong>${x.name}</strong><small>${money(x.price)} × ${x.qty}</small></div><button data-remove="${i}" aria-label="Remove ${x.name}">−</button></div>`).join("");}
function addProduct(name,price){const found=cartItems.find(x=>x.name===name);if(found)found.qty++;else cartItems.push({name,price:Number(price),qty:1});renderCart();notify(name+" added to your bag.");}
document.querySelectorAll(".add").forEach(b=>b.addEventListener("click",()=>addProduct(b.dataset.product,b.dataset.price)));
document.getElementById("cartList").addEventListener("click",e=>{const b=e.target.closest("[data-remove]");if(!b)return;const i=Number(b.dataset.remove);if(cartItems[i].qty>1)cartItems[i].qty--;else cartItems.splice(i,1);renderCart();});
const cart=document.getElementById("cart"),overlay=document.getElementById("overlay");
function openCart(){cart.classList.add("open");overlay.classList.add("open");document.body.classList.add("lock-scroll");}
function closeCart(){cart.classList.remove("open");overlay.classList.remove("open");document.body.classList.remove("lock-scroll");}
document.getElementById("openCart").addEventListener("click",openCart);document.getElementById("closeCart").addEventListener("click",closeCart);overlay.addEventListener("click",closeCart);
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeCart();});
document.getElementById("checkout").addEventListener("click",()=>notify(cartItems.length?"Demo checkout only — connect payment processing to accept orders.":"Your bag is empty."));
const search=document.getElementById("search");search.addEventListener("input",filterProducts);
let brandFilter="all";
function filterProducts(){const q=search.value.toLowerCase().trim();let count=0;document.querySelectorAll(".product-card").forEach(card=>{const text=card.dataset.name.toLowerCase();const brand=card.dataset.brand;const matchText=text.includes(q);const matchBrand=brandFilter==="all"||(brandFilter==="apple"&&brand==="apple")||(brandFilter==="samsung"&&brand==="samsung")||(brandFilter==="android"&&brand==="android");card.style.display=matchText&&matchBrand?"":"none";if(matchText&&matchBrand)count++;});document.getElementById("noResults").hidden=count!==0;}
document.querySelectorAll(".filter").forEach(b=>b.addEventListener("click",()=>{document.querySelectorAll(".filter").forEach(x=>x.classList.remove("active"));b.classList.add("active");brandFilter=b.dataset.filter;filterProducts();}));
document.querySelectorAll(".heart").forEach(b=>b.addEventListener("click",()=>{b.classList.toggle("liked");b.textContent=b.classList.contains("liked")?"♥":"♡";notify(b.classList.contains("liked")?"Added to wishlist (demo).":"Removed from wishlist.");}));
document.getElementById("wishlist").addEventListener("click",()=>notify("Tap a heart on a product to add it to your wishlist."));
document.getElementById("menuToggle").addEventListener("click",()=>{const nav=document.getElementById("nav");const open=nav.classList.toggle("open");document.getElementById("menuToggle").setAttribute("aria-expanded",String(open));});
document.querySelectorAll("#nav a").forEach(a=>a.addEventListener("click",()=>{document.getElementById("nav").classList.remove("open");document.getElementById("menuToggle").setAttribute("aria-expanded","false");}));
document.getElementById("newsletter").addEventListener("submit",e=>{e.preventDefault();document.getElementById("newsletterStatus").textContent="You're on the list! (Demo form)";e.target.reset();});
renderCart();
