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

        for(var i = 0; i < locations.length; i++){
        	var position = locations[i].coordinates;
        	var title = locations[i].name;
        	console.log("title:"  + title);
        	marker = new google.maps.Marker({
        		map: map,
        		position: position,
        		title: title,
        		animation: google.maps.Animation.Drop,
        	});
        //put the markers into an array
        markers.push(marker);
        
        //connect the list and markers
        appViewModel.listRestaurants()[i].marker = marker;

        //event listener for the marker when it is clicked
        marker.addListener('click', function(){
        	console.log(this);
        	populateInfoWindow(this, largeInfowindow);
        });

        }

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







