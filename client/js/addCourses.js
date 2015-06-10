Template.addCourses.helpers({
    faculties: function () {
      return Faculties.find({}).fetch();
    },
    courses: function() {
      Meteor.subscribe('courses')
      return Courses.find().fetch();
    }
  });

Template.addCourses.events({
    'submit .add-course-form': function(e) {
        e.preventDefault();
        Courses.insert({
          faculty_id: $('.faculty-id').val(),
          course_name: $('.course-number').val()
        })
    }
  });