Template.addGroups.helpers({
    faculties: function () {
      return Faculties.find({}).fetch();
    },
    courses: function() {
      Meteor.subscribe('courses')
      return Session.get('courses')
    },
    groups: function() {
      Meteor.subscribe('groups')
      return Groups.find().fetch();
    }
  });

Template.addGroups.events({
    'change .faculty-id': function() {
       Session.set('courses', Courses.find({faculty_id: $('.faculty-id').val() }).fetch() ); 
    },
    'submit .add-group-form': function(e) {
      e.preventDefault();
      Groups.insert({
        course_id: $('.course-id').val(),
        group_name: $('.group-number').val()
      })
    }
  });