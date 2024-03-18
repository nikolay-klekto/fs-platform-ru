// import { getAllEvents } from "./fetchData";


console.log("загрзука");

window.addEventListener("load", async () => {
  console.log("загрзука");
  let k = await getAllEvents();
  console.log(k.data.getAllEvents[0]);
  let ul = document.querySelector('ul');
  k.data.getAllEvents.forEach(obj => {
    let newLi = document.createElement('li');
    newLi.textContent = `
    date: ${obj.date};
    description: ${obj.description};
    id: ${obj.id};
    isExpired: ${obj.isExpired};
    mainGoal: ${obj.mainGoal};
    name: ${obj.name};
    phoneNumber: ${obj.phoneNumber};
    publicPlaceName: ${obj.publicPlaceName};
    site: ${obj.site}`;
    ul.appendChild(newLi);
  });
});


import BASE_URL from "../constants/url.js";

async function sendQuery(queryBody) {
    console.log(BASE_URL)
  try {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ query: queryBody }),
    });

    if (response.ok) {
      const { data } = await response.json();

      return { data, response };
    } else {
      throw new Error(response.status);
    }
  } catch (e) {
    return e.message;
  }
}


// функция для получения всех мероприятий
export async function getAllEvents() {
    console.log('fghjk')
  const query = await sendQuery(`
        query company {
            getAllEvents {
                id
                address {
                    id
                    cityId
                    apartment
                    building
                    house
                    street
                }
                description
                date
                isExpired
                mainGoal
                name
                publicPlaceName
                phoneNumber
                site
            }
        }
    `);

  return query;
}