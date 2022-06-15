<template>
  <div>
    <v-text-field
      v-model="searchInput"
      label="Monster Search"
      outlined
      clearable
    />
    <p v-for="monster in filteredMonsters">
      <NuxtLink :to="'/monsters/' + monster.index">{{ monster.name }}</NuxtLink>
    </p>
  </div>
</template>

<script>
const url = "https://www.dnd5eapi.co/api/monsters";

export default {
  name: "IndexPage",
  data() {
    return { searchInput: "", monsters: [] };
  },
  computed: {
    filteredMonsters() {
      if (!this.searchInput) {
        return [];
      }
      // Currently only matching based on if the name starts with input value
      // Todo: Match based on starts with and contains input value
      // Displaying results that start with input value higher
      return this.monsters.filter((monster) =>
        monster.name.toLowerCase().startsWith(this.searchInput.toLowerCase())
      );
    },
  },

  async mounted() {
    const data = await this.$axios.$get(url);
    this.monsters = data.results;
  },
};
</script>
