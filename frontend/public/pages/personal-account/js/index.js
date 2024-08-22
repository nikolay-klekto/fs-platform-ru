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
const personalAccountMenuDropdownItems = document.querySelectorAll('.personal-account__menu-dropdown-item');
const personalAccountMenuDropdownList = document.querySelector('.personal-account__menu-dropdown-list');
const dropdownButton = document.querySelector('.dropdown__button');
const personalAccountMenuDropdownInput = document.querySelector('.personal-account__menu-dropdown-input');
const personalAccountCartCatalogItemRemoveCards = document.querySelectorAll('.personal-account__cart-catalog-item-remove-card');
const orderPlacingCartButton = document.querySelectorAll('.order-placing__cart-button');
const personalAccountMenuDropdown = document.querySelector('.personal-account__menu-dropdown');

//Click on the button. Open/Close select
personalAccountMenuDropdownButton.addEventListener('click', function (e) {
    if (personalAccountMenuDropdownList.style.display === 'flex') {
        personalAccountMenuDropdownList.style.display = 'none';
        personalAccountMenuDropdown.classList.remove('open');
    } else {
        e.stopPropagation();
        personalAccountMenuDropdownList.style.display = 'flex';
        personalAccountMenuDropdown.classList.add('open');
    }
});

//Select list item. Remember selected value. Close dropdown
personalAccountMenuDropdownItems.forEach(function (listItem) {
    listItem.addEventListener('click', function (e) {
        e.stopPropagation();
        document.querySelector('.personal-account__menu-dropdown-item.active').classList.remove('active');
        this.classList.add('active');
        dropdownButton.innerText = this.innerText;
        personalAccountMenuDropdownInput.value = this.dataset.value;
        personalAccountMenuDropdownList.style.display = 'none';
        personalAccountMenuDropdown.classList.remove('open');
    })
});

//Close dropdown
document.addEventListener('click', function () {
    if (personalAccountMenuDropdownList.style.display === 'flex') {
        personalAccountMenuDropdownList.style.display = 'none';
        personalAccountMenuDropdown.classList.remove('open');
    }
});

//Close order card
personalAccountCartCatalogItemRemoveCards.forEach(function (listItem) {
    listItem.addEventListener('click', function () {
        listItem.parentElement.remove();
    })
});

//Click on order place
orderPlacingCartButton.forEach(function (listItem) {
    listItem.addEventListener('click', async function () {
        const cartItem = this.closest('.personal-account__cart-catalog-item');
        let order = {
            profession: cartItem.querySelector('#profession').dataset.value,
            company: cartItem.querySelector('#company').dataset.value,
            startDate: new Date(cartItem.querySelector('#start-date').dataset.value),
            endDate: new Date(cartItem.querySelector('#end-date').dataset.value),
            type: cartItem.querySelector('#type').dataset.value,
            address: cartItem.querySelector('#address').dataset.value,
            price: Number(cartItem.querySelector('#price').dataset.value)
        };
        const result = await checkout(order);

        console.log(result);
    })
});

async function sendQuery (queryBody){
    try{
        // 'http://100.100.100.100:3000/graphql'
        const response = await fetch (URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({query: queryBody}),
        })
        if(response.ok){
            const { data } = await response.json();
            return { data, response };
        } else {
            throw new Error (response.status);
        }
    }
    catch(error){
        error.message;
    }
}

async function checkout(obj) {
    //смоделированный запрос на сервер

    let { profession, company, startDate, endDate, type, address, price } = obj;

    const query = await sendQuery(`
        mutation {
            checkout (
                obj: [{
                    profession : ${profession},
                    company : ${company},
                    startDate : ${startDate},
                    endDate : ${endDate},
                    type : ${type},
                    address : ${address},
                    price : ${price},
                }]
            ){
                dataModel{
                    profession
                    company
                    startDate
                    endDate
                    type
                    address
                    price
                }
                errors
            }
        }
    `)

    console.log("profession:", profession);
    console.log("company:", company);
    console.log("startDate:", startDate);
    console.log("endDate:", endDate);
    console.log("type:", type);
    console.log("address:", address);
    console.log("price:", price);

    return true;
}
