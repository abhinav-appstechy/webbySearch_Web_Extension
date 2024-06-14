document.getElementById("scrapeButton").addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    let activeTab = tabs[0];
    let url = activeTab.url;

    let scrapeButton = document.getElementById("scrapeButton");
    scrapeButton.innerText = "Scrapping...";
    scrapeButton.disabled = true;

    let statusDiv = document.getElementById("status");
    statusDiv.innerHTML = "";

    let resultDiv = document.getElementById("result");
    resultDiv.innerHTML = "";
    resultDiv.style = ''; 

    fetch("http://localhost:5000/scrap", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        site_url: url,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.status == "success") {
          scrapeButton.innerText = "Scrap this website";
          scrapeButton.disabled = false;
          const resultElement = document.getElementById("result");

          resultElement.style.backgroundColor = "#fff";
          resultElement.style.padding = "10px";
          resultElement.style.border = "1px solid #ddd";
          resultElement.style.borderRadius = "5px";
          resultElement.style.maxHeight = "400px";
          resultElement.style.overflowY = "auto";
          resultElement.style.whiteSpace = "pre-wrap";
          resultElement.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.1)";
          document.getElementById("status").innerHTML = `<h3>${data.data.message}</h3>`
          document.getElementById("result").innerText = JSON.stringify(
            data.data,
            null,
            2
          );
        } else {
          scrapeButton.innerText = "Scrap this website";
          scrapeButton.disabled = false;
          document.getElementById("status").innerHTML = `<h3>${data.data.message}</h3>`
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        scrapeButton.innerText = "Scrap this website";
          scrapeButton.disabled = false;
          document.getElementById("status").innerHTML = `<h3>Sorry, not able to scrap this website!</h3>`
      });
  });
});

// document.getElementById("scrapeButton").addEventListener("click", () => {

//       fetch("http://localhost:5000/scrape", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           site_url: window.location.url,
//         }),
//       })
//         .then((res) => {
//           if (!res.ok) {
//             throw new Error('Network response was not ok');
//           }
//           return res.json();
//         })
//         .then((data) => {
//           document.getElementById("result").innerText = JSON.stringify(data, null, 2);
//         })
//         .catch((error) => {
//           console.error('Error:', error);
//           document.getElementById("result").innerText = 'An error occurred: ' + error.message;
//         });

//   });
