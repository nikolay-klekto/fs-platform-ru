import * as React from 'react'
import Link from 'next/link'
import { SlashIcon } from 'lucide-react'

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

type BreadcrumbEntry = {
    title: string
    href?: string
}

interface BreadcrumbsProps {
    items: BreadcrumbEntry[]
    separator?: React.ReactNode
}

export default function Breadcrumbs({
    items,
    separator = <SlashIcon className="text20px_desktop" />,
}: BreadcrumbsProps) {
    return (
        <Breadcrumb className="custom-grey">
            <BreadcrumbList>
                {items.map((item, index) => {
                    const isLast = index === items.length - 1

                    return (
                        <React.Fragment key={index}>
                            <BreadcrumbItem>
                                {isLast ? (
                                    <BreadcrumbPage className="text-white">{item.title}</BreadcrumbPage>
                                ) : (
                                    <BreadcrumbLink asChild>
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
