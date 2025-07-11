import { useAllActualEvents } from '@/lib/api/events/events'
import { useMemo } from 'react'
import { fakeEvents, IEventApiContent } from '@/components/mobi/pageMobi/EventsPageMobi/contentEventsPageMobi/content'
import {
    isToday,
    isTomorrow,
    isThisWeek,
    isThisMonth,
    isInNext3Months,
} from '@/components/mobi/pageMobi/EventsPageMobi/lib/dateHelpers'

export type EventsFilterConfig = {
    categories: string[]
    cities: string[]
    dates?: string[]
    dateFilterFn?: (eventDate: string) => boolean
    dateScope?: string
}

export function useFilteredEvents(filters: EventsFilterConfig, useFakeData: boolean = false) {
    const { events: allEvents, loading, error } = useAllActualEvents()
    const events: IEventApiContent[] = useFakeData
        ? fakeEvents
        : allEvents && allEvents.length > 0
          ? allEvents
          : fakeEvents

    const categories: string[] = useMemo(
        () => (events ? Array.from(new Set(events.map((e) => e.eventCategory.category))) : []),
        [events],
    )

    const cities: string[] = useMemo(
        () => (events ? Array.from(new Set(events.map((e) => e.city.name))) : []),
        [events],
    )

    const sortedEvents = useMemo(() => {
        if (!events) return []
        return [...events].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    }, [events])

    const filteredEvents = useMemo(() => {
        if (!sortedEvents) return []
        return sortedEvents.filter((event) => {
            if (
                filters.categories &&
                filters.categories.length > 0 &&
                !filters.categories.includes(event.eventCategory.category)
            )
                return false
            if (filters.cities && filters.cities.length > 0 && !filters.cities.includes(event.city.name)) return false

            if (filters.dateScope) {
                if (filters.dateScope === 'Эта неделя' && !isThisWeek(event.date)) return false
                if (filters.dateScope === 'В этом месяце' && !isThisMonth(event.date)) return false
                if (filters.dateScope === 'Ближайшие 3 месяца' && !isInNext3Months(event.date)) return false
                return true
            }

            if (filters.dateFilterFn) {
                if (!filters.dateFilterFn(event.date)) return false
            } else if (filters.dates && filters.dates.length > 0) {
                let show = false
                if (filters.dates.includes('Сегодня') && isToday(event.date)) show = true
                if (filters.dates.includes('Завтра') && isTomorrow(event.date)) show = true
                if (!show) return false
            }

            return true
        })
    }, [sortedEvents, filters])

    return {
        events: filteredEvents,
        categories,
        cities,
        loading,
        error,
        allEvents,
    }
}
