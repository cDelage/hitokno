import styled from "styled-components";
import { ShapeProps } from "../../../types/Cartography.type";

const Path = styled.path<ShapeProps>`
    filter: drop-shadow(${(props) => props.$shadow});
    border: ${(props) => props.border};
    fill: ${(props) => props.fill};
`

export default Path;