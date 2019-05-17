/*Geolocation part*/
var geoGeneral = "";

if (localStorage.getItem("geoGeneral") === null) { //if palmares is null we create it
        localStorage.setItem("geoGeneral", JSON.stringify(geoUser));
}

function getLocationGeneral() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPositionGeneral);
  } else {
   console.log("goeloc not supported");
  }
}


function showPositionGeneral(position) {

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
                var thisGeoUser = data["results"]["0"]["locations"]["0"]["adminArea5"]+"-"+data["results"]["0"]["locations"]["0"]["adminArea1"];
                console.log("data: "+thisGeoUser);
                //localStorage.setItem("geoUserMemo", JSON.stringify(thisGeoUser));
            }
        });
}

getLocation();

geoUser = localStorage.getItem("geoUserMemo");
geoUser = geoUser.substring(1,geoUser.length); //Delete first character
geoUser = geoUser.slice(0,-1); //Delete last character

/*End geolocations part*/
