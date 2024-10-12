"use client";

import { useState, useRef } from "react";
import { ArrowBottomLeftIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Replace with your actual Vercel Serverless Function URL
const API_ENDPOINT = "http://localhost:2400/generate";

const AiAssistant = () => {
    const [userInput, setUserInput] = useState("");
    const [conversationHistory, setConversationHistory] = useState<string[]>(
        []
    );
    const bottomOfChatRef = useRef<HTMLDivElement>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserInput(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (userInput.trim() === "") return;

        setConversationHistory((prevHistory) => [
            ...prevHistory,
            `You: ${userInput}`,
        ]);

        try {
            const response = await fetch(API_ENDPOINT, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ text: userInput }),
            });

            if (!response.ok) {
                throw new Error(
                    `API request failed with status ${response.status}`
                );
            }

            const data = await response.json();
            setConversationHistory((prevHistory) => [
                ...prevHistory,
                `AI: ${data}`,
            ]);
        } catch (error) {
            console.error("Error fetching response:", error);
            setConversationHistory((prevHistory) => [
                ...prevHistory,
                "AI: An error occurred. Please try again later.",
            ]);
        }

        setUserInput("");
    };

    return (
        <div className="flex flex-col h-full w-full max-w-2xl mx-auto rounded-lg shadow-md">
            <div className="flex-grow px-6 min-h-[75vh] overflow-y-auto">
                {conversationHistory.map((message, index) => (
                    <div
                        key={index}
                        className={`mb-4 flex ${
                            message.startsWith("You:")
                                ? "justify-end"
                                : "justify-start"
                        }`}
                    >
                        <p
                            className={`${
                                message.startsWith("You:")
                                    ? "text-white rounded-lg p-4 bg-zinc-800"
                                    : "text-[#111111] rounded-lg p-4 bg-gray-100 max-w-sm"
                            }`}
                        >
                            {message}
                        </p>
                    </div>
                ))}
                <div ref={bottomOfChatRef} /> {/* For scrolling to bottom */}
            </div>

            {/* Input Area */}
            <form
                onSubmit={handleSubmit}
                className="flex items-center p-4 border-t border-gray-200"
            >
                <Input
                    value={userInput}
                    onChange={handleChange}
                    placeholder="Ask your question..."
                    className="flex-grow p-8 mr-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                />
                <Button
                    type="submit"
                    className="bg-blue-500 text-white p-9 rounded-md hover:bg-blue-600"
                >
                    <ArrowBottomLeftIcon />
                </Button>
            </form>
        </div>
    );
};

export default AiAssistant;
