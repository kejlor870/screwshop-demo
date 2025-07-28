var XMLMainElement = null;

document.addEventListener('DOMContentLoaded', function () {
    // Choosing all links to products
    const allLi = document.querySelectorAll('nav li ul li a');

    // Adding click function to all menu anchors
    for(let i=0; i<allLi.length; i++){
        allLi[i].addEventListener('click', function(e){
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

// XML download data
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
                    alert("wystapil blad: " + XHR.status);
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
                    thumbnails[i].src = "images/products/"+xmlImgsList[i];
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

                break;
            }
        
        }

    }

}

