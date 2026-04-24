import {useEffect, useRef, useState} from "react";
import Image from "next/image";
import Link from "next/link";
import SignOutButton from "@/app/components/auth/SignOutButton";
import LoginButton from "@/app/components/auth/LoginInButton";
import {ProfileDropdownProps} from "@/app/interfaces/ProfileDropdownProps";
import styled, {css} from "styled-components";
import {usePathname} from "next/navigation";

const DropdownContainer = styled.div`
    position: relative;
    display: inline-block;
    
`;

const ProfileButton = styled.button`
    background: transparent;
    border: none;
    padding: 0;
    margin: 0;
    cursor: pointer;
    outline: none;
    transition: opacity 0.2s ease-in-out;
    
    &:hover {
        opacity: 0.8;
    }
`;

const PfpImage = styled(Image)<{ $size: number | string, $page: string}>`
    border-radius: 50%;
    object-fit: cover;
    width: ${({ $size }) => (typeof $size === "number" ? `${$size}px` : $size)};
    height: ${({ $size }) => (typeof $size === "number" ? `${$size}px` : $size)};
    ${props => props.$page === '/profile' && css`
        border: 4px solid white;
    `}
`;

const DropDownDiv = styled.div<{ $width: string }>`
    position: absolute;
    top: calc(100% + 8px);
    left: 50%;
    transform: translateX(-50%);
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    min-width: ${({ $width }) => $width};
    z-index: 50;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    padding: 8px 0;
    
    * {
        display: block;
        padding: 10px 16px;
        color: #333333;
        text-decoration: none;
        font-size: 14px;
        text-align: left;
        border-bottom: 3px solid #eaeaea;
        background: transparent;
        cursor: pointer;
        
        &:hover {
            background-color: #f5f5f5;
        }
        
        &:last-child {
            border-bottom: none;
        }
    }
`;


export default function ProfileDropdown({ session, isPending, imageSrc, imageSize = 40, dropdownWidth = "180px"}: ProfileDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const pathname = usePathname();
    function toggleMenu() {
        setIsOpen((prev) => !prev);
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, []);

    const numericImageSize = typeof imageSize === "number" ? imageSize : 100;

    return (
        <DropdownContainer ref={dropdownRef}>
            <ProfileButton onClick={toggleMenu}>
                <PfpImage src={imageSrc} alt={"your profile picture"} width={numericImageSize} height={numericImageSize} $size={imageSize} $page={pathname}/>
            </ProfileButton>

            {isOpen && (
                <DropDownDiv $width={dropdownWidth}>
                    {isPending ? (
                        <div>Loading...</div>
                    ) : session ? (
                        <>
                            <Link href={"/user/" + session.user.username.trim()} onClick={() => setIsOpen(false)}>
                                View Profile
                            </Link>
                            <SignOutButton/>
                        </>
                    ) : (
                        <LoginButton/>
                    )}
                </DropDownDiv>
            )}
        </DropdownContainer>
    );
}