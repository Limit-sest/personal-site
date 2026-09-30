// Shifts items from their default (already sorted) position:
// offset 1 moves an item up one slot, -1 moves it down one slot.
export function applyOffset<T extends { data: { offset: number } }>(
  sorted: T[],
): T[] {
  return sorted
    .map((item, index) => ({ item, index, target: index - item.data.offset }))
    .sort(
      (a, b) =>
        a.target - b.target ||
        b.item.data.offset - a.item.data.offset ||
        a.index - b.index,
    )
    .map(({ item }) => item);
}
