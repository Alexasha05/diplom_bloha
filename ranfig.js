// ��������� ��������� �������������� ����� �� ����
function generateRandomShapes() {
    const container = document.getElementById('background-shapes');
    const numberOfShapes = 20; // ���������� �����

    for (let i = 0; i < numberOfShapes; i++) {
        const shape = document.createElement('div');
        shape.classList.add('shape');

        // ��������� ��� ������
        const shapeType = Math.random() > 0.5 ? 'circle' : 'square';
        shape.classList.add(shapeType);

        // ��������� �������
        const size = Math.random() * 50 + 10; // ������ �� 10px �� 60px
        shape.style.width = `${size}px`;
        shape.style.height = `${size}px`;

        // ��������� �������
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        shape.style.left = `${x}%`;
        shape.style.top = `${y}%`;

        // ��������� ������� ������
        const blue = Math.random() * 255; // ��������� �������� ������ ������
        const opacity = Math.random() * 0.5 + 0.3; // ������������ �� 0.3 �� 0.8
        shape.style.backgroundColor = `rgba(0, 0, ${blue}, ${opacity})`;

        // ��������� ������ � ���������
        container.appendChild(shape);
    }
}

// ����� ������� ��� �������� ��������
window.addEventListener('load', () => {
    generateRandomShapes();
});