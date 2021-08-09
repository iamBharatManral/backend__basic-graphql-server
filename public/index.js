const endpointURL = "https://s7q4m.sse.codesandbox.io/graphql";

const createTable = ({ allUsers }) => {
  const table = document.createElement("table");
  table.setAttribute("border", "3px");
  table.createCaption().textContent = "List of users";
  const header = document.createElement("tr");
  ["firstname", "lastname"].forEach((name) => {
    const data = document.createElement("td");
    data.textContent = name;
    header.appendChild(data);
  });
  table.appendChild(header);

  allUsers.forEach((user) => {
    const row = document.createElement("tr");
    const { firstname, lastname } = user;
    const data1 = document.createElement("td");
    const data2 = document.createElement("td");
    data1.textContent = firstname;
    data2.textContent = lastname;
    row.appendChild(data1);
    row.appendChild(data2);
    table.appendChild(row);
  });
  document.querySelector("h2").style.display = "none";
  document.querySelector(".data").appendChild(table);
};

const getData = async (event) => {
  event.preventDefault();
  var jsonData;
  try {
    const response = await fetch(endpointURL, {
      headers: {
        "content-type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({
        query: `
            {
              allUsers{
                firstname
                lastname
              }
            }
          `
      })
    });
    jsonData = await response.json();
  } catch (error) {
    console.log(error.msg);
  }
  createTable(jsonData.data);
};

document.querySelector("button").addEventListener("click", getData);
