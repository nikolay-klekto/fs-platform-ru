import React from 'react';

interface AvatarMobiProps {
    imageUrl?: string;
    onImageChange?: (file: File) => void;
}

const AvatarMobi: React.FC<AvatarMobiProps> = ({ imageUrl, onImageChange }) => {
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file && onImageChange) {
            onImageChange(file);
        }
    };

    return (
        <div className="relative w-[75px] h-[75px]">
            {imageUrl ? (
                <img
                    src={imageUrl}
                    alt="avatar"
                    className="w-full h-full rounded-full object-cover"
                />
            ) : (
                <svg width="75" height="75" viewBox="0 0 75 75" fill="none">
                    <circle cx="37.5" cy="37.5" r="37.5" fill="#878797" />
                    <path
                        d="M37.4004 39.5528C42.1222 39.5528 46.4163 40.8636 49.5754 42.7088C51.1519 43.6343 52.4999 44.7203 53.4734 45.9007C54.4312 47.0641 55.1367 48.4542 55.1367 49.9406C55.1367 51.5365 54.3267 52.7944 53.1601 53.6915C52.0565 54.5414 50.6001 55.1043 49.0531 55.4971C45.9434 56.2847 41.7931 57.0906 37.4004 57.0906C33.0077 57.0906 28.8574 56.2866 25.7476 55.4971C24.2006 55.1043 22.7443 54.5414 21.6407 53.6915C20.472 52.7925 19.6641 51.5365 19.6641 49.9406C19.6641 48.4542 20.3696 47.0641 21.3273 45.9007C22.3009 44.7203 23.6468 43.6343 25.2254 42.7088C28.3844 40.8636 32.6805 39.5528 37.4004 39.5528ZM37.4004 18.7773C40.0137 18.7773 42.52 19.7723 44.3678 21.5433C46.2157 23.3142 47.2539 25.7162 47.2539 28.2208C47.2539 30.7253 46.2157 33.1273 44.3678 34.8983C42.52 36.6692 40.0137 37.6642 37.4004 37.6642C34.7871 37.6642 32.2808 36.6692 30.4329 34.8983C28.585 33.1273 27.5469 30.7253 27.5469 28.2208C27.5469 25.7162 28.585 23.3142 30.4329 21.5433C32.2808 19.7723 34.7871 18.7773 37.4004 18.7773Z"
                        fill="#353652"
                    />
                </svg>
            )}
            <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
            />
            <label
                htmlFor="avatar-upload"
                className="absolute bottom-0 right-0 cursor-pointer"
                aria-label="Upload avatar image"
            >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M9.75 18.375C14.2373 18.375 17.875 14.7373 17.875 10.25C17.875 5.76269 14.2373 2.125 9.75 2.125C5.26269 2.125 1.625 5.76269 1.625 10.25C1.625 14.7373 5.26269 18.375 9.75 18.375Z"
                        fill="#878797"
                        stroke="#1F203F"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    />
                    <path d="M9.75 7V13.5" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M6.5 10.25H13" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </label>
        </div>
    );
};

export default AvatarMobi;