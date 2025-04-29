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

        // Случайный оттенок малинового
        const red = 217 + Math.random() * 38 - 19; // Варьируем красный канал (217 ± 19)
        const green = 24 + Math.random() * 20 - 10; // Варьируем зеленый канал (24 ± 10)
        const blue = 66 + Math.random() * 20 - 10; // Варьируем синий канал (66 ± 10)
        const opacity = Math.random() * 0.5 + 0.3; // Прозрачность от 0.3 до 0.8
        shape.style.backgroundColor = `rgba(${red}, ${green}, ${blue}, ${opacity})`;

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
        console.log(`Товар ${productId} добавлен в избранное`); // Логируем действие в консоль
    } else {
        console.log(`Товар ${productId} уже находится в избранном`); // Логируем действие в консоль
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

    console.log(`Товар ${productId} удален из избранного`); // Логируем действие в консоль
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
                        <div class="product-actions">
                            <span class="price">${productData.price} руб.</span>
                            <button data-product-id="${productId}" class="remove-from-favorites favorite-btn filled">♥</button>
                        </div>
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
        1: { image: 'pic/2.png', title: 'PowerBank 2600mah', description: 'Описание товара 1', price: 500 },
        2: { image: 'https://via.placeholder.com/100', title: 'Powerbank 4000mah', description: 'Описание товара 2', price: 750 },
        3: { image: 'https://via.placeholder.com/100', title: 'Powerbank 5000mah', description: 'Описание товара 3', price: 1200 },
        4: { image: 'https://via.placeholder.com/100', title: 'Беспроводная зарядка', description: 'Описание товара 4', price: 900 },
        5: { image: 'https://via.placeholder.com/100', title: 'Термос', description: 'Описание товара 5', price: 600 },
        6: { image: 'https://via.placeholder.com/100', title: 'Подставка под телефон', description: 'Описание товара 6', price: 850 },
        7: { image: 'https://via.placeholder.com/100', title: 'Мультитул', description: 'Описание товара 7', price: 1100 },
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
    displayProducts(); // Отображаем товары на главной странице
    displayFavorites(); // Обновляем раздел "Избранное"
    updateFavoriteButtons(); // Обновляем кнопки на странице "Главная"
    generateRandomShapes(); // Генерируем случайные фигуры на фоне
});

// Добавление обработчиков событий через делегирование
document.querySelector('#home').addEventListener('click', function (event) {
    // Обработка кликов по кнопкам "Добавить в избранное"
    const favoriteButton = event.target.closest('.favorite-btn');
    if (favoriteButton) {
        const productId = favoriteButton.getAttribute('data-product-id');
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        if (favorites.includes(productId)) {
            removeFromFavorites(productId, favoriteButton);
        } else {
            addToFavorites(productId, favoriteButton);
        }
    }

    // Обработка кликов по карточкам товаров
    const productElement = event.target.closest('.product');
    if (productElement && !event.target.closest('.favorite-btn')) {
        const productId = productElement.getAttribute('data-product-id');
        showProductDetails(productId);
    }
});

document.querySelector('#favorites').addEventListener('click', function (event) {
    // Обработка кликов по карточкам товаров в разделе "Избранное"
    const productElement = event.target.closest('.favorite-product');
    if (productElement && !event.target.closest('.favorite-btn')) {
        const productId = productElement.getAttribute('data-product-id');
        showProductDetails(productId);
    }
});

// Функция для отображения деталей товара
function showProductDetails(productId) {
    const productData = getMockProductData(productId);

    if (!productData) {
        console.log('Товар не найден!');
        return;
    }

    // Заполняем данные о товаре
    const detailsSection = document.getElementById('product-details');
    detailsSection.innerHTML = `
        <img src="${productData.image}" alt="${productData.title}">
        <h2>${productData.title}</h2>
        <p><strong>${productData.price} руб.</strong></p>
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

// Функция для отображения товаров на главной странице
function displayProducts() {
    document.querySelectorAll('.product').forEach(productElement => {
        const productId = productElement.getAttribute('data-product-id');
        const productData = getMockProductData(productId);

        if (productData) {
            // Заполняем изображение
            const imgElement = productElement.querySelector('img');
            imgElement.src = productData.image;
            imgElement.alt = productData.title;

            // Заполняем название
            const titleElement = productElement.querySelector('h2');
            titleElement.textContent = productData.title;

            // Заполняем описание
            const descriptionElement = productElement.querySelector('p');
            descriptionElement.textContent = productData.description;

            // Заполняем цену
            const priceElement = productElement.querySelector('.price');
            priceElement.textContent = `${productData.price} руб.`;
        }
    });
}