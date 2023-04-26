import myJson1 from "../example-violations copy.json" assert { type: "json" };

let violationData = document.getElementById("violations-data");
let reportInfo = document.getElementById("report-info");

function transformDate(date) {
  let dateV = new Date(date);
  let year = dateV.getFullYear();
  let month = dateV.getMonth() + 1;
  let day = dateV.getDate();
  let formattedDate = day + "/" + month + "/" + year;

  return `Creation date: ${formattedDate}`;
}

function escapeHTML(html) {
  return html
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function createTaskDOMOld(task, i) {
  //let taskViolations = task.violations[i];
  let violationsList = document.createElement("li");
  violationsList.setAttribute("class", "violations");
  violationsList.setAttribute("id", task.description);

  let violationsDiv = document.createElement("div");
  violationsDiv.setAttribute("class", "violations-div");

  let descriptionDiv = document.createElement("div");
  descriptionDiv.setAttribute("class", "description-div");

  let descriptionP = document.createElement("p");
  descriptionP.setAttribute("class", "description-p");
  descriptionP.innerHTML = `<strong>Description: </strong>` + task.description;

  let nodesDiv = document.createElement("div");
  nodesDiv.setAttribute("class", "nodes-div");

  let helpUrlA = document.createElement("a");
  helpUrlA.setAttribute("class", "help-url-a");
  helpUrlA.setAttribute("id", "help-url-a");
  helpUrlA.innerHTML =
    `<strong>Help: </strong>` +
    `<a href="${task.nodes[i].helpUrl}"> ${task.nodes[i].help}`;

  let htmlP = document.createElement("p");
  htmlP.setAttribute("class", "html-p");
  let htmlValue = task.nodes[i].html;
  htmlP.innerHTML = `<strong>HTML: </strong>  ${escapeHTML(htmlValue)}`;

  let impactP = document.createElement("p");
  impactP.setAttribute("class", "impact-p");
  impactP.innerHTML = `<strong>Impact: </strong>` + task.nodes[i].impact;

  // let currentT = document.createElement("p");
  // currentT.setAttribute("class", "current-t-p");

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

function createTaskDOM(task, violationsIndex, nodesIndex) {
  let reportDiv = document.createElement("div");
  reportDiv.setAttribute("id", "report-div");
  let reportInfoDiv = document.createElement("div");
  reportInfoDiv.setAttribute("class", "report-info-div");

  let currentTimeP = document.createElement("p");
  currentTimeP.setAttribute("class", "current-time-p");
  currentTimeP.innerHTML = `<strong>Current Time: </strong>` + task.currentTime;

  let numViolationsP = document.createElement("p");
  numViolationsP.setAttribute("class", "num-violations-p");
  numViolationsP.innerHTML =
    `<strong>Violations number: </strong>` + task.numViolations;

  let violationsList = document.createElement("li");
  violationsList.setAttribute("class", "violations");
  violationsList.setAttribute("id", "violations-list");

  let violationsDiv = document.createElement("div");
  violationsDiv.setAttribute("class", "violations-div");

  let descriptionDiv = document.createElement("div");
  descriptionDiv.setAttribute("class", "description-div");

  let descriptionP = document.createElement("p");
  descriptionP.setAttribute("class", "description-p");
  descriptionP.innerHTML =
    `<strong>Description: </strong>` +
    task.violations[violationsIndex].description;

  let nodesList = document.createElement("li");
  nodesList.setAttribute("class", "nodes-list");
  nodesList.setAttribute("id", "nodes-list");

  let nodesDiv = document.createElement("div");
  nodesDiv.setAttribute("class", "nodes-div");

  let helpUrlA = document.createElement("a");
  helpUrlA.setAttribute("class", "help-url-a");
  helpUrlA.setAttribute("id", "help-url-a");
  helpUrlA.innerHTML =
    `<strong>Help: </strong>` +
    `<a href="${task.violations[violationsIndex].nodes[nodesIndex].helpUrl}"> ${task.violations[violationsIndex].nodes[nodesIndex].help}`;

  let htmlP = document.createElement("p");
  htmlP.setAttribute("class", "html-p");
  let htmlValue = task.violations[violationsIndex].nodes[nodesIndex].html;
  htmlP.innerHTML = `<strong>HTML: </strong>  ${escapeHTML(htmlValue)}`;

  let impactP = document.createElement("p");
  impactP.setAttribute("class", "impact-p");
  impactP.innerHTML =
    `<strong>Impact: </strong>` +
    task.violations[violationsIndex].nodes[nodesIndex].impact;

  descriptionDiv.appendChild(descriptionP);
  nodesDiv.appendChild(helpUrlA);
  nodesDiv.appendChild(htmlP);
  nodesDiv.appendChild(impactP);
  nodesList.appendChild(nodesDiv);

  violationsDiv.appendChild(descriptionDiv);
  violationsDiv.appendChild(nodesList);

  reportInfoDiv.appendChild(currentTimeP);
  reportInfoDiv.appendChild(numViolationsP);

  reportDiv.appendChild(reportInfoDiv);
  reportInfo.appendChild(reportDiv);


  violationsList.appendChild(violationsDiv);
  violationData.appendChild(violationsList);
}

function implDom() {
  let i;
  let iV = myJson1.violations.length;
  let y;
  
  myJson1.violations.forEach(async (task)  => {
    for (i = 0; i < iV; i++) {
        
        let iN = myJson1.violations[i].nodes.length;

        task.nodes.forEach(async (task)  => {
            for (y = 0; y < iN; y++) {
                createTaskDOM(myJson1, i, y);
            }
        });
      }
  });

  // tasks.forEach(async (task) => {
  //   for (i = 0; i < myJson1.violations[i].nodes; i++) {
  //     createTaskDOM(task, i);
  //   }
  // });

  // currentTime.innerHTML =
  //   `<strong>Current Time: </strong>` + myJson1.currentTime;
}

window.addEventListener("load", async function (event) {
  implDom();
  //implDom(myJson2);
});
