//  student information will be displayed here
var studentInfoElement = document.getElementById("studentInfo");

var studentId = "200544015";
var studentName = "Ansh Mukeshbhai Paghadal";

studentInfoElement.innerHTML =
  "<p>Student ID: " + studentId + "<br>Student Name: " + studentName + "</p>";

// country name input will be converted to country code
function getCountryCode(countryName) {
  const countryMap = {
    Andorra: "AD",
    Albania: "AL",
    Argentina: "AR",
    Austria: "AT",
    Australia: "AU",
    Barbados: "BB",
    Belgium: "BE",
    Bulgaria: "BG",
    Benin: "BJ",
    Bolivia: "BO",
    Brazil: "BR",
    Bahamas: "BS",
    Botswana: "BW",
    Belarus: "BY",
    Belize: "BZ",
    Canada: "CA",
    Switzerland: "CH",
    Chile: "CL",
    China: "CN",
    Colombia: "CO",
    "Costa Rica": "CR",
    Cuba: "CU",
    Cyprus: "CY",
    Czechia: "CZ",
    Germany: "DE",
    Denmark: "DK",
    "Dominican Republic": "DO",
    Ecuador: "EC",
    Estonia: "EE",
    Egypt: "EG",
    Spain: "ES",
    Finland: "FI",
    France: "FR",
    Gabon: "GA",
    "United Kingdom": "GB",
    Grenada: "GD",
    Guernsey: "GG",
    Gibraltar: "GI",
    Greenland: "GL",
    Gambia: "GM",
    Greece: "GR",
    Guatemala: "GT",
    Guyana: "GY",
    Honduras: "HN",
    Croatia: "HR",
    Haiti: "HT",
    Hungary: "HU",
    Indonesia: "ID",
    Ireland: "IE",
    Iceland: "IS",
    Italy: "IT",
    Jersey: "JE",
    Jamaica: "JM",
    Japan: "JP",
    "South Korea": "KR",
    Liechtenstein: "LI",
    Lesotho: "LS",
    Lithuania: "LT",
    Luxembourg: "LU",
    Latvia: "LV",
    Morocco: "MA",
    Monaco: "MC",
    Moldova: "MD",
    Montenegro: "ME",
    Madagascar: "MG",
    "North Macedonia": "MK",
    Mongolia: "MN",
    Montserrat: "MS",
    Malta: "MT",
    Mexico: "MX",
    Mozambique: "MZ",
    Namibia: "NA",
    Niger: "NE",
    Nigeria: "NG",
    Nicaragua: "NI",
    Netherlands: "NL",
    Norway: "NO",
    "New Zealand": "NZ",
    Panama: "PA",
    Peru: "PE",
    "Papua New Guinea": "PG",
    Poland: "PL",
    "Puerto Rico": "PR",
    Portugal: "PT",
    Paraguay: "PY",
    Romania: "RO",
    Serbia: "RS",
    Russia: "RU",
    Sweden: "SE",
    Singapore: "SG",
    Slovenia: "SI",
    Slovakia: "SK",
    "San Marino": "SM",
    Suriname: "SR",
    "El Salvador": "SV",
    Tunisia: "TN",
    Turkey: "TR",
    Ukraine: "UA",
    "United States": "US",
    Uruguay: "UY",
    "Vatican City": "VA",
    Venezuela: "VE",
    Vietnam: "VN",
    "South Africa": "ZA",
    Zimbabwe: "ZW",
  };

  return countryMap[countryName];
}
// Function to handle the button click event for searching holidays
function searchForCountries() {
  var countrySelect = document.getElementById("countrySelect");
  var selectedCountry =
    countrySelect.options[countrySelect.selectedIndex].value;

  // Get the input value for the year
  var year = document.getElementById("searchTextField1").value.trim();

  // Hide the table and heading when details are changed
  var tableInfo = document.getElementById("tableInfo");
  tableInfo.style.display = "none";
  var table = document.getElementById("holidayDetailsTable");
  table.style.display = "none";
  // Check if either country or year is empty
  if (selectedCountry === "" || year === "") {
    // Display an alert to the user
    alert("Please select both country and year.");
  } else if (isNaN(year) || year < 2000 || year > 2700) {
    // Display an alert if the year is not a valid range
    alert("Please enter a valid year between 2000 and 2700.");
  } else {
    // Call the callAPI function with the selected country and year
    callAPI(selectedCountry, year);
  }
}

// Function to show/hide the results box
function showResultsBox(display) {
  var resultsBox = document.getElementById("resultsBox");
  resultsBox.style.display = display ? "block" : "none";
}

// Function to update the list of holidays in the HTML
function updateHolidayList(holidays) {
  // Get the ul element for the list of holidays
  var holidayList = document.getElementById("listView");

  // Clear any existing items in the list
  holidayList.innerHTML = "";

  // Update the list with the new holiday names
  holidays.forEach(function (holiday) {
    var listItem = document.createElement("li");

    // Check if localName is equal to name
    if (holiday.localName === holiday.name) {
      listItem.textContent = holiday.localName;
    } else {
      // Display "localName - (name)" if they are different
      listItem.textContent = holiday.localName + " - (" + holiday.name + ")";
    }

    holidayList.appendChild(listItem);
  });
}

// Attach the handleSearch function to the button click event
document.getElementById("searchButton").addEventListener("click", function () {
  searchForCountries();
  showResultsBox(); // Show the results box after searching
});

//the callAPI function
function callAPI(countryName, year) {
  var uppercaseCountryName =
    countryName.charAt(0).toUpperCase() + countryName.slice(1);
  var countryCode = getCountryCode(uppercaseCountryName);

  if (countryCode) {
    var apiUrl =
      "https://date.nager.at/api/v2/publicholidays/" + year + "/" + countryCode;

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        var localNames = data.map(function (holiday) {
          return holiday.localName;
        });

        displayCountryFlag(countryName);
        updateHolidayList(data);

        // Show the results box after successful API response
        showResultsBox(true);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);

        // If an error occurs, hide the results box
        showResultsBox(false);
      });
  } else {
    console.error("Invalid country name:", countryName);
  }
}

// Function to display the country flag image using the external link
function displayCountryFlag(countryName) {
  // Get the image URL for the country
  var imageUrl =
    "https://www.sciencekids.co.nz/images/pictures/flags96/" +
    countryName.replaceAll(" ", "_") +
    ".jpg";

  document.getElementById("flagImage").src = imageUrl;
}

// Function to populate the holiday details table
function displayHolidayDetailsTable(holidays) {
  var table = document.getElementById("holidayDetailsTable");

  // Clear existing rows
  table.innerHTML =
    "<tr><th>No.</th><th>Country Code</th><th>Date</th><th>Local Name</th><th>Name</th></tr>";

  // Populate the table with holiday details
  holidays.forEach(function (holiday, index) {
    var row = table.insertRow();
    var cell0 = row.insertCell(0); // Add this line for the No. column
    var cell1 = row.insertCell(1);
    var cell2 = row.insertCell(2);
    var cell3 = row.insertCell(3);
    var cell4 = row.insertCell(4);
    cell0.textContent = index + 1;
    cell1.textContent = holiday.countryCode;
    cell2.textContent = holiday.date;
    cell3.textContent = holiday.localName;
    cell4.textContent = holiday.name;
  });
}

// Function to handle the button click event for displaying country details
function displayCountryDetails() {
  document.getElementById("holidayDetailsTable").style.display = "none";

  var countrySelect = document.getElementById("countrySelect");
  var selectedCountry =
    countrySelect.options[countrySelect.selectedIndex].value;

  var year = document.getElementById("searchTextField1").value.trim();

  if (selectedCountry !== "" && year !== "") {
    var uppercaseCountryName =
      selectedCountry.charAt(0).toUpperCase() + selectedCountry.slice(1);
    var countryCode = getCountryCode(uppercaseCountryName);

    if (countryCode) {
      var apiUrl =
        "https://date.nager.at/api/v2/publicholidays/" +
        year +
        "/" +
        countryCode;

      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          displayCountryFlag(uppercaseCountryName);
          updateHolidayList(data);
          displayHolidayDetailsTable(data);
          // Update the new h1 tag with information about the selected country and year
          var tableInfoTag = document.getElementById("tableInfo");
          tableInfoTag.textContent = `Showing table of "${selectedCountry}" in year "${year}"`;

          // Show the table after fetching and displaying data
          var table = document.getElementById("holidayDetailsTable");
          table.style.display = "table";
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    } else {
      console.error("Invalid country name:", selectedCountry);
    }
  } else {
    console.log("Please select both country and year.");
  }
  document.getElementById("resetButton").style.display = "block";
  document.getElementById("tableInfo").style.display = "block";
}

// Function to reset the form and reload the page
function resetForm() {
  location.reload();
}
