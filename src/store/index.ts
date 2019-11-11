import Vue from 'vue'
import Vuex, { StoreOptions, MutationTree, GetterTree, Plugin } from 'vuex'
import { Spell, Character } from '@/shims-tsx'
Vue.use(Vuex)

import VuexPersist from 'vuex-persist'

interface SpellbookState {
  version: string,
  characters: Character[],
  currentCharacter: Character,
}
export interface RootState {
  version: string;
}

const mutations : MutationTree<SpellbookState> = {
  addSpell(state: SpellbookState, spell: Spell) {
    state.currentCharacter.spellbook.push(spell);
  },
  addCharacter(state: SpellbookState, character: Character) {
    character.index = state.characters.length;
    state.characters.push(character);
  },
  updateCharacter(state: SpellbookState, character: Character) {
    state.characters[character.index] = character
  },
  setCurrentCharacter(state: SpellbookState, character: number){
    state.currentCharacter = state.characters[character];
  }
};

const getters : GetterTree<SpellbookState, RootState> = {
  spellbook: state => state.currentCharacter.spellbook,
  characters: state => state.characters,
  currentCharacter: state => state.currentCharacter
  
};

const plugins: Plugin<SpellbookState>[] = [new VuexPersist<SpellbookState>({
  key: 'spellbook',
  storage: window.localStorage
}).plugin];

const store: StoreOptions<SpellbookState> = {
  state: {
      version: '1.0.1',
      characters:[] as Character[],
      currentCharacter: {} as Character,
  },
  getters,
  mutations,
  plugins,
};

export default new Vuex.Store<SpellbookState>(store);
