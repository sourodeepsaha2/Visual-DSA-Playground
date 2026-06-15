export function getBubbleSortAnimations(arr) {
  const animations = [];
  const array = [...arr];

  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      if (array[j] > array[j + 1]) {
        animations.push([j, j + 1]);

        [array[j], array[j + 1]] =
          [array[j + 1], array[j]];
      }
    }
  }

  return animations;
}