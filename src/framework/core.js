var ractive = new Ractive({
	el: document.querySelector('.application'),
	append: true,
	template: Templates.main,
	data: {
		message: "ractive message"
	}
})
