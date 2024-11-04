  
  callAddItem();
   function callAddItem(){
    let storageCartItem = localStorage.getItem('itemList');
    let parseCartItem = JSON.parse(storageCartItem);
        
    for(let i=0;i<parseCartItem.length;i++){
    title = parseCartItem[i].title
    itemPrice = parseCartItem[i].itemPrice;
    itemImg = parseCartItem[i].itemImg;
    itemQty = parseCartItem[i].itemQty;
    rating = parseCartItem[i].rating;
    let newProductElement = createCartItem(title,itemPrice,itemImg,itemQty,rating);
    let element = document.createElement('div');
    element.innerHTML = newProductElement;
    let cartBasket = document.querySelector('.cart-list');
    cartBasket.append(element);
    loadContent();
    updateTotal();

   }

}

// function add Item into cart
function createCartItem(title,itemPrice,itemImg,itemQty){

    return `<div class="cart-box">
                <div class="cart-product-image"><img src="${itemImg}"></div>  
                 <div class="cart-prod-name">${title}</div>
                 <div class="cart-prod-rating">${rating}</div>
                 <div class="quantity">Quantity<input type="number" value="${itemQty}" max="10" min="1" class="qty"></div>
                 <button class="delete-cart-item">Remove</button>
                 <button class="saveforlater-cart-item">Save for later</button> 
                 <div class="cart-prod-price">${itemPrice}</div> 
                 <div class= "cart-qty-prod-price">$ 0 </div>
            </div>`  
   
}

 //Remove cartItem

 let storageCartItem1 = localStorage.getItem('itemList');
 let parseCartItem1 = JSON.parse(storageCartItem1);

 btnRemove = document.querySelectorAll('.delete-cart-item');
 btnRemove.forEach((btn)=>{
     btn.addEventListener('click',removeItem);
 })
 cartCount = localStorage.getItem('count');
// Remove cartItem 
function removeItem(){
    let title = this.parentElement.querySelector('.cart-prod-name').innerHTML;
    parseCartItem1 = parseCartItem1.filter((el)=>el.title != title);
    this.parentElement.remove(); 
    --cartCount;
    localStorage.setItem('itemList', JSON.stringify(parseCartItem1));
    updateTotal();
    
    document.querySelector('.cart-count').innerHTML = cartCount;
    localStorage.setItem('count',cartCount);
   }

    //Update Total
    function updateTotal(){
        let cartItem = document.querySelectorAll('.cart-box');
        const totalPrice = document.querySelector('.total-items-price');
        const countItems  = document.querySelector('.total-items-count');
        let total =0;    
        let count=0;
        cartItem.forEach(prod=>{                  
            let priceElement = prod.querySelector('.cart-prod-price');            
            let price = parseFloat(priceElement.innerHTML.replace("$",""));
            let priceQtyEl = prod.querySelector('.cart-qty-prod-price');   
            let qty = prod.querySelector('.qty').value;     
            let priceQty = +(qty*price);
            priceQty = parseFloat(priceQty.toFixed(2));   
            priceQtyEl.innerHTML = "$"+priceQty;    
            total += priceQty;   
            count++;  
        })
        
        total =  total.toFixed(2);
        totalPrice.innerHTML = "$"+total;
        countItems.innerHTML = count;
      
}


//  transfer cart items to buyitems...
let placeOrder = document.querySelector('.check-out');
placeOrder.addEventListener('click',()=>{
    let storedBuyItem = localStorage.getItem('buyItem');
    let parseBuyItem = JSON.parse(storedBuyItem);
    if(parseBuyItem == null){ 
       localStorage.setItem('buyItem',storageCartItem1);    
    }
    else{
        let joinArray = parseBuyItem.concat(parseCartItem1);
        localStorage.setItem('buyItem',JSON.stringify(joinArray));
    }

    for(let i=parseCartItem1.length-1; i>=0;i--){
        parseCartItem1.pop(i);
     }
     localStorage.setItem('itemList',JSON.stringify(parseCartItem1));

     count=0;
     localStorage.setItem('count',count);
})

