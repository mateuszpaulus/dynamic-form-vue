<template>
  <div class="form-container">
    <div class="search-container">
      <input
        type="text"
        v-model="formFieldStore.searchText"
        placeholder="Search..."
        :class="{ highlighted: formFieldStore.isSearchHighlighted }"
      />
    </div>
    <div class="form">
      <div v-for="(field, index) in formFieldStore.fields" :key="index" class="field">
        <input
          type="text"
          v-model="field.value"
          :placeholder="'Enter text ' + (index + 1)"
          :class="{ highlighted: formFieldStore.isHighlighted(field.value) }"
        />
        <span>{{ formFieldStore.countVowels(field.value) }} vowels</span>
        <button
          @click="formFieldStore.removeField(index)"
          :disabled="formFieldStore.fields.length === 1"
        >
          Remove
        </button>
      </div>
      <button @click="formFieldStore.addField()" :disabled="formFieldStore.fields.length >= 10">
        Add Field
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFormFieldStore } from '@/stores'

const formFieldStore = useFormFieldStore()
</script>

<style scoped></style>
