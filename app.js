const prices={
 "iPhone 16 Pro Max":649999,
 "Samsung Galaxy S24 Ultra":329999,
 "Xiaomi 14 Ultra":279999,
 "Oppo Reno11 F":79999,
 "Realme GT 6":149999,
 "Wireless Earbuds":9999,
 "iPhone Case":2499,
 "Power Bank":6999,
 "Fast Charger":4999,
 "Smart Watch":19999
};
const cart=[];
const money=n=>"Rs. "+n.toLocaleString("en-PK");
const toast=document.getElementById("toast");
let toastTimer;
function notify(msg){toast.textContent=msg;toast.classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove("show"),2200);}
function renderCart(){
 const count=cart.reduce((sum,x)=>sum+x.qty,0);
 document.getElementById("cartCount").textContent=count;
 document.getElementById("drawerCount").textContent=`(${count})`;
 const items=document.getElementById("cartItems");
 if(!cart.length)items.innerHTML='<p class="empty-bag">Your bag is empty — let’s find your next favorite.</p>';
 else items.innerHTML=cart.map((x,i)=>`<div class="cart-line"><div><strong>${x.name}</strong><small>${money(x.price)} × ${x.qty}</small></div><button data-remove="${i}" aria-label="Remove ${x.name}">−</button></div>`).join("");
 document.getElementById("cartTotal").textContent=money(cart.reduce((sum,x)=>sum+x.price*x.qty,0));
}
function add(name){const item=cart.find(x=>x.name===name);if(item)item.qty++;else cart.push({name,price:prices[name]||0,qty:1});renderCart();notify(name+" added to your bag");}
document.querySelectorAll(".mobile-card,.accessory-card").forEach(card=>{
 const name=card.dataset.name;
 const button=card.querySelector(".add");
 if(button)button.addEventListener("click",()=>add(name));
});
document.getElementById("cartItems").addEventListener("click",e=>{const btn=e.target.closest("[data-remove]");if(!btn)return;const i=+btn.dataset.remove;if(cart[i].qty>1)cart[i].qty--;else cart.splice(i,1);renderCart();});
const drawer=document.getElementById("cartDrawer"),overlay=document.getElementById("overlay");
function openCart(){drawer.classList.add("open");overlay.classList.add("open");drawer.setAttribute("aria-hidden","false");document.body.classList.add("no-scroll");}
function closeCart(){drawer.classList.remove("open");overlay.classList.remove("open");drawer.setAttribute("aria-hidden","true");document.body.classList.remove("no-scroll");}
document.getElementById("cartOpen").addEventListener("click",openCart);
document.getElementById("cartClose").addEventListener("click",closeCart);
overlay.addEventListener("click",closeCart);
document.addEventListener("keydown",e=>{if(e.key==="Escape"){closeCart();closeModal();}});
document.getElementById("checkoutBtn").addEventListener("click",()=>notify(cart.length?"Demo checkout: connect a payment gateway to accept orders.":"Your bag is empty."));
const search=document.getElementById("searchInput");
search.addEventListener("input",()=>{
 const q=search.value.toLowerCase().trim();let matches=0;
 document.querySelectorAll(".mobile-card,.accessory-card").forEach(card=>{const yes=card.dataset.name.toLowerCase().includes(q);card.style.display=yes?"":"none";if(yes)matches++;});
 document.getElementById("emptySearch").hidden=matches!==0||q==="";
});
const menu=document.querySelector(".menu-toggle"),nav=document.querySelector(".nav");
menu.addEventListener("click",()=>{const open=nav.classList.toggle("open");menu.setAttribute("aria-expanded",String(open));});
nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{nav.classList.remove("open");menu.setAttribute("aria-expanded","false");}));
document.getElementById("newsletterForm").addEventListener("submit",e=>{e.preventDefault();document.getElementById("newsletterMessage").textContent="Thanks for subscribing! Demo form only.";e.target.reset();});
const modal=document.getElementById("videoModal");
function openModal(){modal.classList.add("open");overlay.classList.add("open");}
function closeModal(){modal.classList.remove("open");if(!drawer.classList.contains("open"))overlay.classList.remove("open");}
document.getElementById("videoBtn").addEventListener("click",openModal);
document.getElementById("modalClose").addEventListener("click",closeModal);
overlay.addEventListener("click",closeModal);
document.getElementById("helpBtn").addEventListener("click",()=>notify("Need help? Connect your preferred customer support channel here."));
renderCart();
