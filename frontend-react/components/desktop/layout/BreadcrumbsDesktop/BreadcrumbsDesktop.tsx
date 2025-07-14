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
    separator = <SlashIcon className="text20px_desktop" />,
}) => {
    return (
        <Breadcrumb aria-label="Breadcrumb" className="custom-grey">
            <BreadcrumbList>
                {items.map((item, index) => {
                    const isLast = index === items.length - 1
                    const isLink = item.isLink ?? !isLast

                    return (
                        <React.Fragment key={item.title}>
                            <BreadcrumbItem>
                                {isLink && item.href ? (
                                    <BreadcrumbLink asChild className={item.className}>
                                        <Link href={item.href}>{item.title}</Link>
                                    </BreadcrumbLink>
                                ) : (
                                    <BreadcrumbPage className={cn('text-white', item.className)}>
                                        {item.title}
                                    </BreadcrumbPage>
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
