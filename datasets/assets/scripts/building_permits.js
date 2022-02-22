function optionShowBuildingPermits() {
    option = document.getElementById('search_by').value;
    document.getElementById('search_results').innerHTML = "";
    var output = "";
    switch (option) {
        case "permit_type":
            output += "<label>Enter Permit Type:</label>";
            output += "<input id="+option+" type='text' value=''>";
            break;
        case "permit_class_group":
            output += "<label>Enter Permit Class Group:</label>";
            output += "<input id="+option+" type='text' value=''>";
            break;
        case "current_status":
            output += "<label>Enter Project Current Status:</label>";
            output += "<input id="+option+" type='text' value=''>";
            break;
        case "housing_units":
            output += "<label>Enter No. of Housing Units:</label>";
            output += "<input id="+option+" type='number' min='0' value=''>";
            break;
        default:
            break;
    }
    output += "<br>(Enter first letter Capital if entering alphabet)<br><br>";
    document.getElementById('enter_option').innerHTML = output;
    document.getElementById(option).addEventListener("input", function () { findBuildingPermits(this.value) });
}

function loadBuildingPermits() {
    var ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function () {
        if (ajax.readyState === 4 && ajax.status === 200) {
            jsonArray = JSON.parse(ajax.responseText);
        }
    };
    ajax.open("GET", "assets/data/Building_Permits.json");
    ajax.send();
}

function findBuildingPermits(value) {
    var output = "<h2>Search Results:</h2><br>";
    output += "<table>";
    output += "<tr id='headings'>";
    output += "<td>Permit #</td>";
    output += "<td>Permit Type</td>";
    output += "<td>Permit Class Group</td>";
    output += "<td>Current Status</td>";
    output += "<td># Housing Units</td>";
    output += "<td>Google Maps Link (latitude,longitude)</td>";
    output += "</tr>";
    var count = 0;
    for (var i = 0; i < jsonArray.length; i++) {
        var row = jsonArray[i];
        var column;
        switch (option) {
            case "permit_type":
                column = row.permittype;
                break;
            case "permit_class_group":
                column = row.permitclassgroup;
                break;
            case "current_status":
                column = row.statuscurrent;
                break;
            case "housing_units":
                column = row.housingunits;
                break;
            default:
                break;
        }
        if (value.toString() !== "" && column.toString().startsWith(value)) {
            count++;
            if (count <= 10) {
                output += "<tr>";
                output += "<td>" + row.permitnum + "</td>";
                output += "<td>" + row.permittype + "</td>";
                output += "<td>" + row.permitclassgroup + "</td>";
                output += "<td>" + row.statuscurrent + "</td>";
                output += "<td>" + row.housingunits + "</td>";
                output += "<td><a href='#' onclick='window.open(\"https://maps.google.com/?q="+ row.latitude + "," + row.longitude + "\", \"_blank\")'>" + row.latitude + "," + row.longitude + "</a></td>";
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

