const API_URL = 'http://45.135.234.61:8183/graphql'

export async function getAllActualEvents() {
    const query = `
    query {
      getAllActualEvents {
        id
        date
        description
        name
        publicPlaceName
        site
        price
        city {
          id
          name
        }
        time
        organizer
        eventCategory {
          id
          category
        }
      }
    }
  `

    const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
    })

    if (!response.ok) throw new Error('Network error!')

    const json = await response.json()
    if (json.errors) throw new Error(json.errors[0].message)

    return json.data.getAllActualEvents
}
