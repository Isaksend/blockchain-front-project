import React, { useState } from "react";

const CreateSurvey = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [questions, setQuestions] = useState([
        { question: "", options: ["", "", ""], correctOption: null },
    ]);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleAddQuestion = () => {
        setQuestions([...questions, { question: "", options: ["", "", ""], correctOption: null }]);
    };

    const handleQuestionChange = (index, value) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index].question = value;
        setQuestions(updatedQuestions);
    };

    const handleOptionChange = (questionIndex, optionIndex, value) => {
        const updatedQuestions = [...questions];
        updatedQuestions[questionIndex].options[optionIndex] = value;
        setQuestions(updatedQuestions);
    };

    const handleCorrectOptionChange = (questionIndex, optionIndex) => {
        const updatedQuestions = [...questions];
        updatedQuestions[questionIndex].correctOption = optionIndex;
        setQuestions(updatedQuestions);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccessMessage("");
        setErrorMessage("");

        const token = localStorage.getItem("token"); // Get the user's token

        if (!token) {
            setErrorMessage("You need to be logged in to create a survey.");
            return;
        }

        try {
            const response = await fetch("http://localhost:3000/create-poll", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`, // Include the token in the request headers
                },
                body: JSON.stringify({
                    title,
                    description,
                    questions,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to create the survey.");
            }

            setSuccessMessage("Survey created successfully!");
            setTitle("");
            setDescription("");
            setQuestions([{ question: "", options: ["", "", ""], correctOption: null }]);
        } catch (err) {
            setErrorMessage(err.message);
        }
    };

    return (
        <div className="create-survey">
            <div className="create-survey-container">
                <h2>Create a New Survey</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            placeholder="Enter your description"
                        />
                    </div>
                    <div className="questions-container">
                        {questions.map((q, qIndex) => (
                            <div key={qIndex} className="question-block">
                                <label>Question {qIndex + 1}</label><br/><br/>
                                <input
                                    type="text"
                                    value={q.question}
                                    onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
                                    required
                                    className="question-input"
                                />

                                {/* Options */}
                                {q.options.map((option, oIndex) => (
                                    <div key={oIndex} className="option-block">
                                        <label>Option {oIndex + 1}</label><br/>
                                        <input
                                            type="text"
                                            value={option}
                                            onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                                            required
                                            className="option-variant"
                                        />
                                        <input
                                            type="radio"
                                            name={`correctOption-${qIndex}`}
                                            checked={q.correctOption === oIndex}
                                            onChange={() => handleCorrectOptionChange(qIndex, oIndex)}
                                        />
                                        <span>Correct</span>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>

                    <div className="add-question-create">
                        <button type="button" onClick={handleAddQuestion}>
                            Add Question
                        </button>
                        <button type="submit">Create Survey</button>
                    </div>
                </form>

                {successMessage && <p className="success-message">{successMessage}</p>}
                {errorMessage && <p className="error-message">{errorMessage}</p>}
            </div>
        </div>
    );
};

export default CreateSurvey;
