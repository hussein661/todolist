import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate'
const defaultTasks = [{ "description": "Play cards with the friends", "color": "#0f1de6", "priority": "low", "date": "2023-03-06", "id": 1678109515246 }, { "id": 1678110257763, "description": "Make a large pizza", "color": "#e60f0f", "priority": "medium", "date": "2023-03-06" }]
if(!localStorage.getItem('vuex')){
  localStorage.setItem('vuex',JSON.stringify({tasks:defaultTasks}))
}
const store = createStore({
  state() {
    return {
      tasks: [],
    };
  },
  mutations: {
    addTask(state, task) {
      const id = new Date().getTime()
      state.tasks.push({ id, ...task });
    },
    updateTask(state, { index, taskObject }) {
      console.log(taskObject)
      state.tasks = state.tasks.map((oldTask, idx) => {
        if (idx == index) {
          oldTask = taskObject
        }
        return oldTask
      })
    },
    deleteTask(state, index) {
      state.tasks.splice(index, 1);
    },
  },

  plugins: [createPersistedState({
    paths: ['tasks']
  })]

});

export default store;
