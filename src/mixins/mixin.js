export const mixin = {
    computed: {
        todos() {
            return this.$store.state.todos
        },
    },
    methods: {
        deleteTodo(id) {
            const todosArray = [...this.todos]
            this.$confirm(
                {
                    message: `Are you sure? Todo item will be removed`,
                    button: {
                        no: 'Cancel',
                        yes: 'Delete anyway'
                    },
                    callback: confirm => {
                        if (confirm) {
                            todosArray.splice(id, 1)
                            this.$store.dispatch('saveTodos', todosArray)
                            if (this.$route.name === 'Edit') {
                                this.$router.push('/')
                            }
                        }
                    }
                }
            )
        },
        saveNewToStore(title, items) {
                const todos = [...this.todos]
                todos.push({title, items, id: todos.length + 1})
                this.$store.dispatch('saveTodos', todos)

        },
        cancelEditing() {
            this.$confirm(
                {
                    message: `Are you sure? All changes will be discarded`,
                    button: {
                        no: 'No',
                        yes: 'Yes'
                    },
                    callback: confirm => {
                        if (confirm) {
                            this.$router.push('/')
                        }
                    }
                }
            )
        }
    }
}