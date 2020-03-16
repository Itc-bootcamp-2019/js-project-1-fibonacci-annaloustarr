document.getElementById("loader").classList.add("hidden");
document.getElementById("searchResults").classList.add("hidden");

let listDiv = document.getElementById("dataList");

function getCompanyData(x) {
  document.getElementById("loader").classList.remove("hidden");
  document.getElementById("searchResults").classList.remove("hidden");
  fetch(
    "https://financialmodelingprep.com/api/v3/search?query=AA&limit=10&exchange=NASDAQ"
  )
    .then(response => {
      return response.json();
    })
    .then(data => {
      let companyList = data;
      console.log(companyList);
      for (let i = 0; i < companyList.length; i++) {
        let li = document.createElement("li");
        let companyName = document.createElement("a");
        companyName.setAttribute(
          "href",
          "https://financialmodelingprep.com/api/v3/search?query=AA&limit=10&exchange=NASDAQ"
        );
        companyName.innerText = companyList[i].name;
        let companySymbol = document.createElement("a");
        companySymbol.setAttribute(
          "href",
          "https://financialmodelingprep.com/api/v3/search?query=AA&limit=10&exchange=NASDAQ"
        );
        companySymbol.innerText = " (" + companyList[i].symbol + ")";
        li.append(companyName, companySymbol);
        listDiv.appendChild(li);
      }
      document.getElementById("loader").classList.add("hidden");
    });
}

document
  .getElementById("searchButton")
  .addEventListener("click", getCompanyData);
