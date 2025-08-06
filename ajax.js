var XMLMainElement = null;
var XMLAllProductsElement = null;

document.addEventListener('DOMContentLoaded', function () {
    // Load all products cards to indexPage
    loadAllProductsXML(); 

    // Choosing all links to products
    const allLi = document.querySelectorAll('nav li ul li a');

    // Adding click function to all menu anchors
    for(let i=0; i<allLi.length; i++){
        allLi[i].addEventListener('click', function(e){
            e.preventDefault();
            // this.textContent <- Text from menu 
            downloadXML(this.textContent);

        });
    }

});

// XML connect init
function ajaxInit(){
    var XHR = null;

    try{
        XHR = new XMLHttpRequest();

    }catch(e){
        try{
            XHR = new ActiveXObject("Msxml2.XMLHTTP");
        }catch(e2){
            try{
                XHR = new ActiveXObject("Microsoft.XMLHTTP");
            }catch(e3){
                alert("Twoja przegladarka nie obsługuje AJAX");
            }
        }
    }

    return XHR;
}

// XML download data of the product
function downloadXML(productName){
    productName = productName.trim();
    var XHR = ajaxInit();
    
    if(XHR != null){
        XHR.open("GET", "./getProductInfo.php?selectedItem="+productName, true);
        
        XHR.onreadystatechange = function(){

            if(XHR.readyState == 4){

                if(XHR.status == 200){
                    XMLMainElement = XHR.responseXML.documentElement;

                    // Show info from XML
                    showInfo(productName);

                }else{
                    alert("wystapil blad: " + XHR.status + "\nSprawdź połączenie z internetem!");
                }

            }

        }

        XHR.send(null);
    }

}

// Show info about clicked product
function showInfo(menuName){
    let menuNameClkd = menuName.trim();

    if(XMLMainElement != null){
        let nutList = XMLMainElement.getElementsByTagName("Nut");

        for(let i=0; i<nutList.length; i++){
            // Searching in XML
            if(nutList[i].getElementsByTagName("Type")[0].firstChild.nodeValue == menuName){
                // Date from XML saved in variables
                let xmlName = nutList[i].getElementsByTagName("Name")[0].firstChild.nodeValue;
                let xmlType = nutList[i].getElementsByTagName("Type")[0].firstChild.nodeValue;
                let xmlQuantity = nutList[i].getElementsByTagName("Quantity")[0].firstChild.nodeValue;
                let xmlPrice = nutList[i].getElementsByTagName("Price")[0].firstChild.nodeValue;
                let xmlDescription = nutList[i].getElementsByTagName("Description")[0].firstChild.nodeValue;
                let xmlImgs = nutList[i].getElementsByTagName("Img"); // HTML Collection
                
                // Adding imgs to list from HTML Collection
                let xmlImgsList = [];
                [...xmlImgs].forEach(imgs => {
                    xmlImgsList.push(imgs.firstChild.nodeValue);
                });

                        // ------------
                        // Image change section
                        // ------------
                // Updating mainImage src
                document.getElementById("mainImage").src = "images/products/"+xmlImgsList[0];

                // Updating thumbnails src
                const thumbnails = document.querySelectorAll("#photoGallery aside img");
                for(let i=0; i<thumbnails.length; i++){
                    thumbnails[i].src = "images/products/" + (xmlImgsList[i] || "placeholder.jpg");
                }

                // ------------
                // Desccription product change section
                // ------------
                document.getElementById("descriptionText").innerHTML = xmlDescription;

                // ------------
                // Product name change section
                // ------------
                document.getElementById("productName").innerHTML = xmlType;

                // ------------
                // Product price change section
                // ------------
                document.getElementById("productPrice").innerHTML = xmlPrice;

                // ------------
                // storehouseAmount change section
                // ------------
                document.getElementById("storehouseAmount").innerHTML = xmlQuantity+" / 2000 ";

                // ------------
                // Hide indexPage with all products and show main page with the product info page
                document.getElementById("indexPage").style.display = "none";
                document.querySelector("main").style.display = "flex";

                break;
            }
        
        }

    }

}

// ------------------------------------------------------------------------
//                  All products generate cards
// ------------------------------------------------------------------------

// Download XML of all products
function loadAllProductsXML(){
    var XHR = ajaxInit();
    
    if(XHR != null){
        XHR.open("GET", "./allProducts.php", true);
        
        XHR.onreadystatechange = function(){
            if(XHR.readyState == 4){
                if(XHR.status == 200){
                    XMLAllProductsElement = XHR.responseXML.documentElement;

                    // Show info from XML
                    generateAllProductsCards();

                }else{
                    alert("wystapil blad: " + XHR.status + "\nSprawdź połączenie z internetem!");
                }

            }

        }

        XHR.send(null);
    }

}

// Generate products cards in indexPage
function generateAllProductsCards(){
    if(XMLAllProductsElement != null){
        // Place where cards gonna be displayed
        const indexPage = document.getElementById("indexPage");
        // Get all product from XML
        let productsList = XMLAllProductsElement.getElementsByTagName('Product');

        for(let i=0; i<productsList.length; i++){
            let productName = productsList[i].getElementsByTagName('Name')[0].firstChild.nodeValue;
            let productType = productsList[i].getElementsByTagName('Type')[0].firstChild.nodeValue;
            let productPrice = productsList[i].getElementsByTagName('Price')[0].firstChild.nodeValue;
            let productDescription = productsList[i].getElementsByTagName('Description')[0].firstChild.nodeValue;
            let productIMG = productsList[i].getElementsByTagName('Filename')[0].firstChild.nodeValue;

            // Create div for card
            const card = document.createElement("div");
            card.className = "productCard";

            card.innerHTML = `
                <img src="images/products/`+productIMG+`" alt="`+productName+`">
                <h2 class="productNameCard"> `+productType+` </h2>
                <p>`+productDescription+`</p>

                <div class="priceAndBtn">
                    <p class="priceProduct">Cena: <span>`+productPrice+` zł</span></p>
                    <button type="button" class="btnCheckProduct" value="`+productType+`">Zobacz</button>
                </div>
            `;

            // Add product card to indexPage - div
            indexPage.appendChild(card);
        }

        addOnClickToBtnCheckProduct();
    }
}

// Adding click function to all btnCheckProduct
function addOnClickToBtnCheckProduct(){
    const allBtnCheckProduct = document.querySelectorAll(".btnCheckProduct");

    for(let i=0; i<allBtnCheckProduct.length; i++){
        allBtnCheckProduct[i].addEventListener('click', function(e){
            e.preventDefault();

            console.log(e.target.value); // value from button
        });
    }
}