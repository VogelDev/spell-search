import Vue, { VNode } from 'vue'

declare global {
  namespace JSX {
    // tslint:disable no-empty-interface
    interface Element extends VNode {}
    // tslint:disable no-empty-interface
    interface ElementClass extends Vue {}
    interface IntrinsicElements {
      [elem: string]: any
    }
  }
}
interface Spell {
  range?: string;
  text: string;
  school?: string;
  time?: string;
  name: string;
  components?: string;
  classes: string[];
  duration?: string;
  roll?: string[] | string;
}
export class Character {
  index: number;  
  name: string;
  classes: Class[];
  spellbook: Spell[];
}
interface Class {
  name: string;
  level: string;
}