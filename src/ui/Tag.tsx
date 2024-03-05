import styled from "styled-components";
import { TagTheme } from "../types/TagTheme.type";


const ThemeStyle = {
    gray: {
        backgroundColor: "var(--color-gray-100)",
        color: "var(--color-gray-600)"
    },
    positive: {
        backgroundColor: "var(--color-positive-100)",
        color: "var(--color-positive-600)"
    },
    medium: {
        backgroundColor: "var(--color-secondary-100)",
        color: "var(--color-secondary-600)"
    },
    negative: {
        backgroundColor: "var(--color-negative-100)",
        color: "var(--color-negative-600)"
    },
}

const TagStyled = styled.div<{$theme: TagTheme}>`
    background-color: ${(props) => props.$theme && ThemeStyle[props.$theme].backgroundColor};
    color: ${(props) => props.$theme && ThemeStyle[props.$theme].color};
    padding: 2px 4px;
    width: fit-content;
    border-radius: 4px;
    box-shadow: var(--shadow-md);

`


function Tag({children, theme} : {children : string, theme: TagTheme}){
    return <TagStyled $theme={theme}>{children}</TagStyled>
}

export default Tag;