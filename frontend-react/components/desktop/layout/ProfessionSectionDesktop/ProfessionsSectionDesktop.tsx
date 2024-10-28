'use client'

import React from 'react'
import ProfessionCardDesktop from '@/components/desktop/shared/ProfessionCardDesktop'
import { Button } from '@/components/ui/button'

const IMAGE_URL =
    'https://s3-alpha-sig.figma.com/img/c83e/de0f/264ba0b949765a22350a9894a98f4a22?Expires=1726444800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=J5wAZNmQa7CX9cA~qg8GHaRRXB4YTbs8GZe-aUyLRvWnCaECddIdRrZEisakEDhZ96XYy--2a0AXkUWfLzFuYrKFHVUNlpP3zdTuvYEhD8oeM~uR7IFopN46h7uzCSkrkNz-BuZ9~94dwxLMHI210zgQfePZftmdwFB00ldVGWUzauw6xi4CIY1rF8HjjCDBg7pctf3RZ6ITauo8lDgHS~h0wnXxLNKM7CeUhTzn-Dl2Y~TdBY2qmNFMrRqWEUE417YE360O0TojuJLurQx0nrnis7oiL0jl7hnRdCaPtoQgZyUmYsqyY~CVAdW~Y-WuH8TkYZugI5pS7zGdApcIjw__'

const ProfessionsSectionDesktop: React.FC = () => {
    return (
        <div className="flex flex-col gap-[80px]">
            <h2 className="text-[80px] font-medium text-white">ПРОФЕССИИ</h2>
            <div className="flex justify-between">
                <h3 className="text-4xl font-medium text-white">Наиболее популярные на нашем сервисе</h3>
                <Button variant="outline">Смотреть все</Button>
            </div>
            <div className="grid auto-rows-[190px] grid-cols-2 gap-4 lg:auto-rows-[500px] lg:grid-cols-4">
                <ProfessionCardDesktop image={IMAGE_URL} title="Программист" price="15" />
                <ProfessionCardDesktop image={IMAGE_URL} title="Программист" price="16" />
                <ProfessionCardDesktop image={IMAGE_URL} title="Программист" price="24" />
                <ProfessionCardDesktop image={IMAGE_URL} title="Программист" price="12" />
            </div>
        </div>
    )
}
export default ProfessionsSectionDesktop
