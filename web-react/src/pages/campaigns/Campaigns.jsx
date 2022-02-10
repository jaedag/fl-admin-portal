import React from "react";
import { Container } from "react-bootstrap";
import MenuButton from "./components/buttons/MenuButton";
import { useNavigate } from "react-router";

const Campaigns = () => {
  const navigate = useNavigate();
  return (
    <div className="d-flex align-items-center justify-content-center ">
      <Container>
        <div className="text-center">
          <h1 className="mb-0 ">SSMG Campaigns</h1>
        </div>
        <div className="d-grid gap-2 mt-4 text-center px-4">
          <MenuButton
            name="Equipment Campaign"
            onClick={() => navigate(`/campaigns/constituency/equipment`)}
          />
        </div>
      </Container>
    </div>
  );
};

export default Campaigns;
