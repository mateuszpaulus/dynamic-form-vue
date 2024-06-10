<template>
  <main class="form-container">
    <div class="search-container">
      <input
        type="text"
        v-model="searchText"
        placeholder="Search..."
        :class="{ highlighted: isSearchHighlighted }"
        data-test-id="search-input"
      />
    </div>
    <div class="form">
      <div v-for="(field, index) in fields" :key="index" class="field">
        <input
          type="text"
          v-model="field.value"
          :placeholder="'Enter text ' + (index + 1)"
          :class="{ highlighted: isHighlighted(field.value) }"
          data-test-id="text-input-field"
        />
        <span data-test-id="count-vowels">{{ countVowels(field.value) }} vowels</span>
        <button
          data-test-id="remove-field-button"
          @click="removeField(index)"
          :disabled="fields.length === 1"
        >
          Remove
        </button>
      </div>
      <button data-test-id="add-field-button" @click="addField" :disabled="fields.length >= 10">
        Add Field
      </button>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const fields = ref([{ value: '' }])
const searchText = ref('')

const addField = () => {
  if (fields.value.length < 10) {
    fields.value.push({ value: '' })
  }
}

const removeField = (index: number) => {
  if (fields.value.length > 1) {
    fields.value.splice(index, 1)
  }
}

const countVowels = (text: string): number => {
  const vowels = text.match(/[aeiou]/gi)
  return vowels ? vowels.length : 0
}

const isSearchHighlighted = computed(() => {
  return fields.value.some((field) => isHighlighted(field.value))
})

const isHighlighted = (value: string): boolean => {
  const lowercasedValue = value.toLowerCase()
  const searchValue = searchText.value.toLowerCase()
  return searchText.value !== '' && lowercasedValue.includes(searchValue)
}
</script>

<style scoped></style>
