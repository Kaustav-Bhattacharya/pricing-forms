// To set modal header
const modalButtons = document.querySelectorAll(
  '[data-target="#pricingModalForm"]'
);
modalButtons.forEach((button) => {
  button.addEventListener("click", function () {
    // Getting the modal header text from the data attribute
    const modalHeaderText = this.getAttribute("data-modal-header");

    // Setting the modal header text
    const modalTitle = document.querySelector(".modal-title");
    modalTitle.textContent = modalHeaderText;
  });
});

//To display the range to selected users
const userRange = document.getElementById("userRange");
const selectedUsersOutput = document.getElementById("selectedUsers");
const cards = document.querySelectorAll(".card-body");

userRange.addEventListener("input", () => {
  const selectedUsers = parseInt(userRange.value);
  selectedUsersOutput.textContent = selectedUsers + " Users";

  // Removing any previous highlighting
  cards.forEach((card) => {
    card.classList.remove("bg-dark", "text-light");
  });

  // Highlighting the appropriate card based on the selected number of users
  if (selectedUsers >= 10 && selectedUsers < 20) {
    cards[0].classList.add("bg-dark", "text-light");
  } else if (selectedUsers >= 20 && selectedUsers < 30) {
    cards[1].classList.add("bg-dark", "text-light");
  } else if (selectedUsers >= 30) {
    cards[2].classList.add("bg-dark", "text-light");
  }
});

//To get the form data
document.addEventListener("DOMContentLoaded", function () {
  const submitButton = document.getElementById("submitButton");

  submitButton.addEventListener("click", function (event) {
    event.preventDefault(); // Prevent the default button click behavior

    // Validate the form fields here (e.g., check if name, email, and comments are not empty)

    const url = "https://forms.maakeetoo.com/formapi/426";
    const firstname = document.getElementById("firstname").value;
    const lastname = document.getElementById("lastname").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    if (firstname.trim() === ""  || lastname.trim() === "" || email.trim() === "" || message.trim() === "") {
      alert("Please fill in all required fields.");
      return;
    }

    const data = { firstname, lastname, email, message };

    fetch(url, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Form submitted successfully", data);
        alert("Sign up successful!");
        // Closing the modal on sumbit
        $("#pricingModalForm").modal("hide");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });
});
