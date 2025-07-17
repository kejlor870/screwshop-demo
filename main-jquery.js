/// <reference types="jquery" />


$(function(){ // $("document").ready(function(){ ... });
    
    // alertDiv hide animation
    $("#btnAlertClose").on("click", function(){
        $(".alertDiv").hide({
            effect: "scale",
            duration: 500
        });

    });



});








