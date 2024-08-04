
document.addEventListener('DOMContentLoaded', function() {
    const placeOrderButton = document.getElementById('placeOrder');
    const clearOrderButton = document.getElementById('clearOrder');
    const orderList = document.getElementById('orderList');
    const totalPriceElement = document.getElementById('totalPrice');
    const addCustomFoodButton = document.getElementById('addCustomFood');
    const customFoodNameInput = document.getElementById('customFoodName');
    const customFoodPriceInput = document.getElementById('customFoodPrice');
    let totalPrice = 0;

    function updateTotalPrice() {
        totalPrice = 0;
        orderList.innerHTML = ''; // Clear the current order list
        const foodCheckboxes = document.querySelectorAll('.food-checkbox');
        foodCheckboxes.forEach(function(checkbox) {
            if (checkbox.checked) {
                const foodName = checkbox.getAttribute('data-name');
                const foodPrice = parseInt(checkbox.getAttribute('data-price'), 10);
                const quantityInput = document.querySelector(`.quantity[data-name="${foodName}"]`);
                const quantity = parseInt(quantityInput.value, 10);

                const listItem = document.createElement('li');
                listItem.textContent = `${foodName} - Rs. ${foodPrice * quantity} (${quantity})`;
                orderList.appendChild(listItem);

                totalPrice += foodPrice * quantity;
            }
        });
        totalPriceElement.textContent = totalPrice;
    }

    function createQuantityControls(checkbox) {
        const foodName = checkbox.getAttribute('data-name');
        const quantityControl = document.createElement('div');
        quantityControl.className = 'quantity-control';
        quantityControl.innerHTML = `
            <button class="quantity-decrease" data-name="${foodName}">-</button>
            <input type="text" class="quantity" data-name="${foodName}" value="1" readonly>
            <button class="quantity-increase" data-name="${foodName}">+</button>
        `;
        checkbox.parentNode.appendChild(quantityControl);

        const decreaseButton = quantityControl.querySelector('.quantity-decrease');
        const increaseButton = quantityControl.querySelector('.quantity-increase');
        const quantityInput = quantityControl.querySelector('.quantity');

        decreaseButton.addEventListener('click', function() {
            let quantity = parseInt(quantityInput.value, 10);
            if (quantity > 1) {
                quantity -= 1;
                quantityInput.value = quantity;
                updateTotalPrice();
            }
        });

        increaseButton.addEventListener('click', function() {
            let quantity = parseInt(quantityInput.value, 10);
            quantity += 1;
            quantityInput.value = quantity;
            updateTotalPrice();
        });
    }

    addCustomFoodButton.addEventListener('click', function() {
        const foodName = customFoodNameInput.value.trim();
        const foodPrice = customFoodPriceInput.value.trim();

        if (foodName && foodPrice) {
            const foodItem = document.createElement('li');
            foodItem.textContent = `${foodName} - Rs. ${foodPrice} (1)`;
            orderList.appendChild(foodItem);

            totalPrice += parseInt(foodPrice, 10);
            totalPriceElement.textContent = totalPrice;

            customFoodNameInput.value = '';
            customFoodPriceInput.value = '';
        }
    });

    placeOrderButton.addEventListener('click', function() {
        alert('Order placed successfully!');
    });

    clearOrderButton.addEventListener('click', function() {
        const foodCheckboxes = document.querySelectorAll('.food-checkbox');
        foodCheckboxes.forEach(function(checkbox) {
            checkbox.checked = false;
            const quantityControl = checkbox.parentNode.querySelector('.quantity-control');
            if (quantityControl) {
                quantityControl.remove();
            }
        });

        orderList.innerHTML = '';
        totalPrice = 0;
        totalPriceElement.textContent = totalPrice;
    });

    const foodCheckboxes = document.querySelectorAll('.food-checkbox');
    foodCheckboxes.forEach(function(checkbox) {
        checkbox.addEventListener('change', function() {
            if (checkbox.checked) {
                createQuantityControls(checkbox);
            } else {
                const quantityControl = checkbox.parentNode.querySelector('.quantity-control');
                if (quantityControl) {
                    quantityControl.remove();
                }
            }
            updateTotalPrice();
        });
    });
});
