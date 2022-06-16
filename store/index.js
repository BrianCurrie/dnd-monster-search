/* 

Note: The choice to use VueX store to hold the
current monster information causes it to be lost
on page refresh.

We can choose to either go back to using route
parameters or use additional, more persistent
storage, such as sessionStorage or localStorage
to get around this problem.

*/

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
