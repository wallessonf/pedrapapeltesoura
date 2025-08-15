const itens = ["tesoura", "pedra", "papel"];
let pontosJogador = 0;
let pontosComputador = 0;
const htmlJogadorOriginal =
  document.getElementById("display-jogador").innerHTML;
const htmlComputadorOriginal =
  document.getElementById("display-computador").innerHTML;
const limparHistorico = document.getElementById("limpar-historico");

const opcoes = document.querySelectorAll(".botao-opcao");

opcoes.forEach((btn) => {
  btn.addEventListener("click", () => {
    const jogador = btn.dataset.choice;
    const computador = itens[Math.floor(Math.random() * 3)];
    jogando(jogador, computador);
  });
});

const containerHistorico = document.getElementById("container-historico");

function historico(jogador, computador, status) {
  const historicoVazio = document.querySelector(".historico-vazio");
  if (historicoVazio) historicoVazio.style.display = "none";

  const p = document.createElement("p");
  p.classList.add("historico-atual");
  p.textContent = `Jogador: ${jogador} Computador: ${computador} Resultado: ${status}`;
  containerHistorico.appendChild(p);

  let historicos = containerHistorico.querySelectorAll(".historico-atual");

  if (historicos.length > 5) historicos[0].remove();
}

function jogando(jogador, computador) {
  let status = "";
  const resultado = document.getElementById("status-resultado");

  const venceDe = {
    pedra: "tesoura",
    tesoura: "papel",
    papel: "pedra",
  };

  document.getElementById("mensagem-resultado").textContent = `O jogo começou`;

  if (jogador === computador) {
    resultado.textContent = "Você empatou!";
    resultado.className = "status-resultado empate";
    status = "EMPATE";
  } else if (venceDe[jogador] === computador) {
    resultado.textContent = "Você ganhou!";
    resultado.className = "status-resultado ganhou";
    pontosJogador++;
    status = "GANHOU";
  } else {
    resultado.textContent = "Você perdeu!";
    resultado.className = "status-resultado perdeu";
    pontosComputador++;
    status = "PERDEU";
  }

  historico(jogador, computador, status);

  const emojis = {
    pedra: "🗿",
    papel: "📄",
    tesoura: "✂️",
  };

  document.getElementById("pontuacao-jogador").textContent = `${pontosJogador}`;

  document.getElementById(
    "pontuacao-computador"
  ).textContent = `${pontosComputador}`;

  document.getElementById("display-jogador").textContent = `${emojis[jogador]}`;

  document.getElementById(
    "display-computador"
  ).textContent = `${emojis[computador]}`;

  resultado.style.display = "block";
  limparHistorico.style.display = "flex";
}

const btnReiniciar = document.getElementById("reiniciar-jogo");

btnReiniciar.addEventListener("click", () => {
  containerHistorico.innerHTML = `<p class="historico-vazio">Nenhuma jogada ainda. Comece o jogo!</p>`;
  pontosJogador = 0;
  pontosComputador = 0;

  document.getElementById("pontuacao-jogador").textContent = `${pontosJogador}`;

  document.getElementById(
    "pontuacao-computador"
  ).textContent = `${pontosComputador}`;

  document.getElementById("display-jogador").innerHTML = htmlJogadorOriginal;
  document.getElementById("display-computador").innerHTML =
    htmlComputadorOriginal;
  limparHistorico.style.display = "none";
});

limparHistorico.addEventListener("click", () => {
  const historicoVazio = document.querySelector(".historico-vazio");
  if (historicoVazio) {
    historicoVazio.textContent = "Histórico limpo. Continue jogando!";
    historicoVazio.style.display = "block";
  }
  containerHistorico.querySelectorAll(".historico-atual").forEach(p => p.remove());
  limparHistorico.style.display = "none";
});
