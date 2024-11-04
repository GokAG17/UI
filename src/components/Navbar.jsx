import React, { useState } from "react";
import { Layout, Menu, Button } from "antd";
import { Link, Outlet } from "react-router-dom";
import {
  HomeOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import "./Navbar.css";

const { Sider, Content } = Layout;

const Navbar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const menuItems = [
    {
      key: "1",
      icon: <HomeOutlined />,
      label: <Link to="/home">Home</Link>,
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        breakpoint="lg"
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        className="custom-sider"
      >
        <div className="toggle-button">
          <Button
            type="text"
            onClick={toggleCollapse}
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            className="toggle-button"
            style={{ fontSize: "18px", marginLeft: 16 }}
          />
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={menuItems}
          className="custom-menu"
        />
      </Sider>
      <Layout>
        <Content>
          <div className="page-content">
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Navbar;
