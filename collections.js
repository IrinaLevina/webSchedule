Faculties = new Mongo.Collection("faculties", {idGeneration: 'STRING'});
Courses = new Mongo.Collection("courses", {idGeneration: 'STRING'});
Groups = new Mongo.Collection("groups", {idGeneration: 'STRING'});
Events = new Mongo.Collection("events", {idGeneration: 'STRING'});
Teachers = new Mongo.Collection("teachers", {idGeneration: 'STRING'});
Nba = new Meteor.Collection("nba");
/*Calendar = new Mongo.Collection("calendar", {idGeneration: 'STRING'})*/
/*var insertUsers=function(){
  var adminId=Accounts.createUser({
    username:"admin",
    password:"password"
  });
  //
  Roles.addUsersToRoles(adminId,"admin");
};
if(Meteor.is_server) {
insertUsers();
}*/