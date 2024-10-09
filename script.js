const url = "https://jsonplaceholder.typicode.com/posts";
const getToDos = () => {
  fetch(url + "?_limit=5")
    .then((resp) => resp.json())
    .then((data) => {
      data.forEach((i, index) => {
        addToDoToDOM(i);
      });
    });
};

const addToDoToDOM = (item) => {
  const div = document.createElement("div");
  div.appendChild(document.createTextNode(item.title));
  div.classList.add("to-do");
  div.setAttribute("data-id", item.id);
  document.querySelector("#to-dos").appendChild(div);
};

const createToDo = (item) => {
  fetch(url, {
    method: "POST",
    body: JSON.stringify(item),
    header: {
      "Content-Type": "application/json",
    },
  })
    .then((resp) => resp.json())
    .then((data) => {
      data.title = item.title;
      addToDoToDOM(data);
    });
};

const addToDoFromForm = (e) => {
  e.preventDefault();
  const inputData = e.target.firstElementChild.value;
  createToDo({ title: inputData });
};

const toggleCompleted = (e) => {
  const clickedItem = e.target;
  if (clickedItem.classList.contains("to-do")) {
    clickedItem.classList.toggle("done");
    updateToDo(e.target.dataset.id);
  }
};

const updateToDo = (id) => {
  fetch(`${url}/${id}`, {
    method: "PUT",
    body: JSON.stringify({ title: "You are beautiful" }),
    header: { "Content-Type": "application/json" },
  })
    .then((resp) => resp.json())
    .then((data) => console.log("update to do", data));
};
const deleteToDo = (e) => {
  const clickedItem = e.target;
  if (clickedItem.classList.contains("to-do")) {
    const id = clickedItem.dataset.id;
    fetch(`${url}/${id}`, { method: "DELETE" })
      .then((resp) => {
        resp.json();
      })
      .then((data) => {
        console.log("item deleted from our database");
        clickedItem.remove();
      });
  }
};
document.addEventListener("DOMContentLoaded", getToDos);
document.querySelector("form").addEventListener("submit", addToDoFromForm);
document.querySelector("#to-dos").addEventListener("click", toggleCompleted);
document.querySelector("#to-dos").addEventListener("dblclick", deleteToDo);
