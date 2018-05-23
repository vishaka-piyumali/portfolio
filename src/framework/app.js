requirejs.config({
	baseUrl: '/js',
	paths: {
		Ractive: 'vendors/ractive/ractive',
		jquery: 'vendors/jquery/dist/jquery',
		foundation: 'vendors/foundation-sites/dist/js/foundation.min',
		lodash: 'vendors/lodash-compat/index',
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
