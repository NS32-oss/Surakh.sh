import React from "react";

export default function DocumentationPage() {
    return (
        <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold mb-6">
                Authentication using Surakh.sh
            </h1>
            <p className="text-lg mb-4">
                Surakh.sh is a complete open-source authentication solution for
                every kind of applications.
            </p>
            <h2 className="text-2xl font-semibold mt-8 mb-4">Overview</h2>
            <p className="mb-4">
                Surakh.sh is designed from the ground up to support Web, App and
                Serverless.
            </p>
            <ul className="list-disc list-inside space-y-2 mb-6">
                <li>Built-in support for OAuth2.0</li>
                <li>Built-in support for Sign in with Google and GitHub</li>
                <li>Supports email authentication</li>
                <li>Supports both JSON Web Tokens and database sessions</li>
                <li>
                    Designed for Serverless but runs anywhere (AWS Lambda, etc…)
                </li>
            </ul>
        </div>
    );
}
