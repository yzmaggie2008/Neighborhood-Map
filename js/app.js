// create var for restaurants locations
var locations = [{
	    name: 'Mandarin Gourmet',
	    category: 'Party',
	    coordinates: {
	    	lat: 37.3244998,
	    	lng: -122.0326229
	    }
	  },
	  {
	  	name: 'TLT BBQ',
	  	category: 'Party',
	  	coordinates: {
	  		lat: 37.32354,
	  		lng: -122.029824
	  	}	
	  },
	  {
	  	name: 'Red Hot Wok',
	  	category: 'Party',
	  	coordinates: {
	  		lat: 37.3221066,
	  		lng: -122.014911
	  	}
	  },
	  {
	  	name: 'Guocui',
	  	category:'Alone',
	  	coordinates: {
	  		lat: 37.31358,
	  		lng: -122.032511
		  }
	  },
	  {
	  	name: 'QQ Noodle',
	  	category:'Alone',
	  	coordinates: {
	  		lat: 37.3106959,
	  		lng: -122.0242433
	  	}
	  },
	  {
	  	name: 'Little Sheep Mongolian Hot Pot',
	  	category: 'Party',
	  	coordinates: {
	  		lat: 37.3229142,
	  	    lng: -122.005926
	  	}
	  },
	  {
	  	name: 'Yeung Shing Restaurant',
	  	category: 'Party',
	  	coordinates: {
	  		lat: 37.2620874,
	  	    lng: -121.9627314
	  	}
	  },
	  {
	  	name: 'Local Cafe',
	  	category:'Alone',
	  	coordinates: {
	  		lat: 37.3369847,
	  		lng: -122.0403526
	  	}
	  },
	  {
	  	name: 'QQ Noodle',
	  	category:'Alone',
	  	coordinates: {
	  		lat: 37.310318,
	  		lng: -122.023294
	  	}
	  },
	  {
	  	name: 'Fuji Huoshao & Dumpling',
	  	category:'Alone',
	  	coordinates: {
	  		lat: 37.3085335,
	  		lng: -122.0136769
	  	}
	  }
];

var foursquareLogin = {
        url: 'https://api.foursquare.com/v2/venues/search',
        dataType: 'json', 
        clientID: 'GHQH5GIMIKCEVVR44IYZRY5XE0LMP22QY2ETOWTHK32CZH3W',
        clientSecret: 'LAXWCAQJ3TEGOLXPKI1OAUNCGFTSILOXCLUSK3TCHAJ2BORW', 
        searchNear: 'Cupertino', 
        requestDate: 20180122, 
        venueLink: "https://foursquare.com/v/" 
};


var map;
var marker;
var largeInfoWindow;
var markers = [];

//initiate the map when loading
function initMap() {
        var cupertino = {lat: 37.324126, lng: -122.041928};
        map = new google.maps.Map(document.getElementById('map'), {
          zoom: 14,
          center: cupertino
        });

        largeInfowindow = new google.maps.InfoWindow();

      
        var position_0 = locations[0].coordinates;
        var title_0 = locations[0].name;
        
        marker = new google.maps.Marker({
        	map: map,
        	position: position_0,
        	title: title_0,
        	animation: google.maps.Animation.Drop,
        });
        //put the markers into an array
        markers.push(marker);
        
        //connect the list and markers
        appViewModel.listRestaurants()[0].marker = marker;

      
               //event listener for the marker when it is clicked
        marker.addListener('click', function(){
      
        	populateInfoWindow(this, largeInfowindow);
        });
        
        var position_1 = locations[1].coordinates;
        var title_1 = locations[1].name;
        
        marker = new google.maps.Marker({
        	map: map,
        	position: position_1,
        	title: title_1,
        	animation: google.maps.Animation.Drop,
        });
        //put the markers into an array
        markers.push(marker);
        
        //connect the list and markers
        appViewModel.listRestaurants()[1].marker = marker;

      
               //event listener for the marker when it is clicked
        marker.addListener('click', function(){
      
        	populateInfoWindow(this, largeInfowindow);
        });

        var position_2 = locations[2].coordinates;
        var title_2 = locations[2].name;
        
        marker = new google.maps.Marker({
        	map: map,
        	position: position_2,
        	title: title_2,
        	animation: google.maps.Animation.Drop,
        });
        //put the markers into an array
        markers.push(marker);
        
        //connect the list and markers
        appViewModel.listRestaurants()[2].marker = marker;

      
               //event listener for the marker when it is clicked
        marker.addListener('click', function(){
      
        	populateInfoWindow(this, largeInfowindow);
        });

        var position_3 = locations[3].coordinates;
        var title_3 = locations[3].name;
        
        marker = new google.maps.Marker({
        	map: map,
        	position: position_3,
        	title: title_3,
        	animation: google.maps.Animation.Drop,
        });
        //put the markers into an array
        markers.push(marker);
        
        //connect the list and markers
        appViewModel.listRestaurants()[3].marker = marker;

      
               //event listener for the marker when it is clicked
        marker.addListener('click', function(){
      
        	populateInfoWindow(this, largeInfowindow);
        });

        var position_4 = locations[4].coordinates;
        var title_4 = locations[4].name;
        
        marker = new google.maps.Marker({
        	map: map,
        	position: position_4,
        	title: title_4,
        	animation: google.maps.Animation.Drop,
        });
        //put the markers into an array
        markers.push(marker);
        
        //connect the list and markers
        appViewModel.listRestaurants()[4].marker = marker;

      
               //event listener for the marker when it is clicked
        marker.addListener('click', function(){
      
        	populateInfoWindow(this, largeInfowindow);
        });

        var position_5 = locations[5].coordinates;
        var title_5 = locations[5].name;
        
        marker = new google.maps.Marker({
        	map: map,
        	position: position_5,
        	title: title_5,
        	animation: google.maps.Animation.Drop,
        });
        //put the markers into an array
        markers.push(marker);
        
        //connect the list and markers
        appViewModel.listRestaurants()[5].marker = marker;

      
               //event listener for the marker when it is clicked
        marker.addListener('click', function(){
      
        	populateInfoWindow(this, largeInfowindow);
        });

        var position_6 = locations[6].coordinates;
        var title_6 = locations[6].name;
        
        marker = new google.maps.Marker({
        	map: map,
        	position: position_6,
        	title: title_6,
        	animation: google.maps.Animation.Drop,
        });
        //put the markers into an array
        markers.push(marker);
        
        //connect the list and markers
        appViewModel.listRestaurants()[6].marker = marker;

      
               //event listener for the marker when it is clicked
        marker.addListener('click', function(){
      
        	populateInfoWindow(this, largeInfowindow);
        });  

        var position_7 = locations[7].coordinates;
        var title_7 = locations[7].name;
        
        marker = new google.maps.Marker({
        	map: map,
        	position: position_7,
        	title: title_7,
        	animation: google.maps.Animation.Drop,
        });
        //put the markers into an array
        markers.push(marker);
        
        //connect the list and markers
        appViewModel.listRestaurants()[7].marker = marker;

      
               //event listener for the marker when it is clicked
        marker.addListener('click', function(){
      
        	populateInfoWindow(this, largeInfowindow);
        });  

        var position_8 = locations[8].coordinates;
        var title_8 = locations[8].name;
        
        marker = new google.maps.Marker({
        	map: map,
        	position: position_8,
        	title: title_8,
        	animation: google.maps.Animation.Drop,
        });
        //put the markers into an array
        markers.push(marker);
        
        //connect the list and markers
        appViewModel.listRestaurants()[8].marker = marker;

      
               //event listener for the marker when it is clicked
        marker.addListener('click', function(){
      
        	populateInfoWindow(this, largeInfowindow);
        });

        var position_9 = locations[9].coordinates;
        var title_9 = locations[9].name;
        
        marker = new google.maps.Marker({
        	map: map,
        	position: position_9,
        	title: title_9,
        	animation: google.maps.Animation.Drop,
        });
        //put the markers into an array
        markers.push(marker);
        
        //connect the list and markers
        appViewModel.listRestaurants()[9].marker = marker;

      
               //event listener for the marker when it is clicked
        marker.addListener('click', function(){
      
        	populateInfoWindow(this, largeInfowindow);
        });                           
      }
 

     //function for populating the inforWindow when the marker is clicked
     function populateInfoWindow(marker, largeInfowindow){
     	var venue;
     	var windowsPop;
     	console.log("marker: " + marker)
     	$.ajax({
     		url: foursquareLogin.url,
     		dataType: foursquareLogin.dataType,
     		data: {
     			client_id: foursquareLogin.clientID,
     			client_secret: foursquareLogin.clientSecret,
     			query: marker.title,
     			near: foursquareLogin.searchNear,
     			v: foursquareLogin.requestDate
     		},
     		success: function(data){
     			venue = data.response.venues[0];

     			if(venue === null){
     				windowsPop = "<div class = 'name'> No Venues, please try again!</div>";
     				largeInfowindow.setContent(windowsPop);
     			}else{
     				largeInfowindow.setContent("<div class='name'>" + "Name: " + "<span class='info'>" + marker.title + "</span></div>" +
                                "<div class='address'>" + "Location: " + "<span class='info'>" + venue.location.formattedAddress[0] + "</span></div>" +
                                "<div class='foursquareInfo'>" + "Foursquare info: " + "<a href='" + foursquareLogin.venueLink + venue.id + "'>" + "Link" + "</a></div>");
     			}

               
     			marker.setAnimation(google.maps.Animation.BOUNCE);
     			setTimeout(function(){
     				marker.setAnimation(null);
     			}, 1800);

                largeInfowindow.open(map, marker);

                largeInfowindow.addListener('closeclick', function(){
                	largeInfowindow.setMarker = null;
                });
     		},
     		error: function(){
     			alert('Something wrong in Foursquare, please wait and try again later!');
     		}
     	});
     }  

      //Constructor for location
var objLocation = function(data){
      	this.title = ko.observable(data.name);
      	this.location = ko.observable(data.coordinates);
      	this.category = ko.observable(data.category);
      };
 
//viewModel function
var viewModel = function(){
	var self = this;
    
    this.isShown = ko.observable(true);
	this.toggleMenu = function(){
		this.isShown(!this.isShown());
	}.bind(this);

	this.listRestaurants = ko.observableArray([]);

    locations.forEach(function(restaurant){
    	this.listRestaurants.push(new objLocation(restaurant));
    }.bind(this));

    this.currentRestaurant = ko.observable();

	this.filterOptions = ['All', 'Party', 'Alone'];
	this.selectedOption = ko.observable('All');

	this.filteredList = ko.observableArray();

	this.defaultList = function(){
		this.listRestaurants().forEach(function(location){
			self.filteredList().push(location);
		});
	};
	this.defaultList();
	this.update = function(){
       this.listRestaurants().forEach(function(location){
       	this.filteredList.pop(location);
       }.bind(this));
	   this.listRestaurants().forEach(function(location){
	   	if(this.selectedOption() === 'All') {
	   		this.filteredList.push(location);
           
       } else if (this.selectedOption() === 'Party' && location.category() === 'Party') {
            this.filteredList.push(location);
            
      } else if (this.selectedOption() === 'Alone' && location.category() === 'Alone'){
            this.filteredList.push(location);
            
      }
	}.bind(this));
};
};


var appViewModel = new viewModel();
ko.applyBindings(appViewModel);







