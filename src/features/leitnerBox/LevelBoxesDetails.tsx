import { CSSProp } from "styled-components";
import { Column } from "../../ui/Row";
import { useLeitnerBox } from "./useLeitnerBox";

const DetailStyle: CSSProp = {
  flexGrow: 1,
};



function LevelBoxesDetails() {
  const { leitnerBox } = useLeitnerBox();
  if (!leitnerBox) return null;

  return (
    <Column $style={DetailStyle}>
      {leitnerBox.map((box) => (
        <>
          <div key={box._id}>{box.level}</div>
        </>
      ))}
    </Column>
  );
}

export default LevelBoxesDetails;
