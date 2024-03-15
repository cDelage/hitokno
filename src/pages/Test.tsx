import { Suspense } from "react";
import TestContainer from "../features/tests/TestContainer";

function Test() {
  return (
    <Suspense>
      <TestContainer />
    </Suspense>
  );
}

export default Test;
