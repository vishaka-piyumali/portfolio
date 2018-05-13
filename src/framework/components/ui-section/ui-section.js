Ractive.components['ui-section'] = Ractive.extend({
	isolated: false,
	template: Templates['ui-section'],

	// default data
	oninit: function () {
		console.log('section component init...');
	}
});
