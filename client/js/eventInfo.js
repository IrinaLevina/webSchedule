//Template.eventsOfGroup.events({
//    'click .event-for-week': function(e){
//        var eventInfo = Events.find({
//            '_id': $(e.target).attr('data-id')
//        }).fetch();
//        showEventInfo(eventInfo);
//    },
//	'click .close-button': function(e){
//		hideEventInfo();
//	},
//    'click .edit-info-btn': function(e){
//        Events.update($('.page-popup-content').attr('data-id'),{$set: {
//            /*group_id: $('.groups-id').val(),
//            event_name: $('.event-name').val(),*/
//            event_summury: $('.event-summary').val(),
//            /*event_date: $('.event-date').val(),
//            event_time: $('.event-time').val(),*/
//            event_person: $('.event-person').val(),
//            event_place: $('.event-place').val(),
//            event_type: $('.event-type').val()
//        }});
//        hideEventInfo();
//        if ($('.fc-state-active').hasClass('fc-button-month')) {
//            countEventsDate("month");
//        } else if ($('.fc-state-active').hasClass('fc-button-agendaDay')){
//            countEventsDate("week");
//        }
//    },
//    'click .delete-info-btn': function(e){
//        console.log("delete")
//    }
//});
//
//function showEventInfo(eventInfo) {
////    popup here
//	$(eventInfo).each(function(k,v) {
//		var eventType;
//
//		if(v.event_type == 1){
//			eventType = 'Лекция'
//		}else if(v.event_type == 2){
//			eventType = 'Экзамен'
//		}else if(v.event_type == 3){
//			eventType = 'Практическое занятие'
//		}else if(v.event_type == 4){
//			eventType = 'Контрольная работа'
//		}else if(v.event_type == 5){
//			eventType = 'Зачет'
//		}else if(v.event_type == 6){
//			eventType = 'Семинар'
//		}else if(v.event_type == 7){
//			eventType = 'Коллоквиум'
//		}else if(v.event_type == 8){
//			eventType = 'Внеучебное занятие'
//		}
//
//         if (Roles.userIsInRole(Meteor.user(), 'admin')) {
//             var adminPopup = '<div class="page-popup-content" data-id="'+ v._id +'"' +
//                 '><div class="close-button popup-close">×</div><h4>'+ v.event_time + ' - ' + v.event_name + '</h4>' +
//                '<p><span class="popup-part">Преподаватель: </span><input class="page-text-bold event-person popup-part _right" value="'+v.event_person+'"/></p><p>' +
//                '<span class="popup-part">Место проведения: </span><input class="popup-part _right event-place page-text-bold" value="' + v.event_place + '"/></p>' +
//                '<p><span class="popup-part">Описание: </span><input class="popup-part _right event_summary page-text-bold" value="' + v.event_summury + '"/></p>' +
//                '<p><span class="popup-part">Тип: </span><span class="popup-part _right page-text-bold">' +
//                '<select class="event_type">';
//
//                adminPopup+= '<option value="1" ';
//                if (v.event_type==1){
//                    adminPopup+='selected';
//                }
//                adminPopup += '>Лекции</option>';
//                adminPopup+='<option value="2" ';
//                if (v.event_type==2){
//                    adminPopup+='selected';
//                }
//                adminPopup+='>Экзамен</option>';
//                adminPopup+='<option value="3"';
//                if (v.event_type==3){
//                    adminPopup+='selected';
//                }
//                adminPopup+='>Практическое занятие</option>';
//                adminPopup+='<option value="4"';
//                if (v.event_type==4){
//                    adminPopup+='selected';
//                }
//                adminPopup+='>Контрольная работа</option>';
//                adminPopup+='<option value="5"';
//                if (v.event_type==5){
//                    adminPopup+='selected';
//                }
//                adminPopup+='>Зачет</option>';
//                adminPopup+='<option value="6"';
//                if (v.event_type==6){
//                    adminPopup+='selected';
//                }
//                adminPopup+='>Семинар</option>';
//                adminPopup+='<option value="7"';
//                if (v.event_type==7){
//                    adminPopup+='selected';
//                }
//                adminPopup+='>Коллоквиум</option>';
//                adminPopup+='<option value="8"';
//                if (v.event_type==8){
//                    adminPopup+='selected';
//                }
//                adminPopup+='>Внеучебное занятие</option>';
//
//                adminPopup+='</select></p>' +
//                    '<div class="button-block"><div class="edit-info-btn popup-btns filter-button">Save</div>' +
//                    '<div class="delete-info-btn popup-btns filter-button">Delete</div></div>' +
//                    '<div class="clearfix"></div></div>';
//            $('.page-popup.event-popup').fadeIn().append(adminPopup);
//         } else {
//            $('.page-popup.event-popup').fadeIn().append('<div class="page-popup-content"><div class="close-button popup-close">×</div><h4>'+ v.event_time + ' - ' + v.event_name + '</h4>' +
//                '<p><span class="popup-part">Преподаватель: </span><span class="page-text-bold popup-part _right">' + v.event_person + '</span></p><p>' +
//                '<span class="popup-part">Место проведения: </span><span class="popup-part _right page-text-bold">' + v.event_place + ' каб.</span></p>' +
//                '<p><span class="popup-part">Описание: </span><span class="popup-part _right page-text-bold">' + v.event_summury + '</span></p>' +
//                '<p><span class="popup-part">Тип: </span><span class="popup-part _right page-text-bold">' +
//                '<span class="event-type-circle event-type-bg" data-type="'+ v.event_type +'"></span>'+eventType+'</span></p></div>');
//         }
//
//	});
////	console.log(eventInfo);
//
//}
//function hideEventInfo(){
//	$('.page-popup.event-popup').fadeOut();
//	$('.page-popup-content').remove();
//}
//
//Template.eventsOfGroup.helpers({
//  teachers: function() {
//    return Teachers.find().fetch().map(function(it){ return it.name; });
//  }
//});
