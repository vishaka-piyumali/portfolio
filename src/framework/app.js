requirejs.config({
	baseUrl: '/js',
	paths: {
		Ractive: 'vendors/ractive',
		jquery: 'vendors/jquery',
		foundation: 'vendors/foundation.min',
		Templates: 'templates'
	},
	waitSeconds: 40,
	shim: {
		foundation: {
			deps: [
				'jquery'
			],
			exports: 'foundation'
		}
	}
});

require(['foundation', 'components', 'core'], function() {
	$(document).foundation();
});
