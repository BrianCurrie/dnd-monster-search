<template>
  <div v-if="monster.name !== undefined">
    <NuxtLink to="/"> Back </NuxtLink>
    <h1>{{ monster.name }}</h1>
    <i>{{ monster.size }} {{ monster.type }}, {{ monster.alignment }}</i>
    <hr />
    <p><b>Armor Class</b> {{ monster.armor_class }}</p>
    <p><b>Hit Points</b> {{ monster.hit_points }} ({{ monster.hit_dice }})</p>
    <p>
      <b>Speed</b>{{ " " }}
      <span v-for="(value, key) in monster.speed"
        >{{ key }}: {{ value }}{{ " " }}</span
      >
    </p>
    <hr />
    <p>
      <b>STR</b> {{ monster.strength }} ({{
        this.getAbilityScore(monster.strength)
      }})
    </p>
    <p>
      <b>DEX</b> {{ monster.dexterity }} ({{
        this.getAbilityScore(monster.dexterity)
      }})
    </p>
    <p>
      <b>CON</b> {{ monster.constitution }} ({{
        this.getAbilityScore(monster.constitution)
      }})
    </p>
    <p>
      <b>INT</b> {{ monster.intelligence }} ({{
        this.getAbilityScore(monster.intelligence)
      }})
    </p>
    <p>
      <b>WIS</b> {{ monster.wisdom }} ({{
        this.getAbilityScore(monster.wisdom)
      }})
    </p>
    <p>
      <b>CHA</b> {{ monster.charisma }} ({{
        this.getAbilityScore(monster.charisma)
      }})
    </p>
    <hr />
    <p>
      <b>Saving Throws</b>{{ " " }}
      <span v-for="savingThrow in savingThrows"
        >{{ savingThrow.proficiency.name.replace("Saving Throw: ", "") }}
        {{ savingThrow.value }}{{ " " }}
      </span>
    </p>
    <p>
      <b>Skills</b>{{ " " }}
      <span v-for="skill in skills"
        >{{ skill.proficiency.name.replace("Skill: ", "") }} {{ skill.value
        }}{{ " " }}
      </span>
    </p>
    <p>
      <b>Senses</b>{{ " " }}
      <span v-for="(value, key) in monster.senses"
        >{{ key.replace("_", " ") }}: {{ value }}{{ " " }}</span
      >
    </p>
    <p><b>Languages</b> {{ monster.languages }}</p>
    <p><b>Challenge</b> {{ monster.challenge_rating }} ({{ monster.xp }} XP)</p>
    <hr />
    <p v-for="ability in monster.special_abilities">
      <b
        ><i>{{ ability.name }}</i></b
      >
      {{ ability.desc }}
    </p>
    <div v-if="monster.actions.length !== 0">
      <h2>Actions</h2>
      <hr />
      <p v-for="action in monster.actions">
        <b
          ><i>{{ action.name }}</i></b
        >
        {{ action.desc }}
      </p>
    </div>
    <div v-if="monster.legendary_actions.length !== 0">
      <h2>Legendary Actions</h2>
      <hr />
      <p v-for="action in monster.legendary_actions">
        <b
          ><i>{{ action.name }}</i></b
        >
        {{ action.desc }}
      </p>
    </div>
  </div>
  <div v-else>Loading...</div>
</template>

<script>
export default {
  name: "MonsterPage",
  data() {
    return {
      monster: {},
      monster_id: "",
    };
  },
  methods: {
    getAbilityScore(score) {
      if (typeof score !== "number") {
        return "";
      }
      const value = Math.floor((score - 10) / 2);
      return this.addSignIfPositive(value);
    },
    addSignIfPositive(value) {
      return `${value >= 0 ? "+" : ""}${value}`;
    },
    isSavingThrow(item) {
      return item.proficiency.name.includes("Saving Throw");
    },
    isSkill(item) {
      return item.proficiency.name.includes("Skill");
    },
    addSignToValuesInObjList(list) {
      return list.map((obj) => ({
        ...obj,
        value: this.addSignIfPositive(obj.value),
      }));
    },
  },
  computed: {
    savingThrows() {
      return this.addSignToValuesInObjList(
        this.monster.proficiencies.filter(this.isSavingThrow)
      );
    },
    skills() {
      return this.addSignToValuesInObjList(
        this.monster.proficiencies.filter(this.isSkill)
      );
    },
  },
  async mounted() {
    //adult-blue-dragon
    const monster = this.$route.params.monster;
    const url = `https://www.dnd5eapi.co/api/monsters/${monster}`;

    this.monster = await this.$axios.$get(url);
  },
};
</script>
