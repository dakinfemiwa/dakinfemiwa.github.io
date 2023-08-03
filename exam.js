NAME ='';
questionMetaData = "";
questions = ["1", "2a", "2b", "3a", "3b", "3c", "4a", "4b", "5",
"6", "7", "8a", "8b", "8c"];
qI = 0;
qI2 = 0;
userAnswer = "";
workings = "";
uAA = [];
uAA2 = [];
newInput = "";
htmlinput = "";
TIarr = [0, 1];
Ti = 0;
s=1;

function eID(id) {
    return document.getElementById(id);
}

subbtn1 = eID("subbtn1");
nameInput = eID("name");
img = eID("img");
workingsInput = eID("workingsInput");
answerInput = eID("answerInput");
subandcontbtn = eID("subandcontbtn");
questionnumberSpan = eID("questionnumber");
prevbtn = eID("prevbtn");
submitanswerinfo = eID("submitanswerinfo");
ti = eID("ti");
ti1 = eID("ti-1");
ti2 = eID("ti-2");
questionHeader2 = eID("questionHeader2");


function addQuestionData() {
    if (qI2 > uAA.length - 1) {
        let newInputArr = [questions[qI2], userAnswer, workings];
        newInput  = newInput + "{'name':'" + questions[qI2].toString() + "',\n'answer':'" + userAnswer + "',\n'workings':'"
        + workings + "'},\n";
        uAA.push(newInput);
        uAA2.push(newInputArr);
        htmlinput = htmlinput + "<div id='" + questions[qI2].toString() + "'>\n" +
        "<br>Workings: <span id='"+ questions[qI2].toString() + "workings>'"+ workings + "</span>" + 
        "<br>Answer: <span id='"+ questions[qI2].toString() + "answer>'"+ userAnswer + "</span>";
    } else {
        uAA2[qI2][1] = userAnswer;
        uAA2[qI2][2] = workings;
        newInput = "";
        htmlinput = "";
        for (i=0; i<uAA2.length; i++) {
            newInput = newInput + "{'name':'" + questions[qI2].toString() + "',\n'answer':'" + userAnswer + "',\n'workings':'"
             + workings + "'}\n,";
             htmlinput = htmlinput + "<div id='" + uAA2[i][0].toString() + "'>\n" +
             "<br>Workings: <span id='"+ uAA2[i][0]+ "workings>'"+ uAA2[i][1] + "</span>" + 
             "<br>Answer: <span id='"+ uAA2[i][0] + "answer>'"+ uAA2[i][2] + "</span>";             
        }
        //console.log(uAA2);
        

        }
    }


function download(filename, data) {
    let newElement = document.createElement("a");
    newElement.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(data));

    newElement.setAttribute('download', filename);

    newElement.style.display = 'none';
    document.body.appendChild(newElement);

    newElement.click();
    try 
    {document.removeChild(newElement);}
    catch {
        return;
    }
}

function nextQuestion() {
    if (questions[qI2] == "8c") {
        return;
    }
    //console.log(qI, qI2);
    if (qI == qI2) {
        qI += 1;
        qI2 += 1;
        workingsInput.value = "";
        answerInput.value = "";
    
    } else {
        qI2 += 1;
        console.log(uAA2);
        wA = uAA2[qI2];
        console.log(wA);
        workingsInput.value = wA[2].toString();
        answerInput.value = wA[1].toString();

    }
    //End of quiz
    if (questions[qI2] == "8c") {
        newInput = "";
        htmlinput = "";
        console.log(uAA2);
        for (i=0; i<uAA2.length; i++) {
            newInput = newInput + "{'name':'" + uAA2[i][0].toString() + "',\n'answer':'" + uAA2[i][1].toString() + "',\n'workings':'"
             + uAA2[i][2].toString() + "'}\n,";

            /*htmlinput = htmlinput + "<div id='" + uAA2[i][0].toString() + "'>\n" +
             "<br>Workings: <span id='"+ uAA2[i][0].toString()+ "workings>'"+ uAA2[i][1].toString() + "</span>" + 
             "<br>Answer: <span id='"+ uAA2[i][0].toString() + "answer>'"+ uAA2[i][2] + "</span>"; */            
        }
        download('baseline_exam.json', newInput);
        //download('baseline.html', htmlinput);
        return;
    }
    
    viewQuestion();
    
}
function previousQuestion() {
    //console.log(uAA2);
    addQuestionData();
    console.log(uAA2);  
    console.log(qI, qI2);
    if (qI2 - 1 >= 0) {
        qI2 -= 1;
    }
    
    //console.log(uAA2);
    wA = uAA2[qI2];
    //console.log(wA)
    workingsInput.value = wA[2];
    answerInput.value = wA[1];
    viewQuestion();
}

function viewQuestion() {
    questionnumberSpan.innerHTML = questions[qI2];
    img.src = "diagrams/q" + questions[qI2] + ".jpg";
}

subandcontbtn.onclick = function() {
    //console.log("next question");
    userAnswer = answerInput.value;
    workings = workingsInput.value;
    addQuestionData();
    nextQuestion();

}
prevbtn.onclick = function() {
    userAnswer = answerInput.value;
    workings = workingsInput.value;
    previousQuestion();
}

function updateTI() {
    if (Ti == 0) {
        ti2.style.display = 'none';
        ti1.style.display = 'block';

    } else {
        ti1.style.display = 'none';
        ti2.style.display = 'block';

    }
}

function updateShow() {
    if (s == 0) {
        ti.style.display = 'none';
    } else {
        ti.style.display = 'block';
    }
}

function changeTI(newTI) {
    if (newTI == 0) {
        Ti = (Ti -1 ) % 2;
    } else {
        Ti = (Ti +1 ) % 2;
    }
    updateTI();
}

questionHeader2.onclick = function() {
    s = (s+1)%2;
    updateShow();
}



updateTI();
