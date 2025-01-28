import React from "react";
import PollLink from "./PollLink";
import {Link} from "react-router-dom";

const Dashboard = () => {
    const polls = [
        {
            id: 1,
            title: "Name of poll",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas euismod sed risus at sodales.",
            date: "28/01/2025",
            author: "John Doe",
        },
        {
            id: 2,
            title: "Another poll",
            description:
                "Ut sed ullamcorper neque. Aenean sit amet consectetur quam, id pulvinar sapien.",
            date: "28/01/2025",
            author: "Jane Smith",
        },
    ];

    return (
        <div>
            <div className="dashboardBlock">
                <div className="dashboardContain">
                    <div className="dashboard-header">
                        <div className="listLabel">Polls</div>
                        <Link to="/create_survey" className="dashboardLink">
                            <button className="create-survey-button">Create survey</button>
                        </Link>
                    </div>
                    <div className="polls-list">
                        {polls.map((poll) => (
                            <PollLink
                                key={poll.id}
                                title={poll.title}
                                description={poll.description}
                                date={poll.date}
                                author={poll.author}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
