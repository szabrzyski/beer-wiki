<script setup>

// Props

const props = defineProps({
    beer: Object,
});

</script>

<template>
    <div class="card h-100">
        <div class="card-body">
            <h5 class="card-title text-center text-truncate">{{ props.beer.name }}</h5>
            <div class="row mx-auto">
                <div class="col-12 col-md-5 col-xl-6">
                    IBU: {{ props.beer.ibu }}
                </div>
                <div class="col-12 col-md-7 col-xl-6">
                    FoodPairing: {{ props.beer.food_pairing.length }}
                </div>
            </div>
        </div>
    </div>
</template>