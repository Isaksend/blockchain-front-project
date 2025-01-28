import React from "react";
import { Link } from "react-router-dom";

const PollLink = ({ title, description, date, author }) => {
    return (
        <div className="poll-item">
            <h3 className="poll-title">{title}</h3>
            <p className="poll-description">{description}</p>
            <p className="poll-author">Created by: <strong>{author}</strong></p>
            <div className="poll-footer">
                <div className="poll-date">{date}</div>
                <Link to="/vote" className="poll-vote-button">
                    vote →
                </Link>
            </div>
        </div>
    );
};

export default PollLink;
