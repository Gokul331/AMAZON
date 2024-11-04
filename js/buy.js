// display address tab using header ...
document.querySelector('.item1').style.background="green";
document.querySelector('.orders').style.display = "none";
document.querySelector('.payment').style.display = "none";
document.querySelector('.order-placed').style.display = "none";
let address = document.querySelector('.item1');
 address.addEventListener('click',()=>{
    document.querySelector('.item1').style.background="green";
    document.querySelector('.item1').innerHTML = "1";
    document.querySelector('.item2').style.background="black";
    document.querySelector('.item2').innerHTML="2";
    document.querySelector('.item3').innerHTML="3";
    document.querySelector('.address').style.display= "block";
    document.querySelector('.orders').style.display = "none"; 
    document.querySelector('.payment').style.display = "none";
    document.querySelector('.order-placed').style.display = "none";

})

// display saved address and new address form ....

let add_address = document.querySelector('.newaddress');
add_address.addEventListener("click",check);
let val = "hide";
   // before clicking event... 
 if(val=="show1"){
    document.querySelector('.address-box').style.display = "flex";
    val="hide";
   }
   else{  
    document.querySelector('.address-box').style.display = "none";
    document.querySelector('.deliver-here').style.display = "none";
    val="show1";
   }     
   // after clicking event .. 
    function check(){   
           if(val=="show1"){
            
            document.querySelector('.address-box').style.display = "flex";
            document.querySelector('.address-display').style.display= "none";
            document.querySelector('.newaddress').style.display= "none";
            document.querySelector('.deliver-here').style.display = "none";
            val="hide";
           }
           else{  
            document.querySelector('.address-box').style.display = "none";
            val="show1";
           }     
    }

    // close address form ...

    let close = document.querySelector('.cancel');
    close.addEventListener('click',()=>{
        if(parseAddress ==null || parseAddress.length==0){
            alert("Sorry! You need to enter address");
        }
        else{
            document.querySelector('.address-display').style.display= "flex";
            document.querySelector('.newaddress').style.display= "flex";
            document.querySelector('.address-box').style.display = "none";
        }
    });

//Save address ...
let addressList=[];
let stogreenAddress = localStorage.getItem('address');
let parseAddress = JSON.parse(stogreenAddress);
let btn = document.querySelector('.submit');
btn.addEventListener('click',()=>{
    let name           = document.querySelector('#name').value;
    let phoneNumber    = document.querySelector('#phone').value ;
    let alternatePhone = document.querySelector('#AlternateNumber').value; 
    let pincode        = document.querySelector('#pincode').value;
    let home           = document.querySelector('#homeNo').value;
    let street         = document.querySelector('#area').value;
    let city           = document.querySelector('#city').value;
    let state          = document.querySelector('#state').value;
  
    address = {
        name,phoneNumber,alternatePhone,pincode,home,street,city,state
    }
    if(parseAddress==null || parseAddress.length==0){        
    addressList.push(address);
    localStorage.setItem('address',JSON.stringify(addressList));
    location.reload();
    check();   
    }
    else{
        parseAddress.push(address);
        localStorage.setItem('address',JSON.stringify(parseAddress));
        location.reload();
        check();
    }

})  

// Show address...
if(parseAddress== null || parseAddress.length==0){
    val="show1";
    check();
}
else{
    for(let i=0;i<parseAddress.length;i++){
        c_name=parseAddress[i].name
        c_phone=parseAddress[i].phoneNumber
        c_alter =parseAddress[i].alternatePhone
        c_pin=parseAddress[i].pincode
        c_home=parseAddress[i].home
        c_street=parseAddress[i].street
        c_city=parseAddress[i].city
        c_state=parseAddress[i].state
              displayAddress();
              let newAddress = displayAddress();
              let element = document.createElement('div');
              element.innerHTML = newAddress;
              let cartBasket = document.querySelector('.address-display');
              cartBasket.append(element);

        }
}

function displayAddress(){
    return `<div class="address-saved">
            <div class="customer">${c_name}</div>
            <div class="select">
             <div class="select-label">Select</div>
            <ion-icon class="select-icon" name="checkmark-outline"></ion-icon>
            </div>
            <div class="full-address">${c_home}, ${c_street}, ${c_city}, ${c_state}, ${c_pin}</div>
            <div class="number">${c_phone} | ${c_alter}</div>
            </div>`
}

// select address

let select = document.querySelectorAll('.select');
select.forEach((btn)=>{
     btn.addEventListener('click',ab);
    })
    function ab(){
        let el =this.parentElement;
        let cartBasket = document.querySelector('.selectAddress');
        cartBasket.append(el);
        document.querySelector('.address-display').style.display="none";
        el.querySelector('.select-label').style.display="none";
        el.querySelector('.select-icon').style.display="flex";
        document.querySelector('.newaddress').style.display="none";
        document.querySelector('.deliver-here').style.display = "block";
}

// Deliver Btn config...
let deliver = document.querySelector('.deliver-here');
deliver.addEventListener('click',()=>{
  
    document.querySelector('.address').style.display= "none";
    document.querySelector('.item1').innerHTML ="&#10003;";
    document.querySelector('.orders').style.display = "block"; 
    document.querySelector('.item2').style.background="green";

})

// Orders tab

// display address tab using header ...

let order = document.querySelector('.item2');
 order.addEventListener('click',()=>{
    document.querySelector('.item2').style.background="green";
    document.querySelector('.item1').innerHTML="&#10003;";
    document.querySelector('.item3').innerHTML="3";
    document.querySelector('.orders').style.display= "block";
    document.querySelector('.address').style.display = "none";
    document.querySelector('.payment').style.display = "none";
})

// Retrieve StogreenItem and display in order tab....

let total_price = 0;
let i=0;
 let storeBuyItem = localStorage.getItem('buyItem');
 let parseBuyItem = JSON.parse(storeBuyItem);
 for(let i=0;i<parseBuyItem.length;i++){
 title = parseBuyItem[i].title;
 itemImg = parseBuyItem[i].itemImg;
 itemQty = parseBuyItem[i].itemQty;
 itemPrice = parseBuyItem[i].itemPrice;
 rating = parseBuyItem[i].rating;
 let newProductElement = createOrderItem(title,itemPrice,itemImg,itemQty,rating);
 let element = document.createElement('div');
 element.innerHTML = newProductElement;
 let cartBasket = document.querySelector('.order-content');
 cartBasket.append(element);
 updatePrice();
 qtyTotal();

 }
// function add Item into cart

function createOrderItem(title,itemPrice,itemImg,itemQty,rating){

 return `<div class="order-box">
             <div class="order-product-image"><img src="${itemImg}"></div>  
              <div class="order-prod-name">${title}</div>
               <div class="rating-star-count">${rating}</div>
              <div class="quantity">Quantity<input type="number" value="${itemQty}" max="10" min="1" class="qty"></div>
              <button class="saveforlater-order-item">Save for later</button> 
              <div class="order-prod-price">${itemPrice}</div> 
              <div class= "order-qty-prod-price">${total_price}</div>
         </div>`
}

  // update Price in the order tab...
  
function updatePrice(){
    let orderItem =document.querySelectorAll('.order-box');
    const totalPrice = document.querySelector('.price');
    total_price =0;
    orderItem.forEach(item=>{
        let priceElement = item.querySelector('.order-prod-price').innerHTML;
        let val = (priceElement.substring(1));
        let priceQtyEl = item.querySelector('.order-qty-prod-price');
        let qtyEl =  item.querySelector('.qty').value;
        let totalEl =  val*qtyEl ;
        total_price +=totalEl;
        total = total_price.toFixed(2);
        priceQtyEl.innerHTML = `$`+totalEl.toFixed(2);  

   // Discount Calculation...
   
    let discount = document.querySelector('.discount-amount');
    discount_cal = parseFloat(total);
     let discount_amount;
     if(discount_cal>50 && discount_cal<100 ){
        discount_amount= discount_cal*0.05;
        discount.innerHTML = `$ `+(discount_amount).toFixed(2);
     }
     else if(discount_cal>100 && discount_cal <500 ){
        discount_amount= discount_cal*0.1;
        discount.innerHTML = `$ `+(discount_amount).toFixed(2);
     }
     else{
        discount_amount= discount_cal*0;
        discount.innerHTML = `$ `+(discount_amount).toFixed(2);
     }
    
    totalPrice.innerHTML = `$`+total;
    
    // Delivery charges ...
    let delivery_char = document.querySelector('.delivery-cost');
    let delivery_charge;
    if(discount_cal/parseBuyItem.length<50){
        delivery_charge = 1
        delivery_char.innerHTML = `$ `+delivery_charge;
    }
    else{
        delivery_charge =0;
        delivery_char.innerHTML = `$ `+delivery_charge;
    }

    // calculate total price...

    let total_cost1 = document.querySelector('.total-cost');
    total_cost1.innerHTML = `$`+(discount_cal + delivery_charge - discount_amount).toFixed(2);
 })
 final_price();
}


function qtyTotal(){

    let qtyElement = document.querySelectorAll('.qty');
       qtyElement.forEach((input)=>{
       input.addEventListener('change',()=>{
             let qtyCount;
             if(isNaN(this.value) || this.value<1){
                 this.value=1;
             }
             else{
                 this.value;
                 qtyCount = this.value;
                 updatePrice();
             }
            });
        })   
   }

// Payment details...

let payment = document.querySelector('.continue');
 payment.addEventListener('click',()=>{
    document.querySelector('.orders').style.display= "none";
    document.querySelector('.address').style.display = "none";
    document.querySelector('.payment').style.display="block";
    document.querySelector('.item1').innerHTML="&#10003;";
    document.querySelector('.item2').innerHTML="&#10003;";
    document.querySelector('.item2').style.background="green";
    document.querySelector('.item3').style.background="green";
})

// Payment method Selection ....
let radioButtons = document.querySelectorAll('input[name="payment"]');
radioButtons.forEach(radioButton=>{
radioButton.addEventListener('click',()=>{
        if(radioButton.checked){
            if(radioButton.value==="upi"){
                document.querySelector('.upi-list').style.display = "flex";
                document.querySelector('.wallet-list').style.display = "none"; 
                document.querySelector('.credit-card').style.display = "none";
                document.querySelector('.net-banking').style.display = "none";  
            }
            else if(radioButton.value==="wallet"){
                document.querySelector('.upi-list').style.display = "none";
                document.querySelector('.wallet-list').style.display = "flex"; 
                document.querySelector('.credit-card').style.display = "none";
                document.querySelector('.net-banking').style.display = "none";               
            }
            else if(radioButton.value==="credit"){
                document.querySelector('.upi-list').style.display = "none";
                document.querySelector('.wallet-list').style.display = "none"; 
                document.querySelector('.credit-card').style.display = "grid";
                document.querySelector('.net-banking').style.display = "none";                
            }
            else if(radioButton.value==="net-banking"){
                document.querySelector('.upi-list').style.display = "none";
                document.querySelector('.wallet-list').style.display = "none"; 
                document.querySelector('.credit-card').style.display = "none";
                document.querySelector('.net-banking').style.display = "grid";     
            }
            else{
                document.querySelector('.upi-list').style.display = "none";
                document.querySelector('.wallet-list').style.display = "none"; 
                document.querySelector('.credit-card').style.display = "none";
                document.querySelector('.net-banking').style.display = "none";  
            }
          
        }
    })

})

//UPI Elements...

let UPI_radioButtons = document.querySelectorAll('input[name="upi"]');
UPI_radioButtons.forEach(UPI_radioButton=>{
UPI_radioButton.addEventListener('click',()=>{
        if(UPI_radioButton.checked){
            if(UPI_radioButton.value==="PhonePe"){
                document.querySelector('.pay1').style.display = "block";
                document.querySelector('.yourupi').style.display = "none"; 
                document.querySelector('.custom-pay').style.display = "none";  
            }
            else if(UPI_radioButton.value==="custom"){
                document.querySelector('.yourupi').style.display = "block";
                document.querySelector('.custom-pay').style.display = "block"; 
                document.querySelector('.pay1').style.display = "none";               
            }
            else{
                document.querySelector('.pay1').style.display = "none";
                document.querySelector('.yourupi').style.display = "none";  
                document.querySelector('.custom-pay').style.display = "none"; 
            }
          
        }
    })

})

//Wallet Elements ...

let wallet_radioButtons = document.querySelectorAll('input[name="wallet"]');
wallet_radioButtons.forEach(wallet_radioButton=>{
wallet_radioButton.addEventListener('click',()=>{
        if(wallet_radioButton.checked){
            if(wallet_radioButton.value==="PhonePe-Wallet"){
                document.querySelector('.pay2').style.display = "block";  
            }
            else{
                document.querySelector('.pay2').style.display = "none"; 
            }
          
        }
    })

})

// Net Banking ...choose only one bank.
let other_bank = document.querySelector('.other-option');
let net_banking_radioButtons = document.querySelectorAll('input[name="banks"]');
net_banking_radioButtons.forEach(netBanking_radioButton=>{
    netBanking_radioButton.addEventListener('click',()=>{
    if(netBanking_radioButton.checked){
        other_bank.value = "";
    }
    })
})

other_bank.addEventListener('change',()=>{
    net_banking_radioButtons.forEach(netBanking_radioButton=>{
          netBanking_radioButton.checked = false;
    })
})


function final_price(){
    // price details...
    let final = document.querySelector('.price-details2');
    let final_price = final.querySelector('.price');
    final_price.innerHTML = `$` + discount_cal;
    // discount details...
    let discount = document.querySelector('.discount-amount').innerHTML;
    let final_discount = final.querySelector('.discount-amount');
    final_discount.innerHTML = discount;
     // Delivery Charges ...
     let delivery = document.querySelector('.delivery-cost').innerHTML;
     let final_delivery = final.querySelector('.delivery-cost');
     final_delivery.innerHTML = delivery;
     //Final_total_price...
     let total = document.querySelector('.total-cost').innerHTML;
     let final_total_price = final.querySelector('.total-cost');
     final_total_price.innerHTML = total;
  



 document.querySelector('.pay1').innerHTML= `Pay `+ final.querySelector('.total-cost').innerHTML;

pay = document.querySelector('.pay2');
pay.innerHTML = `Pay `+document.querySelector('.total-cost').innerHTML;

pay = document.querySelector('.pay');
pay.innerHTML = `Pay `+document.querySelector('.total-cost').innerHTML;

pay = document.querySelector('.custom-pay');
pay.innerHTML = `Pay `+document.querySelector('.total-cost').innerHTML;

pay = document.querySelector('.pay3');
pay.innerHTML = `Pay `+document.querySelector('.total-cost').innerHTML;
}

// Card Number Validation...

function formatCardNumber(input) {
    // Remove all non-digit characters
    let cardNumber = input.value.replace(/\D/g, '');
    
    // Format the number in groups of four
    if (cardNumber.length > 0) {
        cardNumber = cardNumber.match(/.{1,4}/g).join(' ');
    }
    
    input.value = cardNumber;
}

function validateCard() {
    const cardNumber = document.getElementById('cardNumber').value.replace(/\s+/g, ''); // Remove spaces
    const errorSpan = document.getElementById('error');
    errorSpan.textContent = ''; // Clear any previous error messages

    // Check if it has exactly 16 digits
    if (!/^\d{16}$/.test(cardNumber)) {
        errorSpan.textContent = 'credit card number must be exactly 16 digits.';
        return false;
    }

    // Optional: Perform Luhn algorithm check for credit card validity
    if (!luhnCheck(cardNumber)) {
        errorSpan.textContent = 'Invalid credit card number.';
        return false;
    }

    alert('credit card number is valid!');
    return true;
}

// Luhn algorithm for validating credit card numbers
function luhnCheck(cardNumber) {
    let sum = 0;
    let shouldDouble = false;
    for (let i = cardNumber.length - 1; i >= 0; i--) {
        let digit = parseInt(cardNumber[i]);
        if (shouldDouble) {
            digit *= 2;
            if (digit > 9) digit -= 9;
        }
        sum += digit;
        shouldDouble = !shouldDouble;
    }
    return sum % 10 === 0;
}

// CVV Format...
function cvvFormat(input){
    let cvv = input.value.replace(/\D/g,'');
    input.value = cvv;
}

// Order Placed....
let pay1_btn = document.querySelector('.pay1');
pay1_btn.addEventListener('click',()=>{
    paymentProcess();
    document.querySelector('.item3').innerHTML="&#10003;";
})
let pay_btn = document.querySelector('.pay');
pay_btn.addEventListener('click',()=>{
    paymentProcess();
    document.querySelector('.item3').innerHTML="&#10003;";
})
let custom_btn = document.querySelector('.custom-pay');
custom_btn.addEventListener('click',()=>{
    paymentProcess();
    document.querySelector('.item3').innerHTML="&#10003;";
})
let pay2_btn = document.querySelector('.pay2');
pay2_btn.addEventListener('click',()=>{
    paymentProcess();
    document.querySelector('.item3').innerHTML="&#10003;";
})
let pay3_btn = document.querySelector('.pay3');
pay3_btn.addEventListener('click',()=>{
    paymentProcess();
    document.querySelector('.item3').innerHTML="&#10003;";
})

   function paymentProcess(){
    document.querySelector('.order-placed').style.display = "block";
    document.querySelector('.orders').style.display= "none";
    document.querySelector('.address').style.display = "none";
    document.querySelector('.payment').style.display="none";
    openPaymentPage();
    addOrderItems();
    removeBuyItems();
}

// Transfer items into OrderList
function addOrderItems(){
     parseBuyItem = JSON.parse(storeBuyItem);
     let orderList =[];
     orderList = orderList.concat(parseBuyItem);
     localStorage.setItem('OrderList',JSON.stringify(orderList));
}
// Remove items in the buy location
function removeBuyItems(){
    for(let i=parseBuyItem.length; i>=0;i--){
        parseBuyItem.pop(i);
     }
     localStorage.setItem('buyItem',JSON.stringify(parseBuyItem));
    
}

function openPaymentPage(){
let paymentStatus = document.querySelector('.payment-status');
let line = document.querySelector('.line');
let line2 = document.querySelector('.line2');
let status = document.querySelector('.status-info');
let box = document.querySelector('.box');
let orderStatus = document.querySelector('.order-status');
let line1 = document.querySelector('.line1');
let line3 = document.querySelector('.line3');
let box1 = document.querySelector('.box1');
let orderDetails = document.querySelector('.order-details');
let box2 = document.querySelector('.box2');


isTrue();
function isTrue(){
    setInterval(isSuccess,1000);
    setInterval(isOrdegreen,5000);
    setInterval(isCheck,10000);
}

function isSuccess(){
        paymentStatus.classList.add('true'); 
        box.classList.add('tick');
        line.style.display="none";
        line1.style.display="none";
        status.style.display ="grid";
        line2.style.display="block";
}

function isOrdegreen(){
        orderStatus.classList.add('true');
        box1.classList.add('tick');
        line1.style.display="none";
        document.querySelector('.status-info1').style.display ="grid";
        line3.style.display="block";
}

function isCheck(){
    orderDetails.classList.add('true');
    box2.classList.add('tick');
    document.querySelector('.status-info2').style.display ="grid";
}
}
