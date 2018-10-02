$(function () {
  $('[data-toggle="popover"]').popover({
  	container: 'body'
  })
});

$('.dropdown-toggle').dropdown();

$("#cancelbutton").click(function(){
	location.href = "/second";
});
$("#nextbutton").click(function(){
	location.href = "/second";
});