import React, { createContext, useState, useMemo, useContext } from 'react';
import { AuthContext } from './AuthContext';

export const VotingContext = createContext();

// Mock voting data
const initialVotings = [
    {
        id: 'vote001',
        title: 'Favorite Programming Language',
        description: 'Which language do you prefer for development?',
        candidates: ['JavaScript', 'Python', 'Java', 'C#'],
        status: 'active', // 'active', 'closed'
    },
    {
        id: 'vote002',
        title: 'Best Mobile OS',
        description: 'Choose your preferred mobile operating system.',
        candidates: ['Android', 'iOS'],
        status: 'active',
    },
];

// Mock votes data
const initialVotes = [
    // Example vote: { voteId: 'v1', userId: 'user001', votingId: 'vote001', candidate: 'Python' }
];


export const VotingProvider = ({ children }) => {
    const [votings, setVotings] = useState(initialVotings);
    const [votes, setVotes] = useState(initialVotes);
    const { currentUser } = useContext(AuthContext);

    const votingContextValue = useMemo(() => ({
        getVotings: (status = 'active') => {
            return votings.filter(v => status === 'all' || v.status === status);
        },
        getVotingById: (id) => {
            return votings.find(v => v.id === id);
        },
        addVoting: (title, description, candidatesString) => {
            if (!currentUser?.isAdmin) return false; // Only admin can add

            const candidates = candidatesString.split(',').map(c => c.trim()).filter(c => c); // Split and trim
            if (!title || !description || candidates.length < 2) return false; // Basic validation

            const newVoting = {
                id: `vote${Date.now()}`, // Simple unique ID
                title,
                description,
                candidates,
                status: 'active',
            };
            setVotings(prevVotings => [...prevVotings, newVoting]);
            console.log("Admin created new voting:", newVoting.title);
            return true;
        },
        castVote: (votingId, candidate) => {
             if (!currentUser) return { success: false, message: "User not logged in." };

            // Check if user already voted in this election
            const existingVote = votes.find(v => v.userId === currentUser.id && v.votingId === votingId);
            if (existingVote) {
                 console.log("User already voted:", currentUser.username, "in", votingId);
                 return { success: false, message: "You have already voted in this election." };
            }

            // Check if the voting exists and the candidate is valid
            const voting = votings.find(v => v.id === votingId);
            if (!voting || !voting.candidates.includes(candidate)) {
                 return { success: false, message: "Invalid voting or candidate." };
            }


            const newVote = {
                voteId: `cast${Date.now()}`, // Simple unique ID
                userId: currentUser.id,
                votingId,
                candidate,
            };
            setVotes(prevVotes => [...prevVotes, newVote]);
            console.log("Vote cast by:", currentUser.username, "for", candidate, "in", votingId);
            return { success: true, message: "Vote cast successfully!" };
        },
        getUserVotes: (userId) => {
             if (!userId) return [];
            return votes.filter(v => v.userId === userId);
        },
        getResults: (votingId) => {
            const relevantVotes = votes.filter(v => v.votingId === votingId);
            const totalVotes = relevantVotes.length;
            const results = {}; // { candidateName: voteCount }

            const voting = votings.find(v => v.id === votingId);
            if (voting) {
                 // Initialize results with 0 for all candidates
                 voting.candidates.forEach(candidate => {
                    results[candidate] = 0;
                 });
            }


            relevantVotes.forEach(vote => {
                results[vote.candidate] = (results[vote.candidate] || 0) + 1;
            });

            return {
                totalVotes,
                results, // e.g., { 'JavaScript': 5, 'Python': 3 }
            };
        },
         hasUserVoted: (userId, votingId) => {
            return votes.some(v => v.userId === userId && v.votingId === votingId);
         }

    }), [votings, votes, currentUser]); // Add currentUser as dependency

    return (
        <VotingContext.Provider value={votingContextValue}>
            {children}
        </VotingContext.Provider>
    );
};