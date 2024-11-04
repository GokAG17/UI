import React from "react";
import { Typography, Button, Card } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import "./Template.css";

const { Title, Paragraph } = Typography;

const Template = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/home");
  };

  let content;
  switch (id) {
    default:
      content = <Paragraph>Template not found.</Paragraph>;
  }

  return (
    <div className="template-detail-container">
      <Card className="template-detail-card" bordered={false}>
        <Title level={2}>Template Details</Title>
        {content}
        <Button type="primary" onClick={handleBack}>
          Back to Templates
        </Button>
      </Card>
    </div>
  );
};

export default Template;
