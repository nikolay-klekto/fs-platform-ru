import React from 'react'
import { PrivacyPolicyTableRowDesktop, tdClass } from '../PrivacyPolicyTableRowDesktop/PrivacyPolisyTableRowDesktop'
import { rows } from '../../contentPrivacyPolicyPageDesktop/content'

export const PrivacyPolicyPageTableDesktop: React.FC = () => {
    return (
        <div className="overflow-x-auto">
            <table className="  mb-[50px]">
                <thead className="bg-[#1c1c3b]">
                    <tr className="border-collapse border text-left align-top">
                        <th className={tdClass + ' font-semibold'}>Цель обработки Ваших персональных данных</th>
                        <th className={tdClass + ' font-semibold'}>
                            Категории лиц, чьи персональные данные подвергаются обработке
                        </th>
                        <th className={tdClass + ' font-semibold'}>Обрабатываемые* персональные данные</th>
                        <th className={tdClass + ' font-semibold'}>
                            Основание, которым Мы руководствуемся, обрабатывая Ваши персональные данные
                        </th>
                        <th className={tdClass + ' font-semibold'}>
                            Срок, в течение которого мы храним Ваши персональные данные
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row) => (
                        <PrivacyPolicyTableRowDesktop key={row.rowNumber} row={row} />
                    ))}
                </tbody>
            </table>
        </div>
    )
}
