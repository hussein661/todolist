import { mount } from '@vue/test-utils'
import TaskForm from '@/components/TaskForm.vue'

describe('TaskForm.vue', () => {
  it('submits the form with correct data', async () => {
    const wrapper = mount(TaskForm)

    const taskDescriptionInput = wrapper.find('#description')
    await taskDescriptionInput.setValue('New task')

    const colorInput = wrapper.find('#color')
    await colorInput.setValue('blue')

    const priorityInput = wrapper.find('#priority')
    await priorityInput.setValue('High')

    const dateInput = wrapper.find('#date')
    await dateInput.setValue('2022-03-01')

    await wrapper.find('form').trigger('submit')

    expect(wrapper.emitted().submit[0][0]).toMatchObject({
      taskDescription: 'New task',
      color: 'blue',
      priority: 'High',
      date: '2022-03-01',
    })
  })
})
