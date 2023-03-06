import { mount } from '@vue/test-utils'
import TodosComponent from '@/components/TodosComponent.vue'

describe('TodosComponent.vue', () => {
  it('displays a list of todos', () => {
    const todos = [
      { id: 1, title: 'Todo 1', completed: false },
      { id: 2, title: 'Todo 2', completed: true },
    ]
    const wrapper = mount(TodosComponent, {
      propsData: {
        todos,
      },
    })

    const todoItems = wrapper.findAll('.todo-item')
    expect(todoItems.length).toBe(2)

    expect(todoItems.at(0).text()).toContain('Todo 1')
    expect(todoItems.at(1).text()).toContain('Todo 2')
  })

  it('displays edit and delete options for each todo', () => {
    const todos = [
      { id: 1, title: 'Todo 1', completed: false },
      { id: 2, title: 'Todo 2', completed: true },
    ]
    const wrapper = mount(TodosComponent, {
      propsData: {
        todos,
      },
    })

    const todoItems = wrapper.findAll('.todo-item')
    expect(todoItems.length).toBe(2)

    const editButtons = wrapper.findAll('.edit-button')
    expect(editButtons.length).toBe(2)

    const deleteButtons = wrapper.findAll('.delete-button')
    expect(deleteButtons.length).toBe(2)
  })

  it('displays a search field', () => {
    const todos = [
      { id: 1, title: 'Todo 1', completed: false },
      { id: 2, title: 'Todo 2', completed: true },
    ]
    const wrapper = mount(TodosComponent, {
      propsData: {
        todos,
      },
    })

    const searchField = wrapper.find('.search-field')
    expect(searchField.exists()).toBe(true)
  })
})
