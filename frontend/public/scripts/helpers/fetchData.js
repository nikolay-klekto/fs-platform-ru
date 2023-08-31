import BASE_URL from "../../constants/url.js";

/** функция для отправки запроса на сервер
 * @queryBody тело query запроса
 */
async function sendQuery(queryBody) {
    try {
      const response = await fetch(BASE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
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

// ---------- Event ----------

// функция для получения всех мероприятий
export async function getAllEvents() {
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

// функция для 
export async function getAllActualEvents() {
    const query = await sendQuery(`
        query company {
            getAllActualEvents {
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

// функция для 
export async function eventByID(eventId) {
    const query = await sendQuery(`
        query event {
            getEvent(
                eventId: ${eventId}
            )
            {
                id
                address{
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

// функция для 
export async function getAllActualEventsByCityId(cityId) {
    const query = await sendQuery(`
        query event {
            getAllActualEventsByCityId(
                cityId: ${cityId}
            )
            {
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

// функция для 
export async function insertAllEvents(events) {
    const query = await sendQuery(`
        mutation {
            addAllEvents(
                events: ${events}
            )
            {
                data
                errorMessage
            }
        }
    `);

    return query;
}

// функция для 
export async function updateAllEvents(events) {
    const query = await sendQuery(`
        mutation event {
            updateAllEvents(
                events: ${events}
            )
            {
                data
                errorMessage
            }
        }
    `);

    return query;
}

// функция для 
export async function deleteEvent(eventId) {
    const query = await sendQuery(`
        mutation {
            deleteEvent(
                eventId: ${eventId}
            )
        }
    `);

    return query;
}

// функция для 
export async function deleteAllEvents() {
    const query = await sendQuery(`
        mutation {
            deleteAllEvents
        }
    `);

    return query;
}

// функция для 
export async function deleteAllExpiredEvents() {
    const query = await sendQuery(`
        mutation {
            deleteAllExpiredEvents
        }
    `);

    return query;
}

// ---------- Basket ----------

// функция для 
export async function updateBasket(id, totalPrice) {
    const query = await sendQuery(`
        mutation company {
            updateBasket(
                basket: {
                    id: ${id}
                    totalPrice: ${totalPrice}
                }
            )
        }
    `);

    return query;
}

// функция для 
export async function basketByID(id) {
    const query = await sendQuery(`
        query company {
            getBasketById(
                id: ${id}
            )
            {
                id
                totalPrice
            }
        }
    `);

    return query;
}

// ---------- Order ----------

// функция для 
export async function orderByID(id) {
    const query = await sendQuery(`
        query company {
            getOrderById(
                id: ${id}
            )
            {
                id
                basketId
                company {
                    id
                    companyIndustry
                    legalCapacityStatus
                    name
                    site
                    shortDescription
                }
                position {
                    id
                    description
                    name
                }
                service {
                    id
                    name
                    pricePerDay
                }
                orderStatus
                startWorkDate
                totalWorkDays
                price
            }
        }
    `);

    return query;
}

// функция для 
export async function ordersByClientId(clientId) {
    const query = await sendQuery(`
        query company {
            getOrdersByClientId(
                clientId: ${clientId}
            )
            {
                id
                basketId
                company {
                    id
                    companyIndustry
                    legalCapacityStatus
                    name
                    site
                    shortDescription
                }
                position {
                    id
                    description
                    name
                }
                service {
                    id
                    name
                    pricePerDay
                }
                orderStatus
                startWorkDate
                totalWorkDays
                price
            }
        }
    `);

    return query;
}

// функция для 
export async function orderByBasketId(basketId) {
    const query = await sendQuery(`
        query company {
            getOrdersByBasketId(
                basketId: ${basketId}
            )
            {
                id
                basketId
                company {
                    id
                    companyIndustry
                    legalCapacityStatus
                    name
                    site
                    shortDescription
                }
                position {
                    id
                    description
                    name
                }
                service {
                    id
                    name
                    pricePerDay
                }
                orderStatus
                startWorkDate
                totalWorkDays
                price
            }
        }
    `);

    return query;
}

// функция для 
export async function insertOrder(order) {
    const query = await sendQuery(`
        mutation {
            addOrder(
                order: ${order}
            )
            {
                id
                basketId
                company {
                    id
                    companyIndustry
                    legalCapacityStatus
                    name
                    site
                    shortDescription
                }
                position {
                    id
                    description
                    name
                }
                service {
                    id
                    name
                    pricePerDay
                }
                orderStatus
                startWorkDate
                totalWorkDays
                price
            }
        }
    `);

    return query;
}

// функция для 
export async function updateOrder(order) {
    const query = await sendQuery(`
        mutation company {
            updateOrder(
                order: ${order}
            )
        }
    `);

    return query;
}

// функция для 
export async function deleteOrder(id) {
    const query = await sendQuery(`
        mutation {
            deleteOrder(
                id: ${id}
            )
        }
    `);

    return query;
}

// функция для 
export async function deleteAllOrdersByBasketId(basketId) {
    const query = await sendQuery(`
        mutation {
            deleteAllOrdersByBasketId(
                basketId: ${basketId}
            )
        }
    `);

    return query;
}

// ---------- Position ----------

// функция для 
export async function insertByCompany(companyId, description, name) {
    const query = await sendQuery(`
        mutation {
	        addCompanyPosition(
		        companyId: ${companyId}
		        position: {
			        description: "${description}"
			        name: "${name}"
		        }
            )
            {
		        id
		        description
		        name
	        }
        }
    `);

    return query;
}

// функция для 
export async function addExistingPositionToCompany(companyId, positionId) {
    const query = await sendQuery(`
        mutation {
	        addExistingPositionToCompany(
		        companyId: ${companyId}
		        positionId: ${positionId}
	        )
        }
    `);

    return query;
}

// функция для 
export async function positionByID(id) {
    const query = await sendQuery(`
        query company {
	        getPositionById(
                id: ${id}
            )
            {
		        id
		        description
		        name
	        }
        }
    `);

    return query;
}

// функция для 
export async function getAllByCompanyId(id) {
    const query = await sendQuery(`
        query company {
            getAllPositionsByCompanyId(
                id: ${id}
	        )
            {
		        id
		        description
		        name
		    }
        }
    `);

    return query;
}

// функция для 
export async function getAllPositions() {
    const query = await sendQuery(`
        query company {
            getAllPositions {
		        id
		        description
		        name
		    }
        }
    `);

    return query;
}

// функция для 
export async function insertPosition(id, description, name) {
    const query = await sendQuery(`
        mutation {
	        addPosition(
		        position: {
			        id: ${id}
			        description: "${description}"
			        name: "${name}"
		        }
            )
            {
		        id
		        description
		        name
	        }
        }
    `);

    return query;
}

// функция для 
export async function updatePosition(id, description, name) {
    const query = await sendQuery(`
        mutation company {
            updatePosition(
		        position: {
			        id: ${id}
			        description: "${description}"
			        name: "${name}"
		        }
	        )
        }
    `);

    return query;
}

// функция для 
export async function deletePosition(id) {
    const query = await sendQuery(`
        mutation {
            deletePosition(
                id: ${id}
            )
        }
    `);

    return query;
}

// ---------- Office ----------

// функция для 
export async function insertOffice(companyAddress) {
    const query = await sendQuery(`
        mutation {
            addOfficeAddress(
                companyAddress: ${companyAddress}
            )
            {
                id
                address {
                    id
                    cityId
                    house
                }
            }
        }
    `);

    return query;
}

// функция для 
export async function officeByID(id) {
    const query = await sendQuery(`
        query company {
            getOffice(
                id: ${id}
            )
            {
                id
                companyId
                phoneNumber
                address {
                    id
                    cityId
                    house
                    street
                }
            }
        }
    `);

    return query;
}

// функция для 
export async function getAllByCompanyId(id) {
    const query = await sendQuery(`
        query company{
            getAllOfficesByCompanyId(
                id: ${id}
            )
            {
                id
                companyId
                phoneNumber
                address {
                    id
                    building
                    house
                    cityId
                }
            }
        }
    `);

    return query;
}


// функция для 
export async function updateOffice(companyAddress) {
    const query = await sendQuery(`
        mutation company {
            updateOfficeAddress(
                companyAddress: ${companyAddress}
            )
        }
    `);

    return query;
}

// функция для 
export async function deleteAllByCompanyId(id) {
    const query = await sendQuery(`
        mutation {
            deleteAllOfficesByCompanyId(
                id: ${id}
            )
        }
    `);

    return query;
}

// функция для 
export async function deleteOffice(id) {
    const query = await sendQuery(`
        mutation {
            deleteOffice(
                id: ${id}
            )
        }
    `);

    return query;
}

// ---------- Company ----------

// функция для 
export async function insertCompanyByPartner(partnerId, company) {
    const query = await sendQuery(`
        mutation {
            addCompanyByPartner(
                partnerId: ${partnerId},
                company: ${company}
            )
            {
                id
                companyIndustry
                legalCapacityStatus
                name
                site
                shortDescription
            }
        }
    `);

    return query;
}

// функция для 
export async function updateCompany(company) {
    const query = await sendQuery(`
        mutation company {
            updateCompany(
                company:${company}
            )
        }
    `);

    return query;
}

// функция для 
export async function companyByID(id) {
    const query = await sendQuery(`
        query company{
            getCompanyById(
                id: ${id}
            )
            {
                id
                companyIndustry
                legalCapacityStatus
                name
                site
                shortDescription
            }
        }
    `);

    return query;
}

// функция для 
export async function getAllByPositionId(id) {
    const query = await sendQuery(`
        query company{
            getAllCompaniesByPositionId(
                id: ${id}
            )
            {
                id
                companyIndustry
                legalCapacityStatus
                name
                site
                shortDescription
            }
        }
    `);

    return query;
}

// функция для 
export async function getAllByCountryCode(code) {
    const query = await sendQuery(`
        query company{
            getAllCompaniesByCountryCode(
                code: ${code}
            )
            {
                id
                companyIndustry
                legalCapacityStatus
                name
                site
                shortDescription
            }
        }
    `);

    return query;
}

// функция для 
export async function getAllByCityId(id) {
    const query = await sendQuery(`
        query company{
            getAllCompaniesByCityId(
                id: ${id}
            )
            {
                id
                companyIndustry
                legalCapacityStatus
                name
                site
                shortDescription
            }
        }
    `);

    return query;
}

// функция для 
export async function deleteCompany(id) {
    const query = await sendQuery(`
        mutation {
            deleteCompany(
                id: ${id}
            )
        }
    `);

    return query;
}

// функция для 
export async function getAllCompany() {
    const query = await sendQuery(`
        query parter {
            getAllCompanies{
                id
                companyIndustry
                legalCapacityStatus
                name
                site
                shortDescription
            }
        }
    `);

    return query;
}

// ---------- Partner ----------

// функция для 
export async function getPartnerByID(id) {
    const query = await sendQuery(`
        query country {
            getPartnerById(
                id: ${id}
            )
            {
                id
                client {
                    id
                    role
                }
            }
        }
    `);

    return query;
}

// функция для 
export async function insertPartner(client) {
    const query = await sendQuery(`
        mutation {
            addPartner(
                client: ${client}
            )
            {
                id
                client {
                    id
                    activateStatus
                    dateCreated
                    lastName
                    role
                    username
                }
            }
        }
    `);

    return query;
}

// функция для 
export async function deletePartner(id) {
    const query = await sendQuery(`
        mutation {
            deletePartner(
                id: ${id}
            )
        }
    `);

    return query;
}

// функция для 
export async function getAllPartners() {
    const query = await sendQuery(`
        query partner {
            getAllPartners  {
                id
                client  {
                    telegramUsername
                    dateCreated
                    role
                }
            }
        }
    `);

    return query;
}

// функция для 
export async function getPartnersByCompanyId(id) {
    const query = await sendQuery(`
        query partner {
            getPartnersByCompanyId(
                id: ${id}
            )
            {
                id
                client {
                    id
                    role
                }
            }
        }
    `);

    return query;
}

// ---------- Address ----------

// функция для 
export async function insertAddress(address) {
    const query = await sendQuery(`
        mutation {
            addAddress(
                address: ${address}
            )
            {
                id
                building
                cityId
                apartment
                house
                street
            }
        }
    `);

    return query;
}

// функция для 
export async function updateAddress(address) {
    const query = await sendQuery(`
        mutation address {
            updateAddress(
                address: ${address}
            )
        }
    `);

    return query;
}

// функция для 
export async function deleteAddress(id) {
    const query = await sendQuery(`
        mutation {
            deleteAddress(
                id: ${id}
            )
        }
    `);

    return query;
}

// ---------- Client ----------

// функция для 
export async function insertClient(client) {
    const query = await sendQuery(`
        mutation {
            addClient(
                client: ${client}
            )
            {
                data {
                    id
                    basketId
                    city {
                        id
                        name
                    }
                    activateStatus
                    birthday
                    dateCreated
                    educationStatus
                    email
                    employment
                    firstName
                    lastName
                    password
                    phoneNumber
                    role
                    telegramUsername
                    username
                }
                errorMessage
            }
        }
    `);

    return query;
}

// функция для 
export async function getAllClients() {
    const query = await sendQuery(`
        query client {
            getAllClients {
                id
                basketId
                city {
                    name
                }
                activateStatus
                birthday
                dateCreated
                educationStatus
                email
                employment
                firstName
                lastName
                password
                phoneNumber
                role
                telegramUsername
                username
            }
        }
    `);

    return query;
}

// функция для 
export async function getClientByID(id) {
    const query = await sendQuery(`
        query {
            getClintById(
                id: ${id}
            )
            {
                id
                basketId
                city {
                    name
                    id
                    country {
                        code
                        currency
                        name
                    }
                }
                activateStatus
                birthday
                dateCreated
                educationStatus
                email
                employment
                firstName
                lastName
                password
                phoneNumber
                role
                telegramUsername
                username
            }
        }
    `);

    return query;
}

// функция для 
export async function changePassword(clientId, password) {
    const query = await sendQuery(`
        mutation client {
            changePassword(
                clientId: ${clientId},
                password: "${password}"
            )
        }
    `);

    return query;
}

// функция для 
export async function updateClient(id, role) {
    const query = await sendQuery(`
        mutation service {
            updateClient(
                client: {
                    id: ${id},
                    role: ${role}
                }
            )
        }
    `);

    return query;
}

// функция для 
export async function deleteClient(id) {
    const query = await sendQuery(`
        mutation {
            deleteClient(
                id: ${id}
            )
        }
    `);

    return query;
}

// ---------- Country ----------

// функция для 
export async function insertCountry(currency, name) {
    const query = await sendQuery(`
        mutation {
            addCountry(
                country: {
                    currency: ${currency}
                    name: ${name}
                }
            )
            {
                code
                name
                currency
            }
        }
    `);

    return query;
}

// функция для 
export async function deleteCountry(countryCode) {
    const query = await sendQuery(`
        mutation {
            deleteCountry(
                countryCode: ${countryCode}
            )
        }
    `);

    return query;
}

// функция для 
export async function getCountryByID(code) {
    const query = await sendQuery(`
        query country{
            getCountry(
                code: ${code}
            )
            {
                code
            currency
            name
            }
        }
    `);

    return query;
}

// функция для 
export async function getAllCountries() {
    const query = await sendQuery(`
        query country {
            getAllCountries {
                code
                currency
                name
            }
        }
    `);

    return query;
}

// функция для 
export async function getCountryByName(name) {
    const query = await sendQuery(`
        query country {
            getCountryByName(
                name: ${name}
            )
            {
                code
                currency
                name
            }
        }
    `);

    return query;
}

// ---------- Cities ----------

// функция для 
export async function cityById(id) {
    const query = await sendQuery(`
        query city {
            getCity(
                id: ${id}
            )
            {
                name
                country {
                    code,
                    currency,
                    name
                }
            }
        }
    `);

    return query;
}

// функция для 
export async function getAllCities() {
    const query = await sendQuery(`
        query city {
            getAllCities {
            name
                id
                country {
                    code,
                    currency,
                    name
                }
            }
        }
    `);

    return query;
}

// функция для 
export async function getCountryByCity(id) {
    const query = await sendQuery(`
        query country{
            getCountryByCity(
                id: ${id}
            )
            {
                name
                currency
            }
        }
    `);

    return query;
}

// функция для 
export async function insertCity(countryCode, name) {
    const query = await sendQuery(`
        mutation {
            addCity(
                city: {
                    countryCode: ${countryCode},
                    name: "${name}"
                }
            )
            {
                id
                name
                country {
                    code
                    currency
                    name
                }
            }
        }
    `);

    return query;
}

// функция для 
export async function deleteCity(cityId) {
    const query = await sendQuery(`
        mutation {
            deleteCity(
                cityId: ${cityId}
            )
        }
    `);

    return query;
}

// ---------- Service ----------

// функция для 
export async function insertService(services) {
    const query = await sendQuery(`
        mutation service {
            addService(
                services: ${services}
            )
            {
                id
                name
                pricePerDay
            }
        }
    `);

    return query;
}

// функция для 
export async function deleteService(id) {
    const query = await sendQuery(`
        mutation {
            deleteServiceById(
                id: ${id}
            )
        }
    `);

    return query;
}

// функция для 
export async function updateService(id, service) {
    const query = await sendQuery(`
        mutation service {
            updateServiceById(
                id: ${id},
                service: ${service}
            )
        }
    `);

    return query;
}

// функция для 
export async function getServiceByID(id) {
    const query = await sendQuery(`
        query service {
            getServiceById(
                id: ${id}
            )
            {
                id
                pricePerDay
                name
            }
        }
    `);

    return query;
}

// функция для 
export async function getAllServices() {
    const query = await sendQuery(`
        query service {
            getAllServices {
                id
                pricePerDay
                name
            }
        }
    `);

    return query;
}

// ---------- Review ----------

// функция для 
export async function insertReview(review) {
    const query = await sendQuery(`
        mutation review {
            addReview
            (
                review: ${review}
            )
            {
                data
                {
                    id
                    clientId
                    companyId
                    description
                    rate
                    username
                }
                errorMessage
            }
        }
    `);

    return query;
}

// функция для 
export async function getReviewByID(id) {
    const query = await sendQuery(`
        query service {
            reviewById(
                id: ${id}
            )
            {
                id
                companyId
                description
                rate
                username
            }
        }
    `);

    return query;
}

// функция для 
export async function getAllReviewsByCompanyId(id) {
    const query = await sendQuery(`
        query service {
            getAllReviewsByCompany(
                id: ${id}
            )
            {
                id
                companyId
                description
                rate
                username
            }
        }
    `);

    return query;
}

// функция для 
export async function deleteReview(id) {
    const query = await sendQuery(`
        mutation {
            deleteReviewById(
                id: ${id}
            )
        }
    `);

    return query;
}

// функция для 
export async function updateReview(review) {
    const query = await sendQuery(`
        mutation service {
            updateReview(
                review: ${review}
            )
        }
    `);

    return query;
}
