function loadCategories() {
    //fetch the data
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
        //convert promise to json
        .then(res => res.json())
        //send data to display
        .then(data => displayCategories(data.categories))
}

//load videos
function loadVideos() {
    fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then(response => response.json())
    .then(data =>displayVideos(data.videos))
}

//display button categories
function displayCategories(categories) {
    // got the container
    const categoryContainer = document.getElementById("category-container");
    // loop operation array of obj
    for (let cat of categories) {
        // create element
        const categoryDiv = document.createElement("div");
        categoryDiv.innerHTML = `
         <button class="btn btn-sm border-none bg-[#25252533] hover:text-white hover:bg-[#FF1F3D]">${cat.category}</button>
        
        `
        // append the element
        categoryContainer.append(categoryDiv);
    }


}

//display videos
const displayVideos = (videos) => {
    const videoContainer = document.getElementById("video-container");
    videos.forEach(video => {
        const videoCard = document.createElement("div");
        videoCard.innerHTML = `
        <div class="shadow">
                <figure class="relative">
                 <img class="rounded-md w-full h-[200px] object-cover" src="${video.thumbnail}" alt="">
                 <span class="absolute bottom-3 right-4 bg-black rounded-sm text-white text-sm px-1">3h 56m ago</span>
                </figure>
                 <div class="flex items-center gap-4 mt-3">
                     <img class="w-10 h-10 rounded-full" src="${video.authors[0].profile_picture}" alt="">
                     <h3 class="font-bold">${video.title}</h3>
                 </div>
                 <div class="flex items-center gap-2 mx-auto pl-14">
                     <small class="text-sm text-[#171717B3]">${video.authors[0].profile_name}</small>
                     <small class="w-5"> ${video.authors[0].verified ? `<img src="assets/verified-check.svg"` : ""}</small>
                 </div>
                 <small class="pl-14 text-sm text-[#171717B3]">${video.others.views}</small>
                 <button class="btn btn-block mt-3">Show Details</button>
             </div>
        `
        videoContainer.append(videoCard);
    })
}


//call function
loadCategories();
loadVideos()

// [
//     {
//         "category_id": "1001",
//         "category": "Music"
//     },
// ]