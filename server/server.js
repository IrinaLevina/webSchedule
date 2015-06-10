Meteor.publish('faculties', function() {
  return Faculties.find();
});

Meteor.publish('courses', function() {
  return Courses.find();
});

Meteor.publish('groups', function() {
  return Groups.find();
});

Meteor.publish('events', function() {
  return Events.find();
});