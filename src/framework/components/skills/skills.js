Ractive.components.skills = Ractive.extend({
	isolated: false,
	template: Templates.skills,

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
