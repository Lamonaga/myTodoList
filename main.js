const todoItem = document.querySelector(".todo__item");
const todoContent = document.querySelector(".todo__content");
const todoInput = document.querySelector(".todo__input");
const todoButton = document.querySelector(".btn");
const todoForm = document.querySelector(".form__input");

const todoUl = document.createElement("ul");
todoUl.className = "list-group";
todoItem.append(todoUl);
const todoList = JSON.parse(localStorage.getItem("list") || "[]");

function removeList(e) {
  const li = e.target.parentElement.parentElement;
  console.log(li.dataset.id);
  const index = todoList.findIndex((n) => n.id === parseInt(li.dataset.id));

  if (index !== -1) {
    todoList.splice(index, 1);
  }

  li.remove();
  localStorage.setItem("list", JSON.stringify(todoList));
}

todoList.forEach((elem) => {
  const todoLi = document.createElement("li");
  const removeBtn = document.createElement("button");
  const btnGreen = document.createElement("button");
  const btnDiv = document.createElement("div");
  todoLi.setAttribute("data-id", elem.id);
  removeBtn.addEventListener("click", removeList);

  btnGreen.addEventListener("click", () => {
    todoLi.classList.toggle("list-group-item-click");
  });

  removeBtn.textContent = "Удалить";
  btnGreen.textContent = "Готово";
  btnDiv.append(btnGreen);
  btnDiv.append(removeBtn);

  btnGreen.classList.add("btn", "btn-success");
  removeBtn.classList.add("btn", "btn-danger");

  todoLi.classList.add("list-group-item");
  todoLi.textContent = elem.text;
  todoUl.append(todoLi);
  todoContent.style.display = "none";
  todoInput.value = "";
  todoLi.append(btnDiv);
});

function pushObjArow() {
  todoList.push({
    id: Date.now(),
    text: todoInput.value,
  });
  console.log(todoList);
}

function createTodoList(event) {
  pushObjArow();
  event.preventDefault();
  if (todoInput.value.trim()) {
    const todoLi = document.createElement("li");
    const removeBtn = document.createElement("button");
    const btnGreen = document.createElement("button");
    const btnDiv = document.createElement("div");
    todoList.forEach((elem) => {
      todoLi.setAttribute("data-id", elem.id);
      removeBtn.addEventListener("click", removeList);

      btnGreen.addEventListener("click", () => {
        todoLi.classList.toggle("list-group-item-click");
      });

      removeBtn.textContent = "Удалить";
      btnGreen.textContent = "Готово";
      btnDiv.append(btnGreen);
      btnDiv.append(removeBtn);

      btnGreen.classList.add("btn", "btn-success");
      removeBtn.classList.add("btn", "btn-danger");

      todoLi.classList.add("list-group-item");
      todoLi.textContent = elem.text;
      todoUl.append(todoLi);
      todoContent.style.display = "none";
      todoInput.value = "";
      todoLi.append(btnDiv);
    });
    localStorage.setItem("list", JSON.stringify(todoList));
  } else {
    alert("Введите текст");
  }
}

todoForm.addEventListener("submit", createTodoList);
