var localstring = localStorage.getItem('MyCartList');//gets array
var ItemsinArray = JSON.parse(localstring);//converts string to array
console.log(ItemsinArray);

let CartList = []//empty array list

if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded',ready) //checks if page has loaded finish
} else{
    ready()
    addToCartClicked()
}


function addToCartClicked(event){
    for (var i = 0; i <ItemsinArray.length; i++){
    var title = ItemsinArray[i].title//gets that items title
    var price = ItemsinArray[i].price//gets that items price
    var img = ItemsinArray[i].img// gets that items image link
    console.log(title,price,img)
    if (title)
    addItemToCart(title,price,img)//calls function and puts perimeters inside
    updateCartTotal()//updates cart total because it added a new items so there is a new total
    }
}

function addItemToCart(title,price,imageSrc){//adds that item to cart
    var cartRow = document.createElement('div')
    cartRow.classList.add('CartRow')
    var cartItems = document.getElementsByClassName('CartItems')[0]
    var cartItemNames =cartItems.getElementsByClassName('CartTitle')
    for (var i = 0; i <cartItemNames.length; i++){//checks if there are duplicates
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
            </div>`//prints out the items in that format
        cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('ProductRemove')[0].addEventListener('click',removeCartItem)//if they click on the remove button it will call the remove function which will remove that item
    cartRow.getElementsByClassName('CartQuantity')[0].addEventListener('change',quantityChanged)//sees if quantity changed so they make sure it cant go below 1 and can update cart total
}

function removeCartItem(event){
    var buttonclicked = event.target
    buttonclicked.parentElement.parentElement.remove()//removes that item in the array
    updateCartTotal()//updates price
}

function quantityChanged(event){
    var input = event.target
    if (isNaN(input.value) || input.value <=0){//makes it so there cant be below 1 quantity
        input.value=1
    }
    updateCartTotal()//updates quantity change
}

 function updateCartTotal(){//Updates total
     var cartItemContainer =document.getElementsByClassName('CartItems')[0]//wants the first element of the array
     var CartRows = cartItemContainer.getElementsByClassName('CartRow')//gets all the elements inside the object like price or title
     var total=0
    for (var i = 0; i<CartRows.length;i++){
        var CartRow = CartRows[i]
        var PriceElement = CartRow.getElementsByClassName('CartPrice')[0]//gets price
        var quantityElement =CartRow.getElementsByClassName('CartQuantity')[0]//gets quantity
        var price = parseFloat(PriceElement.innerText.replace('$',''))  //parsefloat turns any string into a float
        var quantity = quantityElement.value
        total =total+(price*quantity)//finds total
    }total = Math.round((total*100) / 100 *0.85)//makes the total 2 decimal
    document.getElementsByClassName('CartTotal')[0].innerText = "$" + total//shows the total
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
    document.getElementsByClassName('PurchaseButton')[0].addEventListener('click',CartClicked)//when the PurchaseButton is clicked it will call CartClicked function
}

function CartClicked(){
    alert('Please enter your card details to pay!')//sends a message to the page where it pops up
    window.localStorage.clear();//clears the local storage as they are now paying
    location.reload()//reloads the whole page so the page updates
    updateCartTotal()//updates the total as there is no items
} 