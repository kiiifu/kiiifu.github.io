/*jslint browser */

// Целое число от 1 до 999999: только цифры, первая цифра не ноль
const QUANTITY_PATTERN = /^[1-9][0-9]{0,5}$/;
const ERROR_TEXT = "Введите целое число от 1 до 999999 (только цифры, без пробелов и знаков).";

// Базовая цена и доступные дополнительные элементы для каждого типа услуги
const SERVICES = {
    basic: {price: 1000, hasOptions: false, hasProperty: false},
    standard: {price: 1500, hasOptions: true, hasProperty: false},
    premium: {price: 2500, hasOptions: false, hasProperty: true}
};

function initCalculator() {
    const quantityInput = document.getElementById("quantity");
    const radios = document.querySelectorAll("input[name='service']");
    const optionsGroup = document.getElementById("options-group");
    const optionSelect = document.getElementById("option");
    const propertyGroup = document.getElementById("property-group");
    const propertyCheckbox = document.getElementById("property");
    const errorBox = document.getElementById("error");
    const resultBox = document.getElementById("result");

    function getSelectedService() {
        const checked = document.querySelector("input[name='service']:checked");
        return SERVICES[checked.value];
    }

    function showError(message) {
        errorBox.textContent = message;
        quantityInput.classList.add("invalid");
        resultBox.textContent = "";
    }

    function clearError() {
        errorBox.textContent = "";
        quantityInput.classList.remove("invalid");
    }

    // Показываем или скрываем select и чекбокс в зависимости от типа услуги
    function updateVisibility() {
        const service = getSelectedService();
        optionsGroup.hidden = !service.hasOptions;
        propertyGroup.hidden = !service.hasProperty;
        if (!service.hasProperty) {
            propertyCheckbox.checked = false;
        }
        if (!service.hasOptions) {
            optionSelect.selectedIndex = 0;
        }
    }

    function calculate() {
        const text = quantityInput.value.trim();

        if (QUANTITY_PATTERN.test(text)) {
            clearError();
            const service = getSelectedService();
            let unitPrice = service.price;

            if (service.hasOptions) {
                unitPrice += parseInt(optionSelect.value, 10);
            }
            if (service.hasProperty && propertyCheckbox.checked) {
                unitPrice += parseInt(propertyCheckbox.value, 10);
            }

            const total = unitPrice * parseInt(text, 10);
            resultBox.textContent = "Стоимость: " + total.toLocaleString("ru-RU") + " ₽";
        } else {
            showError(ERROR_TEXT);
        }
    }

    function onTypeChange() {
        updateVisibility();
        calculate();
    }

    quantityInput.addEventListener("input", calculate);
    radios.forEach(function (radio) {
        radio.addEventListener("change", onTypeChange);
    });
    optionSelect.addEventListener("change", calculate);
    propertyCheckbox.addEventListener("change", calculate);

    // Первоначальное состояние формы и расчёт
    updateVisibility();
    calculate();
}

// Запускаем инициализацию, когда DOM полностью загружен
document.addEventListener("DOMContentLoaded", initCalculator);
