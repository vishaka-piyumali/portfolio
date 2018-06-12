Ractive.components['ui-kudos'] = Ractive.extend({
	isolated: false,
	template: Templates['ui-kudos'],

	data: function () {
		return {
			writeUrl: 'http://www.itsvish.com/sendKudos.php',
			readUrl: 'http://www.itsvish.com/read.php',
			pageName: 'itsvish.com:home'
		}
	},

	// default data
	oninit: function () {
		this.getKudos();
		this.on('*.sendKudos', this.sendKudos);
	},

	sendKudos: function () {
		let url = this.get('writeUrl');

		var jqxhr = $.post(url, {
			pageName: this.get('pageName')
		})
		.done(function() {
			this.set('kudos', _.first(data).kudos)
		})
		.fail(function() {
			console.log( "error" );
		})
		.always(function() {
			console.log( "xhr finished" );
		});
	},

	getKudos: function () {
		let url = this.get('readUrl');

		var jqxhr = $.post(url, {
			pageName: this.get('pageName')
		})
		.done(function(data) {
			this.set('kudos', _.first(data).kudos)
		}.bind(this))
		.fail(function() {
			console.log( "error" );
		})
		.always(function() {
			console.log( "xhr finished" );
		});
	}
});
