$(function () {
  $('[data-toggle="popover"]').popover({
  	container: 'body'
  })
});
/*functions for checking validity of user input*/
function InvalidName(textbox) {
    if (textbox.value === '') {
        textbox.setCustomValidity('Nõutud väli!');
    } else if (textbox.validity.patternMismatch){
        textbox.setCustomValidity("Nimi peab koosnema suurtest ja väikestest tähtedest ning võib sisaldada järgmiseid märke: , - ' ");
    } else {
       textbox.setCustomValidity('');
    }
    return true;
}
function InvalidAddress(textbox) {
    if (textbox.value === '') {
        textbox.setCustomValidity('Nõutud väli!');
    } else if (textbox.validity.patternMismatch){
        textbox.setCustomValidity("Aadress peab koosnema suurtest ja väikestest tähtedest, numbritest ning võib sisaldada järgmiseid märke: , . -");
    } else {
       textbox.setCustomValidity('');
    }
    return true;
}
function InvalidSum(numberbox){
	if (isNaN(numberbox.value) && numberbox.value === ''){
		numberbox.setCustomValidity('Nõutud väli!');
	}
	else if (numberbox.validity.rangeOverflow || numberbox.validity.rangeUnderflow){
		numberbox.setCustomValidity('Summa peab olema 1 ja 10 000 vahel!');
	}
	else {
		numberbox.setCustomValidity('');
	}
	return true;
}
function InvalidSpace(numberbox){
	if (isNaN(numberbox.value) && numberbox.value === ''){
		numberbox.setCustomValidity('Nõutud väli!');
	}
	else if (numberbox.validity.rangeOverflow || numberbox.validity.rangeUnderflow){
		numberbox.setCustomValidity('Ruum peab jääma 1 ja 10 000 ruutmeetri vahele!');
	}
	else {
		numberbox.setCustomValidity('');
	}
	return true;
}
function InvalidRentDate(numberbox){
	if (isNaN(numberbox.value) && numberbox.value === ''){
		numberbox.setCustomValidity('Nõutud väli!');
	}
	else if (numberbox.validity.rangeOverflow || numberbox.validity.rangeUnderflow){
		numberbox.setCustomValidity('Rendi maksekuupäev peab jääme 1 ja 31 vahele!');
	}
	else {
		numberbox.setCustomValidity('');
	}
	return true;
}
function InvalidRadio(numberbox){
	if(document.getElementById('openend').checked==false && document.getElementById('fixed-term').checked==false){
		numberbox.setCustomValidity('Nõutud väli!');
	}
	else {
		numberbox.setCustomValidity('');
	}
	return true;
}

/*Change expiration date input to required once the fixed term choice is taken, change back when open-ended is chosen*/

function updateRequired() {
 document.getElementById('expdate').required = true;
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
 document.getElementById("expdate").setAttribute("min", today);
}

function updateNonRequiredCancel() {
 document.getElementById('expdate').removeAttribute('required');
 radiobtn = document.getElementById("openend");
 radiobtn.checked = true;
}

function updateNonRequired() {
document.getElementById('expdate').removeAttribute('required');
}

/*Check the validity of the expiration date and hide modal if is valid*/

var isFine = false;
function InvalidTerm(datebox) {
	var date = new Date(datebox.value);

	if (isNaN(date.getTime())) {
		datebox.setCustomValidity('Nõutud väli!');
		return true;
	}
	else if (datebox.validity.rangeOverflow || datebox.validity.rangeUnderflow){
		datebox.setCustomValidity('Kuupäev peab olema tänase kuupäeva ning 2020-01-01 vahel');
		return true;
	}
	else {
		datebox.setCustomValidity('');
	}
	isFine=true;
	return true;
}       

function ValidateModal(){
	if (isFine === true) {
		 document.getElementById('expdate').removeAttribute('required');
		$('#dateModal').modal('hide');
	}
	else{
		alert('Kuupäev on nõutud!');
	}
}

/*Set the contract name automatically to tenant name + object address */

$("#tenantname, #objectaddress").keyup(function(){
    update();
});

function update() {
  $("#contractname").val($('#tenantname').val() + "-" + $('#objectaddress').val());
}