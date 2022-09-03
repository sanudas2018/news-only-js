// Load all News Header menu data 
const loadAllNewHeader = async () => {
   const url = `https://openapi.programming-hero.com/api/news/categories`;
   try {
      const res = await fetch(url);
      const data = await res.json();
      return data;
   } catch (error) {
      alert(error);
   }
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
   try {
      fetch(url)
         .then(res => res.json())
         .then(data => displayAllNews(data.data))
   } catch (error) {
      alert(error);
   }


};

const displayAllNews = (data) => {
   const newsBody = document.getElementById("news-body");
   newsBody.textContent = '';
   console.log(data)
   data.forEach(allNews => {
      // console.log(allNews._id);
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
                           <button onclick= showSingleNews('${allNews._id}') class="btn btn-info font-weight-bold" data-bs-toggle="modal" data-bs-target="#exampleModal">Show Details</button>
                        </div>
                     </div>
                  
               </div>
         </div>
      
   `;
      newsBody.appendChild(createDiv);
   });
};

// Single News Details with model 
const showSingleNews = (singleData) => {
   const url = `https://openapi.programming-hero.com/api/news/${singleData}`;
   fetch(url)
      .then(res => res.json())
      .then(data => singleNewsDetails(data.data[0]))
};

const singleNewsDetails = (data) => {
   console.log(data);
   const modelId = document.getElementById('modal-body-id');
   modelId.innerHTML = '';
   const createDiv = document.createElement('div');
   createDiv.classList.add('modal-content');
   createDiv.innerHTML = `
      
         <div class="modal-header">
         <h4 class="font-weight-bold ">Title: <span class="ms-2">${data.title}</span></h4> 
             
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
         </div>
         <div class="modal-body">
         <div class="card">
         <div class="card-body">
         <img src="${data.thumbnail_url}" class="card-img-bottom model-img" alt="new detail image">
           
           <p class="card-text mt-4">Details: ${data.details}</p>
           <p class="card-text mt-3 text-warning" >Total View: ${data.total_view == '' || data.total_view == null ?'NO DATA FOUND':  data.total_view }</p>
           

           <div class="row mt-5">
                        <div class="col-md-5 d-flex flex-row justify-content-between align-content-center">
                           <div class="col-md-4">
                              <img class="w-75 h-75 rounded-circle" src="${data.author.img}" alt="">
                           </div>
                           <div class="col-md-8">
                              <h6>${data.author.name == '' || data.author.name == null ? 'NO DATA FOUND' : data.author.name}</h6>
                              <p class="text-dark"><small>${data.author.published_date == null ? 'NO Found Date' : data.author.published_date}</small></p>
                           </div>
                        </div>
                        <div class="col-md-3 d-flex flex-column justify-content-center align-content-center flex-wrap">
                           <p class="text-warning"><i class="fa-regular fa-eye"></i>
                              <span>${data.rating.number} M</span>
                           </p>
                        </div>
                        <div class="col-md-4 d-flex flex-column justify-content-center align-content-center flex-wrap">
                           <p class="text-warning">
                              <i class="fa-solid fa-star-half-stroke"></i>
                              <i class="fa-regular fa-star"></i>
                              <i class="fa-regular fa-star"></i>
                              <i class="fa-regular fa-star"></i>
                              <i class="fa-regular fa-star"></i>
                           </p>
                        </div>
                        
                     </div>
         </div>
         
       </div>
         </div>
         <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Save changes</button>
         </div>
      
   `;
   modelId.appendChild(createDiv);
};

// displayAllNews();

showAllNewHeader()