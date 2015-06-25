
Meteor.publish('faculties', function() {
  return Faculties.find();
});

Meteor.publish('notifications', function() {
  return Notifications.find();
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

Meteor.publish('calendar', function () {
  return Calendar.find();
});
Meteor.publish('teacher', function () {
  return Teachers.find();
});

if(Meteor.is_server) {

  Roles.allow({
    'update': function (userId,doc) {
	  console.log("eeee")
      return true; 
    }
  });

  Notifications.allow({
    update: function(userId, doc, fieldNames) {
        return ownsDocument(userId, doc) &&
          fieldNames.length === 1 && fieldNames[0] === 'read';
      },
    insert: function(userId, doc, fieldNames) {
        return ownsDocument(userId, doc) &&
          fieldNames.length === 1 && fieldNames[0] === 'read';

      }
    });

}