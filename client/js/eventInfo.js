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
		var eventType;

		if(v.event_type == 1){
			eventType = 'Лекция'
		}else if(v.event_type == 2){
			eventType = 'Экзамен'
		}else if(v.event_type == 3){
			eventType = 'Практическое занятие'
		}else if(v.event_type == 4){
			eventType = 'Контрольная работа'
		}else if(v.event_type == 5){
			eventType = 'Зачет'
		}else if(v.event_type == 6){
			eventType = 'Семинар'
		}else if(v.event_type == 7){
			eventType = 'Коллоквиум'
		}else if(v.event_type == 8){
			eventType = 'Внеучебное занятие'
		}
		$('.page-popup.event-popup').fadeIn().append('<div class="page-popup-content"><h4>' + v.event_name + '</h4><p>' + v.event_summury + '</p><p>Тип: '+eventType+'</p><p>Преподаватель: ' + v.event_person + '</p><p>Время: ' + v.event_time + '</p><p>Место проведения: ' + v.event_place + '</p><div class="default-button close-button">Закрыть</div></div>');
	});
//	console.log(eventInfo);

}
function hideEventInfo(){
	$('.page-popup.event-popup').fadeOut();
	$('.page-popup-content').remove();
}

Template.eventsOfGroup.helpers({
  teachers: function() {
    return Teachers.find().fetch().map(function(it){ return it.name; });
  }
});
