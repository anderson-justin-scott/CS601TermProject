// defining starting point for map and initializing infowindow global variable so .close can be called when user clicks home button     
var home = new google.maps.LatLng(49.440243, 7.597150);
var infowindow = null;

// check DOM Ready
$(document).ready(function() {
    // execute
    (function() {
        // map options
        var options = {
            zoom: 4,
            center: new google.maps.LatLng(49.440243, 7.597150), // centered Ramstein
            mapTypeId: google.maps.MapTypeId.HYBRID, // shows 45 degree angle view
            mapTypeControl: false
        };
        
        var locations = [
        ['Ramstein, Germany', 49.440243, 7.597150, '<img src="images/map/Ramstein.jpg">'],
        ['Jahra, Kuwait', 29.340570, 47.675617, '<img src="images/map/Kuwait.jpg">'],
        ['Porto, Portugal', 41.140169, -8.609416, '<img src="images/map/Porto.jpg">'],
        ['Frankfurt, Germany', 50.108297, 8.682110, '<img src="images/map/Frankfurt.jpg">'],
        ['London, England', 51.506993, -0.075385, '<img src="images/map/London.jpg">'],
        ['Verzy, France', 49.151337, 4.148527, '<img src="images/map/Verzy.jpg">'],
        ['Rock-a-Field, Luxembourg', 49.525332, 6.157404, '<img src="images/map/Luxembourg.jpg">'],
        ['Solden, Austria', 46.920374, 10.918996, '<img src="images/map/Solden.jpg">'],
        ['Amsterdam, Netherlands', 52.359130, 4.883744, '<img src="images/map/Amsterdam.jpg">'],
        ['Brussels, Belgium', 50.846908, 4.352392, '<img src="images/map/Brussels.jpg">'],
        ['Rome, Italy', 41.890466, 12.492188, '<img src="images/map/Rome.jpg">'],
        ['Berlin, Germany', 52.516470, 13.377704, '<img src="images/map/Berlin.jpg">'],
        ['Stuttgart, Germany', 48.795970, 9.219305, '<img src="images/map/Stuttgart.jpg">'],
        ['Garmisch-Partenkirchen, Germany', 47.420925, 10.985396, '<img src="images/map/Garmisch.jpg">'],
        ['Barcelona, Spain', 41.403722, 2.174350, '<img src="images/map/Barcelona.jpg">'],
        ['Prague, Czech Republic', 50.090388, 14.399568, '<img src="images/map/Prague.jpg">'],
        ['Crete, Greece', 35.518889, 24.015446, '<img src="images/map/Crete.jpg">'],
        ['Venice, Italy', 45.434247, 12.339044, '<img src="images/map/Venice.jpg">'],
        ['Canary Islands, Spain', 28.860471, -13.844456, '<img src="images/map/Canary.jpg">'],
        ['Trier, Germany', 49.759824, 6.644144, '<img src="images/map/Trier.jpg">'],
        ['Brugge, Belgium', 51.203814, 3.224602, '<img src="images/map/Brugge.jpg">'],
        ['Paris, France', 48.858532, 2.294460, '<img src="images/map/Paris.jpg">']
        ];

        // init map
        var map = new google.maps.Map(document.getElementById('map_canvas'), options);
               

	    // Create a DIV to hold the control and call HomeControl()
	    var homeControlDiv = document.createElement('div');
	    var homeControl = new HomeControl(homeControlDiv, map);
	    //  homeControlDiv.index = 1;
	    map.controls[google.maps.ControlPosition.TOP_RIGHT].push(homeControlDiv);


        // set multiple markers
        for (var i = 0; i < locations.length; i++) {
            // init markers
            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(locations[i][1],locations[i][2]),
                map: map,
                title: locations[i][0],
                animation: google.maps.Animation.DROP
            });

            // process multiple info windows
            (function(marker, i) {
                // add click event
                google.maps.event.addListener(marker, 'click', function() {
                    infowindow = new google.maps.InfoWindow({
                    	// sets content to the 0 index for each array entry listing name, and the 3 index for the linked thumbnail
                        content: '<h2>'+locations[i][0]+'</h2>'+'<br>'+locations[i][3]
                    });
                    map.setZoom(20);
                    map.setCenter(marker.getPosition());
                    infowindow.open(map, marker);
                    // pans so that pop-up image is at the center of the screen
                    map.panBy(0, 500);          
                }); //end listener function
            })(marker, i); //end marker function
        }//end for
    })();
});

// Add a Home control that returns the user to Ramstein, Germany with zoom set to 4
function HomeControl(controlDiv, map) {
	controlDiv.style.padding = '8px';
	var controlUI = document.createElement('div');
	controlUI.style.backgroundColor = '#B2D6EE';
	controlUI.style.border='1px solid';
	controlUI.style.borderRadius='2px';
	controlUI.style.cursor = 'pointer';
	controlUI.style.textAlign = 'center';
	controlUI.title = 'Set map to home';
	controlDiv.appendChild(controlUI);
	var controlText = document.createElement('div');
	controlText.style.fontFamily='Arial,sans-serif';
	controlText.style.fontSize='16px';
	controlText.style.paddingLeft = '6px';
	controlText.style.paddingRight = '6px';
	controlText.innerHTML = '<b>Home<b>';
	controlUI.appendChild(controlText);
	
    // Setup click-event listener: simply set the map to home
	google.maps.event.addDomListener(controlUI, 'click', function() {
		map.setCenter(home),
		map.setZoom(4);
		infowindow.close();
	});
}
