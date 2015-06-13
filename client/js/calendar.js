Meteor.subscribe('calendar', function () {
	Session.set('superCalendarReady', true);
});