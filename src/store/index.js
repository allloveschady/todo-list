import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    todos: [
    ]
  },
  mutations: {
    setTodoList(state, todos) {
      state.todos = todos
    }
  },
  actions: {
    saveTodos({commit}, todos) {
      commit('setTodoList', todos)
      localStorage.setItem('todos', JSON.stringify(todos))
    }
  },
  modules: {
  }
})
