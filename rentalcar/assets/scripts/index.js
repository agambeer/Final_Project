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