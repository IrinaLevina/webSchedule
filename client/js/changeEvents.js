Template.changeEvents.helpers({
    faculties: function () {
      return Faculties.find({}).fetch();
    },
    courses: function() {
      Meteor.subscribe('courses');
      return Session.get('courses')
    },
    groups: function() {
      Meteor.subscribe('groups');
       return Session.get('groups')
    },
    events: function() {
      Meteor.subscribe('events');
      return Session.get('events')
    }
  });

Template.changeEvents.events({
    'click .faculty-id': function(){
        Session.set('courses', Courses.find({faculty_id: $('.faculty-id').val() }).fetch() );
    },
    'click .courses-id': function(){
        Session.set('groups', Groups.find({course_id: $('.courses-id').val() }).fetch() );
        console.log( $('.courses-id').val());
    },
    'click .groups-id': function() {
        Session.set('events', Events.find({group_id: $('.groups-id').val() }).fetch() );
    },
    'submit .add-event-form': function(e){
        e.preventDefault();

        Events.update($('form').attr('data-id'),{$set: {
            group_id: $('.groups-id').val(),
            event_name: $('.event-name').val(),
            event_summury: $('.event-summary').val(),
            event_date: $('.event-date').val(),
            event_time: $('.event-time').val(),
            event_person: $('.event-person').val(),
            event_place: $('.event-place').val(),
            event_type: $('.event-type').val()
        }});
       /* Events.insert({
            group_id: $('.groups-id').val(),
            event_name: $('.event-name').val(),
            event_summury: $('.event-summary').val(),
            event_date: $('.event-date').val(),
            event_time: $('.event-time').val(),
            event_person: $('.event-person').val(),
            event_place: $('.event-place').val(),
            event_type: $('.event-type').val()
        });*/
            $('.event-name').val("");
            $('.event-summary').val("");
            $('.event-date').val("");
            $('.event-time').val("");
            $('.event-person').val("");
            $('.event-place').val("");
            $('.event-type').val("");
        Session.set('events', Events.find({group_id: $('.groups-id').val() }).fetch() );
    },
    'click .edit-event':function (e){
        var currentId = $(e.target).parent('li').attr('data-id');
        var event = Events.find({"_id": currentId }).fetch();
        console.log(event);
        $('.event-name').val(event[0].event_name);
        $('.event-summary').val(event[0].event_summury);
        $('.event-date').val(event[0].event_date);
        $('.event-time').val(event[0].event_time);
        $('.event-person').val(event[0].event_person);
        $('.event-place').val(event[0].event_place);
        $('.event-type').val(event[0].event_type);
        $('form').attr('data-id', currentId);
    },
    'click .delete-event': function(e){
        var currentId = $(e.target).parent('li').attr('data-id');
        Events.remove(currentId);
        Session.set('events', Events.find({group_id: $('.groups-id').val() }).fetch() );
    }
  });