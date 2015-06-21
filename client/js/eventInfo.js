Template.eventsOfGroup.events({
    'click .event-for-week': function(e){
        var eventInfo = Events.find({
            '_id': $(e.target).attr('data-id')
        }).fetch();
        showEventInfo(eventInfo);
    },
	'click .close-button': function(e){
		hideEventInfo();
	}
});

function showEventInfo(eventInfo) {
//    popup here
	$(eventInfo).each(function(k,v) {
		$('.page-popup.event-popup').fadeIn().append('<div class="page-popup-content"><h4>' + v.event_name + '</h4><p>' + v.event_summury + '</p><p>Преподаватель: ' + v.event_person + '</p><p>Время: ' + v.event_time + '</p><p>Место проведения: ' + v.event_place + '</p><div class="default-button close-button">Закрыть</div></div>');
	});
//	console.log(eventInfo);

}
function hideEventInfo(){
	$('.page-popup.event-popup').fadeOut();
	$('.page-popup-content').remove();
}
