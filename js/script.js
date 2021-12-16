const kick = document.querySelector(".kick");
const combo = document.querySelector(".combo");
const heal = document.querySelector(".heal");
const giveUp = document.querySelector(".giveup");
const pHP = document.querySelector(".player__hp");
const mHP = document.querySelector(".monster__hp");
const chat = document.querySelector(".chat");
const start = document.querySelector(".start");
const navigationStart = document.querySelector(".navigation__start");

const data = {
  playerHP: 100,
  monsterHP: 100,
  winner: 0,
}

start.addEventListener("click", () => {
  if (navigationStart.parentElement.classList.contains("finish")) return;
  navigationStart.classList.add("active");
  defaultStart();
  updateChat("start");
  cleanChat();
});

giveUp.addEventListener("click", () => {
  fightEnd();
  defaultStart();
  updateChat("giveUp");
});

kick.addEventListener("click", () => {
  monsterAttack();
  playerAttack();
  renderHp();
  checkWinner();
});

combo.addEventListener("click", () => {
  if (data.monsterHP < 40) {
    playerAttack(20, 35);
  } else {
    playerAttack(5, 10);
  }
  monsterAttack();
  renderHp();
  checkWinner();
});

heal.addEventListener("click", () => {
  healFunction();
  monsterAttack();
  renderHp();
  checkWinner();
});

function playerAttack(a = 5, b = 30) {
  const playerAttack = getRandom(a, b);
  data.monsterHP -= playerAttack;
  if (data.monsterHP <= 0) {
    data.monsterHP = 0;
  }
  updateChat("player", playerAttack);
}

function monsterAttack() {
  const monsterAttack = getRandom(5, 25);
  data.playerHP -= monsterAttack;
  if (data.playerHP <= 0) {
    data.playerHP = 0;
  }
  updateChat("monster", monsterAttack);
}

function healFunction() {
  const healHP = getRandom(10, 50);
  if (data.playerHP < 50) {
    data.playerHP += healHP;
    updateChat("heal", healHP);
  }
}

function renderHp() {
  pHP.style.width = data.playerHP + "%";
  mHP.style.width = data.monsterHP + "%";
  pHP.innerHTML = (`<p>${data.playerHP}%</p>`);
  mHP.innerHTML = (`<p>${data.monsterHP}%</p>`);
  if (data.playerHP > 50) {
    pHP.style.backgroundColor = "rgb(0, 161, 35)";
    heal.classList.remove("active");
  } else if (data.playerHP <= 50) {
    pHP.style.backgroundColor = "red";
    heal.classList.add("active");
  }
  if (data.monsterHP <= 40) {
    mHP.style.backgroundColor = "red";
    combo.classList.add("active");
  } else if (data.monsterHP > 40) {
    mHP.style.backgroundColor = "rgb(0, 161, 35)";
    combo.classList.remove("active");
  }
}

function updateChat(type, value) {
  switch (type) {
    case "start":
      return chat.insertAdjacentHTML("afterbegin", `<p>Деритесь...</p>`);
    case "player":
      return chat.insertAdjacentHTML("afterbegin", `<p>Ты пнул монстра на ${value}</p>`);
    case "monster":
      return chat.insertAdjacentHTML("afterbegin", `<p>Получил люлей на ${value}</p>`);
    case "heal":
      return chat.insertAdjacentHTML("afterbegin", `<p>Отхилился на ${value}</p>`);
    case "giveUp":
      return chat.insertAdjacentHTML("afterbegin", `<p>Не ну ты видел? Видел?</p>`);
    case "end":
      if (data.winner === 1) {
        return chat.insertAdjacentHTML("afterbegin", `<p>ТРИУМФАТОР!!!</p>`);
      } else if (data.winner === 2) {
        return chat.insertAdjacentHTML("afterbegin", `<p>Короче тебя отмудохали :(</p>`);
      } else if (data.winner === 3) {
        return chat.insertAdjacentHTML("afterbegin", `<p>Погибли оба :)</p>`);
      }
    default: "Я хз чё ты тут нажмакал, перезагрузи страницу...";
  }
}

function cleanChat() {
  let removeChat = chat.querySelectorAll('p');
  removeChat.forEach(el => {
    el.remove();
  });
  chat.insertAdjacentHTML("afterbegin", `<p>Выбери судьбу...</p>`);
}

function checkWinner() {
  if (data.monsterHP === 0 && data.playerHP === 0) {
    data.winner = 3;
    fightEnd();
  } else if (data.playerHP === 0 && data.monsterHP !== 0) {
    data.winner = 2;
    fightEnd();
  } else if (data.monsterHP === 0 && data.playerHP !== 0) {
    data.winner = 1;
    fightEnd();
  }
  updateChat("end");
}

function fightEnd() {
  navigationStart.parentElement.classList.add("finish");
  navigationStart.classList.remove("active");
  setTimeout(() => {
    navigationStart.parentElement.classList.remove("finish");
  }, 2000);
}

function defaultStart() {
  data.playerHP = 100;
  data.monsterHP = 100;
  data.winner = 0;
  renderHp();
}

function getRandom(min, max) {
  return (Math.ceil(Math.random() * (max - min)) + min);
}