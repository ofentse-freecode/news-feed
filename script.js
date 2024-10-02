const apiKey = "8b2548d159a442fc8b0df2d3efcaf2d6";
const blogContainer = document.getElementById("main-container");
const search = document.getElementById("search-input");
const searchBtn = document.getElementById('search-btn');

//fetch the data and clean it into json
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

searchBtn.addEventListener('click', async ()=>{
    const query = search.value.trim();
    if (query !== ""){
        try{
            const articles = await fetchQuery(query)
            displayBlogs(articles)
        }catch(error){
            console.log("Error fetching query", error);
        }
    }
})
//search function
async function fetchQuery(query){
    try{
        const apiUrl = `https://newsapi.org/v2/everything?q=${query}&pageSize=12&apiKey=${apiKey}`
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log(data)
    return data.articles;
    }
    catch(error){
        console.error("Error fetching news", error);
        return []
    }
}
 
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
        const truncatedTitle = article.title.length > 30 ? article.title.slice(0, 30) + "..." : article.title;
        title.textContent = truncatedTitle;

        const desc = document.createElement("p");
        const truncatedDes = article.description > 110 ? article.description.slice(0, 110) + "..." : article.description;
        desc.textContent = truncatedDes;
        
        if (article.title.length > 10 && article.description !== null){
        blogCard.appendChild(img);
        blogCard.appendChild(title);
        blogCard.appendChild(desc);
        blogCard.addEventListener("click", ()=> {
            window.open(article.url, "_blank");
        })
        blogContainer.appendChild(blogCard);
    }  
      
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
})();//call that function