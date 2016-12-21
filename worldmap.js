var map;
      function initMap() {
          map = new google.maps.Map(document.getElementById('map'), {
          zoom: 2,
          center: new google.maps.LatLng(2.8,-187.3),
          mapTypeId: 'terrain'
        });

        // Create a <script> tag and set the USGS URL as the source.
        var script = document.createElement('script');
        script.src = 'damage.js';
        document.getElementsByTagName('head')[0].appendChild(script);
      }//initMap

      
        var labels=[]; 
        var x=[];
        var color=[];
        var pinColors=[];
         // Loop through the results array and place a marker for each  
      window.eqfeed_callback = function(results) {
        for (var i = 0; i < results.features.length; i++) {
          var latLng = new google.maps.LatLng(results.features[i].LATITUDE, results.features[i].LONGITUDE);
          labels[i]= results.features[i].COUNTRY;
          if(results.features[i].DAMAGE <6)
            pinColors[i]= '0000FF';
          else
            pinColors[i]='FF0000';
          var tmp={
            'lat':results.features[i].LATITUDE,
            'lng': results.features[i].LONGITUDE
          };
          x.push(tmp);
         
        }//for
      console.log(x);
var icon2 = "imageB.jpg";
      var markers = x.map(function(location, i) {
        var mark = new google.maps.Marker({
            position: location,
            label: labels[i],
            color: 'blue', 
            icon: new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColors[i],
              new google.maps.Size(21, 34),
              new google.maps.Point(0,0),
              new google.maps.Point(10, 34))

          });
      /* var contentString = '<div id="content">'+
            '<div id="siteNotice">'+
            '</div>'+
            '<h1 id="firstHeading" class="firstHeading">Uluru</h1>'+
            '<div id="bodyContent">'+
            '<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
            'sandstone rock formation in the southern part of the '+
            'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) '+
            'south west of the nearest large town, Alice Springs; 450&#160;km '+
            '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major '+
            'features of the Uluru - Kata Tjuta National Park. Uluru is '+
            'sacred to the Pitjantjatjara and Yankunytjatjara, the '+
            'Aboriginal people of the area. It has many springs, waterholes, '+
            'rock caves and ancient paintings. Uluru is listed as a World '+
            'Heritage Site.</p>'+
            '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">'+
            'https://en.wikipedia.org/w/index.php?title=Uluru</a> '+
            '(last visited June 22, 2009).</p>'+
            '</div>'+
            '</div>';
*/

        var infowindow = new google.maps.InfoWindow({
          content: mark.label
        });


       mark.addListener('mouseout', function() {

        if (infowindow) {
         infowindow.close();
          }
          });
        
        mark.addListener('mouseover', function() {
        infowindow.open(map, mark);
		redrawPlot(mark.label,false);
        });

return mark;
        });
        
         
      var markerCluster = new MarkerClusterer(map, markers,
           {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
      }