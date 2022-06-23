<template>
  <v-app dark>
    <Header />
    <v-main class="align-center">
      <Nuxt />
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import Footer from "../components/footer.vue";
import Header from "../components/header.vue";
export default {
  name: "DefaultLayout",
  components: { Footer, Header },
};
</script>
