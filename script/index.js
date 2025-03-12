//remove active class
function removeActiveClass() {
    const activeButtons = document.getElementsByClassName("active");
    for (let btn of activeButtons) {
        btn.classList.remove("active");
    }
    console.log(activeButtons);
}

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
        .then(data => {
            displayVideos(data.videos);
            document.getElementById("btn-all").classList.add("active");
        })
}
//load categories videos
const loadCategoryVideos = (id) => {
    const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`;

    fetch(url)
        .then(res => res.json())
        .then(data => {
            removeActiveClass();
            const clickedButton = document.getElementById(`btn-${id}`);
            clickedButton.classList.add("active");
            displayVideos(data.category)
        });
};

//load and show video details
const loadVideoDetails = (videoId) => {
    const url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`
    fetch(url)
        .then(res => res.json())
        .then(data => {
            displayVideoDetails(data.video)
        })

}
const displayVideoDetails = (video) => {
    document.getElementById('video_details').showModal()
    const detailsContainer = document.getElementById('details-container')
    detailsContainer.innerHTML = `
        <div>
           <div class="relative">
            <img class="rounded-md w-full h-[200px] object-cover" src="${video.thumbnail}" alt="">
            <span class="absolute bottom-3 right-4 bg-black rounded-sm text-white text-sm px-1">${video.others['posted_date']}</span>
           </div>
            <div class="flex items-center gap-4 mt-3">
                <img class="w-10 h-10 rounded-full" src="${video.authors[0]['profile_picture']}" alt="">
                <h3 class="font-bold">${video.title}</h3>
            </div>
            <div class="flex items-center gap-2 mx-auto pl-14">
                
            <small class="text-sm text-[#171717B3]">${video.description} Views</small>
            </div>
            
        </div>
        `
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
         <button id="btn-${cat.category_id}" onclick="loadCategoryVideos(${cat.category_id})" class="btn btn-sm border-none bg-[#25252533] hover:text-white hover:bg-[#FF1F3D]">${cat.category}</button>
        `
        // append the element
        categoryContainer.append(categoryDiv);
    }

}

//display videos
const displayVideos = (videos) => {
    const videoContainer = document.getElementById("video-container");
    videoContainer.innerHTML = ""; // to empty previous category video on button click
    if (videos.length == 0) {
        videoContainer.innerHTML = `<div class="col-span-full flex flex-col justify-center items-center mt-6 md:mt-16 space-y-2">
                <img class="w-28 md:w-32" src="./assets/Icon.png" alt="">
                <h2 class="text-2xl md:text-[32px] font-bold text-center">Oops!! Sorry, There is no <br> content here</h2>
            </div>`
    }
    videos.forEach(video => {
        const videoCard = document.createElement("div");
        videoCard.innerHTML = `
        <div class="shadow">
                <figure class="relative">
                 <img class="rounded-md w-full h-[200px] object-cover" src="${video.thumbnail}" alt="">
                 <span class="absolute bottom-3 right-4 bg-black rounded-sm text-white text-sm px-1">${video.category}</span>
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
                 <button onclick="loadVideoDetails('${video.video_id}')" class="btn btn-block mt-3">Show Details</button>
             </div>
        `
        videoContainer.append(videoCard);
    })
}


//call function
loadCategories();
