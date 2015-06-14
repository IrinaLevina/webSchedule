Template.body.events({
	'change .faculty-select': function () {
	    console.log("here")
	},
});

Template.faculties.events({
	'keyup .faculty-search' : function(e){
		var facultiesSearchText = e.target.value;
		Session.set('facultiesSearch', Faculties.find({faculty_name: {$regex: facultiesSearchText, $options: 'i'}}).fetch() );
	}
});