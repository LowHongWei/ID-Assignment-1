var localstring = localStorage.getItem('MyCartList');
var ItemsinArray = JSON.parse(localstring);
console.log(ItemsinArray);

let CartList = []

if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded',ready) //checks if page has loaded finish
} else{
    ready()
    addToCartClicked()
}


function addToCartClicked(event){
    for (var i = 0; i <ItemsinArray.length; i++){
    var title = ItemsinArray[i].title
    var price = ItemsinArray[i].price
    var img = ItemsinArray[i].img
    console.log(title,price,img)
    if (title)
    addItemToCart(title,price,img)
    updateCartTotal()
    }
}

function addItemToCart(title,price,imageSrc){
    var cartRow = document.createElement('div')
    cartRow.classList.add('CartRow')
    var cartItems = document.getElementsByClassName('CartItems')[0]
    var cartItemNames =cartItems.getElementsByClassName('CartTitle')
    for (var i = 0; i <cartItemNames.length; i++){
        if (cartItemNames[i].innerHTML == title){
            alert('There has been a duplicate item added!')
            return
        }
    }
    var cartRowContents = `
            <div class="CartColumn">
                <img class="CartImage" src="${imageSrc}">
                <span class="CartTitle">${title}</span>
            </div>
            <span class="CartPrice CartColumn">${price}</span>
            <div class="CartColumn">
                <input class="CartQuantity" type="number" value="1">
                <button class="ProductRemove" type="button">REMOVE</button>
            </div>`
        cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('ProductRemove')[0].addEventListener('click',removeCartItem)
    cartRow.getElementsByClassName('CartQuantity')[0].addEventListener('change',quantityChanged)
}

function removeCartItem(event){
    var buttonclicked = event.target
    buttonclicked.parentElement.parentElement.remove()
    updateCartTotal()
}

function quantityChanged(event){
    var input = event.target
    if (isNaN(input.value) || input.value <=0){
        input.value=1
    }
    updateCartTotal()
}

 function updateCartTotal(){
     var cartItemContainer =document.getElementsByClassName('CartItems')[0]
     var CartRows = cartItemContainer.getElementsByClassName('CartRow')
     var total=0
    for (var i = 0; i<CartRows.length;i++){
        var CartRow = CartRows[i]
        var PriceElement = CartRow.getElementsByClassName('CartPrice')[0]
        var quantityElement =CartRow.getElementsByClassName('CartQuantity')[0]
        var price = parseFloat(PriceElement.innerText.replace('$',''))  //parsefloat turns any string into a float
        var quantity = quantityElement.value
        total =total+(price*quantity)
    }total = Math.round((total*100) / 100 *0.85)
    document.getElementsByClassName('CartTotal')[0].innerText = "$" + total
 }

 function ready(){
    var removeCartItemButton = document.getElementsByClassName('ProductRemove')
    for (var i = 0; i<removeCartItemButton.length;i++){
        var button = removeCartItemButton[i]
        button.addEventListener('click',removeCartItem)
    }

    var quantityInputs = document.getElementsByClassName('CartQuantity')
    for (var i = 0; i <quantityInputs.length;i++){
        var input = quantityInputs[i]
        input.addEventListener('change',quantityChanged)
    }
    var addToCartButtons = document.getElementsByClassName('ProductButton')
    for (var i = 0; i <addToCartButtons.length;i++){
        var button = addToCartButtons[i]
        button.addEventListener('click', addingToArray)
    }
    document.getElementsByClassName('PurchaseButton')[0].addEventListener('click',purchaseClicked)
}

function purchaseClicked(){
    alert('Thank you for your purchase, please visit us again!')
    window.localStorage.clear();
    location.reload()
    updateCartTotal()
}
