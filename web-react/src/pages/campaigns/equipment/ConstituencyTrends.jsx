import React, { useContext } from "react";
import { Container } from "react-bootstrap";
import TrendsButton from "../components/buttons/TrendsButton";
import { MemberContext } from "contexts/MemberContext";

const ConstituencyEquipmentTrends = () => {
  const { currentUser } = useContext(MemberContext);

  const church = currentUser.currentChurch;
  const churchType = currentUser.currentChurch?.__typename;
  return (
    <div className="d-flex align-items-center justify-content-center ">
      <Container>
        <div className="text-center">
          <h1 className="mb-1 ">EQ CAMPAIGN</h1>
          <h6>{`${church?.name} ${churchType}`}</h6>
        </div>
        <div className="d-grid gap-2 mt-4 text-center px-2">
          <TrendsButton name="testing" />
        </div>
      </Container>
    </div>
  );
};

export default ConstituencyEquipmentTrends;
