function toggleNav() {
	var x = document.getElementById('site-nav');
	var b = document.getElementById('navButton');

	if (x.className === 'site-nav') {
		x.className += ' open';
		b.className = 'fa fa-times fa-2x'
	} else {
		x.className = 'site-nav';
		b.className = 'fa fa-bars fa-2x'
	}
}