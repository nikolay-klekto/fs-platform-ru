import React from 'react';
import {AvatarUserMobi, AvatarUserPlusMobi} from "@/components/assets/iconsMobi";

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
        <div className="relative size-[75px]">
            {imageUrl ? (
                <img
                    src={imageUrl}
                    alt="avatar"
                    className="w-full h-full rounded-full object-cover"
                />
            ) : (
                <AvatarUserMobi/>
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
               <AvatarUserPlusMobi/>
            </label>
        </div>
    );
};

export default AvatarMobi;