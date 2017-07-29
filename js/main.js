var config = {
    apiKey: "AIzaSyCdsu2-QC9v2qmzkNz-cQzM9FOqc860rec",
    authDomain: "reservation-site-291ae.firebaseapp.com",
    databaseURL: "https://reservation-site-291ae.firebaseio.com",
    projectId: "reservation-site-291ae",
    storageBucket: "",
    messagingSenderId: "102640071015"
  };
  firebase.initializeApp(config);

var database = firebase.database();

var reservationData = {};

$('.reservation-day li').on('click', function(e){
	e.preventDefault();
	reservationData.day = $(this).text();
});

$('.reservation-form').on('submit', function(e) {
  e.preventDefault();
  reservationData.name = $('.reservation-name').val();
});

  
var reservationsReference = database.ref('reservation');
reservationsReference.push(reservationData);

function getReservations(){
	database.ref('reservation').on('value', function(results){
		var theReservations = results.val();
		
		for (var reservation in  theReservations) {
			var dataContent = {
        		name: theReservations[reservation].name,
        		day: theReservations[reservation].day,
        		reservationId: reservation
      };

      	var source = $('.reservation-list').html();
      	var template = Handlebars.compile(source);
      	var reservationListItems = template(dataContent);

      	$('.reservation-list').append(reservationListItems);
		}
	});

};

getReservations();


function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 40.8054491, lng: -73.9654415},
    zoom: 10,
    scrollwheel: false
  });

  var marker = new google.maps.Marker({
    position: {lat: 40.8054491, lng: -73.9654415},
    map: map,
    title: 'Monks Café'
  });
}