export const state = () => ({
  monster: "",
});

export const getter = {
  getMonster(state) {
    return state.monster;
  },
};

export const mutations = {
  changeMonster(state, monster) {
    state.monster = monster;
  },
};
