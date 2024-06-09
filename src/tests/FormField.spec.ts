import { mount } from '@vue/test-utils'
import Home from '@/views/HomeView.vue'
import { describe, it, expect } from 'vitest'

describe('Home.vue', () => {
  it('renders search input', async () => {
    const wrapper = mount(Home)

    const searchInputWrapper = wrapper.find('input[data-test-id="search-input"]')
    const searchInput = searchInputWrapper.element as HTMLInputElement
    searchInput.value = 'test'
    searchInputWrapper.trigger('input')
    expect(searchInput.value).toBe('test')
  })

  it('adds a new field', async () => {
    const wrapper = mount(Home)
    const addFieldButton = wrapper.find('button[data-test-id="add-field-button"]')
    await addFieldButton.trigger('click')
    const fields = wrapper.findAll('.field')
    expect(fields.length).toBe(2)
  })

  it('removes a field', async () => {
    const wrapper = mount(Home)
    const removeButton = wrapper.find('button[data-test-id="remove-field-button"]')
    removeButton.trigger('click')
    const fields = wrapper.findAll('.field')
    expect(fields.length).toBe(1)
  })

  it('counts vowels correctly', async () => {
    const wrapper = mount(Home)
    const fieldInput = wrapper.find('input[data-test-id="text-input-field"]')
    await fieldInput.setValue('hello')
    const vowelCount = wrapper.find('span[data-test-id="count-vowels"]')
    expect(vowelCount.text()).toBe('2 vowels')
  })

  it('highlights search results', async () => {
    const wrapper = mount(Home)
    const searchInput = wrapper.find('input[data-test-id="search-input"]')
    await searchInput.setValue('hello')
    const fieldInput = wrapper.find('input[data-test-id="text-input-field"]')
    await fieldInput.setValue('hello')
    const highlightedFields = wrapper.findAll('.highlighted')
    expect(highlightedFields.length).toBe(2)
  })
})
