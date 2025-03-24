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

    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    if (favorites.length === 0) {
        favoritesSection.innerHTML = '<p>В избранном пока ничего нет.</p>';
    } else {
        favorites.forEach(productId => {
            const productData = getMockProductData(productId);

            if (productData) {
                const productHtml = `
                    <div class="favorite-product">
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

// Обработка кнопок "Добавить в избранное"
document.querySelectorAll('.product .favorite-btn').forEach(button => {
    const productId = button.getAttribute('data-product-id');
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    // Проверяем, находится ли товар уже в избранном
    if (favorites.includes(productId)) {
        button.textContent = '♥';
        button.classList.add('filled');
    }

    button.addEventListener('click', function () {
        if (button.classList.contains('filled')) {
            removeFromFavorites(productId, button);
        } else {
            addToFavorites(productId, button);
        }
    });
});

// При загрузке страницы или переключении между разделами
window.addEventListener('load', function () {
    displayFavorites(); // Обновляем раздел "Избранное"
    updateFavoriteButtons(); // Обновляем кнопки на странице "Главная"
});

// Если используется pag_cyc.js для переключения между разделами
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', function () {
        setTimeout(() => {
            if (window.location.hash === '#home') {
                updateFavoriteButtons(); // Обновляем кнопки при переходе на главную
            }
        }, 0);
    });
});