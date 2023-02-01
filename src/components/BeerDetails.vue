<script setup>

import { useRouter } from 'vue-router';

// Routing

const router = useRouter();

// Props

const props = defineProps({
    beer: Object,
});

function test() {
    router.go(-1);
}

</script>

<template>
    <div class="container py-3">
        <div class="row">
            <div class="col-12">
                <button class="btn btn-secondary w-100" type="button" v-on:click="test()">Reset</button>
            </div>
        </div>
    </div>
</template>