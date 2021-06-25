<template>
  <section class="page">
    <div class="todo__control">
      <div class="todo__edit buttons" @click="cancelEditing">Cancel</div>
    </div>
    <h1 class="page__title">{{ `Edit Note: '${buffer.title}'` }}</h1>
    <div class="page__edit-zone">
      <input
          v-model="buffer.title"
          placeholder="Todo title"
          class="input"
      >
      <div class="todo-items">
        <div class="todo-items__row" v-for="(item,index) in buffer.items" :key="index">
          <input type="checkbox" :id="index" :value="item.name" :checked="item.checked"
                 @change="item.checked = !item.checked">
          <input
              v-model="item.name"
              placeholder="Todo item title"
              class="todo-items__item-input"
          >
          <div class="todo-items__item-delete" @click="buffer.items.splice(index, 1)">+</div>
        </div>
        <div class="add-new-todo-form__row">
          <input
              v-model="newTodoItem"
              placeholder="New todo item"
              class="input"
          >
          <div @click="addNewTodoItem" class="buttons">Add</div>
        </div>
      </div>
    </div>
    <div class="todo-control-footer">
      <div class="todo__control">
        <div class="todo__undo buttons" @click="undo">Undo changes</div>
        <div class="todo__redo buttons" @click="redo">Redo changes</div>
      </div>
      <div class="todo__control">
        <div class="todo__save buttons" @click="saveTodo">Save</div>
        <div class="todo__delete buttons" @click="deleteTodo(buffer.id - 1)">Delete note</div>
      </div>
    </div>
  </section>
</template>

<script>
import {mixin} from "../mixins/mixin"

export default {
  name: "Edit",
  mixins: [mixin],
  data() {
    return {
      afterEdit: null,
      buffer: null,
      beforeEdit: null,
      newTodoItem: '',
    }
  },
  methods: {
    undo() {
      this.buffer = {...this.beforeEdit}
    },
    redo() {
      if (this.afterEdit) this.buffer = {...this.afterEdit}
    },
    addNewTodoItem() {
      if (this.newTodoItem) {
        this.buffer.items.push({name: this.newTodoItem, checked: false})
        this.newTodoItem = ''
      }
    },
    saveTodo() {
      const todos = [...this.todos]
      todos[this.buffer.id - 1] = this.buffer
      this.$store.dispatch('saveTodos', todos)
      this.$router.push('/')
    },
  },
  computed: {
    todo() {
      return this.todos.find(item => item.id.toString() === this.$route.params.id)
    }
  },
  watch: {
    todos: function (item) {
      this.buffer = JSON.parse(JSON.stringify(item))
      this.beforeEdit = JSON.parse(JSON.stringify(item))
    }
  },
  beforeUpdate() {
    //update afterEdit on every re-render, without undo operation
    if (JSON.stringify(this.beforeEdit) !== JSON.stringify(this.buffer)) {
      this.afterEdit = {...this.buffer}
    }
  },
  beforeMount() {
    this.buffer = JSON.parse(JSON.stringify(this.todo))
    this.beforeEdit = JSON.parse(JSON.stringify(this.todo))
  }
}
</script>

<style scoped>
.page {
  padding: 1.3rem;
}

.page__edit-zone {
  padding-bottom: 20px;
}

.todo-control-footer {
  display: flex;
  justify-content: space-between;
}

.todo__delete {
  transform: rotate(0deg);
  font-size: 1rem;
  background-color: red;
  color: white;
  border: none;
}

.todo__save {
  background-color: green;
  color: white;
  border: none;
}

.todo-items__row {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 20px 0 0;
}

.add-new-todo-form__row {
  padding-top: 20px;
}

.todo-items__item-delete {
  transform: rotate(45deg);
  font-size: 1.5rem;
}

.todo-items__item-input {
  padding: 5px 10px;
  border: none;
  border-bottom: 1px solid lightgray;
}

.todo-items__item-input:focus {
  outline: none;
}

@media (max-width: 600px) {
  .todo-control-footer {
    flex-direction: column;
    gap: 20px;
  }
}
</style>