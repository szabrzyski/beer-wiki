<script setup>

// Props

const props = defineProps({
    currentPage: Number,
});

// Emits

const emit = defineEmits(['paginate']);

</script>

<template>
    <div class="row mt-4">
        <div class="col-12">
            <nav>
                <ul class="pagination justify-content-end m-0 d-flex flex-wrap">

                    <!-- Previous Page Link -->

                    <li class="page-item" :class="{ disabled: props.currentPage == 1 }">
                        <a class="page-link" v-on:click="emit('paginate', props.currentPage - 1)"
                            rel="prev">&lsaquo;</a>
                    </li>

                    <!-- Pagination Elements -->

                    <template v-for="pageNumber in 4" :value="pageNumber" :key="pageNumber">

                        <li v-if="pageNumber >= 0 && pageNumber == props.currentPage" class="page-item active"><span
                                class="page-link">{{
                                    pageNumber
                                }}</span></li>
                        <li v-else-if="pageNumber >= 0 && pageNumber != props.currentPage" class="page-item">
                            <a class="page-link pointer" v-on:click="emit('paginate', pageNumber)">{{
                                pageNumber
                            }}</a>
                        </li>

                    </template>

                    <!-- Next Page Link -->

                    <li class="page-item" :class="{ disabled: props.currentPage == 4 }">
                        <a class="page-link" v-on:click="emit('paginate', props.currentPage + 1)"
                            rel="next">&rsaquo;</a>
                    </li>

                </ul>
            </nav>
        </div>
    </div>
</template>