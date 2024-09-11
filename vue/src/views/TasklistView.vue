<template>
  <PageComponent>
    <pre>{{  }}</pre>
    <template v-slot:header>
      <div class="flex items-center justify-between">
        <h1 class="text-3xl font-bold text-gray-900">
          {{ route.params.id ? model.title : "Create a Task list" }}
        </h1>
        <div class="flex flex-row items-center justify-between">
          <button 
          v-if="route.params.id" 
          type="button" 
          @click="deleteTasklist()"
          class="flex py-2 px-3 text-white bg-red-500 rounded-md hover:bg-red-600">
            <TrashIcon class="w-5 h-5"/> Delete Task list
          </button>
        </div>
      </div>
    </template>
    <div v-if="tasklistLoading" class="flex justify-center">Loading...</div>
    <form v-else @submit.prevent="saveTasklist">
      <div class="shadow sm:rounded-md sm:overflow-hidden">
        <!--Task list fields-->
        <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
          <!--Title-->
          <div>
            <label for="title" class="block text-sm font-medium text-gray-700">Title</label>
            <input type="text" name="title" id="title" v-model="model.title" autocomplete="tasklist_title"
              class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
          </div>
          <!--/ Title-->

          <!--Description-->
          <div>
            <label for="description" class="block text-sm font-medium text-gray-700">
              Description
            </label>
            <div class="mt-1">
              <textarea id="description" name="description" rows="3" v-model="model.description"
                autocomplete="tasklist_description"
                class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                placeholder="Describe your Task list" />
            </div>
          </div>
          <!--/ Description-->

          <!--Deadline-->
          <div>
            <label for="deadline" class="block text-sm font-medium text-gray-700">Deadline</label>
            <input type="date" name="deadline" id="deadline" v-model="model.deadline"
              class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
          </div>
          <!--/ Deadline-->

          <!--/Status-->
          <div>
            <label for="status" class="block text-sm font-medium text-gray-700">Select Status</label>
            <select id="status" name="status" v-model="model.status" @change="statusChange" class="
              mt-1
              block
              w-full
              py-2
              px-3
              border border-gray-300
              bg-white
              rounded-md
              shadow-sm
              focus:outline-none focus:ring-indigo-500 focus:border-indigo-500
              sm:text-sm
            ">
              <option>Completed</option>
              <option>In Progress</option>
              <option>Pending</option>
            </select>
          </div>
          <!--Status-->


          <!--Tasks-->
          <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
            <h3 class="text-2xl font-semibold flex items-center justify-between">
              Tasks
              <!-- Add new task -->
              <button type="button" @click="addTask(model.tasks.length)"
                class="flex items-center text-sm py-1 px-4 rounded-sm text-white bg-gray-600 hover:bg-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd"
                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                    clip-rule="evenodd" />
                </svg>
                Add Task
              </button>
              <!--/ Add new task -->
            </h3>
            <div v-if="!model.tasks.length" class="text-center text-gray-600">
              You don't have any task
            </div>
            <div v-for="(task, index) in model.tasks" :key="task.id">
              <TaskEditor :task="task" :index="index" @change="taskChange" @deleteTask="deleteTask" />
            </div>
          </div>
          <!--Tasks-->

          <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
            <button type="submit"
              class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
              Save
            </button>
          </div>

        </div>
        <!--/ Task list field-->

      </div>
    </form>
  </PageComponent>
</template>

<script setup>
import { TrashIcon } from "@heroicons/vue/24/solid";
import PageComponent from '../components/PageComponent.vue';
import TaskEditor from '../components/editor/TaskEditor.vue';
import { ref, watch, computed } from 'vue';
import store from '../store';
import { useRoute, useRouter } from 'vue-router';
import { v4 as uuidv4 } from "uuid";


const route = useRoute();
const router = useRouter();
const tasklistLoading = computed(() => store.state.currentTasklist.loading)

let model = ref({
  title: "",
  description: "",
  deadline: null,
  status: "",
  tasks: []
});

watch(
  () => store.state.currentTasklist.data,
  (newVal, oldVal) => {
    model.value = {
      ...JSON.parse(JSON.stringify(newVal))
    }
  }
);

if (route.params.id) {
  store.dispatch('getTasklist', route.params.id);
}

function deleteTask(task) {
  if(
    confirm("Are you sure yoe want to delete this task?")
  ){
    model.value.tasks = model.value.tasks.filter(
    (t) => t != task
  );
  }

}

function taskChange(task) {
  model.value.tasks = model.value.tasks.map((t) => {
    if ((t.id == task.id)) {
      return JSON.parse(JSON.stringify(task));
    }
    return t;
  })
}

function addTask(index) {
  const newTask = {
    id: uuidv4(),
    title: "",
    status: ""
  };
  model.value.tasks.splice(index, 0, newTask);
}

function saveTasklist() {
  store.dispatch("saveTasklist", { ...model.value })
    .then(({ data }) => {
      router.push({
        name: 'Tasklists'
      })
    });
}

function deleteTasklist(){
  if(
    confirm("Are you sure yoe want to delete this Task list?")
  ){
    store.dispatch("deleteTasklist", model.value.id)
    .then(() => {
      router.push({
        name: "Tasklists"
      })
    });
  }
}

</script>