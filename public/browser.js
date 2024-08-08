console.log("FrontEnd JS ishga tushdi");

function itemTemplate(item) {
  return `<li class="list-group-item list-group-item-info d-flex align-items-center justify-content-between">
    
    <span class="item-text">${item.reja}</span>
    <div>
       <button
        data-id="${item._id}"
        class="edit-me btn btn-secondary btn-sm mr-1"
        >
          EDIT
       </button>
       <button
        data-id="${item._id}" 
        class="delete-me btn btn-danger btn-sm"
        >
          DELETE
        </button>
    </div>
 </li>`;
}

let createField = document.getElementById("create-field");

document.getElementById("create-form").addEventListener("submit", function (e) {
  e.preventDefault();
  axios
    .post("/create-item", { reja: createField.value })
    .then((response) => {
      document
        .getElementById("item-list")
        .insertAdjacentHTML("beforeend", itemTemplate(response.data));
      createField.value = "";
      createField.focus();
    })
    .catch((err) => {
      console.log("PLEASE TRY AGAIN!");
    });
});

document.addEventListener("click", function (e) {
  // console.log(e);

  //delete oper
  console.log(e.target);
  if (e.target.classList.contains("delete-me")) {
    // alert("siz delete tugmasini bosdingiz");
    if (confirm("Aniq o'chirmoqchimisiz?")) {
      // alert("Yes deb javob berildi");
      axios
        .post("/delete-item", { id: e.target.getAttribute("data-id") })
        .then((response) => {
          console.log(response.data);
          e.target.parentElement.parentElement.remove();
        })
        .catch((err) => {
          console.log("PLEASE TRY AGAIN!");
        });
    }
    // else{
    //    alert("No deb javob berildi");
    // }
  }

  // edit oper
  if (e.target.classList.contains("edit-me")) {
    let userInput = prompt(
      "INPUT NEW PLAN:",
      e.target.parentElement.parentElement.querySelector(".item-text").innerHTML
    );
    if (userInput) {
      axios
        .post("/edit-item", {
          id: e.target.getAttribute("data-id"),
          new_input: userInput,
        })
        .then((response) => {
          e.target.parentElement.parentElement.querySelector(
            ".item-text"
          ).innerHTML = userInput;
        })
        .catch((err) => {
          console.log("PLEASE TRY AGAIN!", err);
        });
    }
  }
});

// clear-all oper
document.getElementById("clean-all").addEventListener("click", function () {
  axios
    .post("/delete-all", { delete_all: true })
    .then((response) => {
      alert(response.data.state);
      // document.location.reload();
      document.querySelector("#item-list").innerHTML = "";
    })
    .catch((err) => {
      console.log("PLEASE TRY AGAIN!", err);
    });
});
