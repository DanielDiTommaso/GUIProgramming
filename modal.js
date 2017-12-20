var slideIndex = 1;
showDivs(slideIndex);

function plusDivs(n) {
    showDivs(slideIndex += n);
}

function showDivs(n) {
    var i;
    var x = document.getElementsByClassName("mySlides");
    if (n > x.length) {slideIndex = 1}    
    if (n < 1) {slideIndex = x.length}
    for (i = 0; i < x.length; i++) {
	x[i].style.display = "none";  
    }
    x[slideIndex-1].style.display = "block";  
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    // Get the modal
    var modal = document.getElementById('id01');
    
    if (event.target == modal) {
	modal.style.display = "none";
    }
}
