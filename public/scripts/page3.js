$(".dropdown-menu a").click(function(){
  var selText = $(this).text();
  $(this).parents('.form-inline').find('.dropdown-toggle').html(selText);
});