$(".dropdown-menu a").click(function(){
  var selText = $(this).text();
  $(this).parents('.form-inline').find('.dropdown-toggle').html(selText);
});

function InvalidName(emailbox) {
    if (emailbox.value === '') {
        emailbox.setCustomValidity('Required field!');
    } else if (emailbox.validity.patternMismatch){
        emailbox.setCustomValidity("Must be an email!");
    } else {
       emailbox.setCustomValidity('');
    }
    return true;
}