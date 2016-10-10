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
            var json = JSON.parse(this.responseText);
            var str = JSON.stringify(json,undefined,2);
            displayParameter(json);
            getPrediction(i);

          //  document.getElementById("output").innerHTML += "<pre>" + str + "</pre>";
        }
    };
    //Clear the previous content
    document.getElementById("result").innerHTML = "";
    xhr.send(null);
}


function displayParameter(str){




for(var key in str){

if(key == "coord" ){
document.getElementById("result").innerHTML += "<tr><td>" + "Longitutde"+"</td>"+"<td>"+str[key].lon +"&#176;"+ "</td></tr>";
document.getElementById("result").innerHTML += "<tr><td>" + "Latitude"+"</td>"+"<td>"+str[key].lat +"&#176;"+ "</td></tr>";
}else if(key == "weather"){
var weather = str[key];
document.getElementById("result").innerHTML += "<tr><td>" + "visibility"+"</td>"+"<td>"+ weather[0].main +"</td>"+"</tr>";
conditions = weather[0].main;
}else if(key == "stations"){
document.getElementById("result").innerHTML += "<tr><td>" + str[key] + "</td></tr>";
}
else if(key == "main"){
var temp = convertTemp(str[key].temp);
var min_temp = convertTemp(str[key].temp_min);
var max_temp = convertTemp(str[key].temp_max);
document.getElementById("result").innerHTML += "<tr><td>" + "Pressure" +"</td>"+"<td>"+ str[key].pressure +"</td>"+ "</tr>";
document.getElementById("result").innerHTML += "<tr><td>"+"Humidity" +"</td><td>"+ str[key].humidity + "</td></tr>";
document.getElementById("result").innerHTML += "<tr><td>" + "Tempreture"+"</td>"+"<td>" + temp +"&#8457;"+ "</td></tr>";
document.getElementById("result").innerHTML += "<tr><td>" + "Min Temp"+"</td>"+"<td>"+ min_temp +"&#8457;"+ "</td></tr>";
document.getElementById("result").innerHTML += "<tr><td>" + "Max Temp "+"</td><td>" + max_temp +"&#8457;"+ "</td></tr>";
}else if(key == "clouds"){
document.getElementById("result").innerHTML += "<tr><td>" + "Clouds :" +"</td><td>"+ str[key].all + "</td></tr>";
}else if(key == "sys"){
//Time of Sunrise
var sunrise = convertTime(str[key].sunrise);
document.getElementById("result").innerHTML += "<tr><td>" + "Sunrise"+"</td><td>"+  sunrise + "</td></tr>";
//Time of sunset
var sunset = convertTime(str[key].sunset);
document.getElementById("result").innerHTML += "<tr><td>"+"Sunset"+"</td><td>"+sunset + "<td></tr>";

}else if(key == "name"){
document.getElementById("result").innerHTML += "<tr><td>" + "City Name" +"</td><td>"+ str[key] + "</td></tr>";
}

}

document.getElementById("result").innerHTML += "</table>";

}

function getPrediction(i){

  if(conditions == "Rain"){
    document.getElementById("output").innerHTML += "<div id='out'+"+(i++)+">" + "Please bring the umbrella" + "</div>";
  }else if(conditions == "Snow" ){
    document.getElementById("output").innerHTML += "<div id='out'+"+(i++)+">" + "Please wear a coat" + "</div>";
  }else{
    document.getElementById("output").innerHTML += "<div id='out'+"+(i++)+">" + "Its a pleasent day !" + "</div>";
  }

}



function convertTemp(temp){

  return (temp-273.15);

}

function convertTime(time){

  var date = new Date(time * 1000);
  var timestr = date.toLocaleTimeString();
  return timestr;

}
