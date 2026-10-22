const dreamInput = document.getElementById("dreamInput");
const submitButton = document.getElementById("submitButton");
const showButton = document.getElementById("showButton");
const message = document.getElementById("message");
const dreamList = document.getElementById("dreamList");


// POST - send new dream to server
submitButton.addEventListener("click", async () => {

  const dream = dreamInput.value;

  const response = await fetch("/new-data", {
    method: "POST",

    headers: {
      "Content-Type": "application/json"
    },

    body: JSON.stringify({
      dream: dream
    })
  });

  const data = await response.json();

  message.textContent = data.message;

  dreamInput.value = "";

});


// GET - get dreams from server
showButton.addEventListener("click", async () => {

  const response = await fetch("/data");

  const data = await response.json();

  dreamList.innerHTML = "";

  for (let i = 0; i < data.length; i++) {

    const p = document.createElement("p");

    p.textContent = data[i].dream;

    dreamList.appendChild(p);

  }

});