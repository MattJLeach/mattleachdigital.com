function toggleNav() {
	var x = document.getElementById('site-nav');
	var b = document.getElementById('nav-button');

	if (x.className === 'site-nav') {
		x.className += ' open';
		b.className = 'fa fa-times fa-2x nav-open';
		document.body.className += ' disable-scroll';
	} else {
		x.className = 'site-nav';
		b.className = 'fa fa-bars fa-2x';
		document.body.className = 'site';
	}
}