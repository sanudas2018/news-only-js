// Load all News Header menu data 
const loadAllNewHeader = async () => {
   const url = `https://openapi.programming-hero.com/api/news/categories`;
   const res = await fetch(url);
   const data = await res.json();
   return data;
};
// Show All News feed Menu bar
// const uniqueArray = [];
const showAllNewHeader = async () => {
   const allData = await loadAllNewHeader();
   const menuUl = document.getElementById('navbar-id');
   const newAllData = allData.data.news_category;
   // console.log(allData.data.news_category);
   const uniqueArray = [];
   for (const news of newAllData) {
      console.log(news);
      if (uniqueArray.indexOf(news) == -1) {
         uniqueArray.push(news);
         const li = document.createElement('li');
         li.classList.add("nav-item", "me-3", "menu-li");
         li.innerHTML = `
         <a class="nav-link" href="#">${news.category_name}</a>
         `;
         menuUl.appendChild(li);
      }

   }
};
showAllNewHeader()