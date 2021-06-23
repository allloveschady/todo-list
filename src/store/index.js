import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    todos: [
      { title: 'test1', items: ['asd', 'rtyr'], id: 1 }
    ]
  },
  mutations: {
    setTodoList(state, todos) {
      state.todos = todos
    }
  },
  actions: {
  },
  modules: {
  }
})
