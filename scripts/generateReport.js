

import myJson from '../example-violations.json' assert {type: 'json'};

let violationData = document.getElementById("violations-data");


function transformDate(date) {
    let dateV = new Date(date);
    let year = dateV.getFullYear();
    let month = dateV.getMonth() + 1;
    let day = dateV.getDate();
    let formattedDate = day + "/" + month + "/" + year;
  
    return `Creation date: ${formattedDate}`;
}

function escapeHTML(html) {
    return html.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

function createTaskDOM(task, i) {
    let violationsList = document.createElement("li");
    violationsList.setAttribute("class", "violations");
    violationsList.setAttribute("id", task.description)
  
    let violationsDiv = document.createElement("div");
    violationsDiv.setAttribute("class", "violations-div");
  
    let descriptionDiv = document.createElement("div");
    descriptionDiv.setAttribute("class", "description-div");
  
    let descriptionP = document.createElement("p");
    descriptionP.setAttribute("class", "description-p");
    descriptionP.innerHTML = `<strong>Description: </strong>`  + task.description;

    let nodesDiv = document.createElement("div");
    nodesDiv.setAttribute("class", "nodes-div");
  
    let helpUrlA = document.createElement("a");
    helpUrlA.setAttribute("class", "help-url-a");
    helpUrlA.setAttribute("id", "help-url-a");
    helpUrlA.innerHTML = `<strong>Help: </strong>` + `<a href="${task.nodes[i].helpUrl}"> ${task.nodes[i].help}`;

    let htmlP = document.createElement("p");
    htmlP.setAttribute("class", "html-p");
    let htmlValue = task.nodes[i].html;
    htmlP.innerHTML = `<strong>HTML: </strong>  ${escapeHTML(htmlValue)}`;

    let impactP = document.createElement("p");
    impactP.setAttribute("class", "impact-p");
    impactP.innerHTML = `<strong>Impact: </strong>`  + task.nodes[i].impact;
  
    // let timeStamp = document.createElement("p");
    // timeStamp.setAttribute("class", "timeStamp");
    // timeStamp.innerHTML = transformDate(task.createdAt);
  
  
    descriptionDiv.appendChild(descriptionP);
    nodesDiv.appendChild(helpUrlA);
    nodesDiv.appendChild(htmlP);
    nodesDiv.appendChild(impactP);

    violationsDiv.appendChild(descriptionDiv);
    violationsDiv.appendChild(nodesDiv);
  
    violationsList.appendChild(violationsDiv);

    violationData.appendChild(violationsList);
    
}

function implDom(){
    const tasks = myJson;
    let i;
    tasks.forEach(async (task) => {
        for (i = 0; i < myJson.length; i++) {
            createTaskDOM(task,i);
          }
        
      });
}


window.addEventListener("load", async function (event) {
    
  implDom();
  
});