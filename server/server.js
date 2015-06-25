
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

}

var users = [

	{name:"Admin User",email:"admin@admin.com",roles:['admin']}
];

_.each(users, function (user) {
	var id;

	id = Accounts.createUser({
		email: user.email,
		password: "apple1",
		profile: { name: user.name }
	});

	if (user.roles.length > 0) {
		// Need _id of existing user record so this call must come
		// after `Accounts.createUser` or `Accounts.onCreate`
		Roles.addUsersToRoles(id, user.roles);
	}

});

