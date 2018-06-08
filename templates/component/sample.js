Ractive.components['sample'] = Ractive.extend({
	isolated: false,
	template: Templates['sample'],

	// default data
	oninit: function () {
		console.log('sample component init...');
	}
});
