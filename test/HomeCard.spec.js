import { mount } from '@vue/test-utils'
import HomeCard from '@/components/HomeCard.vue'

describe('HomeCard', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(HomeCard)
    expect(wrapper.vm).toBeTruthy()
  })

  /* test('accept home object as a prop', () => {
    const wrapper = mount(NuxtLogo)
    expect(wrapper.vm).toBeTruthy()
  }) */
})
