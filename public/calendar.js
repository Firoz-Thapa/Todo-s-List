const Day = document.querySelector(".day");
const month = document.querySelector(".month-name");
const date = new Date();

const pre = document.querySelector(".left");
const next = document.querySelector(".right");

let currentMon = date.getMonth() + 1;
let currentYear = date.getFullYear();
let currentDay = date.getDate();

let DayOfChoice = currentDay;
let MonOfChoice = currentMon;
let yearOfChoice = currentYear;

let year = currentYear;
let mon = currentMon;

let clickEventArr = [];

function isLeapYear(year) {
  return year % 4 == 0 && (year % 400 == 0 || year % 100 != 0);
}

function getDayOfMon(mon, year) {
  if (
    mon === 1 ||
    mon === 3 ||
    mon === 5 ||
    mon === 7 ||
    mon === 8 ||
    mon === 10 ||
    mon === 12
  ) {
    return 31;
  } else if (mon === 2) {
    return isLeapYear(year) ? 29 : 28;
  } else {
    return 30;
  }
}

function getDay(year, mon, date) {
  const conYMD = year + "-" + mon + "-" + date;
  return new Date(conYMD).getDay();
}

function makeCalendar(year, mon, dayCount) {
  clickEventArr = [];
  Day.innerHTML = "";
  let getFirstDay = getDay(year, mon, 1);
  let previousMon;
  if (currentMon - 1 < 0) {
    previousMon = 12;
  } else {
    previousMon = currentMon - 1;
  }
  let getDayOfPreMon = getDayOfMon(previousMon, year);
  for (let i = (getFirstDay + 6) % 7; i > 0; i--) {
    const listPre = document.createElement("li");
    listPre.textContent = `${getDayOfPreMon - (i - 1)}`;
    listPre.style.opacity = "0.5";
    listPre.classList.add("disabled");
    Day.appendChild(listPre);
  }

  for (let i = 1; i <= dayCount; i++) {
    if (i === currentDay && year === currentYear && mon === currentMon) {
      const onlyOneList = document.createElement("li");
      onlyOneList.textContent = `${i}`;
      if (
        currentYear === yearOfChoice &&
        currentMon === MonOfChoice &&
        currentDay === DayOfChoice
      ) {
        onlyOneList.style.border = "3px solid green";
      } else {
        onlyOneList.style.border = "3px solid #555843";
      }
      if (0 === getDay(year, mon, i)) {
        onlyOneList.style.color = "#555843";
      } else if (6 == getDay(year, mon, i)) {
        onlyOneList.style.color = "#555843";
      }
      Day.addEventListener("click", (event) => {
        if (event.target !== onlyOneList) {
          onlyOneList.style.border = "3px solid black";
        }
      });
      Day.appendChild(onlyOneList);
      continue;
    }

    const list = document.createElement("li");
    list.textContent = `${i}`;
    if (i === DayOfChoice && year === yearOfChoice && mon === MonOfChoice) {
      list.style.border = "3px solid red";
      Day.addEventListener("click", (event) => {
        if (event.target !== list) {
          list.style.border = "none";
        }
      });
    }
    if (0 === getDay(year, mon, i)) {
      list.style.color = "red";
    } else if (6 == getDay(year, mon, i)) {
      list.style.color = "blue";
    }
    Day.appendChild(list);
  }
}

function setMonthTitle(year, mon) {
  month.textContent = `${year}.${mon}`;
}

function nextMonthOrYear() {
  if (mon === 12) {
    year = year + 1;
    mon = 1;
  } else {
    mon = mon + 1;
  }
  setMonthTitle(year, mon);
  makeCalendar(year, mon, getDayOfMon(mon, year));
}

function preMonthOrYear() {
  if (mon === 1) {
    year = year - 1;
    mon = 12;
  } else {
    mon = mon - 1;
  }
  setMonthTitle(year, mon);
  makeCalendar(year, mon, getDayOfMon(mon, year));
}

function main() {
  setMonthTitle(year, mon);
  makeCalendar(year, mon, getDayOfMon(mon, year));
}

function clearEvent() {
  clickEventArr.forEach((value) => {
    value.style.border = "none";
  });
}

Day.addEventListener("click", (event) => {
  if (event.target.tagName === "UL") return;
  if (event.target.className !== "disabled") {
    clearEvent();
    event.target.style.border = "3px solid #555843";
    DayOfChoice = event.target.textContent * 1;
    MonOfChoice = mon;
    yearOfChoice = year;
    clickEventArr.push(event.target);
    console.log(clickEventArr);
  }
});

pre.addEventListener("click", preMonthOrYear);
next.addEventListener("click", nextMonthOrYear);

main();
