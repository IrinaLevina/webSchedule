if (Meteor.isClient) {

  Template.faculties.helpers({
    faculties: function () {
      if (Session.get("facultiesSearch")) {
        return Session.get("facultiesSearch");
      } else {
        return Faculties.find({}).fetch();
      }
    }
     
  });

  Template.coursesOfFaculty.helpers({
    courses: function () {
      var courses = Router.current().data();
      return courses;
    }
  });

  Template.groupsOfCourse.helpers({
    groups: function() {
      var groups = Router.current().data();
      return groups;
    },
    date: function() {

    }
  });

  Template.eventsOfGroup.helpers({
    events: function(){
      var events = Router.current().data();
      return events;
    }
  });

  Meteor.subscribe('calendar', function () {
    
    Session.set('superCalendarReady', true);
  });
}

Meteor.methods({
    'sendLogMessage': function(){
        console.log("Hello world");
    }
});

