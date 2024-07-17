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
  return data;
};

const generateCard = async () => {
  const products = await getProducts();

  products.map((product) => {
    let card = document.createElement("div");
    card.id = product.id; // identificando cada produto pelo ID
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
    card.addEventListener("click", (e) => {
      // ao clicar no card, desaparece a pagina inicial de cads
      sectionProdutos.style.display = "none";
      //mostrar o botao voltar e pagina de detalhes do produto
      botaoVoltar.style.display = "block";
      sectionDetalhesProduto.style.display = "grid";

      // IDENTIFICAR QUAL CARD FOI CLICADO
      const cardClicado = e.currentTarget;
      const idProduto = cardClicado.id;
      const produtoClicado = products.find(
        (product) => product.id == idProduto
      );

      // PREENCHER OS DADOS DE DETALHES DO PRODUTO
      preencherDadosProduto(produtoClicado);
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

const preencherDadosProduto = (product) => {
  // preencher imagens
  const images = document.querySelectorAll(
    ".produto__detalhes_imagens figure img"
  );
  const imagesArray = Array.from(images);
  imagesArray.map((image) => {
    image.src = `./images/${product.image}`;
  });

  // preencher nome , model e preço
  document.querySelector(".detalhes h4").innerHTML = product.product_name;
  document.querySelector(".detalhes h5").innerHTML = product.product_model;
  document.querySelector(".detalhes h6").innerHTML = formatCurrency(product.price);
};
