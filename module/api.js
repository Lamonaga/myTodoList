async function postTodoList(itemInput) {
  const response = await fetch("http://localhost:5000/api/todos", {
    method: "POST",
    body: JSON.stringify({
      name: itemInput.value.trim(),
      owner: "Иван",
      done: false,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.json();
}

async function request() {
  const response = await fetch("http://localhost:5000/api/todos");
  return await response.json();
}

async function requestPatch(done, id) {
  await fetch(`http://localhost:5000/api/todos/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ done: done }),
    headers: { "Content-Type": "application/json" },
  });
}

async function deleteItem(itemId) {
  await fetch(`http://localhost:5000/api/todos/${itemId}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
}

export { postTodoList, request, requestPatch, deleteItem };
