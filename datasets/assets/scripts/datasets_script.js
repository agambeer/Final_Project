var option;
var jsonArray = "";

function ajaxFunction(id) {
    var ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function () {
        if (ajax.readyState === 4 && ajax.status === 200)
            document.getElementById('html_forms').innerHTML = ajax.responseText;
    };
    document.getElementById('building_permits_button').classList.remove('selected');
    document.getElementById('crime_stats_button').classList.remove('selected');
    document.getElementById('traffic_cameras_button').classList.remove('selected');
    document.getElementById('traffic_incidents_button').classList.remove('selected');
    document.getElementById(id).classList.add('selected');
    switch (id) {
        case "building_permits_button":
            ajax.open("GET", "assets/htmls/building_permits.html");
            loadBuildingPermits();
            break;
        case "crime_stats_button":
            ajax.open("GET", "assets/htmls/crime_stats.html");
            loadCrimeStats();
            break;
        case "traffic_cameras_button":
            ajax.open("GET", "assets/htmls/traffic_cameras.html");
            loadTrafficCameras();
            break;
        case "traffic_incidents_button":
            ajax.open("GET", "assets/htmls/traffic_incidents.html");
            loadTrafficIncidents();
            break;
        default:
            break;
    }
    ajax.send();
}