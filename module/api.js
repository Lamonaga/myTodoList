async function postTodoList(itemInput, arrayItem, btnDataStore) {
  if (btnDataStore) {
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

    arrayItem.push(await response.json());
  } else {
    const objDataItem = {
      name: itemInput.value.trim(),
      owner: "Иван",
      done: false,
      id: Date.now(),
    };
    arrayItem.push(objDataItem);
    localStorage.setItem("TODOS", JSON.stringify(arrayItem));
  }
}

async function request(btnDataStore) {
  if (btnDataStore) {
    const response = await fetch("http://localhost:5000/api/todos");
    return await response.json();
  } else {
    return JSON.parse(localStorage.getItem("TODOS"));
  }
}

async function requestPatch(done, id, arrayItem, btnDataStore) {
  if (btnDataStore) {
    await fetch(`http://localhost:5000/api/todos/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ done: done }),
      headers: { "Content-Type": "application/json" },
    });
  } else {
    arrayItem = arrayItem.forEach((item) => {
      if (item.id === id) {
        item.done = done;
      }
      localStorage.setItem("TODOS", JSON.stringify(arrayItem));
    });
  }
}

async function deleteItem(itemId, arrayItem, btnDataStore) {
  if (btnDataStore) {
    await fetch(`http://localhost:5000/api/todos/${itemId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    return arrayItem.filter((todo) => todo.id !== itemId);
  } else {
    arrayItem = arrayItem.filter((todo) => todo.id !== itemId);
    localStorage.setItem("TODOS", JSON.stringify(arrayItem));

    return arrayItem.filter((todo) => todo.id !== itemId);
  }
}

export { postTodoList, request, requestPatch, deleteItem };
