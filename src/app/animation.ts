import { trigger, state, style, animate, transition, query, animateChild, group } from '@angular/animations';

export const slideInAnimation =
  trigger('routeAnimations', [
    transition('void => *', [
    ]),
    transition('* <=> *', [
    // transition('login <=> register', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
        //   top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        //   border: '5px solid #ccc'
        })
      ]),
      query(':enter', [
        style({ left: '-100%' })
      ]),
      query(':leave', animateChild(), { optional: true }),
      group([
        query(':leave', [
          animate('500ms ease-out', style({ left: '100%' }))
        ], { optional: true }),
        query(':enter', [
          animate('500ms ease-out', style({ left: '0%' }))
        ])
      ]),
      query(':enter', animateChild()),
    ])
  ]);