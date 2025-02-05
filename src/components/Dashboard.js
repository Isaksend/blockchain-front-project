import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import PollLink from "./PollLink";
import {Link} from "react-router-dom";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "../contractConfig";

const Dashboard = () => {
    const [polls, setPolls] = useState([]);
    const [contract, setContract] = useState(null);

    // const polls = [
    //     {
    //         id: 1,
    //         title: "Name of poll",
    //         description:
    //             "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas euismod sed risus at sodales.",
    //         date: "28/01/2025",
    //         author: "John Doe",
    //     },
    //     {
    //         id: 2,
    //         title: "Another poll",
    //         description:
    //             "Ut sed ullamcorper neque. Aenean sit amet consectetur quam, id pulvinar sapien.",
    //         date: "28/01/2025",
    //         author: "Jane Smith",
    //     },
    // ];
    useEffect(() => {
        const loadPolls = async () => {
            if (window.ethereum) {
                const provider = new ethers.BrowserProvider(window.ethereum);
                const signer = await provider.getSigner();
                const votingContract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

                setContract(votingContract);

                const pollCount = 5; // Ограничиваем количество опросов
                const loadedPolls = [];

                for (let i = 1; i <= pollCount; i++) {
                    try {
                        const poll = await votingContract.getPoll(i);
                        loadedPolls.push({
                            id: i,
                            title: poll.title,
                            description: poll.description,
                            voteCount: poll.voteCount.toString(),
                        });
                    } catch (error) {
                        break;
                    }
                }

                setPolls(loadedPolls);
            }
        };

        loadPolls();
    }, []);
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
                            <PollLink key={poll.id} {...poll} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
