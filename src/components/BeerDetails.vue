<script setup>
import { ref, computed } from "vue";
import { useRouter, useRoute } from "vue-router";

// Routing

const router = useRouter();
const route = useRoute();

// Props

const props = defineProps({
  beerId: [String, Number],
});

// Data

const apiEndpoint = "https://api.punkapi.com/v2/beers/";

// Reactive data

const beer = ref(null);
const loadingInProgress = ref(true);
const errorMessage = ref("");

// Computed

const author = computed(() => {
  return beer.value.contributed_by.match(/<(.*?)>/)[1];
});

// Methods

/**
 * Go back to index page.
 */
function goBack() {
  let redirectPath = route.query.redirect ?? "/";

  router.push(redirectPath);
}

/**
 * Get beer details.
 */
async function getBeer() {
  /* global axios */
  await axios({
    method: "GET",
    url: apiEndpoint + props.beerId,
  })
    .then((response) => {
      beer.value = response.data[0];
    })
    .catch(function (error) {
      errorMessage.value = error.message;
    })
    .then(function () {
      loadingInProgress.value = false;
    });
}

//Initialization

getBeer();
</script>

<template>
  <div class="container py-3">
    <div class="row">
      <div class="col-12">
        <div class="card mb-3">
          <div class="row g-0">
            <div
              v-if="loadingInProgress || errorMessage"
              class="col-12 col-md-10 d-flex justify-content-center align-items-center pt-3 pt-md-0"
              v-html="loadingInProgress ? 'Please wait...' : errorMessage"
            ></div>
            <template v-else-if="beer">
              <div class="col-12 col-md-2">
                <div class="row mb-0 mb-md-3">
                  <div
                    class="col-6 col-md-12 d-flex justify-content-center p-3"
                  >
                    <img :src="beer.image_url" class="beer-image" alt="..." />
                  </div>
                  <div class="col-6 col-md-12 pt-3 pt-md-0">
                    <p class="card-text px-3">Food pairing:</p>
                    <ul class="pe-1">
                      <li
                        v-for="(food, index) in beer.food_pairing"
                        :key="index"
                      >
                        {{ food }}
                      </li>
                    </ul>
                    <p class="card-text px-3">Author: {{ author }}</p>
                  </div>
                </div>
              </div>
              <div class="col-12 col-md-8">
                <div class="card-body pt-1 pt-md-3">
                  <h5 class="card-title">{{ beer.name }}</h5>
                  <p class="card-text">
                    {{ beer.tagline }} IBU: {{ beer.ibu }} ABV: {{ beer.abv }}
                  </p>
                  <p class="card-text">
                    <small class="text-muted">{{ beer.description }}</small>
                  </p>
                </div>
              </div>
            </template>
            <div class="col-12 col-md-2 p-3">
              <button
                class="btn btn-secondary w-100"
                type="button"
                v-on:click="goBack()"
              >
                Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
