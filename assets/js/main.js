import { rtoData } from "./download-data.js";
// Get the button:
let clickToTop = document.getElementById("myBtntop");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    clickToTop.style.display = "block";
  } else {
    clickToTop.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}
clickToTop.addEventListener("click", (e) => {
  topFunction();
});
const inputEl = document.querySelector("input");

async function getJSONData() {
  return rtoData;
}
const resultSectionEl = document.querySelector("#resultSection");
const norec = document.querySelector("#no_rec");
const img = document.querySelector("#img");

const searchRecord = async (value) => {
  norec.style.display = "none";
  resultSectionEl.classList.add("hidden");
  img.classList.remove("hidden");
  console.log("I have got this value!", value.toUpperCase());

  const jsonData = await getJSONData();

  const recordFound = jsonData.find(
    (record) => record.code === value.toUpperCase()
  );

  // the above code changed, the code can be written even more like this.
  // check this: https://github.com/anburocky3/RTO-NumberPlate-Finder/issues/1

  if (recordFound) {
    // record exist
    img.classList.add("hidden");
    if (recordFound.VehicleType === undefined) {
      resultSectionEl.querySelector("#bike_type").style.color = "#bfbfbf";
      recordFound.VehicleType = "Data Not Available";
    }
    resultSectionEl.classList.remove("hidden");
    norec.style.display = "none";
    resultSectionEl.querySelector("#query").innerText = value.toUpperCase();
    // resultSectionEl.querySelector("#rto_id").innerText = recordFound.id;
    resultSectionEl.querySelector("#rto_code").innerText = recordFound.code;
    resultSectionEl.querySelector("#rto_location").innerHTML =
      "<i>" + recordFound.location + "</i>";
    resultSectionEl.querySelector("#rto_type").innerText = recordFound.type;
    resultSectionEl.querySelector("#bike_type").innerText =
      recordFound.VehicleType;

    resultSectionEl.querySelector("#rto_district").innerText =
      recordFound.district;
  } else {
    norec.style.display = "block";
    img.classList.add("hidden");

    // setTimeout(() => {
    //   img.classList.remove("hidden");

    //   norec.style.display = "none";
    // }, 3000);

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
inputEl.addEventListener("input", (e) => {
  resultSectionEl.classList.add("hidden");
  img.classList.remove("hidden");
  norec.style.display = "none";
});
inputEl.addEventListener("focus", (e) => {
  inputEl.classList.add("box-shadow");
  norec.style.display = "none";
  img.classList.remove("hidden");
});
inputEl.addEventListener("blur", (e) => {
  inputEl.classList.remove("box-shadow");
});
document.getElementById("btn").addEventListener("click", (e) => {
  if (inputEl.value.length > 3) {
    searchRecord(inputEl.value);
  } else if (inputEl.value === "") {
    alert("Please Enter the Number");
  } else {
    alert("invalid Number!");
  }
});
