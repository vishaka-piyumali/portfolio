define(['Ractive', 'Templates'], function (Ractive, Templates) {

	var app = new Ractive({
		el: document.querySelector('.application'),
		append: true,
		template: Templates.main
	});

	return app;
});
