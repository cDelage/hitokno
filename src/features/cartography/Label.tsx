import { MouseEvent, useCallback } from "react";
import { useViewport } from "reactflow";
import styled from "styled-components";

const LabelStyled = styled.div`
    position: absolute;
    bottom: 0;
    font-size: 8px;
    line-height: 12px;
    padding: 0;
    margin: 0;
    transform: translateY(100%);
    color: var(--text-main-active);
`

function Label({label} : {label: string}){
    const {zoom} = useViewport();

    const handleClick = useCallback((e : MouseEvent) => {
        e.stopPropagation()
    },[])

    if(zoom < 2.5) return null;
    return <LabelStyled onClick={handleClick}>{label}</LabelStyled>
}

export default Label;