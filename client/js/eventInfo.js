Template.eventsOfGroup.events({
    'click .event-for-week': function(e){
        var eventInfo = Events.find({
            '_id': $(e.target).attr('data-id')
        }).fetch();
        showEventInfo(eventInfo);
    }
});

function showEventInfo(eventInfo) {
//    popup here
	$(eventInfo).each(function(k,v) {
		$('.page-popup.event-popup').fadeIn().append('<div class="page-popup-content"><div class="page-popup-caption">' + v.event_name + '</div>')
	});
	console.log(eventInfo);

}