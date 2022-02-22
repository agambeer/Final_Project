function optionShowTrafficCameras() {
    option = document.getElementById('search_by').value;
    document.getElementById('search_results').innerHTML = "";
    var output = "";
    switch (option) {
        case "camera_description":
            output += "<label>Enter Camera Description:</label>";
            output += "<input id="+option+" type='text' value=''>";
            break;
        case "quadrant":
            output += "<label>Enter Quadrant:</label>";
            output += "<input id="+option+" type='text' value=''>";
            break;
        case "camera_location":
            output += "<label>Enter Camera Location:</label>";
            output += "<input id="+option+" type='text' value=''>";
            break;
        default:
            break;
    }
    output += "<br>(Enter first letter Capital if entering alphabet)<br><br>";
    document.getElementById('enter_option').innerHTML = output;
    document.getElementById(option).addEventListener("input", function () { findTrafficCameras(this.value) });
}

function loadTrafficCameras() {
    var ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function () {
        if (ajax.readyState === 4 && ajax.status === 200) {
            jsonArray = JSON.parse(ajax.responseText);
        }
    };
    ajax.open("GET", "assets/data/Traffic_Cameras.json");
    ajax.send();
}

function findTrafficCameras(value) {
    var output = "<h2>Search Results:</h2><br>";
    output += "<table>";
    output += "<tr id='headings'>";
    output += "<td>Camera Description</td>";
    output += "<td>Quadrant</td>";
    output += "<td>Camera Location</td>";
    output += "<td>Google Maps Link (latitude,longitude)</td>";
    output += "</tr>";
    var count = 0;
    for (var i = 0; i < jsonArray.length; i++) {
        var row = jsonArray[i];
        var column;
        switch (option) {
            case "camera_description":
                column = row.camera_url.description;
                break;
            case "quadrant":
                column = row.quadrant;
                break;
            case "camera_location":
                column = row.camera_location;
                break;
            default:
                break;
        }
        if (value.toString() !== "" && column.toString().startsWith(value)) {
            count++;
            if (count <= 10) {
                output += "<tr>";
                output += "<td>" + row.camera_url.description + "</td>";
                output += "<td>" + row.quadrant + "</td>";
                output += "<td>" + row.camera_location + "</td>";
                output += "<td><a href='#' onclick='window.open(\"https://maps.google.com/?q=" + row.point.coordinates[1] + "," + row.point.coordinates[0] + "\", \"_blank\")'>" + row.point.coordinates[1] + "," + row.point.coordinates[0] + "</a></td>";
                output += "</tr>";
            }
        }
        if (count === 11) break;
    }
    output += "</table>";
    if (value.toString() === "") document.getElementById('search_results').innerHTML = "";
    else if (count === 0) document.getElementById('search_results').innerHTML = "<h2>Search Results:</h2>" + "No matches found!";
    else if (count > 0 && count <= 10) document.getElementById('search_results').innerHTML = output;
    else if (count === 11) {
        output += "<br>(Only top 10 results shown)";
        document.getElementById('search_results').innerHTML = output;
    }
}

