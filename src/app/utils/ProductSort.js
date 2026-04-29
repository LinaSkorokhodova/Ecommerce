export const sortProducts = (products, sortType) => {
  const sorted = [...products]; // копируем массив

  if (sortType === 'high-low') {
    return sorted.sort((a, b) => b.price - a.price);
  } else if (sortType === 'low-high') {
    return sorted.sort((a, b) => a.price - b.price);
  }

  return sorted; // если тип неизвестен, возвращаем что есть в переменной
};