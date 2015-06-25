Template.addEvents.helpers({
    faculties: function () {
      return Faculties.find({}).fetch();
    },
    courses: function() {
      Meteor.subscribe('courses')
      return Session.get('courses')
    },
    groups: function() {
      Meteor.subscribe('groups')
       return Session.get('groups')
    },
    events: function() {
      Meteor.subscribe('events')
      return Events.find().fetch()
    }
  });

Template.addEvents.events({
    'click .faculty-id': function(){
        Session.set('courses', Courses.find({faculty_id: $('.faculty-id').val() }).fetch() );
    },
    'click .courses-id': function(){
        Session.set('groups', Groups.find({course_id: $('.courses-id').val() }).fetch() );
        console.log( $('.courses-id').val());
    },
    'submit .add-event-form': function(e){
        e.preventDefault();
        var newEventID = Events.insert({
            group_id: $('.groups-id').val(),
            event_name: $('.event-name').val(),
            event_summury: $('.event-summary').val(),
            event_date: $('.event-date').val(),
            event_time: $('.event-time').val(),
            event_person: $('.event-person').val(),
            event_place: $('.event-place').val(),
            event_type: $('.event-type').val()
        });
            $('.event-name').val("");
            $('.event-summary').val("");
            $('.event-date').val("");
            $('.event-time').val("");
            $('.event-person').val("");
            $('.event-place').val("");
            $('.event-type').val("");
            createCommentNotification(newEventID);


    }
  });

createCommentNotification = function(eventID) {
  var event = Events.findOne(eventID);
    console.log(event);
  Notifications.insert({
      groupID: event.group_id,
      eventId: event._id,
      nameEvent: event.event_name,
      sammaryEvent: event.summary,
      read: false
    });

   Meteor.call('sendLogMessage');
};