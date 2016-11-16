function toggleNav() {
	var x = document.getElementById('site-nav');
	if (x.className === 'site-nav') {
		x.className += ' open';
	} else {
		x.className = 'site-nav';
	}
}