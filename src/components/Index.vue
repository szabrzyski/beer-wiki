<script setup>

import { ref } from 'vue';
import PaginationBar from './PaginationBar.vue';

// Data

const beersPerPage = 18;
const defaultIbuFilterType = 'ibu_gt';

// Reactive data

const apiEndpoint = "https://api.punkapi.com/v2/beers";
const beerName = ref("");
const ibuFilterType = ref(defaultIbuFilterType);
const ibuFilterValue = ref("");
const beers = ref([]);
const currentPage = ref(1);



/**
 * Reset the filters.
 */
async function reset() {
    beerName.value = '';
    ibuFilterValue.value = '';
    ibuFilterType.value = defaultIbuFilterType;
    getBeers();
}

/**
 * Get beers from the API.
 */
async function getBeers(page = 1) {

    currentPage.value = page;

    let queryParams = {
        per_page: beersPerPage,
        page: currentPage.value,
    };

    beerName.value ? queryParams.beer_name = beerName.value : '';
    ibuFilterValue.value ? queryParams[ibuFilterType.value] = ibuFilterValue.value : '';



    let axiosResponse = await axios({
        method: 'GET',
        url: apiEndpoint,
        params: queryParams,
    })
        .then((response) => {
            console.log(response)
            beers.value = response.data;
        })
        .catch(function (error) {
            console.log(error);
        })
        .then(function () {

        });
}

</script>

<template>
    <div class="container py-3">
        <header class="my-2">
            <nav class="navbar navbar-expand">
                <div class="container">
                    <ul class="navbar-nav d-flex justify-content-center w-100">
                        <div
                            class="row w-100 py-1 align-items-center d-flex justify-content-between justify-content-md-end">
                            <div class="col-12 ps-0 col-md-auto me-md-auto mb-3 mb-md-0">
                                <a class="navbar-brand">Beer index</a>
                            </div>
                            <div class="col-12 col-md-3 ps-0 pe-0 mb-3 mb-md-0">
                                <input class="form-control" type="text" placeholder="Name" v-model="beerName">
                            </div>
                            <div class="col-12 col-md-3 ps-0 ps-md-3 col-lg-2 pe-0 mb-3 mb-md-0">
                                <div class="input-group">
                                    <input class="form-control w-50" type="number" placeholder="IBU" step="0.5" min="0"
                                        max="100" v-model="ibuFilterValue">
                                    <select class="form-select w-50" v-model="ibuFilterType">
                                        <option value="ibu_gt">GT</option>
                                        <option value="ibu_lt">LT</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-6 ps-0 ps-md-3 col-md-auto pe-0">
                                <button class="btn btn-success w-100" type="submit"
                                    v-on:click="getBeers()">Search</button>
                            </div>
                            <div class="col-6 ps-sm-3 col-md-auto pe-0">
                                <button class="btn btn-secondary w-100" type="button" v-on:click="reset()">Reset</button>
                            </div>
                        </div>
                    </ul>
                </div>
            </nav>
        </header>
        <main class="mt-4">
            <div class="container">
                <div class="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4">
                    <div class="col" v-for="beer in beers" :key="beer.id">
                        <div class="card h-100">
                            <div class="card-body">
                                <h5 class="card-title text-center text-truncate">{{ beer.name }}</h5>
                                <div class="row mx-auto">
                                    <div class="col-12 col-md-5 col-xl-6">
                                        IBU: {{ beer.ibu }}
                                    </div>
                                    <div class="col-12 col-md-7 col-xl-6">
                                        FoodPairing: {{ beer.food_pairing.length }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <PaginationBar v-on:paginate="getBeers" :current-page="currentPage" />
            </div>
        </main>
    </div>
</template>