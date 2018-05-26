requirejs.config({
	baseUrl: '/js',
	paths: {
		Ractive: 'vendors/ractive/ractive',
		jquery: 'vendors/jquery/dist/jquery',
		foundation: 'vendors/foundation-sites/dist/js/foundation.min',
		lodash: 'vendors/lodash-compat/index',
		Templates: 'templates'
	},
	// increasing the default timeout from 7s to 40s for low speed networks
	waitSeconds: 40,
	shim: {
		foundation: {
			deps: ['jquery'],
			exports: 'foundation'
		}
	}
});

require(['foundation'], function () {
	require(['components'], function () {
		require(['core'], function () {
			$(document).foundation();
		});
	});
});
