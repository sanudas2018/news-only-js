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
      // console.log(news);
      if (uniqueArray.indexOf(news) == -1) {
         uniqueArray.push(news);
         const li = document.createElement('li');
         li.classList.add("nav-item", "me-3", "menu-li");
         li.innerHTML = `
         <a class="nav-link" href="#" onclick= showAllNewDetails(${news.category_id})>${news.category_name}</a>
         `;
         menuUl.appendChild(li);
      }

   }
};

const showAllNewDetails = (link) => {
   let linkString = "0" + link;

   const url = `https://openapi.programming-hero.com/api/news/category/${linkString}`;
   fetch(url)
      .then(res => res.json())
      .then(data => displayAllNews(data.data))


};

const displayAllNews = (data) => {
   const newsBody = document.getElementById("news-body");
   newsBody.textContent = '';
   console.log(data)
   data.forEach(allNews => {
      // console.log(allNews.details);
      const createDiv = document.createElement("div");
      createDiv.classList.add("row", "g-0", "mb-4", "shadow");
      createDiv.innerHTML = `
         <div class="col-md-3 ">
               <img src="${allNews.thumbnail_url ? allNews.thumbnail_url : 'NO IMAGE FOUND'}" class="img-fluid rounded-start" alt="news image">
            </div>
            <div class="col-md-9">
               <div class="card-body mt-3">
                  <h5 class="card-title">${allNews.title}</h5>
                  <p class="card-text mt-4">${allNews.details.length > 20 ? allNews.details.slice(0,250) + ' ...' : allNews.details}</p>
                  
                  
                  <div class="row mt-5">
                        <div class="col-md-5 d-flex flex-row justify-content-between align-content-center">
                           <div class="col-md-4">
                              <img class="w-75 h-75 rounded-circle" src="${allNews.author.img}" alt="">
                           </div>
                           <div class="col-md-8">
                              <h6>${allNews.author.name == null || allNews.author.name == '' ? 'NOT FOUND NAME' : allNews.author.name }</h6>
                              <p class="text-dark"><small>${allNews.author.published_date == null ? 'NO Found Date' : allNews.author.published_date}</small></p>
                           </div>
                        </div>
                        <div class="col-md-2 d-flex flex-column justify-content-center align-content-center flex-wrap">
                           <p class="text-warning"><i class="fa-regular fa-eye"></i>
                              <span>${allNews.rating.number} M</span>
                           </p>
                        </div>
                        <div class="col-md-2 d-flex flex-column justify-content-center align-content-center flex-wrap">
                           <p class="text-warning">
                              <i class="fa-solid fa-star-half-stroke"></i>
                              <i class="fa-regular fa-star"></i>
                              <i class="fa-regular fa-star"></i>
                              <i class="fa-regular fa-star"></i>
                              <i class="fa-regular fa-star"></i>
                           </p>
                        </div>
                        <div class="col-md-3 d-flex flex-column justify-content-center align-content-center  flex-wrap">
                           <button class="btn btn-info font-weight-bold">Show Details</button>
                        </div>
                     </div>
                  
               </div>
         </div>
      
   `;
      newsBody.appendChild(createDiv);
   });
};
// displayAllNews();

showAllNewHeader()