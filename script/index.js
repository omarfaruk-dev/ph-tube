function loadCategories() {
    //fetch the data
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
        //convert promise to json
        .then(res => res.json())
        //send data to display
        .then(data => displayCategories(data.categories))
}

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

//call function
loadCategories();

// [
//     {
//         "category_id": "1001",
//         "category": "Music"
//     },
// ]