$(document).ready(function () {
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyC9hFifMdpjQbUpeSV5UZuYXbn4VpXxVSE",
        authDomain: "train-scheduler-d50fc.firebaseapp.com",
        databaseURL: "https://train-scheduler-d50fc.firebaseio.com",
        projectId: "train-scheduler-d50fc",
        storageBucket: "train-scheduler-d50fc.appspot.com",
        messagingSenderId: "93294745411"
    };

    firebase.initializeApp(config);

    var database = firebase.database();


    function firebasePush() {
        var name = $('#train-name-input').val().trim();
        var destination = $('#destination-input').val().trim();
        var firstTrain = $('#first-train-input').val().trim();
        var frequency = $('#frequency-input').val().trim();

        var newTrain = {
            name: name,
            destination: destination,
            firstTrain: firstTrain,
            frequency: frequency
        };
        console.log(newTrain)

        database.ref().push(newTrain);
    };
    var currentDay = moment().format('YYYY-MM-DD');

    database.ref().on('child_added', function (childSnapshot, prevChildKey) {
        console.log(childSnapshot.val());

        var trainName = childSnapshot.val().name;
        var trainDestination = childSnapshot.val().destination;
        var trainFirst = childSnapshot.val().firstTrain;
        var trainFrequency = childSnapshot.val().frequency;

        var currentTime = moment();
        
        var nextTrainTime = currentDay + " " + childSnapshot.val().firstTrain
        console.log(nextTrainTime)
        console.log( moment(nextTrainTime).format("X") )
    
        var startTime = moment(nextTrainTime).format("X")
    
        var currentTime = moment().format("X")
    
        console.log(moment.unix(currentTime).format("hh:mm"))
    
        var timeDifference = currentTime - startTime
    
        var minutes = Math.floor(timeDifference/60)
    
        console.log(trainFrequency)
    
        var next = (minutes%trainFrequency)
        console.log(next)
        console.log(trainFrequency - next)
    
        var nextTime = trainFrequency - next;
        console.log(nextTime)
    
    
        // =================================================================
    
        var trainDiv = $("<tr>");
    
        var nameTD = $("<td>");
        nameTD.append(trainName);
    
        var destinationTD = $("<td>");
        destinationTD.append(trainDestination);
    
        var frequencyTD = $("<td>");
        frequencyTD.append(trainFrequency);
    
    
        var something = currentTime +  (trainFrequency - next)*60
    
        console.log("xxxxx")
        console.log(currentTime)
        console.log((trainFrequency - next)*60)
        console.log("xxxxx")
    
        var nextTrainTD = $("<td>");
        nextTrainTD.append( moment().add(nextTime, 'minutes').format("hh:mm") );
    
    
        // var nextTrainTD = $("<td>");
        // nextTrainTD.append( currentTime +  (childSnapshot.val().frequency - next)*60 );
    
        var minutesAwayTD = $("<td>");
        minutesAwayTD.append(trainFrequency - next);
        console.log(trainFrequency - next)
    
        // var nameTD = ("<td>")
        // nameTD.append(childSnapshot.val().name)
    
        // var nameTD = ("<td>")
        // nameTD.append(childSnapshot.val().name)
    
        trainDiv.append(nameTD);
        trainDiv.append(destinationTD);
        trainDiv.append(frequencyTD);
        trainDiv.append(nextTrainTD);
        trainDiv.append(minutesAwayTD);
    
    
        $("#train-table").append(trainDiv)
    
    }, function(errorObject){
    
            console.log("Errors handled: " + errorObject.code);
    });

    $('#add-train-btn').on('click', function (event) {
        event.preventDefault();
        firebasePush()

    });
    //firebase pull of added data

    //end of script

});
