// FUNÇÃO PARA FORMATAR OS VALORES DOS TENIS NO PADRÃO BRASILEIRO
const formatCurrency = (number) => {
  return number.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};


// FAZENDO REQUISIÇÃO NO ARQUIVO JSON DOS TENIS
const getProducts = async () => {
  const response = await fetch("js/products.json");
  const data = await response.json();
  //   console.log(data);
  return data;
};

const generateCard = async () => {
  const products = await getProducts();

  products.map((product) => {
    // console.log(product)
    let card = document.createElement("div");
    card.classList.add("card__produtos");
    card.innerHTML = `
    <figure>
        <img
        src="images/${product.image}"
        alt="${product.product_name}"/>
    </figure>
    <div class="card__produtos_detalhes">
        <h4>${product.product_name}</h4>
        <h5>${product.product_model}</h5>
    </div>
    <h6>${formatCurrency(product.price)}</h6>
    `;

    const listaProdutos = document.querySelector(".lista_produtos");
    listaProdutos.appendChild(card);
  });
};

generateCard();
