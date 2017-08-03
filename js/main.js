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


$(document).ready(function()
{
   setInterval('updateClock()', 1000);
});

var reservationData = {};

$('.reservation-day li').on('click', function(e){
	e.preventDefault();
	reservationData.day = $(this).text();
});

$('.reservation-form').on('submit', function(e) {
  e.preventDefault();
  reservationData.name = $('.reservation-name').val();
  reservationsReference.push(reservationData);
});

var reservationsReference = database.ref('reservation');

function getReservations(){
	database.ref('reservation').on('value', function(results){
		var theReservations = results.val();

		var databaseItems = [];
		for (var reservation in  theReservations) {
			databaseItems.push({
        		name: theReservations[reservation].name,
        		day: theReservations[reservation].day,
        		reservationId: reservation
      		});
		}
		var templateData = {
			items: databaseItems
		};
		var source = $('#reservation-template').html();
	    var template = Handlebars.compile(source);
	    var reservationListItems = template(templateData);
		$('#reservation-list-render').html(reservationListItems);

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
