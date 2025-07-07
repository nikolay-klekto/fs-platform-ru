import * as React from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { SlashIcon } from 'lucide-react'

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

interface IBreadcrumbsProps {
    items: {
        title: string
        href?: string
        className?: string
    }[]
    separator?: React.ReactNode
}

const BreadcrumbsDesktop: React.FC<IBreadcrumbsProps> = ({
    items,
    separator = <SlashIcon className="text20px_desktop" />,
}) => {
    return (
        <Breadcrumb className="custom-grey">
            <BreadcrumbList>
                {items.map((item, index) => {
                    const isLast = index === items.length - 1

                    return (
                        <React.Fragment key={index}>
                            <BreadcrumbItem>
                                {isLast ? (
                                    <BreadcrumbPage className={cn('text-white', item.className)}>
                                        {item.title}
                                    </BreadcrumbPage>
                                ) : (
                                    <BreadcrumbLink asChild className={item.className}>
                                        <Link href={item.href ?? '#'}>{item.title}</Link>
                                    </BreadcrumbLink>
                                )}
                            </BreadcrumbItem>
                            {!isLast && <BreadcrumbSeparator>{separator}</BreadcrumbSeparator>}
                        </React.Fragment>
                    )
                })}
            </BreadcrumbList>
        </Breadcrumb>
    )
}

export default BreadcrumbsDesktop
