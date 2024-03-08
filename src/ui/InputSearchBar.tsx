import { ChangeEvent } from "react";
import { IoSearch } from "react-icons/io5";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 36px;
  position: relative;
`;

const Input = styled.input`
  border: 1px solid var(--color-gray-300);
  border-radius: 20px;
  box-shadow: var(--shadow-md);
  width: 100%;
  height: 100%;
  padding: 0px 36px;
  box-sizing: border-box;
  font-size: inherit;
  color: inherit;
`;

function InputSearchBar({
  onChange,
  value,
  placeholder
}: {
  value: string | undefined;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}) {
  return <Container><Input type="text" onChange={onChange} value={value} placeholder={placeholder}/>
  <IoSearch style={{
    position: "absolute",
    top: "50%",
    left: "12px",
    transform: "translateY(-50%)"
  }}/>
  </Container>;
}

export default InputSearchBar;
