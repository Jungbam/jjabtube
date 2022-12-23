import { createGlobalStyle } from "styled-components";
import EF_jejudoldam from "./EF_jejudoldam.ttf";

export default createGlobalStyle`
    @font-face {
        font-family: "EF_jejudoldam";
        src: local("EF_jejudoldam"),
        url(${EF_jejudoldam}) format('truetype');
        font-weight: 300;
        font-style: normal;
    }
`;
