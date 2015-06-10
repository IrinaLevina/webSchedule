var courses;
Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  waitOn: function() { return Meteor.subscribe('faculties'); }
});

Router.map(function() {
  this.route('faculties', {path: '/'});

  this.route('coursesOfFaculty', {
    path: '/faculties/:_id',
    data: 
    function() {
      Meteor.subscribe('courses'); 
      return  Courses.find({faculty_id: this.params._id}).fetch();
    },
  });

  this.route('groupsOfCourse', {
    path: '/courses/:_id',
    data: function() { 
      Meteor.subscribe('groups');
      return Groups.find({course_id:this.params._id}); 
    }
  });

  this.route('eventsOfGroup', {
    path: '/events/:_id',
    data: function() { 
      Meteor.subscribe('events');
      return Events.find({group_id:this.params._id}); 
    }
     
  });


  this.route('addCourses', {
    path: '/add_courses/',
    data: function(){
    }
  });

  this.route('addGroups', {
    path: '/add_groups/',
    data: function(){
    }
  });

  this.route('addEvents', {
    path: '/add_events/',
    data: function(){
    }
  });
});

Router.onBeforeAction('loading');