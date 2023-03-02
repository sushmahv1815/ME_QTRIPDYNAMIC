import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: 
  // 1. Extract the city id from the URL's Query Param and return it
  const params = new URLSearchParams(search);
  const city = params.get('city') 
  console.log(search);
  return city;
  
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try{
    let response = await fetch(
      config.backendEndpoint + `/adventures/?city=${city}`
    );
    let adventures = await response.json();
    return adventures;

  } catch (e) {
    return null;
  }

}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  console.log(adventures)
  adventures.forEach((adventuresPackages, index) => {
    
   
    let ele = document.createElement('div')
  ele.className = "col-6 col-lg-3 mb-4"
  ele.style.position="relative";
  ele.innerHTML = `<a id="${adventuresPackages.id}" href= "detail/?adventure=${adventuresPackages.id}"> 
  <div class="category-banner">${adventuresPackages.category}</div>
  <div class="activity-card"> 
   <img class="card-img-top"  src="${adventuresPackages.image}" alt="${adventuresPackages.name}">
    <div class="p-3 text-center w-100 text-lg-start">
   <div class="d-flex justify-content-between">
    <h5 class="card-title">${adventuresPackages.name}</h5>
     <p class="card-text">${adventuresPackages.costPerHead}</p>
      </div>
      <div class="d-flex mt-2 justify-content-between">
      <h5 class="card-title" >Duration</h5>
     <p class="card-text">${adventuresPackages.duration} Hours</p>
  </div></div>
</div></a>`

  document.getElementById('data').append(ele);

})
  

}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  console.log(list);
   let filterByDurationList  = list.filter(function (params) {
     return params.duration > low && params.duration <= high;
     
   })
  return filterByDurationList;

}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list

   let x = list.filter( y => {
     return categoryList.includes(y["category"])
   })

  return x;
  }


  // filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
   let categoryList = filters.category
   let durationString = filters.duration
   let myArray = durationString.split("-");
  let low = myArray[0];
  let high = myArray[1];  
  // console.log("filters" , filters);
  // console.log("categoryList" ,categoryList);
  // filterByCategory(list, categoryList);
   if(filters.category.length !== 0 && filters.duration.length == 0)  {     
    return  filterByCategory(list, categoryList);
   } else if(filters.duration.length !== 0 && filters.category.length == 0) {
     return filterByDuration(list, low, high);
   } else if(filters.duration.length !== 0 && filters.category.length !== 0) {
    let categoryFilter = filterByCategory(list, categoryList);
    let filterList = filterByDuration(categoryFilter,low,high);
    return filterList;
   } else {
    return list;
  
   }

  // Place holder for functionality to work in the Stubs
}


//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
 localStorage.setItem("filters",JSON.stringify(filters))
  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object   
 return JSON.parse(localStorage.getItem("filters"));
  // Place holder for functionality to work in the Stubs
//   return null;
 }

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  if(filters.duration.length !== 0) {
   document.getElementById("duration-select").value = filters.duration;
  }
  let category = document.getElementById("category-list")
   if(filters.category.length !== 0) {
    for(let pils of filters.category) {
      let pillsDiv=document.createElement('div');
      pillsDiv.className="category-filter";
      pillsDiv.innerHTML=`${pils}`
      category.appendChild(pillsDiv);
    }
   }
   
}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};



