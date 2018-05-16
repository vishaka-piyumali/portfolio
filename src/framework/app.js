requirejs.config({
	baseUrl: '/js',
	paths: {
		Ractive: 'vendors/ractive',
		jQuery: 'vendors/jquery',
		foundation: 'vendors/foundation.min',
		Templates: 'templates'
	},
	waitSeconds: 0
});

require(['vendors/ractive','vendors/jquery', 'vendors/foundation.min', 'core', 'templates', 'components'], function () {
	console.log('framework loaded');
});

requirejs(['vendors/jquery', 'vendors/foundation.min'], function() {
	$(document).foundation();
});
