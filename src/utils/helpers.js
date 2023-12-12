export function filter(products, category) {

  if (category !== "") {
    return products.filter((p) => p.category === category);
  }

  return products;
}

export function sort(products, option) {
  switch (option) {
    case "1": {
      return products.sort(function (a, b) {
        return a.name.localeCompare(b.name);
      });
    }
    // case "2": {
    //   return products.sort((a, b) => a.price - b.price);
    // }
    default: {
      return products;
    }
  }
}
