<template>
      <div class="mx-auto max-w-2xl py-24 sm:py-24 lg:py-24">
        <div class="text-center">
          <div class="pb-8">
              <img src="/img/logo.png" class="w-24 h-24 mx-auto"></img>
          </div>
          <h1 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">Task Manager</h1>
          <p class="mt-6 text-lg leading-8 text-gray-600">Welcome to Task Master, your all-in-one solution for staying organized and on top of your tasks. Simplify your workflow and achieve your goals with ease, every day.</p>
          <div class="mt-10 flex items-center justify-center gap-x-6">
            <router-link :to="{name: 'Login'}" class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Get started</router-link>
            <a href="https://github.com/szucstimea/taskmanager" class="text-sm font-semibold leading-6 text-gray-900">Learn more <span aria-hidden="true">→</span></a>
          </div>
        </div>
      </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { Dialog, DialogPanel } from '@headlessui/vue'
  import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'
  
  const mobileMenuOpen = ref(false)
  </script>