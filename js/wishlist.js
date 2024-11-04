// wishlist page

    
      callstoredshoppingItem();
       function callstoredshoppingItem(){
        let storageshoppingItem = localStorage.getItem('shoppingList');
        let parseshoppingItem = JSON.parse(storageshoppingItem);

        for(let i=0;i<parseshoppingItem.length;i++){

          title = parseshoppingItem[i].title;
      itemPrice = parseshoppingItem[i].itemPrice;
        itemImg = parseshoppingItem[i].itemImg;
        itemQty = parseshoppingItem[i].itemQty;
        rating = parseshoppingItem[i].rating;
        let newshoppingElement = createshoppingItem(title,itemPrice,itemImg,itemQty);
        let element = document.createElement('div');
        element.innerHTML = newshoppingElement;
        let cartBasket = document.querySelector('.shopping-list');
        cartBasket.append(element);
        loadContent1();

        let list_count = document.querySelector('.list-count');
        list_count.innerHTML = `(${parseshoppingItem.length})`;
        }
}

    // function add Item into cart
    function createshoppingItem(title,itemPrice,itemImg,itemQty){
 
        return `<div class="shopping-box">
                    <div class="wishlist-product-image"><img src="${itemImg}"></div>  
                     <div class="wishlist-prod-name">${title}</div>
                     <div class="wishlist-prod-rating">${rating}</div>
                     <div class="wishlist-quantity">Quantity<input type="number" value="${itemQty}" max="10" min="1" class="qty"></div> 
                     <button class="add-into-cart">Add to cart</button>
                      <button class="delete-wishlist-item">Delete</button>
                     <div class="wishlist-prod-price">${itemPrice}</div> 
                </div>`
    }

      // Remove wishlist items
       let wishlistStorage1 = localStorage.getItem('shoppingList');
       parseWishlist1= JSON.parse(wishlistStorage1);

      let deleteBtn = document.querySelectorAll('.delete-wishlist-item');
      deleteBtn.forEach((btn)=>{
          btn.addEventListener('click',removeWishlistItem);
      })
   
      function removeWishlistItem(){
        let title = this.parentElement.querySelector('.wishlist-prod-name').innerHTML;    
        parseWishlist1=parseWishlist1.filter((el)=>el.title != title);
        this.parentElement.remove(); 
        localStorage.setItem('shoppingList', JSON.stringify(parseWishlist1));
        loadContent1();
        document.querySelector('.list-count').innerHTML = `(${parseWishlist1.length})`; 
      }

      function loadContent1(){
       
        // Validation for the quantity
        let qtyElement = document.querySelectorAll('.qty');
        qtyElement.forEach((input)=>{
        input.addEventListener('change',qtyCheck);
         })
 
         //Cart Count 
         let cartCount = localStorage.getItem('count');
         document.querySelector('.cart-count').innerHTML = cartCount;
         
         
   }
 
 // Wishlist to Cart...

 itemList = [];
let cartItems = localStorage.getItem('itemList');
let parseCartItems = JSON.parse(cartItems);

// Initially cart is empty...

if(parseCartItems == null || parseCartItems.length==0){
   let add_to_cart_btns = document.querySelectorAll('.add-into-cart');
   add_to_cart_btns.forEach(add_to_cart_btn =>{
      add_to_cart_btn.addEventListener('click',addItemToCart);
   })

 function addItemToCart(){

       let total_item = this.parentElement;
       let title = total_item.querySelector('.wishlist-prod-name').innerHTML;
       let itemPrice = total_item.querySelector('.wishlist-prod-price').innerHTML;
       let itemImgContent = total_item.querySelector('.wishlist-product-image').innerHTML;
       let item = itemImgContent.substring(10);
       let itemImg = item.slice(0,-2);
       let itemQty = total_item.querySelector('.qty').value;
       rating = total_item.querySelector('.wishlist-prod-rating').innerHTML;

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
            count =1;
            localStorage.setItem('count',count);
         }   
      
      // delete after added into cart...
      let wishlistStorage1 = localStorage.getItem('shoppingList');
       parseWishlist1= JSON.parse(wishlistStorage1);
        
        let added_title =title;
        parseWishlist1=parseWishlist1.filter((el)=>el.title != added_title);
        total_item.remove(); 
        localStorage.setItem('shoppingList', JSON.stringify(parseWishlist1));
        loadContent1();
        document.querySelector('.list-count').innerHTML = `(${parseWishlist1.length})`
        }
   }
  // Already Some Products listed in cart...
  else{
   let add_to_cart_btns = document.querySelectorAll('.add-into-cart');
   add_to_cart_btns.forEach((add_to_cart_btn)=>{
   add_to_cart_btn.addEventListener('click',addItemToCart);   
  })

function addItemToCart(){  

  let total_item = this.parentElement;
  let title = total_item.querySelector('.wishlist-prod-name').innerHTML;
  let itemPrice = total_item.querySelector('.wishlist-prod-price').innerHTML;
  let itemImgContent = total_item.querySelector('.wishlist-product-image').innerHTML;
  let item = itemImgContent.substring(10);
  let itemImg = item.slice(0,-2);
  let itemQty = total_item.querySelector('.qty').value;
  rating = total_item.querySelector('.wishlist-prod-rating').innerHTML;

      let newProduct = {
      title,itemPrice,itemImg,itemQty,rating
      }

  if(parseCartItems.find((el)=>el.title==newProduct.title)){
   alert("This product already added ");
   return;
  }
  else{
    let count = localStorage.getItem('count');
   parseCartItems.push(newProduct);
   localStorage.setItem('itemList', JSON.stringify(parseCartItems));
  ++count;
 localStorage.setItem('count',count);
  } 
 
  /// delete after added into cart ...
  let wishlistStorage1 = localStorage.getItem('shoppingList');
       parseWishlist1= JSON.parse(wishlistStorage1);
        
        let added_title =title;
        parseWishlist1=parseWishlist1.filter((el)=>el.title != added_title);
        total_item.remove(); 
        localStorage.setItem('shoppingList', JSON.stringify(parseWishlist1));
        loadContent1();
        document.querySelector('.list-count').innerHTML = `(${parseWishlist1.length})`
        }
}
