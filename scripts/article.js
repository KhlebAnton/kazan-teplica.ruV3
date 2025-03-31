fetch('../products/article.json')
    .then(response => response.json()) // 
    .then(data => {

        setDataArticle(data)


    })
    .catch(error => {
        console.error('Ошибка при загрузке JSON:', error);
    });

;

let dataArticle;
const sectionBlog = document.querySelector('.blog_section');
const blogArticle = document.querySelector('.blog_article');
const navTitle = document.querySelector('.beard-crumb__title')
const articleBlog = document.querySelector('.blog_article__content');
function setDataArticle(data) {
   

    dataArticle = data.article;
    console.log(dataArticle);

    if(sectionBlog) {
        setBlogItems()
    }
    if(blogArticle) {
        const urlParams = new URLSearchParams(window.location.search);
        const myParam = urlParams.get('id');
        setBlogArticle(myParam)
    }
    if(articleBlog) {
        setArticleItems();
    }
}
function setArticleItems() {
    articleBlog.innerHTML = '';
    
    // Создаем массив индексов
    const indices = Array.from({length: dataArticle.length}, (_, i) => i);
    
    // Выбираем 3 случайных индекса
    const randomIndices = [];
    while (randomIndices.length < 3 && indices.length > 0) {
        const randomIndex = Math.floor(Math.random() * indices.length);
        randomIndices.push(indices.splice(randomIndex, 1)[0]);
    }
    
    randomIndices.forEach(index => {
        const blog = dataArticle[index];
        const blogItem = document.createElement('div');
        blogItem.classList.add('blog_item');

        blogItem.addEventListener('click', ()=> {
            window.location.href = `./blog/article.html?id=${index}`;
        })

        const blogPrev = document.createElement('div');
        blogPrev.classList.add('blog__prev');
        blogPrev.innerHTML = `
         <img src="${blog.preview}" alt="${blog.title}">
        `;
        blogItem.appendChild(blogPrev);

        const blogTitle = document.createElement('h3');
        blogTitle.classList.add('blog__title');
        blogTitle.textContent = blog.title;
        blogItem.appendChild(blogTitle);

        articleBlog.appendChild(blogItem);
    });
}
function setBlogItems() {
    sectionBlog.innerHTML= '';

    dataArticle.forEach((blog,index) => {
        
        const blogItem = document.createElement('div');
        blogItem.classList.add('blog_item');

        blogItem.addEventListener('click', ()=> {
            window.location.href = `./article.html?id=${index}`;
        })

        const blogPrev = document.createElement('div');
        blogPrev.classList.add('blog__prev');
        blogPrev.innerHTML = `
         <img src="${blog.preview}" alt="${blog.title}">
        `;
        blogItem.appendChild(blogPrev);

        const blogTitle = document.createElement('h3');
        blogTitle.classList.add('blog__title');
        blogTitle.textContent = blog.title;
        blogItem.appendChild(blogTitle);

        const blogText = document.createElement('div');
        blogText.classList.add('blog__text');
        blogText.textContent = blog.content[0].text;
        blogItem.appendChild(blogText);

        sectionBlog.appendChild(blogItem)
    });
}
function setBlogArticle(id) {
    blogArticle.innerHTML = '';
    
    const blog = dataArticle[id];
   
    navTitle.innerHTML = blog.title;
    const blogImg = document.createElement('div');
    blogImg.classList.add('blog_article__img');
    blogImg.innerHTML = `
         <img src="${blog.image}" alt=""${blog.title}">
    `;

    blogArticle.appendChild(blogImg)

    const blogTitle = document.createElement('h1');
    blogTitle.classList.add('blog_article__title')
    blogTitle.textContent = blog.title;

    blogArticle.appendChild(blogTitle);

    const blogText = document.createElement('div');
    blogText.classList.add('blog_article__text');

    blog.content.forEach(el => {
        const blogTextEl = document.createElement('div');
        blogTextEl.classList.add('blog_article__text');


        const textTitle = document.createElement('h3');
        textTitle.classList.add('blog__text_title');
        textTitle.textContent = el.title;
        blogTextEl.appendChild(textTitle);

        el.text.forEach(text => {
            const textEl = document.createElement('p');
            textEl.classList.add('blog__text-info');
            textEl.textContent = text ;
            blogTextEl.appendChild(textEl)
        })
        blogText.appendChild(blogTextEl);
    });
    blogArticle.appendChild(blogText)
} 