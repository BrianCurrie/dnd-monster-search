<template>
  <v-container>
    <v-card class="mx-auto" max-width="600">
      <v-card-title class="justify-center text-h4 text-sm-h3 pt-6"
        >DnD Monster Search</v-card-title
      >
      <v-autocomplete
        class="mx-3 pa-4"
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
      <v-container class="text-center pb-6"
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
      if (this.searchInput && this.searchInput.index) {
        this.$router.push(`monsters/${this.searchInput.index}`);
      }
    },
    imFeelingLucky() {
      const monsterIndex =
        this.monsters[Math.floor(Math.random() * this.monsters.length - 1)]
          .index;
      this.$router.push(`monsters/${monsterIndex}`);
    },
  },

  async mounted() {
    const data = await this.$axios.$get(url);
    this.monsters = data.results;
  },
};
</script>
