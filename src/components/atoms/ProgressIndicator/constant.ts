// Local Components and Hooks
import { sawTooth, Curves } from './curves';
import { Animatable } from './animatable';

const DURATION_MULTIPLIER_1 = 1333;
const DURATION_MULTIPLIER_2 = 2222;
export const K_INTERMEDIATE_CIRCULAR_DURATION =
  DURATION_MULTIPLIER_1 * DURATION_MULTIPLIER_2;

const _pathCount = Math.floor(
  K_INTERMEDIATE_CIRCULAR_DURATION / DURATION_MULTIPLIER_1,
);
const _rotationCount = Math.floor(
  K_INTERMEDIATE_CIRCULAR_DURATION / DURATION_MULTIPLIER_2,
);

// Flutter uses .chain for combining of animations, but it reverses the order of the animations, so we apply the same logic here, but with .combine and reversed order
export const strokeHeadTween = Animatable.combine([
  sawTooth(_pathCount),
  Animatable.fromInterval(0.0, 0.5),
  Curves.fastOutSlowIn,
]);
export const strokeTailTween = Animatable.combine([
  sawTooth(_pathCount),
  Animatable.fromInterval(0.5, 1.0),
  Curves.fastOutSlowIn,
]);
export const offsetTween = sawTooth(_pathCount);
export const rotationTween = sawTooth(_rotationCount);
