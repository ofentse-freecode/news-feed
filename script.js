const apiKey = "8b2548d159a442fc8b0df2d3efcaf2d6";

const blogContainer = document.getElementById("main-container");

//fatch the data and clean it into json
async function fetchRandomNews(){
    try{
        const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=15&apiKey=${apiKey}`
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data.articles;
    }
    catch(error){
        console.error("Error fetching news", error)
        return []
    }
};
 
//function for displaying the data
function displayBlogs(articles){
    blogContainer.textContent = "";
    articles.forEach((article) => {
        const blogCard = document.createElement("div")
        blogCard.classList.add("blog-card");
        const img = document.createElement("img");
        img.src = article.urlToImage;
        img.alt = article.title;
        const title = document.createElement("h2");
        title.textContent = article.title;
        const desc = document.createElement("p");
        desc.textContent = article.description;

        blogCard.appendChild(img);
        blogCard.appendChild(title);
        blogCard.appendChild(desc);
        blogContainer.appendChild(blogCard);
    });
}

//call the function.(fetchRandomNews)
(async ()=>{
    try{
    const articles = await fetchRandomNews();
    displayBlogs(articles);
    } catch (error) {
        console.log("Error fetching news data", error);
    }
})();