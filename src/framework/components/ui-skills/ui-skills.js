Ractive.components['ui-skills'] = Ractive.extend({
	isolated: false,
	template: Templates['ui-skills'],

	data: function () {
		return {
			skills: [{
				name: 'html5',
				level: 'excellent'
			}, {
				name: 'css3',
				level: 'excellent'
			}]
		};
	},

	// default data
	oninit: function () {
		console.log('skills component init...');
	}
});
