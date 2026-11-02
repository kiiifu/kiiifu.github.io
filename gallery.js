/*jslint browser */

// На узких экранах (смартфоны) показываем одно изображение, иначе три
const MOBILE_QUERY = "(max-width: 767px)";
const DESKTOP_PER_VIEW = 3;
const MOBILE_PER_VIEW = 1;

function initGallery() {
    const track = document.getElementById("track");
    const slides = track.children;
    const prevButton = document.getElementById("prev");
    const nextButton = document.getElementById("next");
    const pager = document.getElementById("pager");
    const status = document.getElementById("status");
    const mobileMedia = window.matchMedia(MOBILE_QUERY);
    let page = 0;

    function getPerView() {
        return (
            mobileMedia.matches
            ? MOBILE_PER_VIEW
            : DESKTOP_PER_VIEW
        );
    }

    function getPageCount() {
        return Math.ceil(slides.length / getPerView());
    }

    // Сдвигаем ленту и обновляем пейджер
    function render() {
        const perView = getPerView();
        const count = getPageCount();
        // Последняя страница показывает последние perView изображений
        const start = Math.min(page * perView, slides.length - perView);
        const dots = pager.children;

        track.style.transform = "translateX(" + (-start * 100 / perView) + "%)";

        Array.from(dots).forEach(function (dot, index) {
            const isCurrent = index === page;
            dot.classList.toggle("active", isCurrent);
            if (isCurrent) {
                dot.setAttribute("aria-current", "true");
            } else {
                dot.removeAttribute("aria-current");
            }
        });

        status.textContent = "Страница " + (page + 1) + " из " + count;
    }

    function goToPage(index) {
        const count = getPageCount();
        // Зацикливаем: после последней страницы идёт первая и наоборот
        page = (index + count) % count;
        render();
    }

    function createDot(index) {
        const dot = document.createElement("button");
        dot.type = "button";
        dot.className = "dot";
        dot.setAttribute("aria-label", "Страница " + (index + 1));
        dot.addEventListener("click", function () {
            goToPage(index);
        });
        return dot;
    }

    // Количество страниц зависит от ширины экрана, поэтому пейджер строим заново
    function buildPager() {
        const count = getPageCount();
        let i;

        pager.textContent = "";
        for (i = 0; i < count; i += 1) {
            pager.appendChild(createDot(i));
        }
    }

    function onLayoutChange() {
        page = 0;
        buildPager();
        render();
    }

    prevButton.addEventListener("click", function () {
        goToPage(page - 1);
    });
    nextButton.addEventListener("click", function () {
        goToPage(page + 1);
    });
    mobileMedia.addEventListener("change", onLayoutChange);

    buildPager();
    render();
}

// Запускаем инициализацию, когда DOM полностью загружен
document.addEventListener("DOMContentLoaded", initGallery);
