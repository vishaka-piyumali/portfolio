Ractive.components['ui-kudos'] = Ractive.extend({
	isolated: false,
	template: Templates['ui-kudos'],

	data: function () {
		return {
			writeUrl: '/sendKudos.php',
			readUrl: '/read.php',
			pageName: 'itsvish.com:home'
		}
	},

	// default data
	oninit: function () {
		this.set('liked', false);
		this.getKudos();
		this.getUserStatus();
		this.on('*.sendKudos', this.sendKudos);
	},

	// read local storage to see if user already sent kudos
	getUserStatus: function () {
		this.set('liked', window.localStorage.getItem("kudos") || false);
	},

	sendKudos: function () {
		var alreadyLiked = this.get('liked');
		if (alreadyLiked) {
			return false;
		}
		var url = this.get('writeUrl');

		var jqxhr = $.post(url, {
			pageName: this.get('pageName')
		})
		.done(function() {
			this.set('liked', true);
			window.localStorage.setItem("kudos", true);
			this.getKudos();
		}.bind(this))
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
