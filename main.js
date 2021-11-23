import {
  postTodoList,
  request,
  requestPatch,
  deleteItem,
} from "./module/api.js";
const todoTextStorage = document.querySelector('.todo__storage')
const btnStore = document.querySelector(".btn__data__store");
const todoItem = document.querySelector(".todo__item");
const todoContent = document.querySelector(".todo__content");
const todoInput = document.querySelector(".todo__input");
const todoForm = document.querySelector(".form__input");
const todoUl = document.createElement("ul");
const loadingIndicator = document.querySelector(".todo__loading");
todoUl.className = "list-group";
let btnDataStore = true;
todoItem.append(todoUl);

btnStore.addEventListener("click", (e) => {
  todoTextStorage.style.display = 'none'
  if (btnDataStore) {
    e.target.textContent = "Переключиться на API";
    btnDataStore = false;
    loadPage();
  } else {
    e.target.textContent = "Переключиться на LS";
    btnDataStore = true;
    loadPage();
  }
});

async function loadPage() {
  let TODOS = JSON.parse(localStorage.getItem("TODOS") || "[]");
  let isLoading = false;

  const clearList = () => {
    while (todoUl.firstChild) {
      todoUl.removeChild(todoUl.firstChild);
    }
  };

  async function renderList() {
    clearList();

    if (!isLoading && !TODOS.length) {
      todoContent.style.display = "block";
    } else {
      todoContent.style.display = "none";
    }

    TODOS.forEach((elem) => {
      const todoLi = document.createElement("li");
      const removeBtn = document.createElement("button");
      const btnGreen = document.createElement("button");
      const btnDiv = document.createElement("div");
      let todoDone = null;
      if (elem.done) {
        todoDone = true;
        todoLi.classList.add("list-group-item-click");
      } else {
        todoDone = false;
      }

      removeBtn.addEventListener("click", async (e) => {
        TODOS = await deleteItem(elem.id, TODOS, btnDataStore);

        renderList();
      });

      btnGreen.addEventListener("click", async (e) => {
        const li = e.target.parentElement.parentElement;
        console.log(elem.id);
        if (!todoDone) {
          todoDone = true;
          li.classList.add("list-group-item-click");
        } else {
          todoDone = false;
          li.classList.remove("list-group-item-click");
        }

        await requestPatch(todoDone, elem.id, TODOS, btnDataStore);
      });

      removeBtn.textContent = "Удалить";
      btnGreen.textContent = "Готово";
      btnDiv.append(btnGreen);
      btnDiv.append(removeBtn);

      btnGreen.classList.add("btn", "btn-success");
      removeBtn.classList.add("btn", "btn-danger");

      todoLi.classList.add("list-group-item");
      todoLi.textContent = elem.name;
      todoInput.value = "";
      todoLi.append(btnDiv);

      todoUl.append(todoLi);
    });
  }

  async function createTodoList(event) {
    event.preventDefault();

    if (todoInput.value.trim()) {
      await createTodo();
    } else {
      alert("Введите текст");
    }
  }

  const initialLoad = async () => {
    try {
      isLoading = true;
      loadingIndicator.style.display = "block";
      TODOS = await request(btnDataStore);
      isLoading = false;
      loadingIndicator.style.display = "none";
      renderList();
    } catch (error) {
      console.error(error);
      loadingIndicator.style.display = "none";
      isLoading = false;
    }
  };
  async function createTodo() {
    await postTodoList(todoInput, TODOS, btnDataStore);

    renderList();
  }

  initialLoad();

  todoForm.addEventListener("submit", createTodoList);
}
