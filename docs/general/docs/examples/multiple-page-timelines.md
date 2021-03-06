# Multiple page timelines
Sometimes you just need that page transition to be different every time. To achieve this you can create multiple timelines for your page transitions. Here I'll demo a simple example of page transitions being based on route changes. 

**Note**: *Make sure your vue skeleton project is all set up and ready for page transitioning.*

## Create the pages

Open up the terminal in the same directory as the `package.json` and create the following pages:

```bash
$ sg transition-page AboutPage
```

```bash
$ sg transition-page ContactPage
```

After the pages have ben generated it's time to open up the `src/data/enum/RoutePaths.js` and add the new paths

```javascript
const RoutePaths = {
  HOME: '/',
  ABOUT: '/about',
  CONTACT: '/contact',
};

export default RoutePaths;
```

 Also add the new pages to the `src/data/enum/RouteNames.js`


```javascript
const RouteNames = {
  HOME: 'home',
  ABOUT: 'about',
  CONTACT: 'contact',
};

export default RouteNames;
```

 Finally update the src/router/routes.js file to enable the pages.

```javascript
import AboutPage from '../page/AboutPage';
import ContactPage from '../page/ContactPage';
import HomePage from '../page/HomePage';
import RoutePaths from '../data/enum/RoutePaths';
import RouteNames from '../data/enum/RouteNames';

export default [
  {
    path: RoutePaths.HOME,
    component: HomePage,
    name: RouteNames.HOME,
  },
  {
    path: RoutePaths.ABOUT,
    component: AboutPage,
    name: RouteNames.CONTACT,
  },
  {
    path: RoutePaths.CONTACT,
    component: ContactPage,
    name: RouteNames.CONTACT,
  },
];
```

##  Create an AbstractPage
To make sure we don't have to apply this logic to all the pages we create an `AbstractPage` layer, keep in mind that when running the seng-generator to create an extra page this new page will **NOT** automatically extend this new page. If you want this you should create a custom seng-generator template for these type of pages but I will not go into this.

**Note**: *Make sure this file is in the root of your `src/page` folder and have your `HomePage.js`, `AboutPage.js` and `ContactPage.js` extend this new page and provide the new transitionInId.*

```javascript
import { FlowManager, FlowEvent, AbstractPageTransitionComponent } from 'vue-transition-component';

export default {
  name: 'AbstractPage',
  extends: AbstractPageTransitionComponent,
  data() {
    return {
      transitionInId: null,
      transitionOutId: null,
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      const { transitionIn } = to.meta;

      if (transitionIn && from) {
        // Store the out transition id so we can use it in the transition out
        vm.transitionInId = transitionIn[from.name];
      }
    });
  },
  created() {
    FlowManager.addEventListener(FlowEvent.START, event => this.handleFlowStart(event.data));
  },
  methods: {
    handleFlowStart({ from, to }) {
      if (from) {
        // Check the route meta if any out transitions are defined
        const { transitionOut } = from.meta;

        // if no transition out is defined we do nothing!
        if (transitionOut) {
          // Store the out transition id so we can use it in the transition out
          this.transitionOutId = transitionOut[to.name];
        }
      }
    },
    transitionOut(forceTransition) {
      // Overwrite the transition out method to include the custom transition out id
      return this.transitionController.transitionOut(forceTransition, this.transitionOutId, true);
    },
  },
};
```

```javascript
import AbstractPage from '../AbstractPage';
import HomePageTransitionController from './HomePageTransitionController';

// @vue/component
export default {
  name: 'HomePage',
  extends: AbstractPage,
  methods: {
    handleAllComponentsReady() {
      this.transitionController = new HomePageTransitionController(this, {
        transitionInId: this.transitionInId,
      });
      this.isReady();
    },
  },
};
```

```javascript
import { IAbstractTransitionComponent } from 'vue-transition-component';
import { TimelineLite, TimelineMax } from 'gsap';
import AbstractPageTransitionController from '../AbstractPageTransitionController';

export default class HomePageTransitionController extends AbstractPageTransitionController {
  /**
   * Use this method to setup your looping timeline
   *
   * @protected
   * @method setupLoopingAnimationTimeline
   * @param {TimelineLite | TimelineMax} timeline The transition in timeline
   * @param {IAbstractTransitionComponent} parent The reference to the parent controller
   * @param {string} id The transition id that was provided when constructing the controller
   */
  protected setupLoopingAnimationTimeline(
    timeline: TimelineMax,
    parent: IAbstractTransitionComponent,
    id: string,
  ): void {}
}

```

### Create an AbstractPageTransitionController
For the same reason as why we created the abstract page we should also create an AbstractPageTransitionController that handles all the transitions. If you have different animations for each  page you should probably skip this step and do it custom in your page transition controller. But in this example all the pages use the same type of animations. So we create an abstract transition controller with default transitions in there.

**Note**: *Make sure you update the `HomePageTransitionController`, `AboutPageTransitionController` and `ContactPageTransitionController` so they all extend this new class.*

```javascript
import {
  AbstractTransitionController,
  IAbstractTransitionComponent,
} from 'vue-transition-component';
import { TimelineLite, TimelineMax } from 'gsap';

//  Define the id's of the transitions we want to use
export const transitionId = {
  FROM_LEFT: 'from-left',
  FROM_RIGHT: 'from-right',
  TO_LEFT: 'to-left',
  TO_RIGHT: 'to-right',
};

export default class AbstractPageTransitionController extends AbstractTransitionController {
  /**
   * Use this method to setup your transition in timeline
   *
   * @protected
   * @method setupTransitionInTimeline
   * @param {TimelineLite | TimelineMax} timeline The transition in timeline
   * @param {IAbstractTransitionComponent} parent The reference to the parent controller
   * @param {string} id The transition id that was provided when constructing the controller
   */
  protected setupTransitionInTimeline(
    timeline: TimelineLite | TimelineMax,
    parent: IAbstractTransitionComponent,
    id: string,
  ): void {
    switch (id) {
      case transitionId.FROM_LEFT:
        timeline.fromTo(parent.$el, 1, { xPercent: -100 }, { xPercent: 0 });
        break;
      case transitionId.FROM_RIGHT:
        timeline.fromTo(parent.$el, 1, { xPercent: 100 }, { xPercent: 0 });
        break;
      default:
        timeline.fromTo(parent.$el, 1, { autoAlpha: 0 }, { autoAlpha: 1 });
        break;
    }
  }

  /**
   * Use this method to setup your transition out timeline
   *
   * @protected
   * @method setupTransitionOutTimeline
   * @param {TimelineLite | TimelineMax} timeline The transition in timeline
   * @param {IAbstractTransitionComponent} parent The reference to the parent controller
   * @param {string} id The transition id that was provided when constructing the controller
   */
  protected setupTransitionOutTimeline(
    timeline: TimelineLite | TimelineMax,
    parent: IAbstractTransitionComponent,
    id: string,
  ): void {
    switch (id) {
      case transitionId.TO_LEFT:
        timeline.to(parent.$el, 1, { xPercent: -100 });
        break;
      case transitionId.TO_RIGHT:
        timeline.to(parent.$el, 1, { xPercent: 100 });
        break;
      default:
        timeline.to(parent.$el, 1, { autoAlpha: 0 });
        break;
    }
  }

  /**
   * Use this method to setup your looping timeline
   *
   * @protected
   * @method setupLoopingAnimationTimeline
   * @param {TimelineLite | TimelineMax} timeline The transition in timeline
   * @param {IAbstractTransitionComponent} parent The reference to the parent controller
   * @param {string} id The transition id that was provided when constructing the controller
   */
  protected setupLoopingAnimationTimeline(
    timeline: TimelineMax,
    parent: IAbstractTransitionComponent,
    id: string,
  ): void {}
}
```

## Configure the transitions
Now we are ready to configure the new transitions. We do this in the meta section of the `router/routes.js` file. The way it works is that the transition in describes the page that we came from and the transition out describes the page we are about to navigate to. If no matches are found it will fall back to the default transition. which is a fade in our case.

```javascript
import AboutPage from '../page/AboutPage';
import ContactPage from '../page/ContactPage';
import HomePage from '../page/HomePage';
import RoutePaths from '../data/enum/RoutePaths';
import RouteNames from '../data/enum/RouteNames';

import { transitionId } from '../page/AbstractPageTransitionController';

export default [
  {
    path: RoutePaths.HOME,
    component: HomePage,
    name: RouteNames.HOME,
    meta: {
      transitionIn: {
        [RouteNames.CONTACT]: transitionId.FROM_RIGHT,
        [RouteNames.ABOUT]: transitionId.FROM_LEFT,
      },
      transitionOut: {
        [RouteNames.CONTACT]: transitionId.TO_RIGHT,
        [RouteNames.ABOUT]: transitionId.TO_LEFT,
      },
    },
  },
  {
    path: RoutePaths.ABOUT,
    component: AboutPage,
    name: RouteNames.ABOUT,
    meta: {
      transitionIn: {
        [RouteNames.HOME]: transitionId.FROM_RIGHT,
        [RouteNames.CONTACT]: transitionId.FROM_LEFT,
      },
      transitionOut: {
        [RouteNames.HOME]: transitionId.TO_RIGHT,
        [RouteNames.CONTACT]: transitionId.TO_LEFT,
      },
    },
  },
  {
    path: RoutePaths.CONTACT,
    component: ContactPage,
    name: RouteNames.CONTACT,
    meta: {
      transitionIn: {
        [RouteNames.ABOUT]: transitionId.FROM_RIGHT,
        [RouteNames.HOME]: transitionId.FROM_LEFT,
      },
      transitionOut: {
        [RouteNames.ABOUT]: transitionId.TO_RIGHT,
        [RouteNames.HOME]: transitionId.TO_LEFT,
      },
    },
  },
];
```




