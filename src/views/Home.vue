<template>
  <section class="todo-list">
    <h1 class="todo-list__title">TODO LIST</h1>
    <div class="todo-list-items">
      <todo v-for="todo in todos" :todo="todo" />
    </div>
    <form class="add-new-todo-form" v-if="isFormOpened" @click.self="setFormVisibility" @submit.prevent="saveTodo">
      <div class="add-new-todo-form__content-wrapper">
        <label for="new-todo">Add a todo</label>
        <input
            v-model="newTodoTitle"
            id="new-todo"
            placeholder="Todo title"
        >
        <div class="add-new-todo-form__row">
          <input
              v-model="newTodoItem"
              placeholder="New todo item"
          >
          <div @click="addItemToNewTodo">Add</div>
        </div>
        <ul class="add-new-todo-form__new-todo-items todo-items-block">
          <li class="add-new-todo-form__todo-item todo-items-block__todo-item" v-for="item in newTodoItems">{{ item }}</li>
        </ul>
        <button>save</button>
      </div>
    </form>
    <div class="todo-list__add-new" @click="setFormVisibility"></div>
  </section>
</template>

<script>
import todo from '@/components/todo.vue'

export default {
  name: 'Home',
  components: {
    todo
  },
  data() {
    return {
      isFormOpened: true,
      newTodoTitle: '',
      newTodoItem: '',
      newTodoItems: []
    }
  },
  computed: {
    todos() {
      return this.$store.state.todos
    }
  },
  methods: {
    setFormVisibility() {
      this.isFormOpened = !this.isFormOpened
    },
    addItemToNewTodo() {
      if (this.newTodoItem) {
        this.newTodoItems.push(this.newTodoItem)
        this.newTodoItem = ''
      }
    },
    saveTodo() {
      if (this.newTodoTitle) {
        //add new item to todos array
        const todos = [...this.todos]
        todos.push({ title: this.newTodoTitle, items: this.newTodoItems, id: todos.length })
        //save final array to store
        this.$store.commit('setTodoList', todos)

        //cleanup and close form
        this.newTodoTitle = ''
        this.newTodoItem = ''
        this.newTodoItems = []
        this.setFormVisibility()
      }
    }
  }
}
</script>

<style>
.todo-list {
  position: relative;
  padding: 0 1rem;
}

.todo-list__title {
  text-align: center;
  margin: 0;
  padding: .67em 0;
}

.todo-list__add-new {
  border-radius: 50%;
  background: #00EAFFFF;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 40px;
  right: 40px;
  z-index: 1;
}

.todo-list__add-new::after {
  content: '+';
  color: white;
  font-size: 2rem;
}

.add-new-todo-form {
  position: absolute;
  z-index: 2;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.2);
}

.add-new-todo-form__content-wrapper {
  width: 90%;
  max-width: 300px;
  max-height: 300px;
  height: 90%;
  background-color: white;
  border-radius: 10px;
  padding: 2rem 1.3rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.add-new-todo-form__row {
  display: flex;
}
</style>
