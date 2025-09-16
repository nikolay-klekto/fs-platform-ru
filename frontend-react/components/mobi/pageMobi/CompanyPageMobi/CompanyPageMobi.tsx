'use client'

import { useParams } from 'next/navigation'
import { useDataContext } from '@/context/DataContext'
import HeaderMobi from '../../layout/HeaderMobi/HeaderMobi'
import FooterMobi from '../../layout/FooterMobi/FooterMobi'

const CompanyPageMobi: React.FC = () => {
    const params = useParams()
    const companyId = params?.id
    const { companies } = useDataContext()
    console.log(companies.find((company) => company.id === companyId))

    return (
        <>
            <HeaderMobi />
            <main>Контент</main>
            <FooterMobi />
        </>
    )
}

export default CompanyPageMobi
