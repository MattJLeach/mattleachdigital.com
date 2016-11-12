function getSlug() {
	var title = $('#title').val();
	var slug = title.replace(/\W+/g, '-').toLowerCase();
	if (slug.charAt(slug.length - 1) == '-') {
		slug = slug.substr(0, slug.length -1);
	}
	document.getElementById('slug').value = slug;
}