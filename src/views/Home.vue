<template>
  <div class="container">
    <h1 class="mb-4">Find Your Favourite Movie with Reviews</h1>
    <input v-model="searchQuery" class="form-control mb-4" placeholder="Search movies..." />

    <div class="row">
      <div
        v-for="movie in filteredMovies"
        :key="movie.id"
        class="col-md-4 mb-4"
      >
        <div class="card h-100">
          <img
            v-if="movie.poster?.url"
            :src="`http://localhost:1337${movie.poster.url}`"
            class="card-img-top img-fluid"
            :alt="movie.title"
            style="width: 100%; height: auto; max-height: 400px; object-fit: contain;"
          />
          <div class="card-body">
            <h5 class="card-title">{{ movie.title }}</h5>
            <p class="card-text">Release Date: {{ movie.releaseDate }}</p>
            <router-link :to="`/review/${movie.slug}`" class="btn btn-primary">
              Read Review
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, computed, onMounted } from 'vue';

const movies = ref([]);
const searchQuery = ref('');

onMounted(async () => {
  const res = await fetch('http://localhost:1337/api/movies?populate=poster');
  const json = await res.json();
  console.log(JSON.stringify(json.data, null, 2));
  movies.value = json.data;
});

const filteredMovies = computed(() =>
  movies.value.filter(movie =>
    movie.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
);


</script>
