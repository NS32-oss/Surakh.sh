"use client";

import React from "react";

interface ApiSection {
    title: string;
    description: string;
    endpoint: string;
    method: string;
    request: string;
    responseSuccess: string;
    responseError: string;
}

const sections: ApiSection[] = [
    {
        title: "User Registration",
        description:
            "Registers a new user by providing their full name, email, username, and password.",
        endpoint: "/api/v1/users/signup",
        method: "POST",
        request: `{
      "fullName": "John Doe",
      "email": "john.doe@example.com",
      "username": "johndoe123",
      "password": "SecureP@ssw0rd!"
    }`,
        responseSuccess: `{
      "status": 201,
      "message": "User registered successfully",
      "data": {
        "_id": "60d0fe4f5311236168a109ca",
        "fullName": "John Doe",
        "email": "john.doe@example.com",
        "username": "johndoe123"
      }
    }`,
        responseError: `{
      "status": 409,
      "message": "User Already Exist"
    }`,
    },
];

const ApiDocumentation: React.FC = () => {
    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-semibold mb-6">
                API Documentation for Security Authentication Platform
            </h1>

            {sections.map((section) => (
                <div
                    key={section.title}
                    className="mb-4 border-b border-gray-300 pb-4"
                >
                    <h2 className="text-2xl font-semibold text-blue-600">
                        {section.title}
                    </h2>
                    <div className="mt-4">
                        <p className="text-gray-700 mb-2">
                            {section.description}
                        </p>
                        <div className="bg-[#111111] p-4 rounded-lg shadow-sm mb-2">
                            <strong>Endpoint:</strong>{" "}
                            <code>{section.endpoint}</code>
                        </div>
                        <div className="bg-[#111111] p-4 rounded-lg shadow-sm mb-2">
                            <strong>Method:</strong>{" "}
                            <code>{section.method}</code>
                        </div>
                        <div className="bg-[#111111] p-4 rounded-lg shadow-sm mb-2">
                            <strong>Request:</strong>
                            <pre className="whitespace-pre-wrap">
                                {section.request}
                            </pre>
                        </div>
                        <div className="bg-[#111111] p-4 rounded-lg shadow-sm mb-2">
                            <strong>Response (Success):</strong>
                            <pre className="whitespace-pre-wrap">
                                {section.responseSuccess}
                            </pre>
                        </div>
                        {section.responseError && (
                            <div className="bg-[#111111] p-4 rounded-lg shadow-sm mb-2">
                                <strong>Response (Error):</strong>
                                <pre className="whitespace-pre-wrap">
                                    {section.responseError}
                                </pre>
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ApiDocumentation;
