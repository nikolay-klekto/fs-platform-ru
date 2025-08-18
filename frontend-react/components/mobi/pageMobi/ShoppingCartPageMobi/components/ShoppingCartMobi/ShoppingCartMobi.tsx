'use client'
//этот код не нужен перенести в ShoppingCartPageMobi.tsx

import { Button } from '@/components/ui/button'
import ItemCardShoppingCartMobi from '@/components/mobi/pageMobi/ShoppingCartPageMobi/components/ItemCardShoppingCartMobi/ItemCardShoppingCartMobi'
import { content } from '@/components/mobi/pageMobi/ShoppingCartPageMobi/contentShoppingCartPageMobi/content'

const ShoppingCartMobi: React.FC = () => {
    return (
        <>
            <div className="pt-10 text-center">
                <div className="flex flex-wrap justify-center gap-[34px] self-end pb-[50px] 2xl:pt-[75px]">
                    {content.map((item) => (
                        <ItemCardShoppingCartMobi
                            key={item.id}
                            profession={item.profession}
                            company_name={item.company_name}
                            start_day={item.start_day}
                            end_day={item.end_day}
                            category={item.category}
                            location={item.location}
                            image={item.image}
                            price={item.price}
                        />
                    ))}
                </div>
                <Button variant={'select_mobi'} size={'registration_mobi'} className="w-[294px] text-[17px]">
                    Очистить всё
                </Button>
            </div>
        </>
    )
}
export default ShoppingCartMobi
