import React, { useState } from "react";
import { Form, Input, Select, Button, InputNumber, Card, message } from "antd";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const { Option } = Select;

const Setup = () => {
  const [form] = Form.useForm();
  const [configData, setConfigData] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (values) => {
    // Collecting form values
    const config = {
      topic: values.topic,
      numberFormat: values.numberFormat,
      operation: values.operation,
      options: values.options,
      timeDelay: values.timeDelay,
      num_questions: 10, // Specify the number of questions you want to generate (e.g., 10)
    };

    setConfigData(config);

    try {
      // Sending POST request to the Flask backend
      const response = await fetch("http://localhost:5000/api/generateMCQs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(config),
      });

      if (response.ok) {
        const data = await response.json();
        message.success("Questions generated successfully!");
        console.log("Generated Questions:", data.questions);

        // Redirect to /start after successful generation
        navigate("/start");
      } else {
        const errorData = await response.json();
        message.error(`Error: ${errorData.error || "Failed to generate questions"}`);
      }
    } catch (error) {
      message.error(`Error: ${error.message}`);
    }
  };

  return (
    <Card
      title="Question Generation Setup"
      style={{ maxWidth: 600, margin: "auto", marginTop: 50 }}
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
        {/* Topic Input */}
        <Form.Item
          label="Topic"
          name="topic"
          rules={[{ required: true, message: "Please enter a topic!" }]}
        >
          <Input placeholder="Enter the topic (e.g., Math)" />
        </Form.Item>

        {/* Number Format Selection */}
        <Form.Item
          label="Number Format"
          name="numberFormat"
          rules={[{ required: true, message: "Please select a number format!" }]}
        >
          <Select placeholder="Select number format">
            <Option value="two-digit">Two-Digit</Option>
            <Option value="three-digit">Three-Digit</Option>
          </Select>
        </Form.Item>

        {/* Operation Type Selection */}
        <Form.Item
          label="Operation Type"
          name="operation"
          rules={[{ required: true, message: "Please select an operation type!" }]}
        >
          <Select placeholder="Select operation type">
            <Option value="addition">Addition</Option>
            <Option value="subtraction">Subtraction</Option>
            <Option value="multiplication">Multiplication</Option>
            <Option value="combination">Combination</Option>
          </Select>
        </Form.Item>

        {/* Number of Options */}
        <Form.Item
          label="Number of Options"
          name="options"
          rules={[
            {
              required: true,
              message: "Please specify the number of options!",
            },
          ]}
        >
          <InputNumber min={2} max={6} />
        </Form.Item>

        {/* Time Delay */}
        <Form.Item
          label="Time Delay (seconds)"
          name="timeDelay"
          rules={[
            { required: true, message: "Please specify the time delay!" },
          ]}
        >
          <InputNumber min={1} max={60} />
        </Form.Item>

        {/* Submit Button */}
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Generate Configuration
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default Setup;
