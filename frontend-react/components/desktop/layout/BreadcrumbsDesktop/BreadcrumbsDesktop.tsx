import * as React from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

interface IBreadcrumbs {
    items: {
        title: string
        href?: string
        className?: string
        isLink?: boolean
    }[]
    separator?: React.ReactNode
}

const BreadcrumbsDesktop: React.FC<IBreadcrumbs> = ({
    items,
    separator = <span className="text20px_desktop rotate-[15deg] leading-none">/</span>,
}) => {
    return (
        <Breadcrumb aria-label="Breadcrumb" className="custom-grey">
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
                                    <BreadcrumbLink
                                        asChild
                                        className={cn(
                                            'text20px_desktop text-gray-500 hover:text-white',
                                            item.className,
                                        )}
                                    >
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
