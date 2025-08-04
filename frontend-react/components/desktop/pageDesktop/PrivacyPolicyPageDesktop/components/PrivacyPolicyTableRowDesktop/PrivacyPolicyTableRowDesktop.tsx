'use client'

import React from 'react'

interface ITableRow {
    row: number
    goal: string
    categories: string
    data: string
    basis: string
    period: string
}

const renderCellContent = (text: string) => {
    if (text.includes('\n\n')) {
        return text.split('\n\n').map((paragraph, idx) => (
            <p key={idx} className="mb-[10px] whitespace-pre-line">
                {paragraph}
            </p>
        ))
    }

    return <p className="whitespace-pre-line">{text}</p>
}
export const PrivacyPolicyTableRowDesktop: React.FC<{ row: ITableRow }> = ({ row }) => {
    const fields: (keyof typeof row)[] = ['goal', 'categories', 'data', 'basis', 'period']
    return (
        <tr className="align-top">
            {fields.map((key) => (
                <td key={key} className="text-policy-table_desktop">
                    {renderCellContent(row[key] as string)}
                </td>
            ))}
        </tr>
    )
}
