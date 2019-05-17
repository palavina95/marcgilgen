/*raphael.politi@heig-vd.ch*/

/*Geolocation part*/
var geoUser = "";


if (localStorage.getItem("geoUserMemo") === null) { //if palmares is null we create it
        localStorage.setItem("geoUserMemo", JSON.stringify(geoUser));
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showMeteo);
  } else {
   console.log("goeloc not supported");
  }
}


function showMeteo(position) {

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


 getJSON( 'https://api.openweathermap.org/data/2.5/weather?lat='+position.coords.latitude+'&lon='+position.coords.longitude+'&appid=f36c565eefaa1b58b5340f51eb52fbf0', function(err, data) {
            if(err !== null){
                alert('Something went wrong: ' + err);
            } else {
                console.log(data);
                var thisHumidity = data["main"]["humidity"];//humidity
                var thisPressure = data["main"]["pressure"];//pressure
                var thisTemp = data["main"]["temp"] - 271,Float32Array;//temp
                var thisTempMax = data["main"]["temp_min"] - 271,Float32Array;//temp_min
                var thisTempMin = data["main"]["temp_max"] - 271,Float32Array;//temp_max
                var thisWind = data["wind"]["speed"];//wind_speed

                var temp = thisTemp.toFixed(2);
                var tempMax = thisTempMax.toFixed(2);
                var tempMin = thisTempMin.toFixed(2);

                /*Mise en forme*/
                document.getElementById("humidite").append(thisHumidity);
                document.getElementById("pression").append(thisPressure);
                document.getElementById("temp").append(temp);
                document.getElementById("temp_max").append(tempMax);// plus NPA entre ()
                document.getElementById("temp_min").append(tempMin);
                document.getElementById("wind").append(thisWind);

            }
        });
}

getLocation();



/*End geolocations part*/
