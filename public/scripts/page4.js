function openModal(){
	document.getElementById('id01').style.display='block';
}
function closeModal(){
	document.getElementById('id01').style.display='none';
}
var modal = document.getElementById('id01');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}