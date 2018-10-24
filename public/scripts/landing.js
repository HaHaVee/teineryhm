$(function () {
  $('[data-toggle="popover"]').popover({
  	container: 'body'
  })
});
/*
$(".dropdown-menu a").click(function(){
  var selText = $(this).text();
  $(this).parents('.form-inline').find('.dropdown-toggle').html(selText);
});*/

function validateForm() {
    //var term = document.forms["SecurebadgerWizard"]["term"].value;
    /*
    if (term = ""){
    	alert("Term!");
    	return false;
    	}*/
    
	}
function InvalidName(textbox) {
    if (textbox.value === '') {
        textbox.setCustomValidity('Required field!');
    } else if (textbox.validity.patternMismatch){
        textbox.setCustomValidity("Name must consist of upper and lower case letters and can contain these characters: , - ' ");
    } else {
       textbox.setCustomValidity('');
    }
    return true;
}
function InvalidAddress(textbox) {
    if (textbox.value === '') {
        textbox.setCustomValidity('Required field!');
    } else if (textbox.validity.patternMismatch){
        textbox.setCustomValidity("Address must contain upper and lower case letters, numbers and can contain these characters: , . -");
    } else {
       textbox.setCustomValidity('');
    }
    return true;
}
function InvalidSum(numberbox){
	if (isNaN(numberbox.value) && numberbox.value === ''){
		numberbox.setCustomValidity('Required field!');
	}
	else if (numberbox.validity.rangeOverflow || numberbox.validity.rangeUnderflow){
		numberbox.setCustomValidity('Sum must be between 1 and 10 000!');
	}
	else {
		numberbox.setCustomValidity('');
	}
	return true;
}
function InvalidSpace(numberbox){
	if (isNaN(numberbox.value) && numberbox.value === ''){
		numberbox.setCustomValidity('Required field!');
	}
	else if (numberbox.validity.rangeOverflow || numberbox.validity.rangeUnderflow){
		numberbox.setCustomValidity('Space must be between 1 and 10 000 square meters!');
	}
	else {
		numberbox.setCustomValidity('');
	}
	return true;
}
function InvalidRentDate(numberbox){
	if (isNaN(numberbox.value) && numberbox.value === ''){
		numberbox.setCustomValidity('Required field!');
	}
	else if (numberbox.validity.rangeOverflow || numberbox.validity.rangeUnderflow){
		numberbox.setCustomValidity('Rent date must be between 1 and 31!');
	}
	else {
		numberbox.setCustomValidity('');
	}
	return true;
}

/*Change expiration date input to required once the fixed term choice is taken, change back when open-ended is chosen*/

function updateRequired() {
 document.getElementById('expdate').setAttribute('required', true);
}

function updateNonRequired() {
document.getElementById('expdate').removeAttribute('required');
}

/*Check the validity of the expiration date and hide modal if is valid*/

var isFine = false;
function InvalidTerm(datebox) {
	var date = new Date(datebox.value);

	if (!isNaN(date.getTime())) {
		datebox.setCustomValidity('Required field!');
	}
	else if (datebox.validity.rangeOverflow || datebox.validity.rangeUnderflow){
		numberbox.setCustomValidity('Date must be between today and 2020-01-01');
	}
	else {
		datebox.setCustomValidity('');
	}
	isFine=true;
	return true;
}       

function ValidateModal(){
	if (isFine === true) {
		$('#dateModal').modal('hide');
	}
	else{
		alert('no no');
	}
}

/* Set contract expiration minimum date the current day*/

var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!
var yyyy = today.getFullYear();
 if(dd<10){
        dd='0'+dd
    } 
    if(mm<10){
        mm='0'+mm
    } 

today = yyyy+'-'+mm+'-'+dd;
//document.getElementById("expdate").setAttribute("min", today);

/*Set the contract name automatically to tenant name + object address */

$("#tenantname, #objectaddress").keyup(function(){
    update();
});

function update() {
  $("#contractname").val($('#tenantname').val() + "-" + $('#objectaddress').val());
}