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
     }, 500);
     multyselect();
};

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