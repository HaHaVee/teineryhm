$(function () {
  $('[data-toggle="popover"]').popover({
  	container: 'body'
  })
});

$("#cancelbutton").click(function(){
	location.href = "/second";
});
$("#nextbutton").click(function(){
	location.href = "/second";
});

$(".dropdown-menu a").click(function(){
  var selText = $(this).text();
  $(this).parents('.form-inline').find('.dropdown-toggle').html(selText);
});
