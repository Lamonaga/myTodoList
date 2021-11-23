async function postTodoList(itemInput, arrayItem) {
  const objDataItem = {
    name: itemInput.value.trim(),
    owner: "Иван",
    done: false,
    id: Math.round(Math.random() * 100000000000000),
  };
  arrayItem.push(objDataItem);
  localStorage.setItem("TODOS", JSON.stringify(arrayItem));
}

async function request() {
  return JSON.parse(localStorage.getItem("TODOS"));
}

async function requestPatch(done, id, arrayItem) {
  arrayItem = arrayItem.forEach((item) => {
    if (item.id === id) {
      item.done = done;
    }
    localStorage.setItem("TODOS", JSON.stringify(arrayItem));
  });
}

async function deleteItem(itemId, arrayItem) {
  arrayItem = arrayItem.filter((todo) => todo.id !== itemId);
  localStorage.setItem("TODOS", JSON.stringify(arrayItem));

  return arrayItem.filter((todo) => todo.id !== itemId);
}

export { postTodoList, request, requestPatch, deleteItem };
