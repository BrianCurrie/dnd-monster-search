<template>
  <v-container>
    <v-card class="mx-auto" max-width="600">
      <v-card-title class="justify-center text-h4"
        >DnD Monster Search</v-card-title
      >
      <v-autocomplete
        class="mx-3"
        :items="monsters"
        v-model="searchInput"
        label="Search"
        item-text="name"
        outlined
        clearable
        return-object
        prepend-inner-icon="mdi-magnify"
        hide-details
        auto-select-first
      />
      <v-container class="text-center pa-4"
        ><v-btn class="mr-2" @click="search">Search</v-btn
        ><v-btn @click="imFeelingLucky">I'm Feeling Lucky</v-btn></v-container
      >
    </v-card>
  </v-container>
</template>

<script>
const url = "https://www.dnd5eapi.co/api/monsters";

export default {
  name: "IndexPage",
  data() {
    return {
      searchInput: {},
      monsters: [],
    };
  },

  methods: {
    search() {
      this.$store.commit("changeMonster", this.searchInput.index);
      this.$router.push("monsters");
    },
    imFeelingLucky() {
      this.$store.commit(
        "changeMonster",
        this.monsters[Math.floor(Math.random() * this.monsters.length - 1)]
          .index
      );
      this.$router.push("monsters");
    },
  },

  async mounted() {
    const data = await this.$axios.$get(url);
    this.monsters = data.results;
  },
};
</script>
