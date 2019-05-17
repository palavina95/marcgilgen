/*Geolocation part*/
var geoUser = "";
var generalInformation = "";


if (localStorage.getItem("geoUserMemo") === null) { //if palmares is null we create it
        localStorage.setItem("geoUserMemo", JSON.stringify(geoUser));
}

if (localStorage.getItem("generalInformation") === null) { //if palmares is null we create it
        localStorage.setItem("generalInformation", JSON.stringify(generalInformation));
}


function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
   console.log("goeloc not supported");
  }
}


function showPosition(position) {

        var getJSON = function(url, callback) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'json';
        xhr.onload = function() {
            var status = xhr.status;
            if(status === 200){
                callback(null, xhr.response);
            } else {
                callback(status, xhr.response);
            }
        };
        xhr.send();
        };

        getJSON('http://open.mapquestapi.com/geocoding/v1/reverse?key=A5AOlcOT3M0rfeqBbrwMLBfHMZWDF1vZ&location='+position.coords.latitude+','+position.coords.longitude+'&includeRoadMetadata=true&includeNearestIntersection=true', function(err, data) {
            if(err !== null){
                alert('Something went wrong: ' + err);
            } else {
                console.log(data);
                var thisLatitude = data["results"]["0"]["locations"]["0"]["latLng"]["lat"]; //Latitude
                var thisLongitude = data["results"]["0"]["locations"]["0"]["latLng"]["lng"];//longitude
                var thisCanton = data["results"]["0"]["locations"]["0"]["adminArea3"];//canton
                var thisCommune = data["results"]["0"]["locations"]["0"]["adminArea5"];//commune
                var thisNPA = data["results"]["0"]["locations"]["0"]["postalCode"];//npa
                var thisService = data["info"]["copyright"]["text"];//name service

                /*Mise en forme*/
                document.getElementById("latitude").append(thisLatitude);
                document.getElementById("longitude").append(thisLongitude);
                document.getElementById("canton").append(thisCanton);
                document.getElementById("commune").append(thisCommune);// plus NPA entre ()
                document.getElementById("commune").append("("+thisNPA+")");
                document.getElementById("service").append(thisService);


                var thisGeoUser = data["results"]["0"]["locations"]["0"]["adminArea5"]+"-"+data["results"]["0"]["locations"]["0"]["adminArea1"];
                localStorage.setItem("geoUserMemo", JSON.stringify(thisGeoUser));
                //localStorage.setItem("generalInformation", JSON.stringify(generalInfos));

            }
        });

        localStorage.setItem("userLatitude", JSON.stringify(position.coords.latitude));
        localStorage.setItem("userLongitude", JSON.stringify(position.coords.longitude));
}

getLocation();

geoUser = localStorage.getItem("geoUserMemo");
geoUser = geoUser.substring(1,geoUser.length); //Delete first character
geoUser = geoUser.slice(0,-1); //Delete last character

latitude = localStorage.getItem("userLatitude");
longitude = localStorage.getItem("userLongitude");



/*End geolocations part*/
window.onload = function() {
        L.mapquest.key = 'Seb5PDoWDf0ooGF0m9jjt1VlktpTAMnc';

        var map = L.mapquest.map('map', {
          center: [latitude,longitude],
          layers: L.mapquest.tileLayer('map'),
          zoom: 13
        });

          L.marker([latitude, longitude], {
          icon: L.mapquest.icons.marker(),
          draggable: true
        }).bindPopup('Hackaton').addTo(map);


      }
