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
                        <img src="${productData.images[0]}" alt="${productData.title}">
                        <div>
                            <h2>${productData.title}</h2>
                            <p>${productData.shortDescription}</p>
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
        1: {
            images: ['img/1.jpg'],
            title: 'PowerBank 2600mah',
            shortDescription: 'Переносной аккумулятор вместительностью 2600mAh.',
            fullDescription: 'Компактный PowerBank емкостью 2600mAh, идеально подходит для зарядки смартфона в дороге.',
            price: 500
        },
        2: {
            images: ['img/2.png'],
            title: 'Powerbank 4000mah',
            shortDescription: 'Переносной аккумулятор вместительностью 4000mAh.',
            fullDescription: 'Удобный PowerBank емкостью 4000mAh с индикатором заряда.',
            price: 750
        },
        3: {
            images: ['img/3.jpg'],
            title: 'Powerbank 5000mah',
            shortDescription: 'Переносной аккумулятор вместительностью 5000mAh.',
            fullDescription: 'Мощный PowerBank емкостью 5000mAh, способен зарядить планшет или телефон.',
            price: 1200
        },
        4: {
            images: ['img/chrg/1.jpg', 'img/chrg/2.jpg'],
            title: 'Беспроводная зарядка',
            shortDescription: 'Устройство для беспроводной зарядки.',
            fullDescription: 'Современное устройство для беспроводной зарядки смартфонов с поддержкой стандарта Qi.',
            price: 900
        },
        5: {
            images: ['img/trm/trm.jpeg'],
            title: 'Термос',
            shortDescription: 'Термос для горячих напитков.',
            fullDescription: 'Вместительный термос объемом 500ml с двойными стенками, сохраняет тепло до 12 часов.',
            price: 600
        },
        6: {
            images: ['img/pod/1.jpeg', 'img/pod/2.jpeg'],
            title: 'Подставка под телефон',
            shortDescription: 'Деревянная подставка под телефон.',
            fullDescription: 'Элегантная деревянная подставка для телефона, совместима с большинством моделей.',
            price: 850
        },
        7: {
            images: ['img/multi/1.jpg', 'img/multi/2.jpg'],
            title: 'Мультитул',
            shortDescription: 'Карманный мультитул.',
            fullDescription: 'Компактный мультитул с ножом, отверткой, пилой и другими инструментами.',
            price: 1100
        },
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
        <h2>${productData.title}</h2>
        <p><strong>${productData.price} руб.</strong></p>
        <p>${productData.fullDescription}</p>
        <div class="product-images">
            ${productData.images.map(image => `<img src="${image}" alt="${productData.title}">`).join('')}
        </div>
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
            imgElement.src = productData.images[0]; // Берем первое изображение из массива
            imgElement.alt = productData.title;

            // Заполняем название
            const titleElement = productElement.querySelector('h2');
            titleElement.textContent = productData.title;

            // Заполняем краткое описание
            const descriptionElement = productElement.querySelector('p');
            descriptionElement.textContent = productData.shortDescription;

            // Заполняем цену
            const priceElement = productElement.querySelector('.price');
            priceElement.textContent = `${productData.price} руб.`;
        }
    });
}