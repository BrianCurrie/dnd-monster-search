<template>
  <div>
    {{ monsterData }}
  </div>
</template>

<script>
const url = "https://www.dnd5eapi.co/api/monsters/adult-blue-dragon";

export default {
  name: "IndexPage",
  data() {
    return {
      monsterData: {},
      monsterName: "a",
    };
  },
  methods: {},
  async mounted() {
    this.monsterData = await this.$axios.$get(url);
  },
};
</script>
