'use client'
import FooterDesktop from '@/components/desktop/layout/FooterDesktop/FooterDesktop'
import InternshipRegistrationDesktop from './components/InternshipRegistrationDesktop/InternshipRegistrationDesktop'
import CompanyInfoDesktop from './components/CompanyInfoDesktop/CompanyInfoDesktop'
import InternshipProcessDesktop from './components/InternshipProcessDesktop/InternshipProcessDesktop'
import ProfessionInOtherCompanies from './components/ProfessionInOtherCompanies/ProfessionInOtherCompanies'
import ProfessionsInCompanyDesktop from './components/ProfessionsInCompanyDesktop/ProfessionsInCompanyDesktop'
import HeaderDesktop from '../../layout/HeaderDesktop/HeaderDesktop'
const CompanyPageDesktop: React.FC = () => {
    return (
        <>
            <HeaderDesktop />
            <main className="bg-[#101030] text-white ">
                <CompanyInfoDesktop />
                <InternshipRegistrationDesktop />
                <div className="container mb-[199px]">
                    <h2 className="mb-[70px] mt-[136px] pl-[58px] title48px_desktop font-medium uppercase 2xl:mt-[80px] 3xl:mt-[100px]">
                        Процесс стажировки
                    </h2>
                    <InternshipProcessDesktop />
                </div>
                <div className="overflow-hidden pl-[58px] pr-0  ">
                    <h2 className="container mb-[70px] title48px_desktop font-medium uppercase ">
                        Профессия программиста в других компаниях
                    </h2>
                    <ProfessionInOtherCompanies />

                    <h2 className="container mb-[81px] mt-[106px] title48px_desktop font-medium uppercase 2xl:mt-[80px] 3xl:mt-[90px]">
                        Другие профессии в этой компании
                    </h2>
                    <ProfessionsInCompanyDesktop />
                </div>
            </main>
            <FooterDesktop />
        </>
    )
}

export default CompanyPageDesktop
