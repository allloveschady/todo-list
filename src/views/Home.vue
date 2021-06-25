<template>
  <section class="page">
    <h1 class="page__title">TODO LIST</h1>
    <div class="page-todo-items">
      <todo v-for="todo in todos" :todo="todo" :todos="todos"/>
    </div>
    <transition name="fade">
      <form class="add-new-todo-form" v-if="isFormOpened" @click.self="setFormVisibility" @submit.prevent="saveTodoList">
        <div class="add-new-todo-form__content-wrapper">
          <label for="new-todo">Add a todo</label>
          <input
              v-model="newTodoTitle"
              id="new-todo"
              placeholder="Todo title"
              class="input"
          >
          <div class="add-new-todo-form__row">
            <input
                v-model="newTodoItem"
                placeholder="New todo item"
                class="input"
            >
            <div @click="addItemToNewTodo" class="buttons">Add</div>
          </div>
          <ul class="add-new-todo-form__new-todo-items todo-items-block">
            <li class="add-new-todo-form__todo-item todo-items-block__todo-item" v-for="item in newTodoItems">
              {{ item.name }}
            </li>
          </ul>
          <button class="add-new-todo-form__button buttons">Save</button>
        </div>
      </form>
    </transition>
    <div class="page__add-new-todo" @click="setFormVisibility"></div>
  </section>
</template>

<script>
import todo from '@/components/todo.vue'
import {mixin} from "../mixins/mixin";

export default {
  name: 'Home',
  mixins: [mixin],
  components: {
    todo
  },
  data() {
    return {
      isFormOpened: false,
      newTodoTitle: '',
      newTodoItem: '',
      newTodoItems: []
    }
  },
  methods: {
    setFormVisibility() {
      this.isFormOpened = !this.isFormOpened
    },
    addItemToNewTodo() {
      if (this.newTodoItem) {
        this.newTodoItems.push({name: this.newTodoItem, checked: false})
        this.newTodoItem = ''
      }
    },
    saveTodoList() {
      if (this.newTodoTitle) {
        this.saveNewToStore(this.newTodoTitle, this.newTodoItems)

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

.page__title {
  text-align: center;
  margin: 0;
  padding: .67em 0;
}

.page__add-new-todo {
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

.page__add-new-todo::after {
  content: '+';
  color: white;
  font-size: 2rem;
}

.page-todo-items {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
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
  gap: 15px;
}

.todo-items-block {
  margin: 0;
}

.add-new-todo-form__row {
  display: flex;
  width: 100%;
  align-items: center;
  gap: 10px;
}
.input {
  padding: 10px 15px;
  background-color: transparent;
  width: 100%;
  box-sizing: border-box;
  border: 1px solid lightgray;
  border-radius: 10px;
}
.input:focus {
  outline: none;
}
.add-new-todo-form__button {
  background: transparent;
  box-sizing: border-box;
}

@media (max-width: 1023px) {
  .page-todo-items {
    justify-content: center;
  }
}
@media (max-width: 768px) {
  .page__add-new-todo {
    bottom: 20px;
    right: 20px;
  }
}
</style>
