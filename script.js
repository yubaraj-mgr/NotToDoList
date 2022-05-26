//Every time you need value from form input

// let entryList = [{ task: "tv tv tv", hr: 33 }];
let entryList = [];
let badList = [];
const weekHours = 7 * 24;

// get data on form
const handleOnSubmit = (e) => {
  const formDt = new FormData(e);
  const task = formDt.get("task");
  const hr = +formDt.get("hr");
  const obj = { task, hr };

  entryList.push(obj);
  // are we allow to add new entry
  const ttlHrs = getTotalHours();
  if (ttlHrs + hr > weekHours) {
    return alert("You have exceeded the weekly hours, can not add this this");
  }
  display(entryList);
};

// display list on entry dom
const display = (taskArg) => {
  let str = "";
  taskArg.map((item, i) => {
    str += ` <tr>
        <td>${item.task}</td>
        <td>${item.hr} hrs</td>
        <td class="text-end">

        <button onClick="handleOnDeleteEntryList(${i})" class="btn btn-danger">
            <i class="fa-solid fa-trash-can"></i>
        </button>

        <button onClick ="switchToBadList(${i})" class="btn btn-success">
            <i class="fa-solid fa-arrow-right"></i>
        </button>
        </td>
        </tr>`;
  });
  document.querySelector("#entryList").innerHTML = str;
  getTotalHours();
};

// display bad list on dom
const badListDisplay = (arg) => {
  let str = "";
  arg.map((item, i) => {
    str += ` <tr>
          <td>${item.task}</td>
          <td>${item.hr} hrs</td>
          <td class="text-end">
  
          <button onClick="handleOnDeleteBadList(${i})" class="btn btn-danger">
              <i class="fa-solid fa-trash-can"></i>
          </button>
  
          <button onClick ="switchToEntryList(${i})" class="btn btn-success">
              <i class="fa-solid fa-arrow-left"></i>
          </button>
          </td>
          </tr>`;
  });
  document.querySelector("#bad-list").innerHTML = str;
  badTotalHours();
  getTotalHours();
};

// delete item form entry list
// filter only looks for true value
const handleOnDeleteEntryList = (i) => {
  if (!confirm("Are your sure?")) return;
  const filteredArray = entryList.filter((item, index) => {
    return index !== i;
  });
  entryList = filteredArray;
  display(entryList);
};

// delete item form Bad list
const handleOnDeleteBadList = (i) => {
  if (!confirm("Are your sure?")) return;
  const filteredArray = badList.filter((item, index) => {
    return index !== i;
  });
  badList = filteredArray;
  // display(entryList);
  badListDisplay(badList);
};

// switch data from bad List to the entry List
const switchToBadList = (i) => {
  const itemToBeSwitched = entryList.splice(i, 1);
  badList.push(itemToBeSwitched[0]);
  display(entryList);
  badListDisplay(badList);
};

// switch data from entry list to bad list
const switchToEntryList = (i) => {
  const itemToBeSwitched = badList.splice(i, 1);
  entryList.push(itemToBeSwitched[0]);
  display(entryList);
  badListDisplay(badList);
};

const getTotalHours = () => {
  const ttlEntryList = entryList.reduce((acc, item) => acc + item.hr, 0);
  const ttlBadList = badList.reduce((acc, item) => acc + item.hr, 0);
  const latestTotal = ttlEntryList + ttlBadList;
  document.getElementById("totalHours").innerText = latestTotal;
  return latestTotal;
};

const badTotalHours = () => {
  const ttlBadList = badList.reduce((acc, item) => acc + item.hr, 0);
  document.getElementById("saveHours").innerText = ttlBadList;
};
