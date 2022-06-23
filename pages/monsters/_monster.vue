<template>
  <v-container v-if="monster.name !== undefined">
    <v-card class="mx-auto my-6 pa-6" max-width="800">
      <v-btn to="/" nuxt> <v-icon> mdi-arrow-left</v-icon> Back </v-btn>
      <v-card-title class="text-h4 text-break">{{ monster.name }}</v-card-title>
      <v-card-subtitle class="font-italic text-subtitle-1"
        >{{ monster.size }} {{ monster.type }},
        {{ monster.alignment }}</v-card-subtitle
      >
      <div>
        <v-divider class="my-2" />

        <v-card-text class="py-2"
          ><b>Armor Class</b> {{ monster.armor_class }}</v-card-text
        >
        <v-card-text class="py-2"
          ><b>Hit Points</b> {{ monster.hit_points }} ({{
            monster.hit_dice
          }})</v-card-text
        >
        <v-card-text class="py-2">
          <b>Speed</b>{{ " " }}
          <span v-for="(value, key) in monster.speed"
            >{{ key }}: {{ value }}{{ " " }}</span
          >
        </v-card-text>
        <v-divider class="my-2" />
        <v-container class="d-flex pa-0 overflow-x-auto">
          <v-card-text class="text-center">
            <b>STR</b>
            <div>
              {{ monster.strength }} ({{
                this.getAbilityScore(monster.strength)
              }})
            </div>
          </v-card-text>
          <v-card-text class="text-center">
            <b>DEX</b>
            <div>
              {{ monster.dexterity }} ({{
                this.getAbilityScore(monster.dexterity)
              }})
            </div>
          </v-card-text>
          <v-card-text class="text-center">
            <b>CON</b>
            <div>
              {{ monster.constitution }} ({{
                this.getAbilityScore(monster.constitution)
              }})
            </div>
          </v-card-text>
          <v-card-text class="text-center">
            <b>INT</b>
            <div>
              {{ monster.intelligence }} ({{
                this.getAbilityScore(monster.intelligence)
              }})
            </div>
          </v-card-text>
          <v-card-text class="text-center">
            <b>WIS</b>
            <div>
              {{ monster.wisdom }} ({{ this.getAbilityScore(monster.wisdom) }})
            </div>
          </v-card-text>
          <v-card-text class="text-center">
            <b>CHA</b>
            <div>
              {{ monster.charisma }} ({{
                this.getAbilityScore(monster.charisma)
              }})
            </div>
          </v-card-text>
        </v-container>
        <v-divider class="my-2" />
        <v-card-text class="py-2">
          <b v-if="savingThrows.length !== 0">Saving Throws</b>{{ " " }}
          <span v-for="savingThrow in savingThrows"
            >{{ savingThrow.proficiency.name.replace("Saving Throw: ", "") }}
            {{ savingThrow.value }}{{ " " }}
          </span>
        </v-card-text>
        <v-card-text class="py-2">
          <b v-if="skills.length !== 0">Skills</b>{{ " " }}
          <span v-for="skill in skills"
            >{{ skill.proficiency.name.replace("Skill: ", "") }} {{ skill.value
            }}{{ " " }}
          </span>
        </v-card-text>
        <v-card-text class="py-2">
          <b v-if="monster.senses.length !== 0">Senses</b>{{ " " }}
          <span v-for="(value, key) in monster.senses"
            >{{ key.replace("_", " ") }}: {{ value }}{{ " " }}</span
          >
        </v-card-text>
        <v-card-text class="py-2"
          ><b v-if="monster.languages.length !== 0">Languages</b>
          {{ monster.languages }}</v-card-text
        >
        <v-card-text class="py-2">
          <b v-if="monster.challenge_rating !== 0">Challenge</b>
          {{ monster.challenge_rating }} ({{ monster.xp }} XP)
        </v-card-text>
        <v-divider class="my-2" />
        <v-card-text
          class="py-2"
          :key="ability.name"
          v-for="ability in monster.special_abilities"
        >
          <b
            ><i>{{ ability.name }}</i></b
          >
          {{ ability.desc }}
        </v-card-text>
      </div>
      <div v-if="monster.actions.length !== 0">
        <v-card-title class="text-h5">Actions</v-card-title>
        <v-divider class="mb-2" />
        <v-card-text
          class="py-2"
          :key="action.name"
          v-for="action in monster.actions"
        >
          <b
            ><i>{{ action.name }}</i></b
          >
          {{ action.desc }}
        </v-card-text>
      </div>
      <div v-if="monster.legendary_actions.length !== 0">
        <v-card-title class="text-h5">Legendary Actions</v-card-title>
        <v-divider class="mb-2" />
        <v-card-text
          class="py-2"
          :key="action.name"
          v-for="action in monster.legendary_actions"
        >
          <b
            ><i>{{ action.name }}</i></b
          >
          {{ action.desc }}
        </v-card-text>
      </div>
    </v-card>
  </v-container>
  <v-container v-else
    ><v-card class="mx-auto my-6 pa-6" max-width="800">
      <v-skeleton-loader class="mb-2" type="button" />
      <v-skeleton-loader type="card-heading, list-item, divider" />

      <v-skeleton-loader
        type=" list-item@3, divider, table-row, divider, list-item@3, divider, list-item@3"
      /> </v-card
  ></v-container>
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
    const monsterIndex = this.$route.params.monster;
    const url = `https://www.dnd5eapi.co/api/monsters/${monsterIndex}`;

    this.monster = await this.$axios.$get(url);
  },
};
</script>
