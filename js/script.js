// FAZENDO REQUISIÇÃO NO ARQUIVO JSON DOS TENIS
const getProducts = async () => {
  const response = await fetch("js/products.json");
  const data = await response.json();
  console.log(data);
  return data;
};

