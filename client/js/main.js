if (Meteor.isClient) {

  Template.faculties.helpers({
    faculties: function () {
      return Faculties.find({}).fetch();
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
  })

  Template.body.events({
    'change .faculty-select': function () {
        console.log("here")
    },
  });

}
