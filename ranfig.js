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

// Вызов функции при загрузке страницы
window.addEventListener('load', () => {
    generateRandomShapes();
});