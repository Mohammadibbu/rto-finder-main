const inputEl = document.querySelector("input");

async function getJSONData() {
  const response = await fetch("./assets/json/data.json");
  return await response.json();
}
const resultSectionEl = document.querySelector("#resultSection");
const norec = document.querySelector("#no_rec");
const searchRecord = async (value) => {
  norec.style.display = "none";
  resultSectionEl.classList.add("hidden");
  console.log("I have got this value!", value.toUpperCase());

  const jsonData = await getJSONData();

  const recordFound = jsonData.find(
    (record) => record.code === value.toUpperCase()
  );

  // the above code changed, the code can be written even more like this.
  // check this: https://github.com/anburocky3/RTO-NumberPlate-Finder/issues/1

  if (recordFound) {
    // record exist
    resultSectionEl.classList.remove("hidden");
    norec.style.display = "none";
    // Update the UI fields
    resultSectionEl.querySelector("#query").innerText = value.toUpperCase();
    resultSectionEl.querySelector("#rto_id").innerText = recordFound.id;
    resultSectionEl.querySelector("#rto_code").innerText = recordFound.code;
    resultSectionEl.querySelector("#rto_location").innerHTML =
      "<i>" + recordFound.location + "</i>";
    resultSectionEl.querySelector("#rto_type").innerText = recordFound.type;
    resultSectionEl.querySelector("#rto_district").innerText =
      recordFound.district;
  } else {
    norec.style.display = "block";
    setTimeout(() => {
      norec.style.display = "none";
    }, 3000);

    resultSectionEl.classList.add("hidden");
  }
};

inputEl.addEventListener("keyup", (e) => {
  // check my validation here
  if (e.key === "Enter") {
    if (inputEl.value.length > 3) {
      searchRecord(inputEl.value);
    } else if (inputEl.value === "") {
      alert("Please Enter the Number");
    } else {
      alert("invalid Number!");
    }
  }
});
