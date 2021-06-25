<template>
  <div id="app">
    <vue-confirm-dialog></vue-confirm-dialog>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'Main',
  beforeMount() {
    const todos = JSON.parse(localStorage.getItem('todos'))
    this.$store.commit('setTodoList', todos)
  }
}
</script>
<style>
* {
  font-family: 'Montserrat';
}
#app {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20vh 0;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.vc-btn-grid .vc-btn {
  color: black;
  border-top: none;
 }
.buttons {
  padding: 5px 10px;
  border: 1px solid lightgray;
  border-radius: 5px;
  cursor: pointer;
}
.page {
  padding: 0 1.3rem 1.3rem;
  width: 90%;
  box-sizing: border-box;
  max-width: 1100px;
  border: 1px solid lightgray;
  border-radius: 10px;
}

@media (max-width: 600px) {
  #app {
    padding: 10vh 0;
  }
}
</style>
