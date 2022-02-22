function optionShowCrimeStats() {
    option = document.getElementById('search_by').value;
    document.getElementById('search_results').innerHTML = "";
    var output = "";
    switch (option) {
        case "category":
            output += "<label>Enter Crime Category:</label>";
            output += "<input id="+option+" type='text' value=''>";
            break;
        case "sector":
            output += "<label>Enter Sector:</label>";
            output += "<input id="+option+" type='text' value=''>";
            break;
        case "crime_count":
            output += "<label>Enter Crime Count:</label>";
            output += "<input id="+option+" type='number' min='0' value=''>";
            break;
        case "resident_count":
            output += "<label>Enter Resident Count:</label>";
            output += "<input id="+option+" type='number' min='0' value=''>";
            break;
        default:
            break;
    }
    output += "<br>(Enter first letter Capital if entering alphabet)<br><br>";
    document.getElementById('enter_option').innerHTML = output;
    document.getElementById(option).addEventListener("input", function () { findCrimeStats(this.value) });
}

function loadCrimeStats() {
    var ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function () {
        if (ajax.readyState === 4 && ajax.status === 200) {
            jsonArray = JSON.parse(ajax.responseText);
        }
    };
    ajax.open("GET", "assets/data/Crime_Stats.json");
    ajax.send();
}

function findCrimeStats(value) {
    var output = "<h2>Search Results:</h2><br>";
    output += "<table>";
    output += "<tr id='headings'>";
    output += "<td>Crime Category</td>";
    output += "<td>Sector</td>";
    output += "<td># Crimes</td>";
    output += "<td># Residents</td>";
    output += "<td>Year</td>";
    output += "<td>Google Maps Link (latitude,longitude)</td>";
    output += "</tr>";
    var count = 0;
    for (var i = 0; i < jsonArray.length; i++) {
        var row = jsonArray[i];
        var column;
        switch (option) {
            case "category":
                column = row.category;
                break;
            case "sector":
                column = row.sector;
                break;
            case "crime_count":
                column = row.count;
                break;
            case "resident_count":
                column = row.resident_count;
                break;
            default:
                break;
        }
        if (value !== "" && column.toString().startsWith(value)) {
            count++;
            if (count <= 10) {
                output += "<tr>";
                output += "<td>" + row.category + "</td>";
                output += "<td>" + row.sector + "</td>";
                output += "<td>" + row.count + "</td>";
                output += "<td>" + row.resident_count + "</td>";
                output += "<td>" + row.year + "</td>";
                output += "<td><a href='#' onclick='window.open(\"https://maps.google.com/?q=" + row.geocoded_column.latitude + "," + row.geocoded_column.longitude + "\", \"_blank\")'>" + row.geocoded_column.latitude + "," + row.geocoded_column.longitude + "</a></td>";
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

