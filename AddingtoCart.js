/*ProductName
ProductImage
ProductButton
ProductPrice*/

let CartList = []

if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded',ready) //checks if page has loaded finish
} else{
    ready()
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
}

function addingToArray(event){
    var button =event.target
    var product = button.parentElement
    let addcartitems = {
        title: product.getElementsByClassName('ProductName')[0].innerText,//adding finding items to put into array
        price: product.getElementsByClassName('ProductPrice')[0].innerText,
        img : product.getElementsByClassName('ProductImage')[0].src
    }
        var existingstring = localStorage.getItem('MyCartList')
        if (existingstring == null){
            CartList.push(addcartitems);
            console.warn('added',{CartList});
            alert('Item added to cart')
            localStorage.setItem('MyCartList',JSON.stringify(CartList)); 
        }else{
            var existing = JSON.parse(existingstring);
            existing.push(addcartitems);
            console.warn('added',{existing});
            alert('Item added to cart')
            localStorage.setItem('MyCartList',JSON.stringify(existing)); 
        }
};
