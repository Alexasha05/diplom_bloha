// Генерация случайных геометрических фигур на фоне
function generateRandomShapes() {
    const container = document.getElementById('background-shapes');
    const numberOfShapes = 20; // Количество фигур
    for (let i = 0; i < numberOfShapes; i++) {
        const shape = document.createElement('div');
        shape.classList.add('shape');
        const shapeType = Math.random() > 0.5 ? 'circle' : 'square';
        shape.classList.add(shapeType);
        const size = Math.random() * 50 + 10;
        shape.style.width = `${size}px`;
        shape.style.height = `${size}px`;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        shape.style.left = `${x}%`;
        shape.style.top = `${y}%`;
        const red = 217 + Math.random() * 38 - 19;
        const green = 24 + Math.random() * 20 - 10;
        const blue = 66 + Math.random() * 20 - 10;
        const opacity = Math.random() * 0.5 + 0.3;
        shape.style.backgroundColor = `rgba(${red}, ${green}, ${blue}, ${opacity})`;
        container.appendChild(shape);
    }
}

// Функция для добавления товара в избранное
function addToFavorites(productId, button) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (!favorites.includes(productId)) {
        favorites.push(productId);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        button.textContent = '♥';
        button.classList.add('filled');
        console.log(`Товар ${productId} добавлен в избранное`);
    } else {
        console.log(`Товар ${productId} уже находится в избранном`);
    }
    displayFavorites();
}

// Функция для удаления товара из избранного
function removeFromFavorites(productId, button) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites = favorites.filter(id => id !== productId);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    if (button) {
        button.textContent = '♡';
        button.classList.remove('filled');
    }
    console.log(`Товар ${productId} удален из избранного`);
    displayFavorites();
    updateFavoriteButtons();
}

// Функция для отображения избранных товаров
function displayFavorites() {
    const favoritesSection = document.getElementById('favorites');
    favoritesSection.innerHTML = '';
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (favorites.length === 0) {
        favoritesSection.innerHTML = '<p>В избранном пока ничего нет.</p>';
    } else {
        favorites.forEach(productId => {
            const productData = getMockProductData(productId);
            if (productData) {
                const productHtml = `
                    <div class="favorite-product" data-product-id="${productId}">
                        <img src="${productData.images[0]}" alt="${productData.title}" loading="lazy">
                        <div class="favorite-product-info">
                            <h2>${productData.title}</h2>
                            <p>${productData.shortDescription}</p>
                        </div>
                        <div class="favorite-product-actions">
                            <span class="price">${productData.price} руб.</span>
                            <button data-product-id="${productId}" class="remove-from-favorites favorite-btn filled">♥</button>
                        </div>
                    </div>
                `;
                favoritesSection.innerHTML += productHtml;
            }
        });
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

// Моковые данные товаров
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
        if (targetId === 'home') {
            updateFavoriteButtons();
        }
        previousPage = targetId;
    });
});

window.addEventListener('load', function () {
    displayProducts();
    displayFavorites();
    updateFavoriteButtons();
    generateRandomShapes();
});

document.querySelector('#home').addEventListener('click', function (event) {
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
    const productElement = event.target.closest('.product');
    if (productElement && !event.target.closest('.favorite-btn')) {
        const productId = productElement.getAttribute('data-product-id');
        showProductDetails(productId);
    }
});

document.querySelector('#favorites').addEventListener('click', function (event) {
    const productElement = event.target.closest('.favorite-product');
    if (productElement && !event.target.closest('.favorite-btn')) {
        const productId = productElement.getAttribute('data-product-id');
        showProductDetails(productId);
    }
});

function showProductDetails(productId) {
    const productData = getMockProductData(productId);
    if (!productData) {
        console.log('Товар не найден!');
        return;
    }
    const detailsSection = document.getElementById('product-details');
    detailsSection.innerHTML = `
        <h2>${productData.title}</h2>
        <p><strong>${productData.price} руб.</strong></p>
        <p>${productData.fullDescription}</p>
        <div class="product-images">
            ${productData.images.map(image => `<img src="${image}" alt="${productData.title}">`).join('')}
        </div>
    `;
    document.querySelectorAll('main').forEach(main => main.style.display = 'none');
    document.getElementById('details').style.display = 'block';
}

document.getElementById('back-button').addEventListener('click', function () {
    document.querySelectorAll('main').forEach(main => main.style.display = 'none');
    if (previousPage === 'home') {
        document.getElementById('home').style.display = 'block';
    } else if (previousPage === 'favorites') {
        document.getElementById('favorites').style.display = 'block';
    }
});

function displayProducts() {
    document.querySelectorAll('.product').forEach(productElement => {
        const productId = productElement.getAttribute('data-product-id');
        const productData = getMockProductData(productId);
        if (productData) {
            // Заполняем изображение
            const imgElement = productElement.querySelector('img');
            if (imgElement) {
                imgElement.src = productData.images[0];
                imgElement.alt = productData.title;
            }

            // Заполняем название товара
            const titleElement = productElement.querySelector('h2');
            if (titleElement) {
                titleElement.textContent = productData.title;
            }

            // Заполняем описание товара
            const descriptionElement = productElement.querySelector('p');
            if (descriptionElement) {
                descriptionElement.textContent = productData.shortDescription;
            }

            // Заполняем цену товара
            const priceElement = productElement.querySelector('.price');
            if (priceElement) {
                priceElement.textContent = `${productData.price} руб.`;
            }
        } else {
            console.error(`Данные для товара с ID ${productId} не найдены.`);
        }
    });
}