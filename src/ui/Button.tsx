import styled, { css } from "styled-components";
import { ButtonType } from "../types/Buttons.type";

type ButtonProps = {
    type : ButtonType;
    icon? : boolean;
}

const Button = styled.button<ButtonProps>`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 12px 16px;
    font-size: 1rem;
    border-radius: 4px;
    border: none;
    cursor: pointer;
    user-select: none;
    box-shadow: var(--shadow-md);

    ${(props) => 
        props.type === "primary" &&
        css`
            background-color: var(--bg-button-primary);
            color: var(--text-button-primary);
            &:hover {
                background-color: var(--bg-button-primary-hover);
            }
            &:active {
                background-color: var(--bg-button-primary-active);
            }
        `
    }

    ${(props) => 
        props.type === "secondary" &&
        css`
            background-color: var(--bg-button-secondary);
            color: var(--text-button-secondary);
            &:hover {
                background-color: var(--bg-button-secondary-hover);
            }
            &:active {
                background-color: var(--bg-button-secondary-active);
            }
        `
    }

    ${(props) => 
        props.type === "danger" &&
        css`
            background-color: var(--bg-button-danger);
            color: var(--text-button-danger);
            &:hover {
                background-color: var(--bg-button-danger-hover);
            }
            &:active {
                background-color: var(--bg-button-danger-active);
            }
        `
    }

    ${(props) => props.icon && css`
        padding: 12px 16px 12px 12px;
    `}

    &:disabled{
        background-color: var(--bg-button-disabled);
        color: var(--text-button-disabled);
        cursor: auto;
    }
`


export default Button;