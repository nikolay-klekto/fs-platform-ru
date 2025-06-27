import React from 'react'

type TableRowProps = {
    row: {
        rowNumber: number
        goal: string
        categories: string
        data: string
        basis: string
        period: string
    }
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
    return (
        <tr className="align-top">
            <td className={tdClass}>{renderCellContent(row.goal)}</td>
            <td className={tdClass}>{renderCellContent(row.categories)}</td>
            <td className={tdClass}>{renderCellContent(row.data)}</td>
            <td className={tdClass}>{renderCellContent(row.basis)}</td>
            <td className={tdClass}>{renderCellContent(row.period)}</td>
        </tr>
    )
}
