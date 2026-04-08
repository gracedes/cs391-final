import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";

// TODO: add new post button?

const NavBar = styled.nav`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color: #232C33;
    height: 10vh;
    width: 100vw;
    font-size: calc(14px + 0.75vw);
    .text-link {
        text-decoration: none;
        color: white;
        margin: 0 4vw;
    }
    .button-link {
        margin: 0 2vh;
        width: 7vh;
        height: 7vh;
        position: relative;
        color: white;
        &#pfp {
            border-radius: 7vh;
            overflow: hidden;
        }
    }
    .center-links {
        margin: 0 auto;
        width: fit-content;
    }
`;

export default function Nav() {
    return (
        <NavBar>
            <Link className="button-link" href=""><Image src={"/menu.svg"} alt={"menu icon"} fill={true} /></Link>
            <div className="center-links">
                <Link className="text-link" href="/discover">Discover</Link>
                <Link className="text-link" href="/">Following</Link>
                <Link className="text-link" href="/map">Map</Link>
            </div>
            <Link className="button-link" id="pfp" href="">
                <Image src={"/temp-pfp.jpg"} alt={"your profile picture"} fill={true} />
            </Link>
        </NavBar>
    );
};