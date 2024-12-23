async function authenticate() {
  const username = document.querySelectorAll(".input-box")[0].value.trim();
  const password = document.querySelectorAll(".input-box")[1].value.trim();

  if (!username || !password) {
    alert("Enter username and password");
    return;
  }

  try {
    const response = await fetch("http://localhost:3000", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: username, password: password }),
    });

    if (!response.ok) {
      throw new Error("Authentication failed!");
    }

    window.location.href = "todos.html";
  } catch (error) {
    alert(error.message);
  }
}

async function add() {
  const input = document.querySelector("input").value.trim();
  if (!input) {
    alert("Please add a Todo!");
    return;
  }
  const response = await fetch("http://localhost:3000/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      task: input,
    }),
  });

  if (response.ok) {
    const data = await response.json();
    window.location.reload();
  }

  document.querySelector("input").value = "";
}

async function fetchtodo() {
  const response = await fetch("http://localhost:3000/todos");
  const data = await response.json();

  const list = document.getElementById("list");
  list.innerHTML = "";
  if (data.length === 0) {
    list.innerHTML = "<div>No tasks yet!</div>";
  } else {
    data.forEach((todo) => {
      const todoDiv = document.createElement("div");
      todoDiv.className = "todos";
      todoDiv.textContent = todo.task;
      todoDiv.id = todo.id;

      todoDiv.addEventListener("click", () => {
        todoDiv.classList.toggle("strikethrough");
      });
      list.appendChild(todoDiv);
    });
  }
}

fetchtodo();
