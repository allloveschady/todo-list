<template>
  <div class="todo">
    <div class="todo__control">
      <div class="todo__edit" @click="$router.push(`/edit/${todo.id}`)">Edit</div>
      <div class="todo__delete" @click="deleteTodo(todo.id - 1)">+</div>
    </div>
    <h2 class="todo__title">{{todo.title}}</h2>
    <ul class="todo-items-block">
      <template v-for="item in todo.items.slice(0, 5)">
        <li class="todo-items-block__todo-item" v-if="!item.checked">{{ item.name }}</li>
      </template>
    </ul>
  </div>

</template>

<script>
import {mixin} from "../mixins/mixin";

export default {
  name: "todo",
  props: ['todo'],
  mixins: [mixin],
  methods: {
  }
}
</script>

<style>
.todo {
  background-color: yellow;
  position: relative;
  padding: 15px;
  width: 100%;
  max-width: 200px;
  cursor: default;
}
.todo__control {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
}
.todo__delete {
  transform: rotate(45deg);
  font-size: 1.75rem;
}
.todo__edit, .todo__delete {
  cursor: pointer;
}
.todo__title {
  margin-top: 0;
}
</style>