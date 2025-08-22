'use client'
import FooterDesktop from '@/components/desktop/layout/FooterDesktop/FooterDesktop'
import InternshipProfessionsDesktop from './components/ProfessionsInCompanyDesktop/ProfessionsInCompanyDesktop'
import InternshipRegistrationDesktop from './components/InternshipRegistrationDesktop/InternshipRegistrationDesktop'
import CompanyInfoDesktop from './components/CompanyInfoDesktop/CompanyInfoDesktop'
import InternshipProcessDesktop from './components/InternshipProcessDesktop/InternshipProcessDesktop'
import ProfessionInOtherCompanies from './components/ProfessionInOtherCompanies/ProfessionInOtherCompanies'

const CompanyPageDesktop: React.FC = () => {
    return (
        <>
            <main className="bg-[#101030] text-white ">
                <CompanyInfoDesktop />
                <InternshipRegistrationDesktop />
                <h2 className="3xl:mt-[100px] mb-[70px] mt-[136px] text-[48px] font-medium uppercase 2xl:mt-[80px] pl-[58px]">
                    Процесс стажировки
                </h2>
                <InternshipProcessDesktop />
                <h2 className="mb-[63px] mt-[118px] text-[48px] font-medium uppercase ">Профессии в компании</h2>

                <h2 className='container mb-[81px] mt-[120px] text-[48px] font-medium uppercase 2xl:mt-[80px] 3xl:mt-[100px]'>
                    Профессия программиста в других компаниях
                </h2>
                <ProfessionInOtherCompanies />

                <h2 className="3xl:mt-[100px] mb-[81px] mt-[120px] text-[48px] font-medium uppercase 2xl:mt-[80px]">
                    Другие профессии в этой компании
                </h2>
                <InternshipProfessionsDesktop />
            </main>
            <FooterDesktop />
        </>
    )
}

export default CompanyPageDesktop
