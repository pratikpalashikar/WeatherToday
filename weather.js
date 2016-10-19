// Put your Last.fm API key here
/*var api_key = "";

function sendRequest () {
    var xhr = new XMLHttpRequest();
    var method = "artist.getinfo";
    var artist = encodeURI(document.getElementById("form-input").value);
    xhr.open("GET", "proxy.php?method="+method+"&artist="+artist+"&api_key="+api_key+"&format=json", true);
    xhr.setRequestHeader("Accept","application/json");
    xhr.onreadystatechange = function () {
        if (this.readyState == 4) {
            var json = JSON.parse(this.responseText);
            var str = JSON.stringify(json,undefined,2);
            document.getElementById("output").innerHTML = "<pre>" + str + "</pre>";
        }
    };
    xhr.send(null);
}*/

//API key from open weather
var api_key = "98f453b22fb8e2d7cc313779de835b38";
var conditions;
var i=0;
function sendRequest() {
    var xhr = new XMLHttpRequest();
   // var method = "artist.getinfo";
    var city = encodeURI(document.getElementById("form-input").value);
    xhr.open("GET", "proxy.php?q="+city+"&appid="+api_key+"&format=json", true);
    xhr.setRequestHeader("Accept","application/json");
    xhr.onreadystatechange = function () {
        if (this.readyState == 4) {
          //Clear the previous content
          document.getElementById("result").innerHTML = "";
          document.getElementById("output").innerHTML = "";
            var json = JSON.parse(this.responseText);
            var str = JSON.stringify(json,undefined,2);
            displayParameter(json);
          //  document.getElementById("output").innerHTML += "<pre>" + str + "</pre>";
        }
    };

    xhr.send(null);
}


function displayParameter(str){
  var name;
  var long,lat;
  var sunrise;
  var sunset;
  var temp;
  var min_temp;
  var max_temp;
  var pressure;
  var humidity;
  var weather;
  var visibility;
  var clouds;

document.getElementById("result").innerHTML += "<tr><th>"+"Weather Parameter"+"</th><th>"+"Values"+"</th></tr>";
for(var key in str){
if(key == "name"){
  name = str[key];
}else if(key == "coord" ){
  long = str[key].lon;
  lat = str[key].lat;
}else if(key == "sys"){
  //Time of Sunrise
  sunrise = convertTime(str[key].sunrise);
  //Time of sunset
  sunset = convertTime(str[key].sunset);
}else if(key == "stations"){
  document.getElementById("result").innerHTML += "<tr><td>" + str[key] + "</td></tr>";
}else if(key == "main"){
  temp = convertTemp(str[key].temp);
  min_temp = convertTemp(str[key].temp_min);
  max_temp = convertTemp(str[key].temp_max);
  pressure = str[key].pressure;
  humidity = str[key].humidity;
}else if(key == "weather"){
  var weather = str[key];
  conditions = weather[0].id;
  visibility = getPrediction(conditions)
}else if(key == "clouds"){
  clouds = str[key].all;

}
}
document.getElementById("result").innerHTML += "<tr><td>" + "City Name" +"</td><td>"+ name + "</td></tr>";
document.getElementById("result").innerHTML += "<tr><td>" + "Longitutde"+"</td>"+"<td>"+ long +"&#176;"+ "</td></tr>";
document.getElementById("result").innerHTML += "<tr><td>" + "Latitude"+"</td>"+"<td>"+ lat +"&#176;"+ "</td></tr>";
document.getElementById("result").innerHTML += "<tr><td>" + "Sunrise"+"</td><td>"+  sunrise + "</td></tr>";
document.getElementById("result").innerHTML += "<tr><td>"+"Sunset"+"</td><td>"+sunset + "</td></tr>";
document.getElementById("result").innerHTML += "<tr><td>" + "Pressure" +"</td>"+"<td>"+ pressure +"</td>"+ "</tr>";
document.getElementById("result").innerHTML += "<tr><td>"+"Humidity" +"</td><td>"+ humidity + "</td></tr>";
document.getElementById("result").innerHTML += "<tr><td>" + "Tempreture"+"</td>"+"<td>" + truncate(temp,2) +"&#8457;"+ "</td></tr>";
document.getElementById("result").innerHTML += "<tr><td>" + "Min Temp"+"</td>"+"<td>"+ truncate(min_temp,2) +"&#8457;"+ "</td></tr>";
document.getElementById("result").innerHTML += "<tr><td>" + "Max Temp "+"</td><td>" + truncate(max_temp,2) +"&#8457;"+ "</td></tr>";
document.getElementById("result").innerHTML += "<tr><td>" + "visibility"+"</td>"+"<td>"+ visibility +"</td>"+"</tr>";
document.getElementById("result").innerHTML += "<tr><td>" + "Clouds" +"</td><td>"+ clouds + "</td></tr>";

}

function getPrediction(conditions){

  var visibility;
    //console.log(conditions);
  //Condition for the Thunderstorm
  if(conditions>199 && conditions<232){
      document.getElementById("output").innerHTML = "<tr><td> Prediction :" + "Thunderstorm ! Please take the shelter" + "</td></tr>";
      visibility = "Bad";
  }else if(conditions>299 && conditions<322){
    //Drizzle
    document.getElementById("output").innerHTML = "<tr><td> Prediction :" + "May Drizzle ! Take an umbrella if possible" + "</td></tr>";
    visibility = "Moderate";
  }else if(conditions>499 && conditions < 532){
    //Rain
    document.getElementById("output").innerHTML = "<tr><td> Prediction :" + "Please carry the umbrella" + "</td></tr>";
    visibility = "Bad";
  }else if(conditions>599 && conditions<623){
    //Snow
    document.getElementById("output").innerHTML = "<tr><td> Prediction :" + "Please take a coat, its snowing" + "</td></tr>";
    visibility = "Not Good";
  }else if(conditions > 700 && conditions < 782){
    //visibility zero
    document.getElementById("output").innerHTML = "<tr><td> Prediction :" + "Zero visibility" + "</td></tr>";
    visibility = "Very Bad";
  }else if(conditions>799 && conditions<805){
    //Clear sky or clouds are there in the sky
    document.getElementById("output").innerHTML = "<tr><td> Prediction :" + "Some Clouds may be there, Enjoy your day." + "</td></tr>";
    visibility = "Good"
  }else if (conditions>899 && conditions <907) {
    //Extreme tempreture
  document.getElementById("output").innerHTML = "<tr><td> Prediction :" + "Extreme conditions, take shelter" + "</td></tr>";
  visibility = "Extremely Bad";
  }else if(conditions > 950 && conditions < 963){
    //May breeze or severe storm conditions
    document.getElementById("output").innerHTML = "<tr><td> Prediction :" + "Signs of Thunderstorm, take shelter" + "</td></tr>";
    visibility = "Good";
  }
return visibility;
}


function truncate (num, places) {
    return Math.trunc(num * Math.pow(10, places)) / Math.pow(10, places);
}

function convertTemp(temp){
  return (temp-273.15);
}

function convertTime(time){
  var date = new Date(time * 1000);
  var timestr = date.toLocaleTimeString();
  return timestr;
}
