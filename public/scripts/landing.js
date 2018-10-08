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

$(".dropdown-menu li a").click(function(){
  var selText = $(this).text();
  $(this).parents('.form-inline').find('.dropdown-toggle').html(selText);
});
/*
$(function(){
	$(".dropdown-menu").click(function(){
	  $(this).parents(".form-inline").find('.btn').html($(this).text());
	  $(this).parents(".form-inline").find('.btn').val($(this).data('value'));
	});
});