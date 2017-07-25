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