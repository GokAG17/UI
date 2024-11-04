import React from "react";
import { Button, Layout, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import './Start.css';

const { Content } = Layout;
const { Title } = Typography;

const StartPage = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/home');
  };

  return (
    <Layout className="start-layout">
      <Content className="start-content">
        <div className="start-container">
          <Title level={1} className="start-title"></Title>
          <Button 
            type="primary" 
            size="large" 
            shape="round" 
            className="start-button" 
            onClick={handleStart}
          >
            Get Started
          </Button>
        </div>
      </Content>
    </Layout>
  );
};

export default StartPage;
