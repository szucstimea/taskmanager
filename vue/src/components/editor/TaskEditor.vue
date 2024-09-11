<template>
    <div class="flex items-center justify-between">
        <h3 class="text-lg font-bold">
            {{ index + 1 }}. {{ model.title }}
        </h3>
        <div class="flex items-center">
            <!-- Delete Task -->
            <button type="button" @click="deleteTask()" class="
              flex
              items-center
              text-xs
              py-1
              px-3
              rounded-sm
              border border-transparent
              text-red-500
              hover:border-red-600
            ">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd"
                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                        clip-rule="evenodd" />
                </svg>
                Delete
            </button>
            <!--/ Delete Task -->
        </div>
    </div>
    <div class="grid gap-3 grid-cols-12">
        <!-- Title -->
        <div class="mt-3 col-span-12">
            <label :for="'task_text_' + model.title" class="block text-sm font-medium text-gray-700">Title</label>
            <input type="text" :name="'task_text_' + model.title" v-model="model.title" @change="dataChange"
            :id="'task_text_' + model.data" class="
            mt-1
            focus:ring-indigo-500 focus:border-indigo-500
            block
            w-full
            shadow-sm
            sm:text-sm
            border-gray-300
            rounded-md
            " />
        </div>
        <!--/ Title -->
        
        <div class="mt-3 col-span-9">
        <!--Status-->
        <div>
            <label for="status" class="block text-sm font-medium text-gray-700">Select Status</label>
            <select id="status" name="status" v-model="model.status" @change="dataChange" class="
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
        </div>
        <!--/ Status-->
    </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
    task: Object,
    index: Number
});

const emit = defineEmits(["change", "deleteTask"]);

const model = ref(JSON.parse(JSON.stringify(props.task)));

function deleteTask(){
    emit("deleteTask", props.task); 
}

function dataChange(){
    const data = JSON.parse(JSON.stringify(model.value));
    emit("change", data);
}


</script>