/*
Events.find({
    'event_date': { $lt: "2015-06-11" }
}).fetch()*/

Template.eventsOfGroup.rendered = function() {
     countEventsDate("month");
     setTimeout(function(){
         $(".fc-button-month").click();
     }, 500);

};

Template.eventsOfGroup.events({
    'click .fc-button': function() {
        if ($('.fc-state-active').hasClass('fc-button-month')) {
            countEventsDate("month");
        } else if ($('.fc-state-active').hasClass('fc-button-agendaDay')){
            countEventsDate("week");
        }
    }
});

function countEventsDate(selector) {
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
    var eventsList = Events.find({
        'event_date': { $gte: startDate, $lte: endDate}
    }).fetch();

    if (selector == "month") {
       createEventForMonth(eventsList)
    } else if (selector == "week" ) {
        createEventForWeek(eventsList)
    }
    console.log(eventsList)
}

function createEventForMonth(eventsList) {
    $(".fc-day").find(".fc-day-content").html("");
    $(eventsList).each(function(k,v){
        $('.fc-day[data-date='+ v.event_date+']').find(".fc-day-content").append("<div data-id='"+ v._id+"'>"+ v.event_name+"</div>");
    });
}

function createEventForWeek(eventsList) {
    $('.fc-agenda-slots .fc-widget-content').html('<div style="position:relative">&nbsp;</div>');
    $(eventsList).each(function(k,v){
        var position = $('.fc-agenda-days .fc-widget-content:not(.fc-last)[data-date='+ v.event_date+']').index()*210;
        var timeBlock = checkEventTime(v.event_time);
        var html = "<div class='event-for-week' data-id='"+ v._id+"'>" +
            v.event_name +
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

