function InvalidEmail(t){return""===t.value?t.setCustomValidity("Required field!"):t.validity.patternMismatch?t.setCustomValidity("Must be an email!"):t.setCustomValidity(""),!0}

function setUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');
  var string = encodeURIComponent(id);
  window.location.href = '/second?id='+string;
};