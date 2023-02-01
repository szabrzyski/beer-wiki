<script setup>
import { ref, computed } from "vue";
import BeerItem from "./BeerItem.vue";
import PaginationBar from "./PaginationBar.vue";
import { useRouter, useRoute } from "vue-router";

// Routing

const router = useRouter();
const route = useRoute();

// Props

const props = defineProps({
  page: {
    type: [Number, String],
    default: 1,
  },
  beerName: {
    name: [String],
    default: "",
  },
  ibuFilterValue: {
    name: [Number, String],
    default: "",
  },
  ibuFilterType: {
    name: [String],
    default: "ibu_gt",
  },
});

// Data

const apiEndpoint = "https://api.punkapi.com/v2/beers";
const beersPerPage = 25;
const defaultIbuFilterType = "ibu_gt";

// Reactive data

const beerName = ref(props.beerName);
const ibuFilterType = ref(props.ibuFilterType);
const ibuFilterValue = ref(Number(props.ibuFilterValue));
const beers = ref({
  items: [],
  loaded: false,
});
const currentPage = ref(props.page);
const loadingInProgress = ref(false);
const errorMessage = ref("");
const firstSearch = ref(true);

// Computed

const noBeersFound = computed(() => {
  return beers.value.loaded && beers.value.items.length === 0;
});

// Methods

/**
 * Set default filters.
 */
function setDefaultFilters() {
  beerName.value = "";
  ibuFilterValue.value = "";
  ibuFilterType.value = defaultIbuFilterType;
}

/**
 * Validate input data.
 */
function validateData() {
  // Validate IBU value
  let ibuValue = ibuFilterValue.value;

  if ((typeof ibuValue != "number" && ibuValue !== "") || ibuValue < 0) {
    errorMessage.value = "Please provide correct IBU value";
    return false;
  }

  return true;
}

/**
 * Clear data.
 */
function clearData() {
  beers.value.loaded = false;
  beers.value.items = [];
  errorMessage.value = "";
}

/**
 * Clear data and get beers.
 */
function reset() {
  setDefaultFilters();
  getBeers(1);
}

/**
 * Get beers from the API.
 */
async function getBeers(page) {
  if (!validateData()) {
    return false;
  }

  loadingInProgress.value = true;
  clearData();

  page ? (currentPage.value = page) : "";

  if (firstSearch.value) {
    firstSearch.value = false;
  } else {
    router.push({
      name: "index",
      query: {
        page: page,
        name: beerName.value,
        ibu: ibuFilterValue.value,
        filter: ibuFilterType.value,
      },
      replace: true,
    });
  }

  let queryParams = {
    per_page: beersPerPage,
    page: currentPage.value,
  };

  beerName.value ? (queryParams.beer_name = beerName.value) : "";
  ibuFilterValue.value !== ""
    ? (queryParams[ibuFilterType.value] = ibuFilterValue.value)
    : "";

  /* global axios */
  await axios({
    method: "GET",
    url: apiEndpoint,
    params: queryParams,
  })
    .then((response) => {
      beers.value.items = response.data;
      beers.value.loaded = true;
    })
    .catch(function (error) {
      errorMessage.value = error.message;
    })
    .then(function () {
      loadingInProgress.value = false;
    });
}

//Initialization

getBeers();
</script>

<template>
  <div class="container py-3">
    <header class="my-2">
      <nav class="navbar navbar-expand">
        <div class="container">
          <!-- Navigation bar -->

          <ul class="navbar-nav d-flex justify-content-center w-100">
            <div
              class="row w-100 py-1 align-items-center d-flex justify-content-between justify-content-md-end"
            >
              <div class="col-12 ps-0 col-md-auto me-md-auto mb-3 mb-md-0">
                <a class="navbar-brand">Beer index</a>
              </div>
              <div class="col-12 col-md-3 ps-0 pe-0 mb-3 mb-md-0">
                <input
                  class="form-control"
                  type="text"
                  placeholder="Name"
                  v-model.trim="beerName"
                />
              </div>
              <div
                class="col-12 col-md-3 ps-0 ps-md-3 col-lg-2 pe-0 mb-3 mb-md-0"
              >
                <div class="input-group">
                  <input
                    class="form-control w-50"
                    type="number"
                    placeholder="IBU"
                    step="0.5"
                    min="0"
                    max="100"
                    v-model.number="ibuFilterValue"
                  />
                  <select class="form-select w-50" v-model="ibuFilterType">
                    <option value="ibu_gt">GT</option>
                    <option value="ibu_lt">LT</option>
                  </select>
                </div>
              </div>
              <div class="col-6 ps-0 ps-md-3 col-md-auto pe-0">
                <button
                  class="btn btn-success w-100"
                  type="submit"
                  v-on:click="getBeers(1)"
                  :disabled="loadingInProgress"
                >
                  Search
                </button>
              </div>
              <div class="col-6 ps-sm-3 col-md-auto pe-0">
                <button
                  class="btn btn-secondary w-100"
                  type="button"
                  v-on:click="reset()"
                  :disabled="loadingInProgress"
                >
                  Reset
                </button>
              </div>
            </div>
          </ul>
        </div>
      </nav>
    </header>
    <main class="mt-4">
      <div class="container">
        <!-- Beer listing -->

        <div class="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4">
          <div
            v-if="loadingInProgress || errorMessage || noBeersFound"
            class="col"
            v-html="
              loadingInProgress
                ? 'Please wait...'
                : noBeersFound
                ? 'No beers found'
                : errorMessage
            "
          ></div>
          <div v-else class="col" v-for="beer in beers.items" :key="beer.id">
            <router-link
              class="text-decoration-none link-dark"
              :to="{
                name: 'beerDetails',
                params: { beerId: beer.id },
                query: { redirect: route.fullPath },
              }"
            >
              <BeerItem :beer="beer" />
            </router-link>
          </div>
        </div>

        <PaginationBar v-on:paginate="getBeers" :current-page="currentPage" />
      </div>
    </main>
  </div>
</template>
