import { useState } from "react";
import { Typography, Space, Popover, Button, Input, Card } from "antd";
import { ColorPicker } from "antd";
import "./Edit.css";

const { Title } = Typography;

const TemplateEditor = ({ onTemplateEdit }) => {
  const [questionBoxColor, setQuestionBoxColor] = useState("#ffffff");
  const [questionBoxSize, setQuestionBoxSize] = useState("20px");
  const [optionBoxColor, setOptionBoxColor] = useState("#f0f0f0");
  const [optionBoxSize, setOptionBoxSize] = useState("10px");
  const [fontColor, setFontColor] = useState("#f0f0f0");
  const [fontSize, setFontSize] = useState("16px");

  const handleSave = () => {
    const templateData = {
      questionBoxColor,
      questionBoxSize,
      optionBoxColor,
      optionBoxSize,
      fontColor,
      fontSize,
    };
    onTemplateEdit(templateData);
  };

  return (
    <div className="template-editor-container">
      <Card className="template-editor-card">
        <Title level={4} className="template-editor-title">
          Edit Template
        </Title>
        <Space direction="vertical" size="small" style={{ width: "100%" }}>
          <div className="form-item">
            <label>Question Box Color:</label>
            <Popover
              content={
                <ColorPicker
                  onChange={(color) => setQuestionBoxColor(color.toHexString())}
                />
              }
              title="Select Color"
            >
              <Button
                style={{
                  backgroundColor: questionBoxColor,
                  borderColor: questionBoxColor,
                }}
              >
                Pick Color
              </Button>
            </Popover>
          </div>

          <div className="form-item">
            <label>Question Box Size:</label>
            <Input
              type="text"
              value={questionBoxSize}
              onChange={(e) => setQuestionBoxSize(e.target.value)}
              placeholder="20px"
              className="input-field"
            />
          </div>

          <div className="form-item">
            <label>Option Box Color:</label>
            <Popover
              content={
                <ColorPicker
                  onChange={(color) => setOptionBoxColor(color.toHexString())}
                />
              }
              title="Select Color"
            >
              <Button
                style={{
                  backgroundColor: optionBoxColor,
                  borderColor: optionBoxColor,
                }}
              >
                Pick Color
              </Button>
            </Popover>
          </div>

          <div className="form-item">
            <label>Option Box Size:</label>
            <Input
              type="text"
              value={optionBoxSize}
              onChange={(e) => setOptionBoxSize(e.target.value)}
              placeholder="10px"
              className="input-field"
            />
          </div>

          <div className="form-item">
            <label>Font Color:</label>
            <Popover
              content={
                <ColorPicker
                  onChange={(color) => setFontColor(color.toHexString())}
                />
              }
              title="Select Color"
            >
              <Button
                style={{ backgroundColor: fontColor, borderColor: fontColor }}
              >
                Pick Color
              </Button>
            </Popover>
          </div>

          <div className="form-item">
            <label>Font Size:</label>
            <Input
              type="text"
              value={fontSize}
              onChange={(e) => setFontSize(e.target.value)}
              placeholder="16px"
              className="input-field"
            />
          </div>

          <Button type="primary" onClick={handleSave} className="save-button">
            Save Template
          </Button>
        </Space>
      </Card>
    </div>
  );
};

export default TemplateEditor;
