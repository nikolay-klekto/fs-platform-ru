const orderPlacingCartButtonText = document.querySelector('.order-placing__cart-button-text');
const personalAccountMenu = document.querySelector('.personal-account__menu');

//Check media query. Change button text
function checkMediaQuery() {
    if (window.innerWidth < 375.2) {
        orderPlacingCartButtonText.textContent = 'Оформить';
    }
    if (window.innerWidth > 375.2) {
        orderPlacingCartButtonText.textContent = 'Оформить заказ';
    }
};
checkMediaQuery();
window.addEventListener('resize', checkMediaQuery);


const personalAccountMenuDropdownButton = document.querySelector('.personal-account__menu-dropdown-button');
const personalAccountMenuDropdownItem = document.querySelectorAll('.personal-account__menu-dropdown-item');
const personalAccountMenuDropdownList = document.querySelector('.personal-account__menu-dropdown-list');
const dropdownButton = document.querySelector('.dropdown__button');
const personalAccountMenuDropdownInput = document.querySelector('.personal-account__menu-dropdown-input');

//Click on the button. Open/Close select
personalAccountMenuDropdownButton.addEventListener('click', function (e) {
    e.stopPropagation();
    personalAccountMenuDropdownList.style.display = 'block';
});

//Select list item. Remember selected value. Close dropdown
personalAccountMenuDropdownItem.forEach(function (listItem) {
    listItem.addEventListener('click', function (e) {
        e.stopPropagation();
        dropdownButton.innerText = this.innerText;
        personalAccountMenuDropdownInput.value = this.dataset.value;
        personalAccountMenuDropdownList.style.display = 'none';
    })
});

//Close dropdown
document.addEventListener('click', function (e) {
    personalAccountMenuDropdownList.style.display = 'none';
});