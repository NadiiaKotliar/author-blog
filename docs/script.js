// Данные статей (можно заменить на загрузку из JSON)
const articles = [
    {
        id: 1,
        title: "Как начать писать интересные статьи",
        excerpt: "Практические советы для начинающих авторов, которые хотят развивать свой стиль.",
        date: "15 ноября 2023",
        readTime: "5 мин",
        category: "Писательство"
    },
    {
        id: 2,
        title: "Искусство повествования в современном мире",
        excerpt: "Как рассказывать истории, которые захватывают внимание читателя с первых строк.",
        date: "8 ноября 2023",
        readTime: "8 мин",
        category: "Литература"
    },
    {
        id: 3,
        title: "Цифровые инструменты для авторов",
        excerpt: "Обзор полезных программ и приложений, которые облегчают работу писателя.",
        date: "1 ноября 2023",
        readTime: "6 мин",
        category: "Технологии"
    },
    {
        id: 4,
        title: "Вдохновение в повседневности",
        excerpt: "Где искать идеи для статей, когда кажется, что ничего интересного не происходит.",
        date: "25 октября 2023",
        readTime: "7 мин",
        category: "Творчество"
    }
];

// Загружаем статьи на страницу
function loadArticles() {
    const articlesGrid = document.getElementById('articlesGrid');
    
    if (!articlesGrid) return;
    
    articlesGrid.innerHTML = articles.map(article => `
        <article class="article-card">
            <div class="article-image">
                <i class="fas fa-feather-alt"></i>
            </div>
            <div class="article-content">
                <h3 class="article-title">${article.title}</h3>
                <p class="article-excerpt">${article.excerpt}</p>
                <div class="article-meta">
                    <span>${article.date}</span>
                    <span>${article.readTime} чтения</span>
                    <span>${article.category}</span>
                </div>
            </div>
        </article>
    `).join('');
}

// Переключение темы
function initTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('i');
    
    // Проверяем сохраненную тему
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }
    
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        
        if (document.body.classList.contains('dark-theme')) {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
            localStorage.setItem('theme', 'dark');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
            localStorage.setItem('theme', 'light');
        }
    });
}

// Плавная прокрутка
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Анимация при прокрутке
function initScrollAnimation() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);
    
    // Наблюдаем за карточками статей
    document.querySelectorAll('.article-card').forEach(card => {
        observer.observe(card);
    });
}

// Инициализация всего при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    loadArticles();
    initTheme();
    initSmoothScroll();
    initScrollAnimation();
    
    console.log('Сайт загружен! ✨');
});

// Сохраняем статьи в localStorage (имитация базы данных)
function saveArticlesToStorage() {
    localStorage.setItem('articles', JSON.stringify(articles));
}

// Загружаем статьи из localStorage
function loadArticlesFromStorage() {
    const saved = localStorage.getItem('articles');
    if (saved) {
        return JSON.parse(saved);
    }
    return articles;
}
