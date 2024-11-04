import React, { useState, useEffect, createContext, useContext } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faRedo,
  faCheckCircle,
  faTimesCircle,
  faArrowLeft,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import {
  Button as AntButton,
  Select,
  Radio,
  Progress as AntProgress,
  Input,
  Layout,
  Typography,
  Card,
  Alert,
} from "antd";
import * as XLSX from "xlsx";

const { Header, Content } = Layout;
const { Title, Paragraph } = Typography;
const { Option } = Select;

// Context for user authentication
const AuthContext = createContext();

const Container = styled(Card)`
  max-width: 900px;
  margin: 50px auto;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  background-color: #f9f9f9;
  text-align: center;
`;

const OptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 0;
`;

const StyledOption = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 10px 0;
  padding: 15px;
  border: 1px solid #007bff;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  background-color: #e7f1ff;

  input[type="radio"] {
    margin-right: 10px;
    cursor: pointer;
  }

  &:hover {
    background-color: #cce4ff;
  }
`;

const StyledTitle = styled(Title)`
  text-align: center;
  color: #007bff;
`;

const StyledHeader = styled(Header)`
  background-color: #001529;
  text-align: center;
`;

const StyledContent = styled(Content)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const StyledProgress = styled(AntProgress)`
  width: 80%;
  margin-bottom: 20px;
`;

const StyledButton = styled(AntButton)`
  margin: 10px;
  width: 150px;
`;

const StyledInput = styled(Input)`
  margin-bottom: 10px;
  width: 300px;
`;

const StyledSelect = styled(Select)`
  margin-bottom: 20px;
  width: 300px;
`;

const QuizApp = ({ subjects }) => {
  const { user } = useContext(AuthContext);
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [quizCompleted, setQuizCompleted] = useState(false);

  const maxMarks = questions.length;

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const response = await fetch("/quiz.json");
        const data = await response.json();
        setQuestions(shuffleArray(data[user.subject] || []));
      } catch (error) {
        console.error("Error fetching quiz data:", error);
      }
    };

    if (user) {
      fetchQuizData();
    }
  }, [user]);

  const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

  const handleOptionChange = (e) => setSelectedOption(e.target.value);

  const handleSubmit = () => {
    if (selectedOption === questions[currentQuestion].answer) {
      setScore(score + 1);
    }
    setSubmitted(true);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSubmitted(false);
      setSelectedOption("");
    } else {
      setQuizCompleted(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setScore(0);
    setQuizCompleted(false);
    setSubmitted(false);
    setSelectedOption("");
  };

  return (
    <Container title="Advanced Quiz App">
      {quizCompleted ? (
        <div>
          <StyledTitle level={3}>Quiz Completed!</StyledTitle>
          <Paragraph>
            Your Score: {score} out of {maxMarks}
          </Paragraph>
          <StyledButton onClick={handleRestart} type="primary">
            <FontAwesomeIcon icon={faRedo} /> Restart Quiz
          </StyledButton>
        </div>
      ) : (
        <div>
          <StyledProgress
            percent={((currentQuestion + 1) / questions.length) * 100}
            showInfo={false}
          />
          <StyledTitle level={3}>{questions[currentQuestion]?.question}</StyledTitle>
          <OptionContainer>
            {questions[currentQuestion]?.options.map((option, index) => (
              <StyledOption key={index}>
                <Radio
                  value={option}
                  checked={selectedOption === option}
                  onChange={handleOptionChange}
                />
                {option}
              </StyledOption>
            ))}
          </OptionContainer>
          <StyledButton type="primary" onClick={handleSubmit} disabled={submitted}>
            Submit
          </StyledButton>
          {submitted && (
            <div>
              <Alert
                message={
                  selectedOption === questions[currentQuestion].answer
                    ? "Correct!"
                    : `Wrong! The correct answer was ${questions[currentQuestion].answer}.`
                }
                type={
                  selectedOption === questions[currentQuestion].answer
                    ? "success"
                    : "error"
                }
                showIcon
              />
              <StyledButton onClick={handleNext}>
                {currentQuestion < questions.length - 1 ? "Next" : "Finish"}
              </StyledButton>
            </div>
          )}
        </div>
      )}
    </Container>
  );
};

const Login = ({ setUser, subjects }) => {
  const [username, setUsername] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [subject, setSubject] = useState("");

  const handleLogin = () => {
    if (username && rollNumber && subject) {
      setUser({ username, rollNumber, subject });
    } else {
      alert("Please fill in all fields.");
    }
  };

  return (
    <Container title="Login">
      <StyledInput
        placeholder="Enter your username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <StyledInput
        placeholder="Enter your roll number"
        value={rollNumber}
        onChange={(e) => setRollNumber(e.target.value)}
      />
      <StyledSelect
        placeholder="Select a subject"
        value={subject}
        onChange={setSubject}
      >
        {subjects.map((sub) => (
          <Option key={sub} value={sub}>
            {sub}
          </Option>
        ))}
      </StyledSelect>
      <StyledButton onClick={handleLogin} type="primary">
        <FontAwesomeIcon icon={faPlay} /> Start Quiz
      </StyledButton>
    </Container>
  );
};

const App = () => {
  const [user, setUser] = useState(null);
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await fetch("/quiz.json");
        const data = await response.json();
        setSubjects(Object.keys(data));
      } catch (error) {
        console.error("Error fetching subjects:", error);
      }
    };

    fetchSubjects();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <Layout style={{ minHeight: "100vh" }}>
        <StyledHeader>
          <StyledTitle style={{ color: "white" }}>Advanced Quiz Application</StyledTitle>
        </StyledHeader>
        <StyledContent>
          {user ? <QuizApp subjects={subjects} /> : <Login setUser={setUser} subjects={subjects} />}
        </StyledContent>
      </Layout>
    </AuthContext.Provider>
  );
};

export default App;
