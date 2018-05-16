Ractive.components['ui-cell'] = Ractive.extend({
	isolated: false,
	template: Templates['ui-cell'],

	// default data
	oninit: function () {
		console.log('ui-cell component init...');
	}
});
