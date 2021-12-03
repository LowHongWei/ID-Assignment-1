/*ProductName
ProductImage
ProductButton
ProductPrice*/

let CartList = []

if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded',ready) //checks if page has loaded finish if it has it will call the ready function
} else{
    ready()
}

function ready(){
    var removeCartItemButton = document.getElementsByClassName('ProductRemove')
    for (var i = 0; i<removeCartItemButton.length;i++){
        var button = removeCartItemButton[i]
        button.addEventListener('click',removeCartItem)//when ProductRemove button has been clicked it will fire the removeCartItem function
    }

    var quantityInputs = document.getElementsByClassName('CartQuantity')
    for (var i = 0; i <quantityInputs.length;i++){
        var input = quantityInputs[i]
        input.addEventListener('change',quantityChanged)//when CartQuantity button has been changed it will fire the quantityChanged function
    }
    var addToCartButtons = document.getElementsByClassName('ProductButton')
    for (var i = 0; i <addToCartButtons.length;i++){
        var button = addToCartButtons[i]
        button.addEventListener('click', addingToArray)//when ProductButton button has been clicked it will fire the addingToArray function
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
        var existingstring = localStorage.getItem('MyCartList')//makes a var from exisiting array
        if (existingstring == null){//if there is no array exisiting it will create one
            CartList.push(addcartitems);//adds the new object to the array
            console.warn('added',{CartList});
            alert('Item added to cart')
            localStorage.setItem('MyCartList',JSON.stringify(CartList)); //makes it string to transfer over to other pages from localStorage
        }else{
            var existing = JSON.parse(existingstring);//if there is exisiting array it will convert it back from string to array
            existing.push(addcartitems);//adds new object
            console.warn('added',{existing});
            alert('Item added to cart')
            localStorage.setItem('MyCartList',JSON.stringify(existing)); //makes array into string for localStorage
        }
};
