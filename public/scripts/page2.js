function setUrl() {
	const urlParams = new URLSearchParams(window.location.search);
	const id = urlParams.get('id');
	var string = encodeURIComponent(id);
    window.location.href = '/third?id='+string;
};