Template.eventsOfGroup.events({
    'click .event-for-week': function(e){
        var eventInfo = Events.find({
            '_id': $(e.target).attr('data-id')
        }).fetch();
        showEventInfo(eventInfo);
    }
});

function showEventInfo(eventInfo) {
    console.log(eventInfo);
}