<template>
    <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm z-10">
            <div>
                <router-link :to="{name: 'Home'}" class="text-sm font-semibold leading-6 text-gray-900"><span aria-hidden="true" class="p-3">←</span>Home</router-link>
            </div>
            <img class="mx-auto h-10 w-auto" src="/img/logo.png" alt="Your Company" />
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
export default {

}
</script>