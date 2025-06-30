
window.onload = function(){
    // ----
    //  Main Image src changing for thumbnail after hover
    // ----
    const mainImage = document.getElementById("mainImage");
    const thumbnails = document.querySelectorAll("#photoGallery aside img");

    // Setting first thumbnail image src as main image
    mainImage.src = thumbnails[0].src; 

    thumbnails[0].className = "currentImage";

    // Adding function to all thumbnail
    for(let i=0; i<thumbnails.length; i++){

        // Changing main image src after mouse over thumbnail
        thumbnails[i].onmouseover = function(){
            mainImage.src = this.src;
            this.style = "background-color:rgba(206, 206, 206, 0.82);";

        }

        thumbnails[i].onmouseleave = function(){
            this.style = "background-color: #f0f0f0;";

        }

    }

    // ----
    //  Changing arrow on cardbord when screen size is 768px (onload)
    // ----
    const width = window.innerWidth;
    ChangeCartboardImage(width)

}


// Function changing src cardbord
function ChangeCartboardImage(width){
    if(width <= 975){
        document.querySelector('#addToCartSection img').src = "images/packedArrowDown.PNG";
    }else{
        document.querySelector('#addToCartSection img').src = "images/packedArrowRight.PNG";
    }

}

// When window is resizing 
window.addEventListener('resize', ()=>{
    const width = window.innerWidth;
    ChangeCartboardImage(width)

});


function dragstart(event){
    event.dataTransfer.setData("Sigma", event.target.alt);

    let data = event.dataTransfer.getData("Sigma");

    // alert(data);

}

function dragOvr(event){
    event.preventDefault();

}

function drop(event){
    event.preventDefault();

    // Checking if order quantity is provided good
    if(getOrderInfo() == false){
        return 0;
    }else{
        let orderInfo = getOrderInfo(); // [productName, productPrice, quantity, totalPrice]

        let liHTML = '<li class="productInCart"><div> <b> '+orderInfo[0]+' </b> x'+orderInfo[2]+' <span class="priceInCart"> '+orderInfo[3]+' zł</span> </div></li>';

        let cart = document.querySelector("#cartInfo ol");

        let temp = document.createElement('div');
        temp.innerHTML = liHTML;

        let liElement = temp.firstElementChild;

        cart.appendChild(liElement);
    }

}

// Get amount, price etc.
function getOrderInfo(){
    const productName = document.getElementById("productName").innerHTML;
    const quantity = parseInt(document.getElementById("quantityInput").value);
    const productPrice = parseInt(document.getElementById("productPrice").innerHTML);

    // validation of entered data
    if(quantity <= 0 || isNaN(quantity)){
        alert("Podaj poprawna ilość sztuk! \nIlość powinna być większa od 0!");

        return false;
    }

    let totalPrice = productPrice * quantity;

    return [productName, productPrice, quantity, totalPrice];
}


// TODO: przenoszenie obrazka na telefonach (touch)...
