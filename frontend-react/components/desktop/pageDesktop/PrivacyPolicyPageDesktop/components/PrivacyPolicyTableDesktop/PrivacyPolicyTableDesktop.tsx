'use client'

import React from 'react'
import { PrivacyPolicyTableRowDesktop } from '../PrivacyPolicyTableRowDesktop/PrivacyPolicyTableRowDesktop'
import { content } from '../../contentPrivacyPolicyPageDesktop/content'

export const PrivacyPolicyPageTableDesktop: React.FC = () => {
    return (
        <div className="overflow-x-auto">
            <table className="  mb-[50px]">
                <thead className="bg-[#1c1c3b]">
                    <tr className="border-collapse border text-left align-top">
                        <th className="text-policy-table_desktop font-semibold">
                            Цель обработки Ваших персональных данных
                        </th>
                        <th className="text-policy-table_desktop font-semibold">
                            Категории лиц, чьи персональные данные подвергаются обработке
                        </th>
                        <th className="text-policy-table_desktop font-semibold">Обрабатываемые* персональные данные</th>
                        <th className="text-policy-table_desktop font-semibold">
                            Основание, которым Мы руководствуемся, обрабатывая Ваши персональные данные
                        </th>
                        <th className="text-policy-table_desktop font-semibold">
                            Срок, в течение которого мы храним Ваши персональные данные
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {content.map((row) => (
                        <PrivacyPolicyTableRowDesktop key={row.row} row={row} />
                    ))}
                </tbody>
            </table>
        </div>
    )
}
