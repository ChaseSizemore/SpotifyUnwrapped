
import React from "react";


interface SideBarIconProps {
    icon: React.ReactNode;
    text: string;
    onClick: () => void;
}

const SideBarIcon: React.FC<SideBarIconProps> = ({ icon, text, onClick }) => {
    return (
        <div className="flex flex-col items-center py-5 w-full cursor-pointer" onClick={onClick}>
            {icon}
            <a className="text-white">{text}</a>
        </div>
    );
}

export default SideBarIcon;