var xml_array;

function loadXML() {
    var ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function () {
        if (ajax.readyState === 4 && ajax.status === 200) {
            xml_array = ajax.responseXML;
            displayXML();
        }
    }
    ajax.open("GET", "assets/data/FinalQuiz.xml");
    ajax.send();
}

function displayXML() {
    var output = "";
    var questions = xml_array.getElementsByTagName('question');
    for (var i = 0; i < questions.length; i++) {
        var current_question = questions[i];
        var q_no = current_question.getElementsByTagName('qnumber')[0].childNodes[0].nodeValue;
        var q_title = current_question.getElementsByTagName('qtitle')[0].childNodes[0].nodeValue;
        var a = current_question.getElementsByTagName('a')[0].childNodes[0].nodeValue;
        var b = current_question.getElementsByTagName('b')[0].childNodes[0].nodeValue;
        var c = current_question.getElementsByTagName('c')[0].childNodes[0].nodeValue;
        var d = current_question.getElementsByTagName('d')[0].childNodes[0].nodeValue;
        output += "<p class='question'>(" + q_no + ")&ensp;" + q_title + "</p>";
        output += "<div class='options'>";
        output += "<input id='"+q_no+"a' type='radio' name='q"+q_no+"[]' value='"+a+"' required>";
        output += "<label for='"+q_no+"a'>&emsp;(A)&ensp;" + a + "</label><br>";
        output += "<input id='"+q_no+"b' type='radio' name='q"+q_no+"[]' value='"+b+"' required>";
        output += "<label for='"+q_no+"b'>&emsp;(B)&ensp;" + b + "</label><br>";
        output += "<input id='"+q_no+"c' type='radio' name='q"+q_no+"[]' value='"+c+"' required>";
        output += "<label for='"+q_no+"c'>&emsp;(C)&ensp;" + c + "</label><br>";
        output += "<input id='"+q_no+"d' type='radio' name='q"+q_no+"[]' value='"+d+"' required>";
        output += "<label for='"+q_no+"d'>&emsp;(D)&ensp;" + d + "</label><br><br>";
    }
    document.getElementById('quiz').innerHTML = output;
}

function displayGrade() {
    var grade = 0;
    var right_answers = xml_array.getElementsByTagName('rightanswers')[0].childNodes[0].nodeValue;
    for (var i = 0; i < 5; i++) {
        var q_no = 1 + i;
        var correct_option = right_answers[i * 2];
        var correct_id = q_no.toString() + correct_option;
        if (document.getElementById(correct_id).checked) grade++;
    }
    var output = "Your grade is: <span>" + grade + "/5</span>";
    document.getElementById('grade').innerHTML = output;
    document.getElementById('grade').classList.remove('hide');
    document.getElementById('grade').scrollIntoView({behavior: 'smooth'});
}

function hideGrade() {
    document.getElementById('grade').innerHTML = "";
    document.getElementById('grade').classList.add('hide');
    window.scrollTo(0, 0);
}

