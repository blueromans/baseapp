// Third Party Libraries
import { clamp } from 'react-native-reanimated';

// Local Components and Hooks
import { assertWorklet } from './utils';

const withName = <T extends Function>(name: string, fn: T): T => {
  'worklet';

  Object.defineProperty(fn, 'name', {
    value: name,
  });

  return fn;
};

/**
 * @worklet
 */
export type Animatable = (t: number) => number;

// Create functions first
const fromFunction = (fn: (t: number) => number): Animatable => {
  'worklet';

  return (t: number) => {
    'worklet';

    if (t === 0 || t === 1) {
      return t;
    }

    return fn(t);
  };
};

const combine = (animatables: Animatable[]): Animatable => {
  'worklet';

  const animatable = (_t: number) => {
    'worklet';

    let t = _t;

    for (const it of animatables) {
      t = it(t);
    }

    return t;
  };

  return animatable;
};

const combineReversed = (animatables: Animatable[]): Animatable => {
  'worklet';

  return (_t: number) => {
    'worklet';

    let t = _t;

    for (let i = animatables.length - 1; i >= 0; i--) {
      t = animatables[i](t);
    }

    return t;
  };
};

const fromInterval = (begin: number, end: number): Animatable => {
  'worklet';

  assertWorklet(begin >= 0.0);
  assertWorklet(begin <= 1.0);
  assertWorklet(end >= 0.0);
  assertWorklet(end <= 1.0);
  assertWorklet(end >= begin);

  const animatable = fromFunction((_t: number) => {
    'worklet';

    return clamp((_t - begin) / (end - begin), 0.0, 1.0);
  });

  if (__DEV__) {
    return withName(`fromInterval(${begin}, ${end})`, animatable);
  }

  return animatable;
};

// Export as object
export const Animatable = {
  combine,
  combineReversed,
  fromFunction,
  fromInterval,
};
