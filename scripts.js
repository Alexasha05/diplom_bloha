
// Генерация случайных геометрических фигур на фоне
function generateRandomShapes() {
    const container = document.getElementById('background-shapes');
    const numberOfShapes = 20; // Количество фигур

    for (let i = 0; i < numberOfShapes; i++) {
        const shape = document.createElement('div');
        shape.classList.add('shape');

        // Случайный тип фигуры
        const shapeType = Math.random() > 0.5 ? 'circle' : 'square';
        shape.classList.add(shapeType);

        // Случайные размеры
        const size = Math.random() * 50 + 10; // Размер от 10px до 60px
        shape.style.width = `${size}px`;
        shape.style.height = `${size}px`;

        // Случайная позиция
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        shape.style.left = `${x}%`;
        shape.style.top = `${y}%`;

        // Случайный оттенок синего
        const blue = Math.random() * 255; // Случайное значение синего канала
        const opacity = Math.random() * 0.5 + 0.3; // Прозрачность от 0.3 до 0.8
        shape.style.backgroundColor = `rgba(0, 0, ${blue}, ${opacity})`;

        // Добавляем фигуру в контейнер
        container.appendChild(shape);
    }
}

// Функция для добавления товара в избранное
function addToFavorites(productId, button) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    if (!favorites.includes(productId)) {
        favorites.push(productId);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        button.textContent = '♥'; // Меняем значок на заполненное сердечко
        button.classList.add('filled'); // Добавляем класс для стилизации
        alert(`Товар ${productId} добавлен в избранное`);
    } else {
        alert(`Товар ${productId} уже находится в избранном`);
    }

    displayFavorites(); // Обновляем раздел "Избранное"
}

// Функция для удаления товара из избранного
function removeFromFavorites(productId, button) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites = favorites.filter(id => id !== productId);
    localStorage.setItem('favorites', JSON.stringify(favorites));

    if (button) {
        button.textContent = '♡'; // Меняем значок на пустое сердечко
        button.classList.remove('filled'); // Удаляем класс для стилизации
    }

    displayFavorites(); // Обновляем раздел "Избранное"
    updateFavoriteButtons(); // Обновляем кнопки на странице "Главная"
}

// Функция для отображения избранных товаров
function displayFavorites() {
    const favoritesSection = document.getElementById('favorites');
    favoritesSection.innerHTML = ''; // Очищаем секцию

    // Получаем список избранных товаров из localStorage
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    if (favorites.length === 0) {
        favoritesSection.innerHTML = '<p>В избранном пока ничего нет.</p>';
    } else {
        favorites.forEach(productId => {
            const productData = getMockProductData(productId);

            if (productData) {
                const productHtml = `
                                    <div class="favorite-product" data-product-id="${productId}">
                                        <img src="${productData.image}" alt="${productData.title}">
                                        <div>
                                            <h2>${productData.title}</h2>
                                            <p>${productData.description}</p>
                                        </div>
                                        <button data-product-id="${productId}" class="remove-from-favorites favorite-btn filled">♥</button>
                                    </div>
                                `;
                favoritesSection.innerHTML += productHtml;
            }
        });

        // Добавляем обработчики событий для кнопок "Удалить из избранного"
        document.querySelectorAll('.remove-from-favorites').forEach(button => {
            button.addEventListener('click', function () {
                const productId = this.getAttribute('data-product-id');
                removeFromFavorites(productId, this);
            });
        });
    }
}

// Функция для обновления состояния кнопок на странице "Главная"
function updateFavoriteButtons() {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    document.querySelectorAll('.product .favorite-btn').forEach(button => {
        const productId = button.getAttribute('data-product-id');

        if (favorites.includes(productId)) {
            button.textContent = '♥';
            button.classList.add('filled');
        } else {
            button.textContent = '♡';
            button.classList.remove('filled');
        }
    });
}

// Моковые данные товаров (заменить на реальные данные)
function getMockProductData(productId) {
    const products = {
        1: { image: 'https://via.placeholder.com/100', title: 'Товар 1', description: 'Описание товара 1' },
        2: { image: 'https://via.placeholder.com/100', title: 'Товар 2', description: 'Описание товара 2' },
        // Добавьте здесь другие товары
    };
    return products[productId];
}

// Переменная для отслеживания предыдущей страницы
let previousPage = 'home';

// Используем ваш скрипт pag_cyc.js для переключения между разделами
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        document.querySelectorAll('main').forEach(main => main.style.display = 'none');
        document.getElementById(targetId).style.display = 'block';

        // Если перешли на главную, обновляем кнопки "сердечко"
        if (targetId === 'home') {
            updateFavoriteButtons();
        }

        // Обновляем предыдущую страницу
        previousPage = targetId;
    });
});

// При загрузке страницы или переключении между разделами
window.addEventListener('load', function () {
    displayFavorites(); // Обновляем раздел "Избранное"
    updateFavoriteButtons(); // Обновляем кнопки на странице "Главная"
    generateRandomShapes(); // Генерируем случайные фигуры на фоне

    // Добавляем обработчики кликов для товаров на главной странице
    document.querySelector('#home').addEventListener('click', function (event) {
        const productElement = event.target.closest('.product');
        if (productElement && !event.target.closest('.favorite-btn')) {
            previousPage = 'home'; // Обновляем предыдущую страницу
            const productId = productElement.getAttribute('data-product-id');
            showProductDetails(productId);
        }
    });

    // Добавляем обработчики кликов для товаров в разделе "Избранное"
    document.querySelector('#favorites').addEventListener('click', function (event) {
        const productElement = event.target.closest('.favorite-product');
        if (productElement && !event.target.closest('.favorite-btn')) {
            previousPage = 'favorites'; // Обновляем предыдущую страницу
            const productId = productElement.getAttribute('data-product-id');
            showProductDetails(productId);
        }
    });
});

// Функция для отображения деталей товара
function showProductDetails(productId) {
    const productData = getMockProductData(productId);

    if (!productData) {
        alert('Товар не найден!');
        return;
    }

    // Заполняем данные о товаре
    const detailsSection = document.getElementById('product-details');
    detailsSection.innerHTML = `
                        <img src="${productData.image}" alt="${productData.title}">
                        <h2>${productData.title}</h2>
                        <p>${productData.description}</p>
                    `;

    // Показываем раздел с деталями товара
    document.querySelectorAll('main').forEach(main => main.style.display = 'none');
    document.getElementById('details').style.display = 'block';
}

// Обработчик кнопки "Назад"
document.getElementById('back-button').addEventListener('click', function () {
    // Скрываем все разделы
    document.querySelectorAll('main').forEach(main => main.style.display = 'none');

    // Возвращаемся на предыдущую страницу
    if (previousPage === 'home') {
        document.getElementById('home').style.display = 'block';
    } else if (previousPage === 'favorites') {
        document.getElementById('favorites').style.display = 'block';
    }
});

// Обработка кнопок "Добавить в избранное"
document.querySelectorAll('.product .favorite-btn').forEach(button => {
    const productId = button.getAttribute('data-product-id');
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    // Проверяем, находится ли товар уже в избранном
    if (favorites.includes(productId)) {
        button.textContent = '♥';
        button.classList.add('filled');
    }

    button.addEventListener('click', function (e) {
        e.stopPropagation(); // Предотвращаем всплытие события на родительский элемент
        if (button.classList.contains('filled')) {
            removeFromFavorites(productId, button);
        } else {
            addToFavorites(productId, button);
        }
    });
});

// Обновляем кнопки "сердечко" при загрузке страницы
updateFavoriteButtons();
