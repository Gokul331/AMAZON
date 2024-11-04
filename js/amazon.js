let product=[];
let itemList =[];
let productList ='';
products.forEach(product => {
    let html = `
    <div class="product" data-item = "${product.keywords}">
     <div class="product-inner">
        <div class="product-front">
            <input type="checkbox" name="" id="${product.id}" class ="shopping">
            <label class="shopping-label" for="${product.id}" ><ion-icon name="heart-outline"></ion-icon></label>
            <label class="shopping-label1" for="${product.id}" ><ion-icon name="heart-sharp"></ion-icon></label>
            <img src="${product.image}" class="product-img" data-image="${product.image}"alt="">
            <div class="product-name">${product.name}</div>
             <div class="price">$${(product.priceCents/100).toFixed(2)}</div>
             <input type="checkbox" class="flip" id="${product.name}">
             <label for="${product.name}" class="flip-label">Click</label>
        </div>
        <div class="product-back">    
            <div class="product-quantity">
            <div class="qty-label">Quantity</div>
               <input type="number" class="qty" value="1" min="1" max="10" data-product-qty="${product.name}">
            </div>
            <div class="rating">
               <img src="../asset/ratings/rating-${product.rating.stars*10}.png" alt="" class="rating-star">
               <div class="rating-count">${product.rating.count}</div>
            </div>
            <button class="add-to-cart js-add-to-cart" data-product="${product.name}" >Add to Cart</button>
            <div class="added"><img src="                /asset/icons/tick.jpeg" alt="" width="20px" height="20px"><div>Added</div></div>
            <a href="buy.html" class="buy-now">Buy Now</a>
             <input type="checkbox" class="flip-back" id="${product.image}">
             <label for="${product.image}" class="flip-label-2">Back</label>
        </div>  
        </div>  
    </div>`
      productList +=html;  
});
    document.querySelector('.container').innerHTML=productList;


    let flips = document.querySelectorAll('.flip')
    flips.forEach((flip)=>{
       flip.addEventListener("click",flipItem);
    })
    function flipItem(){
      let content = this.parentElement;
      let content_parent = content.parentElement;
      content_parent.style.transform ='rotateY(180deg)';
    }

    let flips_back = document.querySelectorAll('.flip-back')
    flips_back.forEach((flip_back)=>{
       flip_back.addEventListener("click",flipBackItem);
    })
    function flipBackItem(){
      let content = this.parentElement;
      let content_parent = content.parentElement;
      content_parent.style.transform ='rotateY(0deg)';
    }
    // Content load
    document.addEventListener('DOMContentLoaded',loadProduct);
    function loadProduct(){
          loadContent();
    }
    
    function loadContent(){
       // Validation for the quantity
       let qtyElement = document.querySelectorAll('.qty');
       qtyElement.forEach((input)=>{
       input.addEventListener('change',qtyCheck);
        })

        //Cart Count 
        let cartCount = localStorage.getItem('count');
        document.querySelector('.cart-count').innerHTML = cartCount;
      
  }

   /*------- Filter included--------*/
   const boxes = document.querySelectorAll('.product');
   const searchBox = document.querySelector('.search-bar');

   searchBox.addEventListener('keyup',(e)=>{
    let searchText = (e.target.value.toLowerCase().trim());

    boxes.forEach(product=>{
        const data = product.dataset.item;

         if(data.includes(searchText)){
           product.style.display='flex';
         }else{
           product.style.display='none';
         }
     })
})

// Validation for the quantity 
  
   function qtyCheck(){
    let qtyCount;
    if(isNaN(this.value) || this.value<1){
        this.value=1;
    }
    else{
        this.value;
        qtyCount = this.value;
        updateTotal();
    }
   }
    //Product cart
    itemList=[];
    let storageCartItem = localStorage.getItem('itemList');
    let parseCartItem = JSON.parse(storageCartItem);
  
    // Initially cart is empty

    if(parseCartItem==null || parseCartItem.length==0){
    let cartBtns = document.querySelectorAll('.add-to-cart');
    let cartCount = 0;
    cartBtns.forEach((btn)=>{
        btn.addEventListener('click',addItem);   
    })

    function addItem(){  
      let likeItem  = this.parentElement;
      let itemInfo = likeItem.parentElement;
       let add_to_cart = itemInfo.querySelector('.added');
       let title = itemInfo.querySelector('.product-name').innerHTML;
       let itemPrice = itemInfo.querySelector('.price').innerHTML;
       let itemImg = itemInfo.querySelector('.product-img').src;
       let itemQty = itemInfo.querySelector('.qty').value; 
       ratingContent = itemInfo.querySelector('.rating').innerHTML;
       item = ratingContent.substring(10);
       rating = item.slice(0,-2);
       cartCount++;
       document.querySelector('.cart-count').innerHTML = cartCount;
       let newProduct = {
       title,itemPrice,itemImg,itemQty,rating
       }

       if(itemList.find((el)=>el.title==newProduct.title)){
        alert("This product already added ");
        return;
       }
       else{
        itemList.push(newProduct);
        localStorage.setItem('itemList', JSON.stringify(itemList));
        localStorage.setItem('count',cartCount);
        add_to_cart.style.display="flex";
       } 
       setTimeout(addtocart,500);
       function addtocart(){
        add_to_cart.style.display = "none";
       }
     }
    }
     // Already Some Products listed in cart...
    else{
        let cartBtns = document.querySelectorAll('.add-to-cart');
        cartBtns.forEach((btn)=>{
        btn.addEventListener('click',addItem);   
    })

    let cartCount =parseCartItem.length;
    function addItem(){  
      let likeItem  = this.parentElement;
      let itemInfo = likeItem.parentElement;
       let add_to_cart = itemInfo.querySelector('.added');
       let title = itemInfo.querySelector('.product-name').innerHTML;
       let itemPrice = itemInfo.querySelector('.price').innerHTML;
       let itemImg = itemInfo.querySelector('.product-img').src;
       let itemQty = itemInfo.querySelector('.qty').value;
       ratingContent = itemInfo.querySelector('.rating').innerHTML;
       item = ratingContent.substring(10);
       rating = item.slice(0,-2);
       let newProduct = {
       title,itemPrice,itemImg,itemQty,rating
       }

       if(parseCartItem.find((el)=>el.title==newProduct.title)){
        alert("This product already added ");
        return;
       }
       else{
        parseCartItem.push(newProduct);
        localStorage.setItem('itemList', JSON.stringify(parseCartItem));
        ++cartCount;
        document.querySelector('.cart-count').innerHTML = cartCount;
        localStorage.setItem('count',cartCount);
        add_to_cart.style.display="flex";
       } 
       setTimeout(addtocart,500);
       function addtocart(){
        add_to_cart.style.display = "none";
       }
     }
    }
    

   // wishlist page

    let shoppingList=[];
    let wishlistStorage = localStorage.getItem('shoppingList');
    let parseWishlist= JSON.parse(wishlistStorage);
    // Initially wishlist page is empty..
   if(parseWishlist == null||parseWishlist.length ==0){
    let icons = document.querySelectorAll('.shopping')
    icons.forEach((icon)=>{
       icon.addEventListener("click",shoppingItem);
    })
   
    function shoppingItem(){  
       let likeItem  = this.parentElement;
       let itemInfo = likeItem.parentElement;
       let title = itemInfo.querySelector('.product-name').innerHTML;
       let itemPrice = itemInfo.querySelector('.price').innerHTML;
       let itemImg = itemInfo.querySelector('.product-img').src;
       let itemQty = itemInfo.querySelector('.qty').value;
       ratingContent = itemInfo.querySelector('.rating').innerHTML;
       item = ratingContent.substring(10);
       rating = item.slice(0,-2);
       let shoppingProduct = {
       title,itemPrice,itemImg,itemQty,rating
       }
       
       if(shoppingList.find((el)=>el.title==shoppingProduct.title)){
        alert("This product already added ");
        return;
       }
       else{
        shoppingList.push(shoppingProduct);
        localStorage.setItem('shoppingList', JSON.stringify(shoppingList));
       

       } 
    }  
  }
   // Some items already in the wishlist ...
  else{
    let icons = document.querySelectorAll('.shopping')
    icons.forEach((icon)=>{
       icon.addEventListener("click",shoppingItem);
    })
   
    function shoppingItem(){  
    
      let likeItem  = this.parentElement;
      let itemInfo = likeItem.parentElement;
       let title = itemInfo.querySelector('.product-name').innerHTML;
       let itemPrice = itemInfo.querySelector('.price').innerHTML;
       let itemImg = itemInfo.querySelector('.product-img').src;
       let itemQty = itemInfo.querySelector('.qty').value;
       ratingContent = itemInfo.querySelector('.rating').innerHTML;
       item = ratingContent.substring(10);
       rating = item.slice(0,-2);
       let shoppingProduct = {
       title,itemPrice,itemImg,itemQty,rating
       }
       
       if(parseWishlist.find((el)=>el.title==shoppingProduct.title)){
        alert("This product already added ");
        return;
       }
       else{
        parseWishlist.push(shoppingProduct);
        localStorage.setItem('shoppingList', JSON.stringify(parseWishlist));
       } 
    }  
  }

 // items directly from the home ....
  let orderList=[];
  let home_item = document.querySelectorAll('.buy-now');
  home_item.forEach((el)=>{
    el.addEventListener('click',fetchItem);
  })
  function fetchItem(){
    let likeItem  = this.parentElement;
    let buy_item= likeItem.parentElement;
    itemImg= buy_item.querySelector('.product-img').src;
    title = buy_item.querySelector('.product-name').innerHTML;
    itemQty   = buy_item.querySelector('.qty').value;
    itemPrice = buy_item.querySelector('.price').innerHTML;
    ratingContent = buy_item.querySelector('.rating').innerHTML;
     item = ratingContent.substring(10);
     rating = item.slice(0,-2);
    let newBuyItem = {
      itemImg,title,itemQty,itemPrice,rating
    }
    orderList.push(newBuyItem);
    localStorage.setItem('buyItem',JSON.stringify(orderList));
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
