import { Promise } from 'es6-promise';

export default {
	name: 'AbstractRegistrableComponent',
	props: ['componentId'],
	computed: {
		components() {
			return this.$children.filter(childComponent => childComponent['_events'].componentReady !== undefined);
		},
	},
	beforeCreate() {
		this.registeredComponents = [];
		this.allComponentsReady = new Promise((resolve) => {
			this.allComponentsReadyResolveMethod = resolve;
		});
	},
	methods: {
		/**
		 * @public
		 * @method isReady
		 * @description The init method should be called when the component is fully ready,
		 * this is usually when it's mounted but it could require more async data
		 * @returns {void}
		 */
		isReady() {
			this.$emit('componentReady', this);
		},
		/**
		 * @public
		 * @method checkComponentsReady
		 * @description This method checks if all components are loaded on init, overwrite if you need multiple checks!
		 * @param component
		 * @returns {void}
		 */
		checkComponentsReady() {
			if (this.components.length === 0) {
				this.allComponentsReadyResolveMethod();
			}
		},
		/**
		 * @public
		 * @method componentReady
		 * @description This method is a callback for when the child component is ready, it should be added
		 * to the .vue template (<ComponentA @componentReady="componentReady"/>)
		 * @param component
		 * @returns {void}
		 */
		componentReady(component) {
			// Store the reference
			this.registeredComponents.push(component);
			// Check if we reached the total amount of transition components
			if (this.components.length === this.registeredComponents.length) {
				this.allComponentsReadyResolveMethod();
			}
		},
		/**
		 * @public
		 * @method handleAllComponentsReady
		 * @description When all the transition components within this component are loaded this method will be
		 * triggered. This is usually the point where the transition controller is setup.
		 * @returns {void}
		 */
		handleAllComponentsReady() {
		},
	},
	mounted() {
		// We wait for the next tick otherwise the $children might not be set when you use a v-for loop
		this.$nextTick(() => {
			this.allComponentsReady.then(this.handleAllComponentsReady.bind(this));
			this.checkComponentsReady();
		});
	},
	beforeDestroy() {
		if (this.registeredComponents) {
			this.registeredComponents.length = 0;
			this.registeredComponents = null;
		}
	},
};
