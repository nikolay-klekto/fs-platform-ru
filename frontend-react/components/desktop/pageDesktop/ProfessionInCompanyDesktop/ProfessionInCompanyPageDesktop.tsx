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
                <div className='container mx-auto mb-[136px] mt-[clamp(60px,5vw,98px)] pl-[clamp(100px,8.23vw,158px)] pr-[clamp(80px,6.51vw,125px)]'>
 <InternshipRegistrationDesktop />
                </div>
               
                <div className="container mb-[199px]">
                    <h2 className="title48px_desktop mb-[70px] mt-[136px] pl-[26px] font-medium uppercase 2xl:mt-[80px] 3xl:mt-[100px]">
                        Процесс стажировки
                    </h2>
                    <InternshipProcessDesktop />
                </div>
                <div className="overflow-hidden pl-[58px] pr-0  ">
                    <h2 className="title48px_desktop container mb-[70px] pl-0 font-medium uppercase ">
                        Профессия программиста в других компаниях
                    </h2>
                    <ProfessionInOtherCompanies />

                    <h2 className="title48px_desktop container mb-[81px] mt-[106px] pl-0 font-medium uppercase 2xl:mt-[80px] 3xl:mt-[90px]">
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
