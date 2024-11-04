import React, { useState, useEffect } from "react";
import { Button, Card, Spin, Modal } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEdit } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import QuizApp2 from "../../quiz/src/Quiz.jsx";
import Questionnaire from "./template/Quiz/Questionnaire.jsx";
import Questionnaire1 from "./template/Quiz/Questionnaire1.jsx";
import TemplateEditor from "./template/Quiz/Editor.jsx";
import Setup from "./template/Math/Setup.jsx";
import "./Prompt.css";

const Prompt = () => {
  const { id } = useParams();
  const [showPreview, setShowPreview] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState("1");
  const [loading, setLoading] = useState(false);
  const [showQuestionnaire, setShowQuestionnaire] = useState(false);
  const [startClicked, setStartClicked] = useState(false);
  const [templateData, setTemplateData] = useState(null);
  const [isTemplateEditorVisible, setIsTemplateEditorVisible] = useState(false);
  const [DataMath, setDataMath] = useState(null);
  const [DataMCQ, setDataMCQ] = useState(null);
  const [DataFill, setDataFill] = useState(null);

  useEffect(() => {
    console.log("Prompt component mounted. Current ID:", id);
  }, [id]);

  const renderTemplate = () => {
    if (id === "2" && selectedTemplate === "1") {
      return (
        <iframe
          src="http://localhost:3000" // URL of your React app on port 3000
          title="Project 2"
          style={{
            width: "700px",
            height: "500px", // Adjust the height as needed
            border: "none",
          }}
        />
      );
    } else if (id === "1" && selectedTemplate === "1") {
      return (
        <iframe
          src="http://localhost:3001" // URL of your React app on port 3001
          title="Project 1"
          style={{
            width: "700px",
            height: "500px", // Adjust the height as needed
            border: "none",
          }}
        />
      );
    } else if (id === "1" && selectedTemplate === "2") {
      return (
        <iframe
          src="http://localhost:3002"
          title="Project 2"
          style={{
            width: "700px",
            height: "500px",
            border: "none",
          }}
        />
      );
    } else {
      switch (id) {
        case "3":
          return selectedTemplate === "1" ? <QuizApp2 /> : <QuizApp2 />;
        default:
          return <div>Template not found</div>;
      }
    }
  };

  const handleGenerateQuestions = () => {
    console.log(
      `Generating questions for Template ${selectedTemplate} in App ${id}`
    );
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setShowQuestionnaire(true);
      console.log("Questions generated and questionnaire shown.");
    }, 2000);
  };

  const handleSubmitMCQ = (data) => {
    console.log("All responses:", data);
    setDataMCQ(data);
    setShowQuestionnaire(false);
    setStartClicked(false);
  };

  const handleSubmitFill = (data) => {
    console.log("All responses:", data);
    setDataFill(data);
    setShowQuestionnaire(false);
    setStartClicked(false);
  };

  const handleDataMath = (data) => {
    setDataMath(data);
    console.log("Received setup data:", data);
    setShowQuestionnaire(false);
    setStartClicked(false);
  };

  const handleEditTemplate = (data) => {
    setTemplateData(data);
    setIsTemplateEditorVisible(false);
    console.log("Edited template data:", data);
  };

  const handleGenerateMCQ = () => {
    console.log("DataMCQ:", DataMCQ);
  };

  const handleGenerateFill = () => {
    console.log("DataFill:", DataFill);
  };

  const handleGenerateMath = () => {
    console.log("DataMath:", DataMath);
  };

  return (
    <div className="prompt-container">
      <div className="preview-button-container">
        <Button
          type="primary"
          shape="circle"
          icon={<FontAwesomeIcon icon={faEye} />}
          className="preview-button"
          onClick={() => {
            setShowPreview(!showPreview);
            console.log("Preview toggled:", !showPreview);
          }}
        />
        {id === "1" && selectedTemplate === "1" && (
          <Button
            type="primary"
            shape="circle"
            icon={<FontAwesomeIcon icon={faEdit} />}
            className="edit-template-button"
            onClick={() => setIsTemplateEditorVisible(true)}
            style={{ marginLeft: "10px" }}
          />
        )}
      </div>

      {id == 1 && (
        <div className="template-select-container">
          <select
            value={selectedTemplate}
            onChange={(e) => {
              setSelectedTemplate(e.target.value);
              console.log("Template selected:", e.target.value);
            }}
            className="template-select"
          >
            <option value="1">MCQs</option>
            <option value="2">FillUps</option>
          </select>
        </div>
      )}

      {id == 2 && (
        <div className="template-select-container">
          <select
            value={selectedTemplate}
            onChange={(e) => {
              setSelectedTemplate(e.target.value);
              console.log("Template selected:", e.target.value);
            }}
            className="template-select"
          >
            <option value="1">Maths Game</option>
            <option value="2">Template 2</option>
          </select>
        </div>
      )}

      {id == 3 && (
        <div className="template-select-container">
          <select
            value={selectedTemplate}
            onChange={(e) => {
              setSelectedTemplate(e.target.value);
              console.log("Template selected:", e.target.value);
            }}
            className="template-select"
          >
            <option value="1">Flash Card</option>
            <option value="2">Template 2</option>
          </select>
        </div>
      )}

      <Modal
        open={isTemplateEditorVisible}
        onCancel={() => setIsTemplateEditorVisible(false)}
        footer={null}
        className="custom-modal"
        centered
      >
        <TemplateEditor onTemplateEdit={handleEditTemplate} />
      </Modal>

      {!showPreview && !loading && !startClicked && (
        <Button
          className="start1-button"
          onClick={() => {
            handleGenerateQuestions();
            setStartClicked(true);
          }}
          style={{ marginTop: "20px" }}
          disabled={loading}
        >
          {loading ? <Spin size="small" /> : "Start"}
        </Button>
      )}

      {!showPreview &&
        !loading &&
        !startClicked &&
        DataMCQ !== null &&
        id === "1" &&
        selectedTemplate === "1" && (
          <Button
            className="generate-button"
            onClick={handleGenerateMCQ}
            style={{ marginTop: "20px" }}
          >
            Generate
          </Button>
        )}

      {!showPreview &&
        !loading &&
        !startClicked &&
        DataFill !== null &&
        id === "1" &&
        selectedTemplate === "2" && (
          <Button
            className="generate-button"
            onClick={handleGenerateFill}
            style={{ marginTop: "20px" }}
          >
            Generate
          </Button>
        )}

      {!showPreview &&
        !loading &&
        !startClicked &&
        DataMath !== null &&
        id === "2" &&
        selectedTemplate === "1" && (
          <Button
            className="generate-button"
            onClick={handleGenerateMath}
            style={{ marginTop: "20px" }}
          >
            Generate
          </Button>
        )}

      {!showPreview && !loading && startClicked && showQuestionnaire && (
        <div className="questionnaire-container">
          {id === "1" && selectedTemplate === "1" ? (
            <Questionnaire handleSubmitAll={handleSubmitMCQ} />
          ) : id === "1" && selectedTemplate === "2" ? (
            <Questionnaire1 handleSubmitAll={handleSubmitFill} />
          ) : id === "2" && selectedTemplate === "1" ? (
            <Setup onDataReceived={handleDataMath} />
          ) : null}
        </div>
      )}

      {showPreview && renderTemplate()}

      {loading && (
        <div className="loading-container">
          <Spin size="large" />
        </div>
      )}
    </div>
  );
};

export default Prompt;
