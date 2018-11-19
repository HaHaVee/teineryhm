/*window.onload = function() {
  var contractname = localStorage.getItem("contractname");
  db.contracts.find({ contractname: { $eq: contractname } })
}
*/


window.onload = qs('id'); 

function qs(search_for) {
    var query = window.location.search.substring(1);
    var parms = query.split('&');
    for (var i=0; i<parms.length; i++) {
      var pos = parms[i].indexOf('=');
      if (pos > 0  && search_for == parms[i].substring(0,pos)) {
        return parms[i].substring(pos+1);
      }
    }
    return "";
}

/*
var fs = require('fs');
var pdf = require('html-pdf');
var html = fs.readFileSync('../files/template.html', 'utf8');
var options = { format: 'A4' };
 
pdf.create(html, options).toFile('../files/lamp.pdf', function(err, res) {
  if (err) return console.log(err);
  console.log(res); // { filename: '/app/businesscard.pdf' }
});*/



