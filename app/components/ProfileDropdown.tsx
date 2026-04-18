import {useEffect, useRef, useState} from "react";
import Image from "next/image";
import Link from "next/link";
import SignOutButton from "@/app/components/auth/SignOutButton";
import LoginButton from "@/app/components/auth/LoginInButton";
import {ProfileDropdownProps} from "@/app/interfaces/ProfileDropdownProps";
import styled from "styled-components";

const PfpImage = styled(Image)`
    margin: 0 2vh;
    width: 1vw;
    height: 1vh;
    position: relative;
    color: white;
    &#pfp {
        border-radius: 7vh;
        overflow: hidden;
    }
`


export default function ProfileDropdown({ session, isPending}: ProfileDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
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

    return (
        <div ref={dropdownRef}>
            <button onClick={toggleMenu}>
                <Image src={"/temp-pfp.jpg"} alt={"your profile picture"} width={100} height={100} />
            </button>

            {isOpen && (
                <div>
                    {isPending ? (
                        <div>Loading...</div>
                    ) : session ? (
                        <div>
                            <Link href="/profile" onClick={() => setIsOpen(false)}>
                                View Profile
                            </Link>
                            <SignOutButton/>
                        </div>
                    ) : (
                        <LoginButton/>
                    )}
                </div>
            )}
        </div>
    );
}