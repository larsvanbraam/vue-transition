import gsap, { Expo } from 'gsap';
import AbstractVueTransitionController from "../../../../src/lib/util/AbstractVueTransitionController";
import {IAbstractTransitionComponent} from "../../../../src";

export default class HomePageTransitionController extends AbstractVueTransitionController {

  /**
   * @protected
   * @param {TimelineMax} timeline
   * @param {IAbstractTransitionComponent} parent
   * @param {string} id
   */
  protected setupTransitionInTimeline(
    timeline: gsap.core.Timeline,
    parent:IAbstractTransitionComponent,
    id:string): void {
    timeline.fromTo(
      parent.$el,
      0.5,
      {
        autoAlpha: 0,
        scale: 0,
      },
      {
        autoAlpha: 1,
        scale: 1,
        ease: Expo.easeOut,
      },
    );
  }

  /**
   * @protected
   * @param {TimelineMax} timeline
   * @param {IAbstractTransitionComponent} parent
   * @param {string} id
   */
  protected setupTransitionOutTimeline(
    timeline: gsap.core.Timeline,
    parent:IAbstractTransitionComponent,
    id:string): void {
    timeline.to(
      parent.$el,
      0.5,
      {
        scale: 2,
        autoAlpha: 0,
        ease: Expo.easeIn,
      },
    );
  }

  /**
   * @protected
   * @param {TimelineMax} timeline
   * @param {IAbstractTransitionComponent} parent
   * @param {string} id
   */
  protected setupLoopingAnimationTimeline(
    timeline:gsap.core.Timeline,
    parent:IAbstractTransitionComponent,
    id:string): void {}
}
