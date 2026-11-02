/*jslint browser */

// Целое число от 1 до 999999: только цифры, первая цифра не ноль
const QUANTITY_PATTERN = /^[1-9][0-9]{0,5}$/;
const ERROR_TEXT = "Введите целое число от 1 до 999999 (только цифры, без пробелов и знаков).";

function initCalculator() {
    const productSelect = document.getElementById("product");
    const quantityInput = document.getElementById("quantity");
    const calcButton = document.getElementById("calc-button");
    const errorBox = document.getElementById("error");
    const resultBox = document.getElementById("result");

    function showError(message) {
        errorBox.textContent = message;
        quantityInput.classList.add("invalid");
        resultBox.textContent = "";
    }

    function clearError() {
        errorBox.textContent = "";
        quantityInput.classList.remove("invalid");
    }

    function calculate() {
        const text = quantityInput.value.trim();

        if (QUANTITY_PATTERN.test(text)) {
            clearError();
            const quantity = parseInt(text, 10);
            const price = parseInt(productSelect.value, 10);
            const total = price * quantity;
            resultBox.textContent = "Стоимость заказа: " + total.toLocaleString("ru-RU") + " ₽";
        } else {
            showError(ERROR_TEXT);
        }
    }

    calcButton.addEventListener("click", calculate);
}

// Запускаем инициализацию, когда DOM полностью загружен
document.addEventListener("DOMContentLoaded", initCalculator);
