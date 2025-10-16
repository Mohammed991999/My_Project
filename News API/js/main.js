async function getNews(category) {
    document.getElementById('rowData').innerHTML = '<div class="loading"><i class="fas fa-spinner fa-spin"></i> جاري التحميل...</div>';
    
    try {
        let response = await fetch(`https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=3f6562159b5047b1af8f6887295e3fdb`);
        let finalresults = await response.json();
        console.log(category, finalresults.articles);
        displayNews(finalresults.articles);
    } catch (error) {
        document.getElementById('rowData').innerHTML = '<div class="loading">حدث خطأ في تحميل الأخبار</div>';
    }
    }
function displayNews(articles) {
let box = '';
    if (articles && articles.length > 0) {
        for (let i = 0; i < articles.length; i++) {
        box += `
            <div class="col-md-4">
            <div class="card news-card">
                <img src="${articles[i].urlToImage || 'https://via.placeholder.com/400x200'}" class="card-img-top" alt="news image">
            <div class="card-body">
                <h5 class="card-title">${articles[i].title}</h5>
                <p class="card-text">${articles[i].description || 'لا يوجد وصف'}</p>
                <a href="${articles[i].url}" target="_blank" class="btn btn-primary">اقرأ المزيد</a>
                </div>
            </div>
            </div>
        `;
        }
    } else {
        box = '<div class="loading">لا توجد أخبار متاحة</div>';
    }
    document.getElementById('rowData').innerHTML = box;
}

document.querySelector('#news').addEventListener('change', function () {  
    getNews(this.value);
});

// تحميل الأخبار العامة عند فتح الصفحة
getNews('general');
