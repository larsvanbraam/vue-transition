import { AbstractScrollComponent } from 'vue-transition-component';
import {{name_pc}}TransitionController from './{{name_pc}}TransitionController';

// @vue/component
export default {
  name: '{{name_pc}}',
  extends: AbstractScrollComponent,
  methods: {
    handleAllComponentsReady() {
      this.transitionController = new {{name_pc}}TransitionController(this);
      this.isReady();
    },
  },
};
