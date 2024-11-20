import React, { useState, useEffect } from "react";
import { Button, Card, Spin, Modal, Tooltip } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEdit,
  faArrowUpFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import { Mosaic } from "react-loading-indicators";
import QuizApp2 from "../../quiz/src/Quiz.jsx";
import Questionnaire from "./template/Quiz/Questionnaire.jsx";
import Questionnaire1 from "./template/Quiz/Questionnaire1.jsx";
import QuestionSet from "./template/Flashcard/QuestionSet.jsx";
import TemplateEditor from "./template/Quiz/Editor.jsx";
import TemplateEditor1 from "./template/Quiz/Editor1.jsx";
import Setup from "./template/Math/Setup.jsx";
import "./Prompt.css";

const Prompt = () => {
  const { id } = useParams();
  const [showPreview, setShowPreview] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState("1");
  const [loading, setLoading] = useState(false);
  const [genloading, setgenLoading] = useState(false);
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

  const handleNavigation = () => {
    setgenLoading(true);
  
    setTimeout(() => {
      if (id === "2" && selectedTemplate === "1") {
        window.open("http://localhost:3000", "_blank"); 
      } else if (id === "1" && selectedTemplate === "1") {
        window.open("http://localhost:3001", "_blank"); 
      } else if (id === "1" && selectedTemplate === "2") {
        window.open("http://localhost:3002", "_blank"); 
      } else if (id === "3" && selectedTemplate === "1") {
        window.open("http://localhost:3003", "_blank");
      }
  
      setgenLoading(false);
    }, 3000);
  };
  
  

  const renderTemplate = () => {
    if (id === "2" && selectedTemplate === "1") {
      return (
        <iframe
          src="http://localhost:3000" // URL of your React app on port 3000
          title="Project 1"
          style={{
            width: "900px",
            height: "500px", // Adjust the height as needed
            border: "none",
          }}
        />
      );
    } else if (id === "1" && selectedTemplate === "1") {
      return (
        <iframe
          src="http://localhost:3001" // URL of your React app on port 3001
          title="Project 2"
          style={{
            width: "900px",
            height: "500px", // Adjust the height as needed
            border: "none",
          }}
        />
      );
    } else if (id === "1" && selectedTemplate === "2") {
      return (
        <iframe
          src="http://localhost:3002"
          title="Project 3"
          style={{
            width: "900px",
            height: "500px",
            border: "none",
          }}
        />
      );
    } else if (id === "3" && selectedTemplate === "1") {
      return (
        <iframe
          src="http://localhost:3003"
          title="Project 4"
          style={{
            width: "900px",
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

  const handleEditTemplate = async (data) => {
    setgenLoading(true);
    setTemplateData(data);
    setIsTemplateEditorVisible(false);
    console.log("Edited template data:", data);
    
    try {
      console.log("Edited template data:", data);

      const response = await fetch("http://127.0.0.1:5000/update-mcq-css", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error("Error generating MCQ questions:", error);
    } finally {
      setgenLoading(false);
    }
  };

  const handleGenerateMCQ = async () => {
    setgenLoading(true);
    try {
      console.log("DataMCQ:", DataMCQ); // Your MCQ data if needed

      const response = await fetch("http://127.0.0.1:5000/generate-mcq", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(DataMCQ), // Send any necessary data if needed
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Generated MCQ Questions:", result);
    } catch (error) {
      console.error("Error generating MCQ questions:", error);
    } finally {
      setgenLoading(false);
    }
  };

  const handleGenerateFill = async () => {
    setgenLoading(true);
    try {
      //console.log("DataFill:", DataFill);

      const response = await fetch("http://127.0.0.1:5000/generate-fill", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(DataFill),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Generated Fill Questions:", result);
    } catch (error) {
      console.error("Error generating fill questions:", error);
    } finally {
      setgenLoading(false);
    }
  };

  const handleGenerateMath = async () => {
    setgenLoading(true);
    try {
      console.log("DataMath:", DataMath);

      const response = await fetch("http://127.0.0.1:5000/generate-math", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(DataMath),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Generated Math Questions:", result);
    } catch (error) {
      console.error("Error generating math questions:", error);
    } finally {
      setgenLoading(false);
    }
  };

  return (
    <div className="prompt-container">
      <div className="preview-button-container">
        <Tooltip title="Preview" overlayStyle={{ fontSize: "20px" }}>
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
        </Tooltip>

        <Tooltip title="FullScreen" overlayStyle={{ fontSize: "20px" }}>
          <Button
            type="primary"
            shape="circle"
            icon={<FontAwesomeIcon icon={faArrowUpFromBracket} />}
            className="preview-button"
            onClick={handleNavigation}
            style={{ marginLeft: "10px" }}
            disabled={loading} // Disable the button while loading
          >
            {
              genloading && <Spin /> // Show loading spinner if loading is true
            }
          </Button>
        </Tooltip>
        {id === "1" && selectedTemplate === "1" && (
          <Tooltip title="Edit" overlayStyle={{ fontSize: "20px" }}>
            <Button
              type="primary"
              shape="circle"
              icon={<FontAwesomeIcon icon={faEdit} />}
              className="edit-template-button"
              onClick={() => setIsTemplateEditorVisible(true)}
              style={{ marginLeft: "10px" }}
            />
          </Tooltip>
        )}
        {id === "1" && selectedTemplate === "2" && (
          <Tooltip title="Edit" overlayStyle={{ fontSize: "20px" }}>
            <Button
              type="primary"
              shape="circle"
              icon={<FontAwesomeIcon icon={faEdit} />}
              className="edit-template-button"
              onClick={() => setIsTemplateEditorVisible(true)}
              style={{ marginLeft: "10px" }}
            />
          </Tooltip>
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
          ) : id === "3" && selectedTemplate === "1" ? (
            <QuestionSet onDataReceived={handleDataMath} />
          ) : null}
        </div>
      )}

      {showPreview && renderTemplate()}

      {loading && (
        <div className="loading-container">
          <Spin size="large" />
        </div>
      )}
      {/* {<Spin tip="Generating...." spinning={genloading} fullscreen />} */}
      {genloading && (
        <div className="fullscreen-loader">
          <Mosaic color={["#33CCCC", "#33CC36", "#B8CC33", "#FCCA00"]} />
        </div>
      )}
    </div>
  );
};

export default Prompt;
