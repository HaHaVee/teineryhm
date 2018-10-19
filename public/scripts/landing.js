$(function () {
  $('[data-toggle="popover"]').popover({
  	container: 'body'
  })
});

$(".dropdown-menu a").click(function(){
  var selText = $(this).text();
  $(this).parents('.form-inline').find('.dropdown-toggle').html(selText);
});

function validateForm() {
    var term = document.forms["SecurebadgerWizard"]["term"].value;
    var expdate = document.getElementById('expdate').value;
    var ownername = document.getElementById('ownername').value;
    var tenantname = document.getElementById('tenantname').value;
    var suminput = document.getElementById('suminput').value;
    if (suminput == "" || ownername == "" || tenantname == "" || ) {
        alert("All fields must be filled out!");
        return false;
    }
    if (!expdate){
    	 alert("Date");
        return false;
    }
}