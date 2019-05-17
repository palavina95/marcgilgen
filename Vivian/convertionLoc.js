/*raphael.politi@heig-vd.ch*/

/*Geolocation part*/
var geoUser = "";


if (localStorage.getItem("geoUserMemo") === null) { //if palmares is null we create it
        localStorage.setItem("geoUserMemo", JSON.stringify(geoUser));
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(transformLoc);
  } else {
   console.log("goeloc not supported");
  }
}


function transformLoc(position) {

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


 getJSON( 'http://geodesy.geo.admin.ch/reframe/wgs84tolv95?easting=7.43863&northing=46.95108&altitude=550.0&format=json', function(err, data) {
            if(err !== null){
                alert('Something went wrong: ' + err);
            } else {
                console.log(data);
                //var thisHumidity = data["main"]["humidity"];//humidity

                /*Mise en forme*/
                document.getElementById("humidite").append(thisHumidity);

            }
        });
}

getLocation();



/*End geolocations part*/
