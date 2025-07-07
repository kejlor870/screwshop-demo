
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
    ChangeCartboardImage();

}


// Function changing src cardbord
function ChangeCartboardImage(){
    const width = window.innerWidth;
    if(width <= 975){
        document.querySelector('.floating-img').src = "images/packedArrowDown.PNG";

    }else{
        document.querySelector('.floating-img').src = "images/packedArrowRight.PNG";

    }

}

// When window is resizing 
window.addEventListener('resize', ()=>{
    ChangeCartboardImage();

});


function dragstart(event){
    event.dataTransfer.setData("Sigma", event.target.alt);

    let data = event.dataTransfer.getData("Sigma");

    // alert(data);

}

function dragOvr(event){
    event.preventDefault();

}

// ------------
// Functionality when cartboard is droped to shop cart section
// ------------
function drop(event){
    event.preventDefault();

    // Checking if order quantity is provided good
    if(getOrderInfo() == false){
        return 0;
    }else{
        let orderInfo = getOrderInfo(); // [productName, productPrice, quantity, totalPrice]

        // let liHTML = '<li class="productInCart"><div> <b> '+orderInfo[0]+' </b> x'+orderInfo[2]+' <span class="priceInCart"> '+orderInfo[3]+' zł</span> </div></li>';

        // let cart = document.querySelector("#cartInfo ol");

        // let temp = document.createElement('div');
        // temp.innerHTML = liHTML;

        // let liElement = temp.firstElementChild;

        // cart.appendChild(liElement);

        addProductToCartList(orderInfo);
    }

}

// Get amount, price etc. 
function getOrderInfo(){
    const productName = document.getElementById("productName").innerHTML;
    const quantity = parseInt(document.getElementById("quantityInput").value);
    const productPrice = parseInt(document.getElementById("productPrice").innerHTML);

    // validation of entered data
    let validateInfo = validateOrderInfo(quantity);

    if(validateInfo == true){ // information good -> return data to drop()
        let totalPrice = productPrice * quantity;

        return [productName, productPrice, quantity, totalPrice];
    }else{
        return false;
    }

    
}

// Validation of entered data as function
function validateOrderInfo(quantity){
    if(quantity <= 0 || isNaN(quantity)){
        alert("Podaj poprawna ilość sztuk! \nIlość powinna być większa od 0!");

        return false;
    }else if(quantity >= 2000){
        alert("Prosimy o kontakt w zakładce ,,Kontakt'' przy zamówieniach powyzej 2000!");

        return false;
    }else{
        return true;
    }

}

// ------------
// Adding prduct info to list in cart
// ------------
function addProductToCartList(orderInfo){

    let liHTML = '<li class="productInCart"><div> <b> '+orderInfo[0]+' </b> x'+orderInfo[2]+' <span class="priceInCart"> '+orderInfo[3]+' zł</span> </div></li>';

    let cart = document.querySelector("#cartInfo ol");

    let temp = document.createElement('div');
    temp.innerHTML = liHTML;

    let liElement = temp.firstElementChild;

    cart.appendChild(liElement);

}


// ---------------
// Moving packed on mobile devices (touch)
// ---------------
const drag = document.querySelector(".floating-img");
const dropZone = document.querySelector("#cartInfo");

let offset = {x: 0, y: 0};

drag.addEventListener('touchstart', function(e) {
    const touch = e.touches[0]; // main touch point
    offset.x = touch.clientX - drag.offsetLeft;
    offset.y = touch.clientY - drag.offsetTop;

});

drag.addEventListener('touchmove', function(e) {
    e.preventDefault(); 

    const touch = e.touches[0];
    drag.style.left = (touch.clientX - offset.x) + 'px';
    drag.style.top = (touch.clientY - offset.y) + 'px';

    // Preventing to move box upper from its start point
    if((touch.clientY - offset.y) < (-200)){
        setToStartPosition();

    }

});

drag.addEventListener('touchend', function(e) {
    const dragRect = drag.getBoundingClientRect();
    const dropRect = dropZone.getBoundingClientRect();

    if (
        dragRect.left < dropRect.right &&
        dragRect.right > dropRect.left &&
        dragRect.top < dropRect.bottom &&
        dragRect.bottom > dropRect.top
    ) {
        // Changing cardboard img to checked
        document.querySelector(".floating-img").src = "images/packedChecked.png";
        setTimeout(() => ChangeCartboardImage(), 1000);

        // Setting box to its start position after drop into cart, delay for 0.5s
        setTimeout(() => setToStartPosition(), 1000);
        
        // Adding product to the list
        if(getOrderInfo() == false){
            return 0;
        }else{
            let orderInfo = getOrderInfo();
            addProductToCartList(orderInfo);
        }

    }
});

// ----
// Box comeback to its place, comebackSpeed - how fast, default 400
// ----
function setToStartPosition(comebackSpeed = 400){
    drag.style.left = "25%";
    drag.style.top = 0;
    drag.style.transition = (comebackSpeed/1000) + "s ease"; // (comebackSpeed/1000) = 0.4s
    setTimeout(function(){drag.style.transition = "none";}, comebackSpeed);

}


// TODO: zeby floating-img nie mogl wyjechac poza viewport
//       jak odrzuca orderInfo zeby nie zmienialo obrazka na
//       -zielony check tylko na czerwonego X


