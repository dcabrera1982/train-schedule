 $(document).ready(function() {

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyD_3J-2tI6ku5N6ZJ75GYvjOEs_EqUX5YY",
    authDomain: "test-project-965f1.firebaseapp.com",
    databaseURL: "https://test-project-965f1.firebaseio.com",
    projectId: "test-project-965f1",
    storageBucket: "test-project-965f1.appspot.com",
    messagingSenderId: "413722949682",
    appId: "1:413722949682:web:0ba7e6a4bf7809fd"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

   var database = firebase.database();

 

  // First Time (pushed back 1 year to make sure it comes before current time)
   
  // 2. Button for adding Trains
  $("#add-train-btn").on("click", function(event) {
  		event.preventDefault();

	 // Grabs user input
	  var trainName = $("#train-name-input").val().trim();
	  var trainDest = $("#dest-input").val().trim();
	  var firstTrain = $("#firstTrain-input").val().trim();
	  var trainFreq = $("#freq-input").val().trim();

	  // Creates local "temporary" object for holding train data
	  var newTrain = {
	  	name: trainName,
	  	destination: trainDest,
	  	start: firstTrain,
	  	frequency: trainFreq
	  };

	  // Uploads train data to the database
  		database.ref().push(newTrain);


	   // Alert
  		alert("Train successfully added");

	 // Clears all of the text-boxes
	  $("#train-name-input").val("");
	  $("#dest-input").val("");
	  $("#firstTrain-input").val("");
	  $("#freq-input").val("");
  	});

  	// 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
	database.ref().on("child_added", function(childSnapshot, prevChildKey) {

	  console.log(childSnapshot.val());

	  // Store everything into a variable.
	  var trainName = childSnapshot.val().name;
	  var trainDest = childSnapshot.val().destination;
	  var firstTrain = childSnapshot.val().start;
	  var trainFreq = childSnapshot.val().frequency;


	   // Declare variable
  		var trainFreq;

  		// Time is to be entered on the entry form
   		 var firstTime = 0;

	   var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
	    console.log(firstTimeConverted);

	  // Current Time
	    var currentTime = moment();
	    console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));

	  // Difference between the times
		var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
		console.log("DIFFERENCE IN TIME: " + diffTime);

		// Time apart (remainder)
	    var tRemainder = diffTime % trainFreq;
	    console.log(tRemainder);

	    // Minute Until Train
	    var tMinutesTillTrain = trainFreq - tRemainder;
	    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

	    // Next Train
	    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
	    console.log("ARRIVAL TIME: " + moment(nextTrain).format("HH:mm"));


	  // Add each train's data into the table
	  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" + trainFreq + 
	   "</td><td>" + moment(nextTrain).format("HH:mm") + "</td><td>" + tMinutesTillTrain + "</td></tr>");
	});

 });