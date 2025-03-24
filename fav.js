// Функция для добавления товара в избранное
function addToFavorites(productId) {
    // Получаем текущий список избранных товаров из localStorage
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    // Проверяем, есть ли уже такой товар в избранном
    if (!favorites.includes(productId)) {
        favorites.push(productId);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        alert(`Товар ${productId} добавлен в избранное`);
    } else {
        alert(`Товар ${productId} уже находится в избранном`);
        return; // Прерываем выполнение, если товар уже в избранном
    }

    // Обновляем отображение избранных товаров
    displayFavorites();
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
            // Имитируем данные товара (в реальности это может быть API или другое хранилище)
            const productData = getMockProductData(productId);

            if (productData) {
                const productHtml = `
                    <div class="favorite-product">
                        <img src="${productData.image}" alt="${productData.title}">
                        <div>
                            <h2>${productData.title}</h2>
                            <p>${productData.description}</p>
                        </div>
                        <button data-product-id="${productId}" class="remove-from-favorites">Удалить из избранного</button>
                    </div>
                `;
                favoritesSection.innerHTML += productHtml;
            }
        });

        // Добавляем обработчики событий для кнопок "Удалить из избранного"
        document.querySelectorAll('.remove-from-favorites').forEach(button => {
            button.addEventListener('click', function () {
                const productId = this.getAttribute('data-product-id');
                removeFromFavorites(productId);
            });
        });
    }
}

// Функция для удаления товара из избранного
function removeFromFavorites(productId) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites = favorites.filter(id => id !== productId);
    localStorage.setItem('favorites', JSON.stringify(favorites));

    // Обновляем отображение избранных товаров
    displayFavorites();
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
document.querySelectorAll('.product button').forEach(button => {
    button.addEventListener('click', function () {
        const productId = this.getAttribute('data-product-id');
        addToFavorites(productId);
    });
});

// При загрузке страницы отображаем избранные товары
window.addEventListener('load', function () {
    displayFavorites();
});