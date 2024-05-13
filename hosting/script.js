document.addEventListener("DOMContentLoaded", () => {
  localStorage.setItem("searches", JSON.stringify([]));
  getCurrentImageOfTheDay();
  let form = document.getElementById("search-form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let date = document.getElementById("search-input");
    getImageOfTheDay(date.value);
    date.value = "";
  });

  ul.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
      let date = e.target.innerText;
      getImageOfTheDay(date);
    }
  });
});

let image = document.getElementById("img-day");
let desc = document.getElementById("desc");
let title = document.getElementById("title");
let heading = document.getElementById("h1-tag");
let ul = document.getElementById("search-history");
let data = {};

async function getCurrentImageOfTheDay() {
  const currentDate = new Date().toISOString().split("T")[0];
  try {
    let res = await fetch(
      `https://api.nasa.gov/planetary/apod?api_key=NXBGkNF0CewvZ3BJlMHGt23hZpy4sRt0qwEE16bI&date=${currentDate}`
    );
    data = await res.json();
    console.log(res, data);
    displayImageData(data);
  } catch (error) {
    console.log(error);
  }
}

async function getImageOfTheDay(date) {
  console.log(date);
  try {
    let res = await fetch(
      `https://api.nasa.gov/planetary/apod?api_key=NXBGkNF0CewvZ3BJlMHGt23hZpy4sRt0qwEE16bI&date=${date}`
    );
    data = await res.json();
    console.log(data);
    saveSearch(date);
    displayImageData(data);
  } catch (error) {
    console.log(error);
  }
}

function displayImageData(data) {
  image.src = `${data.url}`;
  desc.innerText = `${data.explanation}`;
  title.innerText = `${data.title}`;
  heading.innerText = `Picture On ${data.date}`;
}

function saveSearch(str) {
  let searches = JSON.parse(localStorage.getItem("searches") || "[]");
  if (!searches.includes(str)) {
    searches.push(str);
    localStorage.setItem("searches", JSON.stringify(searches));
    addSearchToHistory();
  }
}

function addSearchToHistory() {
  let searches = JSON.parse(localStorage.getItem("searches") || "[]");
  let str = searches.map((i) => `<li><a href="#">${i}</a></li>`).join("");
  ul.innerHTML = str;
}
