var client_array;

hide();

function showDateTime() {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hour = date.getHours();
    var minute = date.getMinutes();
    month = month < 10 ? '0' + month : month;
    day = day < 10 ? '0' + day : day;
    hour = hour < 10 ? '0' + hour : hour;
    minute = minute < 10 ? '0' + minute : minute;
    var displayDate = "Date: <span>" + year + "-" + month + "-" + day + "</span>";
    var displayTime = "Time: <span>" + hour + ":" + minute + "</span>";
    var displayDateTime = displayDate + "&emsp;" + displayTime;
    document.getElementById('date').innerHTML = displayDateTime;
    setTimeout(showDateTime, 1000);
}

function hide() {
    document.getElementById('search_results').classList.add('hide');
    document.getElementById('rental_form').classList.add('hide');
    document.getElementById('invoice').classList.add('hide');

    document.getElementById('footer').classList.remove('footer_relative');
    document.getElementById('footer').classList.add('footer_absolute');
}

function loadClients() {
    var ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function () {
        if (ajax.readyState === 4 && ajax.status === 200) {
            client_array = JSON.parse(ajax.responseText);
        }
    };
    ajax.open("GET", "../data/rentalclients.json");
    ajax.send();
}

function findClients(value) {
    hide();
    document.getElementById('footer').classList.add('hide');
    var output = "<h2>Clients Found:</h2>";
    var count = 0;
    for (var i = 0; i < client_array.length; i++) {
        var client = client_array[i];
        var lastname = client.last_name;
        if (value !== "" && lastname.startsWith(value)) {
            count++;
            output += "<p onclick='showForm("+i+");'>" + client.last_name + ", " + client.first_name + "</p>";
        }
    }
    if (value.toString() === "") document.getElementById('search_results').innerHTML = "";
    else if (count === 0) {
        document.getElementById('search_results').classList.remove('hide');
        document.getElementById('search_results').innerHTML = "<h2>Clients Found:</h2>" + "<div id='none'>None!</div>";
    }
    else {
        document.getElementById('search_results').classList.remove('hide');
        document.getElementById('search_results').innerHTML = output;
    }
}

function showForm(i) {
    document.getElementById('rental_form').classList.remove('hide');
    var client = client_array[i];
    document.getElementById('lastname').value = client.last_name;
    document.getElementById('firstname').value = client.first_name;
    document.getElementById('address').value = client.address;
    document.getElementById('state').value = client.state_prov;
    document.getElementById('email').value = client.email;
    document.getElementById('phone').value = client.phone;

    document.getElementById('footer').classList.remove('hide');
    document.getElementById('footer').classList.remove('footer_absolute');
    document.getElementById('footer').classList.add('footer_relative');
}

function rangeCheck() {
    if (document.getElementById('days').value <= 1) document.getElementById('days').value = 1;
    if (document.getElementById('days').value >= 30) document.getElementById('days').value = 30;
}

function displayInvoice() {
    var days = document.getElementById('days').value;
    var day_s = " days";
    if (days == 1) day_s = " day";
    var total = 0;

    var output = "<h1>Invoice</h1>";

    output += "<h2>Client Details</h2>";
    output += "<div id='about'>";
    output += document.getElementById('firstname').value + " " + document.getElementById('lastname').value + "<br>";
    output += document.getElementById('address').value  + ", " + document.getElementById('state').value + "<br>";
    output += document.getElementById('email').value + "<br>";
    output += document.getElementById('phone').value + "<br>";
    output += "</div>";

    output += "<h2>Rental Details</h2>";

    output += "<div id='order'>";
    output += "<div id='order_items'>";
    if (document.getElementById('compact').checked) output += "<b>Compact Vehicle</b><br>";
    if (document.getElementById('midsize').checked) output += "<b>Mid-size Vehicle</b><br>";
    if (document.getElementById('luxury').checked) output += "<b>Luxury Vehicle</b><br>";
    if (document.getElementById('van_truck').checked) output += "<b>Van/Truck</b><br>";
    if (document.getElementById('rack').checked) output += "Roof Rack or Bicycle Rack<br>";
    if (document.getElementById('gps').checked) output += "GPS<br>";
    if (document.getElementById('seat').checked) output += "Child Seat<br>";
    output += "<br><span class='order_total'>Total:</span>";
    output += "</div>";

    output += "<div id='order_prices'>";
    if (document.getElementById('compact').checked) {
        output += "$15 X " + days + day_s + "<br>";
        total = 15 * days;
    }
    if (document.getElementById('midsize').checked) {
        output += "$20 X " + days + day_s + "<br>";
        total = 20 * days;
    }
    if (document.getElementById('luxury').checked) {
        output += "$35 X " + days + day_s + "<br>";
        total = 35 * days;
    }
    if (document.getElementById('van_truck').checked) {
        output += "$40 X " + days + day_s + "<br>";
        total = 40 * days;
    }
    if (document.getElementById('rack').checked) {
        output += "$5 X " + days + day_s + "<br>";
        total += 5 * days;
    }
    if (document.getElementById('gps').checked) {
        output += "$10" + "<br>";
        total += 10;
    }
    if (document.getElementById('seat').checked) output += "$0" + "<br>";

    output += "<br><span class='order_total'>$" + total + "</span>";
    output += "</div></div><br>";

    document.getElementById('invoice').classList.remove('hide');
    document.getElementById('invoice').innerHTML = output;
    document.getElementById('invoice').scrollIntoView({behavior: 'smooth'});
}