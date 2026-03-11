const API_URL = "https://turalibrahimli50-coder.github.io/site1/Api.json";
const formatDate = (dateStr) => dateStr.split("T")[0];

const createNewsCard = ({ image_url, author, title, published_at }, options = {}) => {
  const { bgColor = "", extraStyle = "", tagStyle = "" } = options;

  return `
    <div class="news-card" style="background-image:url(${image_url});">
      <div class="tag-badge" style="z-index:1; position:absolute; top:20px; right:30px; ${tagStyle}">
        <p class="tag-text">${author}</p>
      </div>
      <div class="news-card-body" style="${bgColor ? `background-color:${bgColor}; padding:20px;` : ""}${extraStyle}">
        <ul class="meta-list"><li>${formatDate(published_at)}</li></ul>
        <p class="news-heading">${title}</p>
      </div>
    </div>`;
};

const createLatestCard = ({ image_url, author, title, published_at }) => `
  <div class="col-md-3" style="margin-bottom:50px;">
    <div class="latest-card">
      <div class="latest-card-img" style="background-image:url('${image_url}')">
        <div class="tag-badge" style="position:absolute; top:30px; left:20px;">${author}</div>
      </div>
      <div class="latest-card-body" style="background-color:#F9F9F9; position:relative; z-index:1;">
        <div class="news-card-body">
          <p class="news-heading" style="color:black !important;">${title}</p>
          <ul class="meta-list" style="color:black !important;">
            <li>${formatDate(published_at)}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>`;

const renderHeroGrid = (articles) => {
  const leftEl   = document.getElementById("leftNews");
  const rightEl  = document.getElementById("rightNews");
  const centerEl = document.getElementById("centerNews");

  articles.slice(0, 2).forEach((item) => {
    leftEl.innerHTML += createNewsCard(item);
  });

  articles.slice(2, 4).forEach((item) => {
    rightEl.innerHTML += createNewsCard(item);
  });

  centerEl.innerHTML += createNewsCard(articles[0], { bgColor: "#F63C24" });
};

const renderLatestPosts = (articles) => {
  const latestEl = document.getElementById("latest");
  articles.slice(0, 4).forEach((item) => {
    latestEl.innerHTML += createLatestCard(item);
  });
};

const init = async () => {
  try {
    const res      = await fetch(API_URL);
    const { articles } = await res.json();

    renderHeroGrid(articles);
    renderLatestPosts(articles);
  } catch (err) {
    console.error("News fetch failed:", err);
  }
};

init();