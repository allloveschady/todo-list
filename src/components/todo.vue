<template>
  <div class="todo">
    <h2>{{todo.title}}</h2>
    <ul class="todo-items-block">
      <li class="todo-items-block__todo-item" v-for="item in todo.items">{{ item }}</li>
    </ul>
  </div>

</template>

<script>
export default {
  name: "todo",
  props: ['todo'],
}
</script>

<style scoped>

</style>