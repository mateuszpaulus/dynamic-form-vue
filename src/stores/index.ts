import { defineStore } from 'pinia'
import type { Store } from 'pinia'

interface Field {
  value: string
}

interface FormFieldState {
  fields: Field[]
  searchText: string
}

interface FormFieldGetters {
  isSearchHighlighted: () => boolean
}

interface FormFieldActions {
  addField: () => void
  removeField: (index: number) => void
  isHighlighted: (value: string) => boolean
  countVowels: (value: string) => number
}

type FormFieldStore = Store<'formField', FormFieldState, FormFieldGetters, FormFieldActions>

export const useFormFieldStore = defineStore({
  id: 'formField',
  state: (): FormFieldState => ({
    fields: [{ value: '' }],
    searchText: ''
  }),
  getters: {
    isSearchHighlighted(this: FormFieldStore): boolean {
      return this.fields.some((field) => this.isHighlighted(field.value))
    }
  },
  actions: {
    addField(): void {
      if (this.fields.length < 10) {
        this.fields.push({ value: '' })
      }
    },
    removeField(index: number): void {
      if (this.fields.length > 1) {
        this.fields.splice(index, 1)
      }
    },
    isHighlighted(value: string): boolean {
      const lowerCasedValue = value.toLowerCase()
      const searchValue = this.searchText.toLowerCase()
      return searchValue !== '' && lowerCasedValue.includes(searchValue)
    },
    countVowels(value: string): number {
      const vowels = value.match(/[aeiou]/gi)
      return vowels ? vowels.length : 0
    }
  }
})
