import React, { useContext } from "react";
import { Container } from "react-bootstrap";
import SubmitButton from "components/formik-components/SubmitButton";
import { MemberContext } from "contexts/MemberContext";

const ConstituencyEquipmentForm = () => {
  const { currentUser } = useContext(MemberContext);

  const church = currentUser.currentChurch;
  const churchType = currentUser.currentChurch?.__typename;

  return (
    <div className="d-flex align-items-center justify-content-center mx-2 ">
      <Container>
        <div className="text-center mb-5">
          <h1>Equipment Campaign Form</h1>
          <h6>{`${church?.name} ${churchType}`}</h6>
        </div>
        <div>
          <form>
            <div className="form-group">
              <label htmlFor="date">Date</label>
              <input type="date" className="form-control" />
            </div>
            <div className="form-group mt-3">
              <label htmlFor="exampleInputPassword1">
                Number of Offering Baskets
              </label>
              <input type="number" className="form-control" />
            </div>

            <div className="d-flex justify-content-center mt-5">
              <SubmitButton formik />
            </div>
          </form>
        </div>
      </Container>
    </div>
  );
};

export default ConstituencyEquipmentForm;
