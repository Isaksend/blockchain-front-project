import React from "react";
import { ethers } from "ethers";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "../contractConfig";

const PollLink = ({ id, title, description, voteCount }) => {
    const voteProposal = async () => {
        try {
            if (!window.ethereum) {
                throw new Error("MetaMask не установлен!");
            }

            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const votingContract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

            const tx = await votingContract.vote(id);
            await tx.wait();

            alert("Вы успешно проголосовали!");
        } catch (error) {
            alert("Ошибка: " + error.message);
        }
    };

    return (
        <div className="poll-item">
            <h3 className="poll-title">{title}</h3>
            <p className="poll-description">{description}</p>
            <p className="poll-votes">Голоса: {voteCount}</p>
            <button onClick={voteProposal} className="poll-vote-button">Проголосовать</button>
        </div>
    );
};

export default PollLink;
