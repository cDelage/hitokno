import styled from "styled-components";

export const ButtonHeader = styled.button`
    background-color: transparent;
    border: none;
    display: flex;
    gap: 4px;
    padding: 4px 8px;
    font-size: 1rem;
    border-radius: 8px;
    cursor: pointer;
    align-items: center;

    &:hover{
        background-color: var(--color-gray-200);
    }
`