// Home.js
import React from "react";
import { Card, Typography, Row, Col } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGamepad, faQuestion } from "@fortawesome/free-solid-svg-icons";
import { PlayCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const { Text } = Typography;

const templateData = [
  {
    id: "1",
    title: "Quiz App",
    icon: <PlayCircleOutlined style={{ color: "#ff6f61" }} />,
    description: "Interactive quiz application",
  },
  {
    id: "2",
    title: "Maths Game App",
    icon: <FontAwesomeIcon icon={faGamepad} style={{ color: "#6fbf7f" }} />,
    description: "Fun math challenges",
  },
  {
    id: "3",
    title: "Flashcards App",
    icon: <FontAwesomeIcon icon={faQuestion} style={{ color: "#ffa600" }} />,
    description: "Create and review flashcards",
  },
];

const Home = () => {
  const navigate = useNavigate();

  const handleDoubleClick = (templateId) => {
    navigate(`/prompt/${templateId}`); // Direct to Prompt page with templateId as a parameter
  };

  return (
    <div className="home-container">
      <div className="title-container">
        <Text className="home-title">
          Pick a template that fits your vision!
        </Text>
      </div>
      <Row gutter={[16, 16]} className="template-grid">
        {templateData.map((template) => (
          <Col xs={24} sm={12} md={12} lg={12} key={template.id}>
            <Card
              className="template-card"
              onDoubleClick={() => handleDoubleClick(template.id)}
            >
              <div className="icon">{template.icon}</div>
              <Text strong className="template-title">
                {template.title}
              </Text>
              <Text className="template-description">
                {template.description}
              </Text>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Home;
