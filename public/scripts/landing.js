$(function(){$('[data-toggle="popover"]').popover({container:'body'})});function InvalidName(textbox){if(textbox.value===''){textbox.setCustomValidity('Required field!')}else if(textbox.validity.patternMismatch){textbox.setCustomValidity("Name must consist of upper and lower case letters and can contain these characters: , - ' ")}else{textbox.setCustomValidity('')}
return!0}
function InvalidAddress(textbox){if(textbox.value===''){textbox.setCustomValidity('Required field!')}else if(textbox.validity.patternMismatch){textbox.setCustomValidity("Address must contain upper and lower case letters, numbers and can contain these characters: , . -")}else{textbox.setCustomValidity('')}
return!0}
function InvalidSum(numberbox){if(isNaN(numberbox.value)&&numberbox.value===''){numberbox.setCustomValidity('Required field!')}
else if(numberbox.validity.rangeOverflow||numberbox.validity.rangeUnderflow){numberbox.setCustomValidity('Sum must be between 1 and 10 000!')}
else{numberbox.setCustomValidity('')}
return!0}
function InvalidSpace(numberbox){if(isNaN(numberbox.value)&&numberbox.value===''){numberbox.setCustomValidity('Required field!')}
else if(numberbox.validity.rangeOverflow||numberbox.validity.rangeUnderflow){numberbox.setCustomValidity('Space must be between 1 and 10 000 square meters!')}
else{numberbox.setCustomValidity('')}
return!0}
function InvalidRentDate(numberbox){if(isNaN(numberbox.value)&&numberbox.value===''){numberbox.setCustomValidity('Required field!')}
else if(numberbox.validity.rangeOverflow||numberbox.validity.rangeUnderflow){numberbox.setCustomValidity('Rent date must be between 1 and 31!')}
else{numberbox.setCustomValidity('')}
return!0}
function updateRequired(){document.getElementById('expdate').required=!0;var today=new Date();var dd=today.getDate();var mm=today.getMonth()+1;var yyyy=today.getFullYear();if(dd<10){dd='0'+dd}
if(mm<10){mm='0'+mm}
today=yyyy+'-'+mm+'-'+dd;document.getElementById("expdate").setAttribute("min",today)}
function updateNonRequiredCancel(){document.getElementById('expdate').removeAttribute('required');radiobtn=document.getElementById("openend");radiobtn.checked=!0}
function updateNonRequired(){document.getElementById('expdate').removeAttribute('required')}
var isFine=!1;function InvalidTerm(datebox){var date=new Date(datebox.value);if(isNaN(date.getTime())){datebox.setCustomValidity('Required field!');return!0}
else if(datebox.validity.rangeOverflow||datebox.validity.rangeUnderflow){datebox.setCustomValidity('Date must be between today and 2020-01-01');return!0}
else{datebox.setCustomValidity('')}
isFine=!0;return!0}
function ValidateModal(){if(isFine===!0){document.getElementById('expdate').removeAttribute('required');$('#dateModal').modal('hide')}
else{alert('A date is required!')}}
$("#tenantname, #objectaddress").keyup(function(){update()});function update(){$("#contractname").val($('#tenantname').val()+"-"+$('#objectaddress').val())}
function save_name(){var contractname=document.getElementById('contractname').value;localStorage.setItem("ContractName",contractname)}