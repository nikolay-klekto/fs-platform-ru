'use client'

import React from 'react'

interface TableRow {
    row: number
    goal: string
    categories: string
    data: string
    basis: string
    period: string
}

interface TableRowProps {
    row: TableRow
}

export const tdClass = 'border text20px_desktop py-[16px] px-[10px]'

const renderCellContent = (text: string) => {
    if (text.includes('\n\n')) {
        return text.split('\n\n').map((para, idx) => (
            <p key={idx} className="mb-[10px] whitespace-pre-line">
                {para}
            </p>
        ))
    }

    return <p className="whitespace-pre-line">{text}</p>
}
export const PrivacyPolicyTableRowDesktop: React.FC<TableRowProps> = ({ row }) => {
    const fields: (keyof typeof row)[] = ['goal', 'categories', 'data', 'basis', 'period']
    return (
        <tr className="align-top">
            {fields.map((key) => (
                <td key={key} className={tdClass}>
                    {renderCellContent(row[key] as string)}
                </td>
            ))}
        </tr>
    )
}
