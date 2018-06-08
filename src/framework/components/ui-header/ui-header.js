Ractive.components['ui-header'] = Ractive.extend({
	isolated: false,
	template: Templates['ui-header'],

	// default data
	oninit: function () {
		console.log('ui-header component init...');
	}
});
