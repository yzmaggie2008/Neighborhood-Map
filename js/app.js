// create var for restaurants locations
var locations = [{
	    name: 'Power Pot',
	    category: 'Party',
	    coordinates: {
	    	lat: 37.316194,
	    	lng: -122.032710
	    }
	  },
	  {
	  	name: 'Sizzling Gourmet',
	  	category: 'Party',
	  	coordinates: {
	  		lat: 37.322282,
	  		lng: -122.014836
	  	}	
	  },
	  {
	  	name: 'CBI Boiling Fish',
	  	category: 'Party',
	  	coordinates: {
	  		lat: 37.322514,
	  		lng: -122.017361
	  	}
	  },
	  {
	  	name: 'Taiwan Porridge Kingdom',
	  	category:'Alone',
	  	coordinates: {
	  		lat: 37.336958,
	  		lng: -122.040243
		  }
	  },
	  {
	  	name: 'Shanghai Garden',
	  	category:'Alone',
	  	coordinates: {
	  		lat: 37.336975,
	  		lng: -122.040296
	  	}
	  },
	  {
	  	name: 'Beijin Duck House',
	  	category: 'Party',
	  	coordinates: {
	  		lat: 37.310779,
	  	    lng: -122.023916
	  	}
	  },
	  {
	  	name: 'Mandarin Gourmet Cupertino',
	  	category: 'Party',
	  	coordinates: {
	  		lat: 37.324742,
	  	    lng: -122.032612
	  	}
	  },
	  {
	  	name: 'Fuji HuoShao & Dumpling',
	  	category:'Alone',
	  	coordinates: {
	  		lat: 37.308790,
	  		lng: -122.013532
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
	  	name: 'Local Cafe',
	  	category:'Alone',
	  	coordinates: {
	  		lat: 37.336947,
	  		lng: -122.040242
	  	}
	  }
];

var foursquareLogin = {
        url: 'https://api.foursquare.com/v2/venues/search',
        dataType: 'json', 
        clientID: 'GHQH5GIMIKCEVVR44IYZRY5XE0LMP22QY2ETOWTHK32CZH3W',
        clientSecret: '2AMVRG14H5WWHXGWLIZMBOPIMAPF50VQRNRO5JIBMWX45XOD', 
        searchNear: 'Cupertino', 
        requestDate: 20180120, 
        venueLink: "https://foursquare.com/v/" 
};


var map;
var marker;
var infoWindow;
var markers = [];

//initiate the map when loading
function initMap() {
        var cupertino = {lat: 37.324126, lng: -122.041928};
        map = new google.maps.Map(document.getElementById('map'), {
          zoom: 13,
          center: cupertino
        });

        var largeInfowindow = new google.maps.InfoWindow();

        for(var i = 0; i < locations.length; i++){
        	var position = locations[i].coordinates;
        	var title = locations[i].name;
        	marker = new google.maps.Marker({
        		map: map,
        		position: position,
        		title: name,
        		animation: google.maps.Animation.Drop
        	});
        //put the markers into an array
        markers.push(marker);
        
        //connect the list and markers
        appViewModel.listRestaurants()[i].marker = marker;

        //event listener for the marker when it is clicked
        marker.addListener('click', function(){
        	populateInfoWindow(this, largeInfowindow);
        });

        }

      }

     //function for populating the inforWindow when the marker is clicked
     function populateInfoWindow(marker, inforWindow){
     	var venue;
     	var windowsPop;
     	$.ajax({
     		url: foursquareLogin.url,
     		dataType: foursquareLogin.dataType,
     		data: {
     			client_Id: foursquareLogin.clientID,
     			client_Secret: foursquareLogin.clientSecret,
     			query: marker.title,
     			near: foursquareLogin.searchNear,
     			v: foursquareLogin.requestDate
     		},
     		success: function(data){
     			venue = data.response.venues[0];
     			if(venue == null){
     				windowsPop = "<div class = 'name'> No Venues, please try again!</div>";
     			}else{
     				inforWindow.setContent("<div class='name'>" + "Name: " + "<span class='info'>" + marker.title + "</span></div>" +
                                "<div class='address'>" + "Location: " + "<span class='info'>" + venue.location.formattedAddress[0] + "</span></div>" +
                                "<div class='foursquareInfo'>" + "Foursquare info: " + "<a href='" + foursquareLogin.venueLink + venue.id + "'>" + "Link" + "</a></div>");
     			}

     			marker.setAnimation(google.maps.Animation.BOUNCE);
     			setTimeout(function(){
     				marker.setAnimation(null);
     			}, 1800);

                infoWindow.open(map, marker);

                infoWindow.addListener('closeclick', function(){
                	infoWindow.setMarker = null;
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
			self.filteredList().push(location)
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
}
}


var appViewModel = new viewModel();
ko.applyBindings(appViewModel);







