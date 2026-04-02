import styled from "styled-components";
import Link from "next/link";

const NavBar = styled.nav`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color: #232C33;
    height: 10vh;
    width: 100vw;
    .text-link {
        text-decoration: none;
        color: white;
        margin: 0 4vw;
    }
    .button-link {
        margin: 0 2vh;
        width: 6vh;
        height: 6vh;
        background-color: white;
    }
    .center-links {
        margin: 0 auto;
        width: fit-content;
    }
`;

export default function Nav() {
    return (
        <NavBar>
            <Link className="button-link" href=""></Link>
            <div className="center-links">
                <Link className="text-link" href="/discover">Discover</Link>
                <Link className="text-link" href="/">Following</Link>
                <Link className="text-link" href="/map">Map</Link>
            </div>
            <Link className="button-link" href=""></Link>
        </NavBar>
    );
}