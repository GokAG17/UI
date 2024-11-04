import React from "react";
import { Form, Input, Select, Button, InputNumber, Card, message } from "antd";
import { useNavigate } from "react-router-dom";
import "./Setup.css";

const { Option } = Select;

const Setup = ({ onDataReceived }) => {
  const [form] = Form.useForm();
  
  const handleSubmit = async (values) => {
    // Collecting form values
    const config = {
      topic: values.topic,
      numberFormat: values.numberFormat,
      operation: values.operation,
      options: values.options,
      timeDelay: values.timeDelay,
      num_questions: 10, // Specify the number of questions you want to generate
    };

    // Send the collected data to the parent component
    onDataReceived(config);

    // You can also show a success message if needed
    message.success("Configuration data submitted successfully!");

    // Optionally, you can redirect or perform other actions here
  };

  return (
    <Card
      className="setup-card" // Use class name for card styling
      title="Question Generation Setup"
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{
          options: 4,
          timeDelay: 5,
        }}
      >
        <Form.Item
          className="label" // Use class name for label styling
          label="Topic"
          name="topic"
          rules={[{ required: true, message: "Please enter a topic!" }]}
        >
          <Input
            className="input-field"
            placeholder="Enter the topic (e.g., Math)"
          />
        </Form.Item>

        <Form.Item
          className="label" // Use class name for label styling
          label="Number Format"
          name="numberFormat"
          rules={[{ required: true, message: "Please select a number format!" }]}
        >
          <Select className="select-field" placeholder="Select number format">
            <Option value="two-digit">Two-Digit</Option>
            <Option value="three-digit">Three-Digit</Option>
          </Select>
        </Form.Item>

        <Form.Item
          className="label" // Use class name for label styling
          label="Operation Type"
          name="operation"
          rules={[{ required: true, message: "Please select an operation type!" }]}
        >
          <Select className="select-field" placeholder="Select operation type">
            <Option value="addition">Addition</Option>
            <Option value="subtraction">Subtraction</Option>
            <Option value="multiplication">Multiplication</Option>
            <Option value="combination">Combination</Option>
          </Select>
        </Form.Item>

        <Form.Item
          className="label" // Use class name for label styling
          label="Number of Options"
          name="options"
          rules={[{ required: true, message: "Please specify the number of options!" }]}
        >
          <InputNumber className="input-number" min={2} max={6} />
        </Form.Item>

        <Form.Item
          className="label" // Use class name for label styling
          label="Time Delay (seconds)"
          name="timeDelay"
          rules={[{ required: true, message: "Please specify the time delay!" }]}
        >
          <InputNumber className="input-number" min={1} max={60} />
        </Form.Item>

        <Form.Item>
          <Button className="primary-button" type="primary" htmlType="submit">
            Configure
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default Setup;
