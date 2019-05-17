/*Geolocation part*/
var geoUser = "";
var generalInformation = "";
var userLatitude = "";
var userLongitude = "";


if (localStorage.getItem("geoUserMemo") === null) { //if palmares is null we create it
        localStorage.setItem("geoUserMemo", JSON.stringify(geoUser));
}

if (localStorage.getItem("generalInformation") === null) { //if palmares is null we create it
        localStorage.setItem("generalInformation", JSON.stringify(generalInformation));
}

if (localStorage.getItem("userLatitude") === null) { //if palmares is null we create it
        localStorage.setItem("userLatitude", JSON.stringify(userLatitude));
}

if (localStorage.getItem("userLongitude") === null) { //if palmares is null we create it
        localStorage.setItem("userLongitude", JSON.stringify(userLongitude));
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

                function convertLatLng(lat,long){
                                // =>deg = 3600 * seconde
                                lat = lat * 3600;
                                long = long * 3600;

                                // latitude:  φ =>lat  ( φ' =>lat2)
                                lat2 = (lat - 169028.66)/10000;

                                // longitude:  λ =>long  ( λ' =>long2)
                                long2 = (long - 26782.5)/10000;

                                var y = 600072.37 + (211455.93 * long2) - (10938.51 * long2 * lat2) - (0.36 * long2 * (lat2*lat2)) - (44.54 * (long2*long2*long2));
                                y = Math.round(y);

                                var x = 200147.07 + (308807.95 * lat2) + (3745.25 * long2*long2) + (76.63 * lat2*lat2) - (194.56 * long2*long2 * lat2) + (119.79 * lat2*lat2*lat2);
                                x = Math.round(x);

                                return [y,x];  // 600000,200000
                            }

                var getSwissValue = convertLatLng(thisLatitude, thisLongitude);

                /*Mise en forme*/
                document.getElementById("latitude").append(thisLatitude+" | CH1903: "+getSwissValue[0]);
                document.getElementById("longitude").append(thisLongitude+" | CH1903: "+getSwissValue[1]);
                document.getElementById("canton").append(thisCanton);
                document.getElementById("commune").append(thisCommune);// plus NPA entre ()
                document.getElementById("commune").append("("+thisNPA+")");
                document.getElementById("service").append(thisService);


                var thisGeoUser = data["results"]["0"]["locations"]["0"]["adminArea5"]+"-"+data["results"]["0"]["locations"]["0"]["adminArea1"];
                localStorage.setItem("geoUserMemo", JSON.stringify(thisGeoUser));
                //localStorage.setItem("generalInformation", JSON.stringify(generalInfos));

            }
        });
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

        var marker = L.mapquest.textMarker([latitude, longitude], {
                type: 'marker',
                icon: {
                    primaryColor: '#333333',
                    secondaryColor: '#333333',
                    size: 'sm'
                },
                draggable: true
            }).addTo(map);

        //position du marker
        marker.addEventListener("dragend", function(e){

            latitude = this.getLatLng()["lat"];
            longitude = this.getLatLng()["lng"];

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

                    getJSON('http://open.mapquestapi.com/geocoding/v1/reverse?key=A5AOlcOT3M0rfeqBbrwMLBfHMZWDF1vZ&location='+latitude+','+longitude+'&includeRoadMetadata=true&includeNearestIntersection=true', function(err, data) {
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

                            function convertLatLng(lat,long){
                                // =>deg = 3600 * seconde
                                lat = lat * 3600;
                                long = long * 3600;

                                // latitude:  φ =>lat  ( φ' =>lat2)
                                lat2 = (lat - 169028.66)/10000;

                                // longitude:  λ =>long  ( λ' =>long2)
                                long2 = (long - 26782.5)/10000;

                                var y = 600072.37 + (211455.93 * long2) - (10938.51 * long2 * lat2) - (0.36 * long2 * (lat2*lat2)) - (44.54 * (long2*long2*long2));
                                y = Math.round(y);

                                var x = 200147.07 + (308807.95 * lat2) + (3745.25 * long2*long2) + (76.63 * lat2*lat2) - (194.56 * long2*long2 * lat2) + (119.79 * lat2*lat2*lat2);
                                x = Math.round(x);

                                return [y,x];  // 600000,200000
                            }

                            var getSwissValue = convertLatLng(thisLatitude, thisLongitude);

                            console.log(getSwissValue);

                            /*Mise en forme*/
                            document.getElementById("latitude").innerHTML = "Latitude : "+thisLatitude+" | CH1903: "+getSwissValue[0];
                            document.getElementById("longitude").innerHTML = "Longitude : "+thisLongitude+" | CH1903: "+getSwissValue[1];
                            document.getElementById("canton").innerHTML = "Canton : "+thisCanton;
                            document.getElementById("commune").innerHTML = "Commune(NPA) : "+thisCommune+"("+thisNPA+")";
                            document.getElementById("service").innerHTML = "Service : "+thisService;


                            var thisGeoUser = data["results"]["0"]["locations"]["0"]["adminArea5"]+"-"+data["results"]["0"]["locations"]["0"]["adminArea1"];
                            localStorage.setItem("geoUserMemo", JSON.stringify(thisGeoUser));

                        }
                    });

                    var getJSONMeteo = function(url, callback) {
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


                    getJSONMeteo( 'https://api.openweathermap.org/data/2.5/weather?lat='+latitude+'&lon='+longitude+'&appid=f36c565eefaa1b58b5340f51eb52fbf0', function(err, data) {
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
                            document.getElementById("humidite").innerHTML = "Humidité : "+thisHumidity;
                            document.getElementById("pression").innerHTML = "Pression : "+thisPressure;
                            document.getElementById("temp").innerHTML = "Temp. : "+temp;
                            document.getElementById("temp_max").innerHTML = "Temp. min. : "+tempMax;
                            document.getElementById("temp_min").innerHTML = "Temp. max. : "+tempMin;
                            document.getElementById("wind").innerHTML = "Vents : "+thisWind;

                        }
                    });

            });


      }
