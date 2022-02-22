function optionShowTrafficIncidents() {
    option = document.getElementById('search_by').value;
    document.getElementById('search_results').innerHTML = "";
    var output = "";
    switch (option) {
        case "incident_info":
            output += "<label>Enter Incident Location:</label>";
            output += "<input id="+option+" type='text' value=''>";
            break;
        case "description":
            output += "<label>Enter Incident Description:</label>";
            output += "<input id="+option+" type='text' value=''>";
            break;
        case "year":
            output += "<label>Enter Incident Year:</label>";
            output += "<input id="+option+" type='number' value=''>";
            break;
        default:
            break;
    }
    output += "<br>(Enter first letter Capital if entering alphabet)<br><br>";
    document.getElementById('enter_option').innerHTML = output;
    document.getElementById(option).addEventListener("input", function () { findTrafficIncidents(this.value) });
}

function loadTrafficIncidents() {
    var ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function () {
        if (ajax.readyState === 4 && ajax.status === 200) {
            jsonArray = JSON.parse(ajax.responseText);
        }
    };
    ajax.open("GET", "assets/data/Traffic_Incidents.json");
    ajax.send();
}

function findTrafficIncidents(value) {
    var output = "<h2>Search Results:</h2><br>";
    output += "<table>";
    output += "<tr id='headings'>";
    output += "<td>Incident Location</td>";
    output += "<td>Incident Description</td>";
    output += "<td>Incident Year</td>";
    output += "<td>Google Maps Link (latitude,longitude)</td>";
    output += "</tr>";
    var count = 0;
    for (var i = 0; i < jsonArray.length; i++) {
        var row = jsonArray[i];
        var column;
        switch (option) {
            case "incident_info":
                column = row.incident_info;
                break;
            case "description":
                column = row.description;
                break;
            case "year":
                column = row.start_dt.substr(0, 4);
                break;
            default:
                break;
        }
        if (value.toString() !== "" && (column.toString().startsWith(value) || column.toString().substr(1).startsWith(value))) {
            count++;
            if (count <= 10) {
                output += "<tr>";
                output += "<td>" + row.incident_info + "</td>";
                output += "<td>" + row.description + "</td>";
                output += "<td>" + row.start_dt.substr(0, 4) + "</td>";
                output += "<td><a href='#' onclick='window.open(\"https://maps.google.com/?q=" + row.latitude + "," + row.longitude + "\", \"_blank\")'>" + row.latitude + "," + row.longitude + "</a></td>";
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

