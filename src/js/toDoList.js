const toDoList = {
  toDos: [],
  inputEl: document.getElementById("todoInput"),
  listEl: document.getElementById("toDoList"),
  addButtonEl: document.getElementById("addTodo"),
  formEl: document.getElementById("form"),

  completedAllBtn: null,

  init() {
    console.log("init to do list");

    const completedAllBtn =
      document.createElement("button");
    completedAllBtn.textContent = "Hepsi Tamamlandı";
    completedAllBtn.classList.add(
      "btn",
      "btn-success",
      "d-block",
      "mx-auto",
      "my-3"
    );
    console.log(completedAllBtn);

    this.completedAllBtn = completedAllBtn;
    this.formEl.appendChild(this.completedAllBtn);

    this.displayTodos();
    this.addButtonEl.addEventListener("click", () => {
      if (this.inputEl.value === "") {
        alert("Lütfen bir şeyler yazın");
        return;
      } else {
        this.addToDo(this.inputEl.value);
        this.inputEl.value = "";
        console.log(this.toDos);
      }
    });
    this.completedAllBtn.addEventListener("click", () => {
      this.toggleAll();
    });
  },

  displayTodos() {
    if (this.toDos.length === 0) {
      const li = document.createElement("li");
      li.textContent = "Yapılacak bir şey yok";
      this.listEl.appendChild(li);
      this.completedAllBtn.classList.remove("d-block");
      this.completedAllBtn.classList.add("d-none");
    } else {
      console.log("Yapılacaklar listem:");
      this.completedAllBtn.classList.remove("d-none");
      this.completedAllBtn.classList.add("d-block");

      for (let i = 0; i < this.toDos.length; i++) {
        if (this.toDos[i].completed === true) {
          console.log("(x)", this.toDos[i].toDoText);

          const li = document.createElement("li");
          li.textContent = this.toDos[i].toDoText;
          li.classList.add(
            "list-group-item",
            "d-flex",
            "justify-content-between",
            "align-items-center",
            "text-bg-success",
            "rounded-3",
            "mb-2",
            "p-2"
          );
          const div = document.createElement("div");
          li.appendChild(div);

          const dltBtn = document.createElement("button");
          dltBtn.textContent = "Sil";
          dltBtn.classList.add("btn", "btn-danger");

          const editBtn = document.createElement("button");
          editBtn.textContent = "Düzenle";
          editBtn.classList.add(
            "btn",
            "btn-warning",
            "mx-2"
          );

          div.appendChild(dltBtn);
          div.appendChild(editBtn);

          dltBtn.addEventListener("click", () => {
            this.deleteToDo(this.toDos[i].toDoText);
          });

          editBtn.addEventListener("click", () => {
            const newText = prompt(
              "Güncellemek istediğiniz görevi giriniz.."
            );
            this.changeToDo(i, newText);
          });

          this.listEl.appendChild(li);
        } else {
          console.log("( )", this.toDos[i].toDoText);

          const li = document.createElement("li");
          li.textContent = this.toDos[i].toDoText;
          li.classList.add(
            "list-group-item",
            "d-flex",
            "justify-content-between",
            "align-items-center",
            "text-bg-light",
            "rounded-3",
            "mb-2",
            "p-2"
          );
          const div = document.createElement("div");
          li.appendChild(div);

          const dltBtn = document.createElement("button");
          dltBtn.textContent = "Sil";
          dltBtn.classList.add("btn", "btn-danger");

          const editBtn = document.createElement("button");
          editBtn.textContent = "Düzenle";
          editBtn.classList.add(
            "btn",
            "btn-warning",
            "mx-2"
          );

          const completedBtn =
            document.createElement("button");
          completedBtn.textContent = "Tamamlandı";
          completedBtn.classList.add("btn", "btn-success");

          div.appendChild(dltBtn);
          div.appendChild(editBtn);
          div.appendChild(completedBtn);

          dltBtn.addEventListener("click", () => {
            this.deleteToDo(this.toDos[i].toDoText);
          });

          editBtn.addEventListener("click", () => {
            const newText = prompt(
              "Güncellemek istediğiniz görevi giriniz.."
            );

            this.changeToDo(i, newText);
          });

          completedBtn.addEventListener("click", () => {
            this.toggleCompleted(i);
          });

          this.listEl.appendChild(li);
        }
      }
    }
  },

  addToDo(toDoText) {
    this.toDos.push({
      toDoText: toDoText,
      completed: false,
    });
    this.listEl.innerHTML = "";

    this.displayTodos();
  },

  deleteToDo(toDo) {
    for (let i = 0; i < this.toDos.length; i++) {
      if (this.toDos[i].toDoText === toDo) {
        this.toDos.splice(i, 1);
        this.listEl.innerHTML = "";
        this.displayTodos();
      }
    }
  },

  changeToDo(index, newText) {
    if (newText === "") {
      alert("Lütfen bir şeyler yazın");
      return;
    }
    this.toDos[index].toDoText = newText;
    this.toDos[index].toDoText += " (Düzenlendi)";
    this.listEl.innerHTML = "";
    this.displayTodos();

    if (
      this.toDos[index].toDoText.includes("(Tamamlandı)")
    ) {
      this.toDos[index].toDoText = this.toDos[
        index
      ].toDoText.replace("(Tamamlandı)", "");
    }
  },

  toggleCompleted(index) {
    const todo = this.toDos[index];
    todo.completed = !todo.completed;
    this.toDos[index].toDoText += " (Tamamlandı)";
    this.listEl.innerHTML = "";

    this.displayTodos();
  },

  toggleAll() {
    this.toDos.forEach((todo) => {
      todo.completed = true;
      if (todo.toDoText.includes(" (Tamamlandı)")) {
        return;
      } else {
        todo.toDoText += " (Tamamlandı)";
      }
    });
    this.listEl.innerHTML = "";
    this.displayTodos();
  },
};

export {toDoList};
