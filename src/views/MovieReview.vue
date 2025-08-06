<template>
  <div class="container mt-4">
    <h2>{{ movie.title }}</h2>

    <div class="row mb-4">
      <div class="col-md-4">
        <img
          v-if="movie.poster?.url"
          :src="`http://localhost:1337${movie.poster.url}`"
  :alt="movie.title"
  class="img-fluid"
  style="max-height: 400px; object-fit: contain; width: 100%;"
/>

      </div>
      <div class="col-md-8">
        <p><strong>Description:</strong> {{ movie.description }}</p>
        <p><strong>Release Date:</strong> {{ movie.releaseDate }}</p>
      </div>
    </div>

    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Reviewer: {{ movie.reviewer }}</h5>
        <p class="card-text"><strong>Comment:</strong> {{ movie.comment }}</p>
        <p class="card-text">
          <strong>Rating:</strong>
          <span v-html="starRating"></span>
        </p>
        <router-link to="/" class="btn btn-outline-primary">← Back to Home</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const movie = ref({});
const starRating = ref('');

onMounted(async () => {
  const res = await fetch(`http://localhost:1337/api/movies?filters[slug][$eq]=${route.params.slug}&populate=poster`);
  const json = await res.json();
  movie.value = json.data[0] ?? {};

  if (movie.value && movie.value.rating !== undefined) {
    const rating = Math.min(Math.max(movie.value.rating, 0), 5);
    starRating.value = '★'.repeat(rating) + '☆'.repeat(5 - rating);
  }
  console.log(JSON.stringify(json, null, 2));

});
</script>
