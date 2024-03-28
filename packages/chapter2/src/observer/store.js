import {발행기관} from "./pubsub.js";

export class Store {
  constructor({ state, mutations, actions }) {
    this.state = 발행기관(state);
    this.mutations = mutations;
    this.actions = actions;
  }

  commit(action, payload) {
    this.mutations[action](this.state, payload);
  }
}
