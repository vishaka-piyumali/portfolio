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

	oninit: function () {
		this.loadSkillData();
	},

	loadSkillData: function () {
		var jqxhr = $.get(this.get('readUrl'))
		.done(function(data) {
			this.set('categories', data.skillCategories);
		}.bind(this))
		.fail(function() {
			console.log( "error" );
		})
		.always(function() {
			console.log( "xhr finished" );
		});
	}
});
