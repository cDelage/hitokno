import styled from "styled-components";
import Button from "../ui/Button";
import { IoAirplane } from "react-icons/io5";

const DummyStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 32px;
`;

function FakePage() {
  return (
    <DummyStyled>
      <div>
        <Button type="primary" icon={true}>
          <IoAirplane /> Primary
        </Button>
      </div>
      <div>
        <Button type="secondary" icon={true}>
          <IoAirplane /> Secondary
        </Button>
      </div>
      <div>
        <Button type="danger" icon={true}>
          <IoAirplane /> Danger
        </Button>
      </div>
      <div>
        <Button type="danger" icon={true} disabled>
          <IoAirplane /> Disabled
        </Button>
      </div>
    </DummyStyled>
  );
}

export default FakePage;
