import { trigger, state, style, animate, transition, keyframes } from '@angular/animations';

const mainAnimationDuration = '2s';

export let animations = [
    trigger('isVisibleChanged', [
      state('1', style({ opacity: 1, display: 'block' })),
      state('0', style({ opacity: 0 })),
      transition('0 => 1', animate(`${mainAnimationDuration} ease-in`, keyframes([
        style({ opacity: 0 }),
        style({ opacity: 0 }),
        style({ opacity: 1 }),
      ]))),
      transition('1 => 0', animate(`${mainAnimationDuration} ease-out`, keyframes([
        style({ opacity: 1 }),
        style({ opacity: 0 }),
        style({ opacity: 0 }),
      ])))
    ])
  ];
