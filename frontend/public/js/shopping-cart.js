const dropdownMenu = document.querySelector(".nav__menu-dropdown__container");
dropdownMenu.addEventListener("click", toggleDropdownMenuOpen);

function toggleDropdownMenuOpen() {
  const menuDropdown = document.querySelector(".nav__menu");
  menuDropdown.classList.toggle(" ");
  document.body.style.overflow =
    document.body.style.overflow === "hidden" ? "" : "hidden";
}

const navItems = document.querySelectorAll(".nav__menu-list__item");
navItems.forEach((navItem) =>
  navItem.addEventListener("click", disableDropdownMenuOpen)
);

function disableDropdownMenuOpen() {
  const menuDropdown = document.querySelector(".nav__menu");
  menuDropdown.classList.remove("dropdown-menu_open");
  document.body.style.overflow = "";
}

const deleteButtons = document.querySelectorAll(
  ".card__content__item__button-trashcan, .card__button-trashcan"
);

deleteButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    const cardId = event.currentTarget.getAttribute("data-card-id");
    const card = document.getElementById(cardId);
    if (card) {
      card.remove();
    }
  });
});

const orderButtons = document.querySelectorAll(
  ".card__content__item__button-order, .card__button-order"
);

orderButtons.forEach((button) => {
  button.addEventListener("click", async (event) => {
    const cardId = event.currentTarget.getAttribute("data-card-id");
    const card = document.getElementById(cardId);

    if (card) {
      const cardProps = card.querySelectorAll(
        ".card__content__item__description"
      );

      const internshipStartParts = cardProps[2].textContent.split(".");
      const internshipStart = new Date(
        internshipStartParts[2],
        internshipStartParts[1] - 1,
        internshipStartParts[0]
      );
      const internshipFinishParts = cardProps[3].textContent.split(".");
      const internshipFinish = new Date(
        internshipFinishParts[2],
        internshipFinishParts[1] - 1,
        internshipFinishParts[0]
      );

      const request = {
        profession: cardProps[0].textContent,
        company: cardProps[1].textContent,
        internshipStart: internshipStart,
        internshipFinish: internshipFinish,
        internshipType: cardProps[4].textContent,
        officeAddress: cardProps[5].textContent,
        price: +cardProps[6].textContent.split(" ")[0],
      };

      const result = await sendRequest(request);
      console.log(result);
    }
  });
});

async function sendRequest(request) {
  let {
    profession,
    company,
    internshipStart,
    internshipFinish,
    internshipType,
    officeAddress,
    price,
  } = request;

  console.log(
    `profession: ${profession}; company: ${company}; internshipStart: ${internshipStart}; internshipFinish: ${internshipFinish}; internshipType: ${internshipType}; officeAddress: ${officeAddress}; price: ${price}`
  );

  return true;
}
