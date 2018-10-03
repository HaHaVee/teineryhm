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

$(function(){
	$(".dropdown-menu").click(function(){
	  $(this).parents(".form-inline").find('.btn').html($(this).text());
	  $(this).parents(".form-inline").find('.btn').val($(this).data('value'));
	});
});