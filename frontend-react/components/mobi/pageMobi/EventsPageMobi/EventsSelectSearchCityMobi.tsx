import React, { useState } from 'react'
import { ChevronDownIcon } from '@/components/assets/icons'
import { Button } from '@/components/ui/button'

import { Check } from 'lucide-react'

import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

const cities = [
    { value: 'minsk', label: 'Минск' },
    { value: 'brest', label: 'Брест' },
    { value: 'vitebsk', label: 'Витебск' },
    { value: 'gomel', label: 'Гомель' },
    { value: 'grodno', label: 'Гродно' },
    { value: 'mogilev', label: 'Могилев' },
]

const EventsSelectSearchCityMobi = () => {
    const [open, setOpen] = useState(false) // Управляет открытием Popover
    const [search, setSearch] = useState('') // Поле для ввода текста поиска
    const [selectedCity, setSelectedCity] = useState<string | null>(null) // Выбранный город

    // Фильтруем список городов по введённому тексту
    const filteredCities = cities.filter((city) => city.label.toLowerCase().includes(search.toLowerCase()))

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant={'select_btn_desktop'}
                    size={'select_btn_desktop_events'}
                    className="relative z-[3] bg-[#101030]"
                    role="combobox"
                    aria-expanded={open}
                >
                    {selectedCity ? cities.find((city) => city.value === selectedCity)?.label : 'Город'}
                    <ChevronDownIcon className="ml-2 h-[15px] w-[27px] transition-transform duration-200" />
                </Button>
            </PopoverTrigger>
            <PopoverContent
                className="3xl:w-[300px] absolute right-0 top-[13px] z-50 w-[400px] rounded-[42px] p-[2px] 2xl:w-[270px]"
                style={{
                    background: 'linear-gradient(90deg, #8333f3, #5f4af3, #3b51a8)',
                }}
            >
                <Command className="flex flex-col gap-1 rounded-[42px] bg-[#1F203F] p-3">
                    {/* Поле ввода для фильтрации */}
                    <CommandInput
                        placeholder="Поиск"
                        value={search} // Текущее значение поиска
                        onValueChange={(value) => setSearch(value)} // Обновление текста поиска
                    />
                    {/* Список результатов */}
                    <CommandList>
                        {filteredCities.length === 0 ? (
                            <CommandEmpty>Не найден.</CommandEmpty>
                        ) : (
                            <CommandGroup>
                                {filteredCities.map((city) => (
                                    <CommandItem
                                        key={city.value}
                                        value={city.value}
                                        onSelect={() => {
                                            setSelectedCity(city.value) // Устанавливаем выбранный город
                                            setSearch(city.label) // Обновляем текст поиска
                                            setOpen(false) // Закрываем Popover
                                        }}
                                    >
                                        {city.label}
                                        <Check
                                            className={`ml-auto ${selectedCity === city.value ? 'opacity-100' : 'opacity-0'}`}
                                        />
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        )}
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}

export default EventsSelectSearchCityMobi
