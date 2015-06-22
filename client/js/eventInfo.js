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
		$('.page-popup.event-popup').fadeIn().append('<div class="page-popup-content"><div class="close-button popup-close">×</div><h4>'+ v.event_time + ' - ' + v.event_name + '</h4><p><span class="popup-part">Преподаватель: </span><span class="page-text-bold popup-part _right">' + v.event_person + '</span></p><p><span class="popup-part">Место проведения: </span><span class="popup-part _right page-text-bold">' + v.event_place + ' каб.</span></p><p><span class="popup-part">Описание: </span><span class="popup-part _right page-text-bold">' + v.event_summury + '</span></p><p><span class="popup-part">Тип: </span><span class="popup-part _right page-text-bold"><span class="event-type-circle" data-type="'+ v.event_type +'"></span>'+eventType+'</span></p></div>');
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
