<template>
  <v-container
    ><v-card class="mx-auto text-center pa-6" width="max-content">
      <v-card-title
        class="text-h4 justify-center"
        v-if="error.statusCode === 404"
      >
        {{ pageNotFound }}
      </v-card-title>
      <v-card-title class="text-h4 justify-center" v-else>
        {{ otherError }}
      </v-card-title>
      <v-btn class="mt-2" to="/"> Home page </v-btn>
    </v-card></v-container
  >
</template>

<script>
export default {
  name: "EmptyLayout",
  layout: "empty",
  props: {
    error: {
      default: null,
    },
  },
  data() {
    return {
      pageNotFound: "404 Not Found",
      otherError: "An error occurred",
    };
  },
  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError;
    return {
      title,
    };
  },
};
</script>
