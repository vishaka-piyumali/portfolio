requirejs.config({
	baseUrl: '/js',
	paths: {
		Ractive: 'vendors/ractive/ractive',
		jquery: 'vendors/jquery/dist/jquery',
		foundation: 'vendors/foundation-sites/dist/js/foundation.min',
		lodash: 'vendors/lodash-compat/index',
		Templates: 'templates'
	},
	shim: {
		foundation: {
			deps: ['jquery'],
			exports: 'foundation'
		}
	}
});

require(['foundation'], function () {
	require(['components', 'core'], function () {
		$(document).foundation();
	});
});
