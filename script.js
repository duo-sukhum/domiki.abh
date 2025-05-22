



// Ждем, пока DOM будет полностью загружен
document.addEventListener('DOMContentLoaded', function() {
    // Находим элементы для гамбургер-меню
    const hamburger = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');
    const navLinksList = document.querySelectorAll('.nav-links a'); // Все ссылки в меню

    // Добавляем слушатель события клика на кнопку-гамбургер
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active'); // Переключаем класс для анимации гамбургера
            navLinks.classList.toggle('active'); // Переключаем класс для показа/скрытия меню
        });
    }

    // Закрытие меню при клике на ссылку (только для мобильных)
    if (navLinksList) {
        navLinksList.forEach(link => {
            link.addEventListener('click', function() {
                // Проверяем, активно ли меню (т.е. находимся ли мы на мобильном)
                // Используем window.innerWidth для проверки ширины окна
                if (window.innerWidth <= 768) { // Значение должно совпадать с медиа-запросом
                    hamburger.classList.remove('active');
                    navLinks.classList.remove('active');
                }
            });
        });
    }

    // === Код для лайтбокса (ваш существующий код) ===
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const captionText = document.getElementById('caption');
    const closeButton = document.querySelector('.close-button');
    const prevButton = document.querySelector('.prev-button');
    const nextButton = document.querySelector('.next-button');
    let currentIndex = 0;
    let galleryImages = [];

    galleryItems.forEach((item, index) => {
        galleryImages.push({
            src: item.src,
            alt: item.alt
        });

        item.addEventListener('click', function() {
            currentIndex = index;
            openLightbox(currentIndex);
        });
    });

    closeButton.addEventListener('click', closeLightbox);
    prevButton.addEventListener('click', showPrevImage);
    nextButton.addEventListener('click', showNextImage);

    // Закрытие лайтбокса по клику вне изображения (но не на кнопках)
    if (lightbox) {
        lightbox.addEventListener('click', function(e) {
            // Если клик был по самому лайтбоксу (фону), а не по его содержимому
            if (e.target === lightbox || e.target === closeButton) {
                closeLightbox();
            }
        });
    }

    // Закрытие лайтбокса по кнопке ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightbox.classList.contains('visible')) {
            closeLightbox();
        }
        if (e.key === 'ArrowLeft' && lightbox.classList.contains('visible')) {
            showPrevImage();
        }
        if (e.key === 'ArrowRight' && lightbox.classList.contains('visible')) {
            showNextImage();
        }
    });

    function openLightbox(index) {
        if (galleryImages.length === 0) return;

        // Скрываем текущее изображение и подпись для плавного перехода
        lightboxImg.classList.add('hide-image');
        captionText.classList.add('hide-caption');

        setTimeout(() => {
            lightboxImg.src = galleryImages[index].src;
            lightboxImg.alt = galleryImages[index].alt;
            captionText.innerHTML = galleryImages[index].alt;

            // Показываем изображение и подпись после установки нового src/alt
            lightboxImg.classList.remove('hide-image');
            captionText.classList.remove('hide-caption');

            lightbox.classList.add('visible'); // Делаем лайтбокс видимым
        }, 100); // Небольшая задержка, чтобы анимация скрытия успела начаться
    }

    function closeLightbox() {
        lightbox.classList.remove('visible'); // Скрываем лайтбокс
    }

    function showNextImage() {
        currentIndex = (currentIndex + 1) % galleryImages.length;
        openLightbox(currentIndex);
    }

    function showPrevImage() {
        currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
        openLightbox(currentIndex);
    }
});