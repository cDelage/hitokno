export default function moveElement<T>(
  arr: T[],
  elementIndex: number,
  targetIndex: number
) {
  const newArr = [...arr];
  const element = newArr[elementIndex];
  newArr.splice(elementIndex, 1);
  newArr.splice(targetIndex, 0, element);
  return newArr;
}
