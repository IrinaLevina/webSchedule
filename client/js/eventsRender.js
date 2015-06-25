/*
Events.find({
    'event_date': { $lt: "2015-06-11" }
}).fetch()*/
var currentGroup;
Template.eventsOfGroup.rendered = function() {
     Meteor.typeahead.inject();
     countEventsDate("month");

     setTimeout(function(){
         currentGroup = Router.current().data().fetch()[0].group_id;
         $(".fc-button-month").click();
         var notificationsList = Notifications.find({groupID: currentGroup}).fetch();
         showNotifications(notificationsList)
     }, 500);

     multyselect();
};

function showNotifications (notList){
    $(notList).each(function(k,v){
        alert("new event for you "+ v.nameEvent)
    })
}

Template.eventsOfGroup.events({
    'click .fc-button': function() {
        if ($('.fc-state-active').hasClass('fc-button-month')) {
            countEventsDate("month");
        } else if ($('.fc-state-active').hasClass('fc-button-agendaDay')){
            countEventsDate("week");
        }
    },
    'click .filter-btn': function(){
        if ($('.fc-state-active').hasClass('fc-button-month')) {
            countEventsDate("month");
        } else if ($('.fc-state-active').hasClass('fc-button-agendaDay')){
            countEventsDate("week");
        }
    }
});

var countEventsDate = function (selector) {
    if (selector == "month") {
        var startDate = $('.fc-day:first').attr('data-date'),
            endDate = $('.fc-day:last').attr('data-date');
    } else if (selector == "week" ) {
        var startDate = $('.fc-agenda-days').find('.fc-widget-content').not('.fc-last').first().attr("data-date"),
            endDate = $('.fc-agenda-days').find('.fc-widget-content').not('.fc-last').last().attr("data-date");
    }
    eventsRender(startDate, endDate, selector);
}

function eventsRender(startDate, endDate, selector) {
    var filters = {};
    filters.event_date = { $gte: startDate, $lte: endDate};
    filters.group_id =  currentGroup;
    if ($('.teacher-input:last').val().length != 0){
        filters.event_person = {$regex: $('.teacher-input:last').val(), $options: 'i'}
    }
    if ($('.mutliSelect input[type=checkbox]:checked').length != 0) {
        var searchArray = [];
        $($('.mutliSelect input[type=checkbox]:checked')).each(function(k,v){
            searchArray.push($(v).val());
        });
        filters.event_type = { $in: searchArray };
    }
    console.log(filters);
    var eventsList = Events.find(filters).fetch();

    if (selector == "month") {
       createEventForMonth(eventsList)
    } else if (selector == "week" ) {
        createEventForWeek(eventsList)
    }
}

function createEventForMonth(eventsList) {
    $(".fc-day").find(".fc-day-content").html("");
    $(eventsList).each(function(k,v){
        $('.fc-day[data-date='+ v.event_date+']').find(".fc-day-content").append("" +
            "<div class='event-for-week' data-id='"+ v._id+"' data-type='"+ v.event_type+"'>"
            + v.event_time+'  '+ v.event_name +'  ('+ v.event_place +'&nbsp;каб)'+
            "</div>");
    });
}

function createEventForWeek(eventsList) {
    $('.fc-agenda-slots .fc-widget-content').html('<div style="position:relative">&nbsp;</div>');
    $(eventsList).each(function(k,v){
        var position = $('.fc-agenda-days .fc-widget-content:not(.fc-last)[data-date='+ v.event_date+']').index()*210;
        var timeBlock = checkEventTime(v.event_time);
        var html = "<div class='event-for-week event-type-bg' data-id='"+ v._id+"' data-type='"+ v.event_type+"'>"
            + v.event_name + ', '+ v.event_person +',  '+ v.event_place +'&nbsp;каб'+
        "</div>";
        timeBlock.find('.fc-widget-content').html("").append(html);
    });
}

function checkEventTime(time) {
    var timeArray = time.split(':');
    var timeBlock;
    if (timeArray[1]>0) {
        timeBlock = $('.fc-slot' + timeArray[0] + '.fc-minor');
    } else {
        timeBlock = $('.fc-slot' + timeArray[0] + ':not(.fc-minor)');
    }
    return timeBlock;
}
function multyselect () {
    $(document).ready(function () {
        $(".dropdown dt a").on('click', function () {
            $(".dropdown dd ul").slideToggle('fast');
        });

        $(".dropdown dd ul li a").on('click', function () {
            $(".dropdown dd ul").hide();
        });

        function getSelectedValue(id) {
            return $("#" + id).find("dt a span.value").html();
        }

        $(document).bind('click', function (e) {
            var $clicked = $(e.target);
            if (!$clicked.parents().hasClass("dropdown")) $(".dropdown dd ul").hide();
        });


        $('.mutliSelect input[type="checkbox"]').on('click', function () {

            var title = $(this).parent().find('span').text(),
                value = $(this).val();
                title += ",";

            if ($(this).is(':checked')) {
                var html = '<span title="' + value + '">' + title + '</span>';
                $('.multiSel').append(html);
                $(".hida").hide();
            }
            else {
                $('span[title="' + value + '"]').remove();
                var ret = $(".hida");
                $('.dropdown dt a').append(ret);
                if ($('.mutliSelect input[type="checkbox"]:checked').length == 0){
                    $(".hida").text("Тип события").show();
                }
            }

        });
    });
}

Template.eventsOfGroup.events({
    'click .event-for-week': function(e){
        var eventInfo = Events.find({
            '_id': $(e.target).attr('data-id')
        }).fetch();
        showEventInfo(eventInfo);
    },
	'click .close-button': function(e){
		hideEventInfo();
	},
	'click .event-popup-before': function(e){
		hideEventInfo();
	},
    'click .edit-info-btn': function(e){
        Events.update($('.page-popup-content').attr('data-id'),{$set: {
            /*group_id: $('.groups-id').val(),
            event_name: $('.event-name').val(),*/
            event_summury: $('.event-summary').val(),
            /*event_date: $('.event-date').val(),
            event_time: $('.event-time').val(),*/
            event_person: $('.event-person').val(),
            event_place: $('.event-place').val(),
            event_type: $('.event-type').val()
        }});
        hideEventInfo();
        if ($('.fc-state-active').hasClass('fc-button-month')) {
            countEventsDate("month");
        } else if ($('.fc-state-active').hasClass('fc-button-agendaDay')){
            countEventsDate("week");
        }
    },
    'click .delete-info-btn': function(e){
        var currentId = $('.page-popup-content').attr('data-id');
        Events.remove(currentId);
        Session.set('events', Events.find({group_id: $('.groups-id').val() }).fetch() );
        hideEventInfo();
        if ($('.fc-state-active').hasClass('fc-button-month')) {
            countEventsDate("month");
        } else if ($('.fc-state-active').hasClass('fc-button-agendaDay')){
            countEventsDate("week");
        }
    }
});

function showEventInfo(eventInfo) {
//    popup here
	$('html').addClass('hidden');
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

         if (Roles.userIsInRole(Meteor.user(), 'admin')) {
             var adminPopup = '<div class="page-popup-content" data-id="'+ v._id +'"' +
                 '><div class="close-button popup-close">×</div><h4>'+ v.event_time + ' - ' + v.event_name + '</h4>' +
                '<p><span class="popup-part">Преподаватель: </span><input class="page-text-bold event-person popup-part _right" value="'+v.event_person+'"/></p><p>' +
                '<span class="popup-part">Место проведения: </span><input class="popup-part _right event-place page-text-bold" value="' + v.event_place + '"/></p>' +
                '<p><span class="popup-part">Описание: </span><input class="popup-part _right event_summary page-text-bold" value="' + v.event_summury + '"/></p>' +
                '<p><span class="popup-part">Тип: </span><span class="popup-part _right page-text-bold">' +
                '<select class="event-type">';

                adminPopup+= '<option value="1" ';
                if (v.event_type==1){
                    adminPopup+='selected';
                }
                adminPopup += '>Лекции</option>';
                adminPopup+='<option value="2" ';
                if (v.event_type==2){
                    adminPopup+='selected';
                }
                adminPopup+='>Экзамен</option>';
                adminPopup+='<option value="3"';
                if (v.event_type==3){
                    adminPopup+='selected';
                }
                adminPopup+='>Практическое занятие</option>';
                adminPopup+='<option value="4"';
                if (v.event_type==4){
                    adminPopup+='selected';
                }
                adminPopup+='>Контрольная работа</option>';
                adminPopup+='<option value="5"';
                if (v.event_type==5){
                    adminPopup+='selected';
                }
                adminPopup+='>Зачет</option>';
                adminPopup+='<option value="6"';
                if (v.event_type==6){
                    adminPopup+='selected';
                }
                adminPopup+='>Семинар</option>';
                adminPopup+='<option value="7"';
                if (v.event_type==7){
                    adminPopup+='selected';
                }
                adminPopup+='>Коллоквиум</option>';
                adminPopup+='<option value="8"';
                if (v.event_type==8){
                    adminPopup+='selected';
                }
                adminPopup+='>Внеучебное занятие</option>';

                adminPopup+='</select></p>' +
                    '<div class="button-block"><div class="edit-info-btn popup-btns filter-button">Save</div>' +
                    '<div class="delete-info-btn popup-btns filter-button">Delete</div></div>' +
                    '<div class="clearfix"></div></div>';
            $('.page-popup.event-popup').fadeIn().append(adminPopup);
         } else {
            $('.page-popup.event-popup').fadeIn().append('<div class="page-popup-content"><div class="close-button popup-close">×</div><h4>'+ v.event_time + ' - ' + v.event_name + '</h4>' +
                '<p><span class="popup-part">Преподаватель: </span><span class="page-text-bold popup-part _right">' + v.event_person + '</span></p><p>' +
                '<span class="popup-part">Место проведения: </span><span class="popup-part _right page-text-bold">' + v.event_place + ' каб.</span></p>' +
                '<p><span class="popup-part">Описание: </span><span class="popup-part _right page-text-bold">' + v.event_summury + '</span></p>' +
                '<p><span class="popup-part">Тип: </span><span class="popup-part _right page-text-bold">' +
                '<span class="event-type-circle event-type-bg" data-type="'+ v.event_type +'"></span>'+eventType+'</span></p></div>');
         }

	});
//	console.log(eventInfo);

}
function hideEventInfo(){
	$('html').removeClass('hidden');
	$('.page-popup.event-popup').fadeOut();
	$('.page-popup-content').remove();
}

Template.eventsOfGroup.helpers({
  teachers: function() {
    return Teachers.find().fetch().map(function(it){ return it.name; });
  }
});
