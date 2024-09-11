<template>
  <div  class="
      flex flex-col
      py-4
      px-6
      shadow-md
      bg-white
      hover:bg-gray-50">
        <h4 class="mt-4 text-lg font-bold">{{ tasklist.title }}</h4>
        <h2>Description: {{ tasklist.description }}</h2>
        <div class="m-1 p-2 relative flex flex-col text-gray-700 rounded-xl">
          <h4 class="mt-4 text-lg font-bold">Tasks</h4>
          <div v-if="tasklist.tasks.length" v-for="task in tasklist.tasks" :key="task.id" role="button"
            class="flex items-center w-full p-3 py-1 pr-1 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900">
            <div :class="statusClass(task.status)" class="flex flex-row">
              <CheckIcon class="w-5 h-5 pr-1" v-if="task.status === 'Completed'" />
              <ArrowPathIcon class="w-5 h-5 pr-1" v-if="task.status === 'In Progress'" />
              <EllipsisHorizontalCircleIcon class="w-5 h-5 pr-1" v-if="task.status === 'Pending'" />
              {{ task.title }}
            </div>
            <div class="grid ml-auto place-items-center justify-self-end">
            </div>
          </div>
          <div v-else class="text-center text-gray-600">
              There is no task in the list
            </div>
        </div>
        <h2 class="pt-2">Deadline: {{ tasklist.deadline }}</h2>
        <h2 :class="statusClass(tasklist.status)" class="font-bold">{{ tasklist.status }}</h2>
        <div class="flex justify-between items-center mt-3">
          <router-link :to="{ name: 'TasklistView', params: { id: tasklist.id } }" class="
          flex
          py-2
          px-4
          border border-transparent
          text-sm
          rounded-md
          text-white
          bg-indigo-600
          hover:bg-indigo-700">
            Edit
          </router-link>
          <button v-if="tasklist.id" 
          type="button" 
          @click="emit('delete', tasklist)" 
          class="
          h-8
          w-8
          flex
          items-center
          justify-center
          rounded-full
          border border-transparent
          text-sm text-red-500">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
              <path fill-rule="evenodd"
                d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                clip-rule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
</template>

<script setup>

import { CheckIcon, ArrowPathIcon, EllipsisHorizontalCircleIcon } from "@heroicons/vue/24/solid"

const {tasklist} = defineProps({
    tasklist: Object
})
const emit = defineEmits(['delete'])

const statusClass = (status) => {
  switch (status) {
    case 'Completed':
      return 'text-green-500';
    case 'In Progress':
      return 'text-yellow-500';
    case 'Pending':
      return 'text-red-500';
    default:
      return 'text-gray-500';
  }
};

</script>