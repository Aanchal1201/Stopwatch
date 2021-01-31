const lapTable = document.getElementById("lapTable");

const milisec = document.getElementById("milisec");
const sec = document.getElementById("sec");
const min = document.getElementById("min");

const start = document.getElementById("start");
const stopCl = document.getElementById("stopCl");
const reset = document.getElementById("reset");
const lap = document.getElementById("lap");

const stopwatch = document.querySelector(".stopwatch");

let initialTime = 0;
let secTime = 0;
let minTime = 0;
let lapCounter = 1;
let prevValue = "00:00.00";

stopCl.style.display = "none";
reset.style.display = "none";

start.addEventListener("click", () => {
  startFunc();
  let time = setInterval(() => {
    startInterval();
  }, 10);

  stopCl.addEventListener("click", function () {
    End(time);
    reset.style.display = "";
    lap.style.display = "none";
  });

  reset.addEventListener("click", () => {
    End(time);
    ResetAll();
  });
});

function startFunc() {
  start.style.display = "none";
  reset.style.display = "none";

  stopCl.style.display = "";
  lap.style.display = "";
  lap.removeAttribute("disabled");
}

function startInterval() {
  milisec.innerHTML = addZeros(initialTime);
  initialTime++;

  if (initialTime > 99) {
    secTime++;
    initialTime = 0;
    sec.innerHTML = addZeros(secTime);
  }
  if (secTime > 59) {
    minTime++;
    secTime = 0;
    min.innerHTML = addZeros(minTime);
  }
}

function End(time) {
  clearInterval(time);
  start.style.display = "";
  stopCl.style.display = "none";
}

function addZeros(number) {
  return ("0" + number).slice(-2);
}

function ResetAll() {
  reset.style.display = "none";
  lap.style.display = "";
  lap.setAttribute("disabled", "true");

  initialTime = 0;
  secTime = 0;
  minTime = 0;
  lapCounter = 1;
  prevValue = "00:00.00";

  milisec.innerHTML = addZeros(initialTime);
  sec.innerHTML = addZeros(secTime);
  min.innerHTML = addZeros(minTime);
  lapTable.innerHTML = "";
}

// Create a Lap Functionality
lap.addEventListener("click", () => {
  let tr = createLap();
  lapTable.prepend(tr);
  lapCounter++;
});

function createLap() {
  let tr = document.createElement("tr");
  let td1 = document.createElement("td");
  let td2 = document.createElement("td");
  let td3 = document.createElement("td");
  td1.innerHTML = lapCounter;
  td2.innerHTML = stopwatch.innerText;
  td3.innerHTML = DifferneceTime();
  tr.appendChild(td1);
  tr.appendChild(td2);
  tr.appendChild(td3);
  return tr;
}

function ConvertMiliSeconds(stopwatch) {
  let splitArray = stopwatch.split(":");
  let totalMiliSeconds =
    Number(splitArray[0] * 60000) + Number(splitArray[1] * 1000);
  return totalMiliSeconds;
}

function DifferneceTime() {
  let stopwatchMiliseconds = ConvertMiliSeconds(stopwatch.innerText);
  let prevMiliSeconds = ConvertMiliSeconds(prevValue);
  let diff = stopwatchMiliseconds - prevMiliSeconds;
  let minValue = Math.floor(diff / 60000);
  let secondValue = ((diff - minValue * 60000) / 1000).toFixed(2);
  secondValue = String(secondValue).length == 4 ? "0" + secondValue : secondValue;
  prevValue = stopwatch.innerText;
  let value = `+${addZeros(minValue)}:${secondValue}`;
  return value;
}
