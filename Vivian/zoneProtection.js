/*raphael.politi@heig-vd.ch*/

/*Geolocation part*/
var geoUser = "";


if (localStorage.getItem("geoUserMemo") === null) { //if palmares is null we create it
        localStorage.setItem("geoUserMemo", JSON.stringify(geoUser));
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showProtection);
  } else {
   console.log("goeloc not supported");
  }
}


function showProtection(position) {

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

        var getSwissValuePro = convertLatLng(position.coords.latitude, position.coords.longitude);

        var temp1Pro = getSwissValuePro[0];
        var temp2Pro = getSwissValuePro[1];
        var temp3Pro = getSwissValuePro[0]+300;
        var temp4Pro = getSwissValuePro[1]+200;

        document.getElementById("imgPente").setAttribute("src",'http://wms.geo.admin.ch/?SERVICE=WMS&REQUEST=GetMap&VERSION=1.1.0&LAYERS=ch.bafu.grundwasserschutzzonen&STYLES=default&SRS=EPSG:21781&BBOX='+temp1Pro+','+temp2Pro+','+temp3Pro+','+temp4Pro+'&WIDTH=600&HEIGHT=4000&FORMAT=image/png');

}

getLocation();



/*End geolocations part*/
