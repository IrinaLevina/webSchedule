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
    },
  })

Template.addEvents.events({
    'change .faculty-id': function(){
        Session.set('courses', Courses.find({faculty_id: $('.faculty-id').val() }).fetch() );
    },
    'change .courses-id': function(){
        Session.set('groups', Groups.find({course_id: $('.courses-id').val() }).fetch() );
        console.log( $('.courses-id').val());
    },
    'submit .add-event-form': function(e){
        e.preventDefault();
        Events.insert({
            group_id: $('.groups-id').val(),
            event_name: $('.event-name').val(),
            event_summury: $('.event-summary').val(),
            event_date: $('.event-date').val(),
            event_time: $('.event-time').val(),
            event_person: $('.event-person').val(),
            event_place: $('.event-place').val(),
            event_type: $('.event-type').val()
        });
            $('.event-name').val(""),
            $('.event-summary').val(""),
            $('.event-date').val(""),
            $('.event-time').val(""),
            $('.event-person').val(""),
            $('.event-place').val(""),
            $('.event-type').val("")
    }
  })