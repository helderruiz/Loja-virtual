// PARTE DE DETALHES DO PRODUTO AO CLICAR
const botaoVoltar = document.querySelector(".voltar");
const sectionDetalhesProduto = document.querySelector(".produto__detalhes");
const sectionProdutos = document.querySelector(".produtos");

botaoVoltar.style.display = "none";
sectionDetalhesProduto.style.display = "none";

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

    // EVENTO DE CLICK NO CARD PARA ABRIR PARTE DE DETALHES DO PRODUTO
    card.addEventListener("click", () => {
      // ao clicar no card, desaparece a pagina inicial de cads
      sectionProdutos.style.display = "none";
      //mostrar o botao voltar e pagina de detalhes do produto
      botaoVoltar.style.display = "block";
      sectionDetalhesProduto.style.display = "grid";
    });
  });
};

generateCard();

// CLICAR NO BOTAO VOLTAR
botaoVoltar.addEventListener("click", () => {
  //mostar novamente a tela inicial de cards
  sectionProdutos.style.display = "flex";
  //ocultar o botao voltar e pagina de detalhes do produto
  botaoVoltar.style.display = "none";
  sectionDetalhesProduto.style.display = "none";
});
