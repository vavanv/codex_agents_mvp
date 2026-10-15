export function clamp(value: number, lower: number, upper: number): number {
  if (lower > upper) {
    throw new RangeError('Lower bound must not exceed upper bound');
  }
  if (value < lower) {
    return lower;
  }
  if (value > upper) {
    return upper;
  }
  return value;
}
