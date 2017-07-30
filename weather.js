function getLocation() {
  var lat, long;
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error, geoOptions);
  } else {
    alert("Geolocation is not supported by this browser");
  }

  function success(position) {
    lat = position.coords.latitude.toFixed(5);
    long = position.coords.longitude.toFixed(5);
    getWeather(lat, long);
   
  }

  function error(error) {
    alert("This app only works over a secure connection. Please add 'https://' to the beginning of the URL (i.e. 'https://codepen.io/gegenisang/pen/NdVEaY'). Error code and message: " + error.code + ": " + error.message);
  }

  var geoOptions = {
    enableHighAccuracy: true,
    maximumAge: 30000,
    timeout: 27000
  };
}

function getWeather(latitude, longitude) {
  $.ajax({
     type: "GET",
     url: "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + latitude +"," + longitude,
     success: function(data)
     {
       //console.log(data);
       loc = data.results[0].formatted_address;
       $("#latLong").text(loc);

     }
   });

  $.getJSON("https://api.forecast.io/forecast/260e634d1e9e291f8dab4d11ab2cfd97/" + latitude + "," + longitude + "?callback=?", function(data) {
    var conditions = data.currently.summary;
    var tempF = data.currently.temperature;
    var tempC = (tempF - 32) *5/9;
    var icon = data.currently.icon;
    console.log("icon",icon);
    var windSpeed = data.currently.windSpeed;
    var FC = true;
    $("#icon-box").html("<i class='wi wi-forecast-io-"+icon+"'></i>")
    $("#speed").html("windSpeed: "+windSpeed);
    $("#description").html("Conditions: "+conditions);
    $("#tempF").html("TEMP: " + Math.round(tempF)+"&#8457;");
    $("#tempF").click(function(){
      if(FC=== false){
        $("#tempF").html("TEMP: " + Math.round(tempF)+"&#8457;");
        FC =  true;
      }else{
        $("#tempF").html("TEMP: " + Math.round(tempC)+"&#8451;"); 
        FC = false;
      }


    });

  });
}

$(document).ready(getLocation());