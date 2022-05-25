//Every time you need value from form input

// let entryList = [{ task: "tv tv tv", hr: 33 }];
let entryList = [];

const handleOnSubmit = (e) => {
  const formDt = new FormData(e);
  const task = formDt.get("task");
  const hr = formDt.get("hr");
  const obj = { task, hr };
  entryList.push(obj);
  display(entryList);
};

const display = (taskArg) => {
  let str = "";
  taskArg.map((item, i) => {
    str += ` <tr>
        <td>${item.task}</td>
        <td>${item.hr} hrs</td>
        <td class="text-end">
        <button onClick=(handleOnDeleteEntryList(${i})) class="btn btn-danger">
            <i class="fa-solid fa-trash-can"></i>
        </button>
        <button class="btn btn-success">
            <i class="fa-solid fa-arrow-right"></i>
        </button>
        </td>
        </tr>`;
  });
  document.querySelector("#entryList").innerHTML = str;
};

const handleOnDeleteEntryList = (i) => {
  if (!confirm("Are your sure?")) return;
  const filteredArray = entryList.filter((item, index) => {
    return index !== i;
  });
  entryList = filteredArray;
  display(entryList);
};

// to remove
display(entryList);
