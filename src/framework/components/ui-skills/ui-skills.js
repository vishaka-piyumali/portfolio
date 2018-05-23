/** global constants, _ */

Ractive.components['ui-skills'] = Ractive.extend({
	isolated: false,
	template: Templates['ui-skills'],

	data: function () {
		return {
			readUrl: '/data/skills.json',
			skillLevel: function(key) {
				return constants.skillLevels[key.level];
			}
		}
	},
	computed: function () {

	},

	// default data
	oninit: function () {
		console.log('skills component init...');

		fetch(this.get('readUrl'))
		.then(res => res.json())
		.then(function (data) {
			this.set('categories', data.skillCategories);
		}.bind(this))
		.catch(function(error) {
			console.log(error);
		});

		this.on('*.showSkills', function (srcItem) {
			_.each(this.get('componentItems'), function (component) {
				if (component._guid === srcItem._guid) {
					component.toggle('active');
				}
			});
		});
	}
});
