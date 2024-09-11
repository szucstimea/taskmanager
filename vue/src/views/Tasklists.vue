<template>
  <PageComponent>
    <template v-slot:header>
      <div class="flex justify-between items-center">
        <h1 class="flex flex-row text-3xl font-bold text-gray-900">Task lists</h1>
        <router-link :to="{ name: 'TasklistCreate' }"
          class="flex py-2 px-3 text-white bg-emerald-500 rounded-md hover:bg-emerald-600">
          <PlusIcon class="w-5 h-5" />
          Add new Task list
        </router-link>
      </div>
    </template>
    <div v-if="!tasklists.length" class="flex flex-col text-center"
      >
        The list of Task lists is empty, please add at least one Task list
      </div>
    <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
      <TasklistListItem 
      v-for="tasklist in tasklists" 
      :key="tasklist.id" 
      :tasklist="tasklist"
      @delete="deleteTasklist(tasklist)"
       />
    </div>
  </PageComponent>
</template>

<script setup>
import PageComponent from '../components/PageComponent.vue';
import TasklistListItem from '../components/TasklistListItem.vue';
import { PlusIcon } from "@heroicons/vue/24/solid";
import store from '../store';
import { computed } from 'vue';

const tasklists = computed(() => store.state.tasklists.data);

store.dispatch('getTasklists');


function deleteTasklist(tasklist) {
  if (confirm('Are you sure you want to delete this Task list?')) {
    store.dispatch('deleteTasklist', tasklist.id)
    .then(() => {
      store.dispatch('getTasklists')})
  }
}

</script>