import React from 'react';

const ModalEventsCardDesktop: React.FC<{ 
    icon: React.ReactNode;
    title: React.ReactNode;
    info?: React.ReactNode; 
    link?: string;
    style?: React.CSSProperties; 
}> = ({ icon, title, info, link, style }) => (
        <div className="rounded-[25px] bg-[#1F203F] pt-[40px] pb-[46px] pl-[20px] flex items-center gap-[20px] relative max-w-[417px] max-h-[162px]" style={style}>
            <div 
                className={typeof icon === 'string' ? "flex" : ""} 
                style={typeof icon !== 'string' && (icon as React.ReactElement).props?.style}
                >{icon}
            </div>
            <div>
                <h4 className="text-[28px] text-[white] font-medium leading-[34px] mb-[15px]">{title}</h4>
                {link ? 
                    <a 
                        className="text-[22px] text-[#878797] font-semibold leading-[27px] hover:text-[#382D90] transition-colors duration-300" 
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        >{info}
                    </a> 
                    : 
                    <p className="text-[22px] text-[#878797] font-semibold leading-[27px]">{info}</p>}
            </div>
        </div>
    );

export default ModalEventsCardDesktop;