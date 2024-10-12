import React from "react";

const page = () => {
    return (
        <div>
            <h2 className="text-2xl font-semibold mt-8 mb-4">
                Getting Started
            </h2>
            <p className="mb-4">
                Getting started with Surakh.sh is easy. Follow the steps below
                to get started.
            </p>
            <h3 className="text-xl font-semibold mt-8 mb-4">
                Create an account
            </h3>
            <li className="mb-4">
                To get started, create an account on Surakh.sh.
            </li>
            <h3 className="text-xl font-semibold mt-8 mb-4">
                Log into the account
            </h3>
            <li className="mb-4">
                After creating an account, login into the account to get
                started.
            </li>
            <h3 className="text-xl font-semibold mt-8 mb-4">
                Create a private key
            </h3>
            <li className="mb-4">
                Head to the API keys section and create a private key to
                authenticate your application.
            </li>
            <div className="bg-[#154163] border border-red-500 rounded-lg px-4">
                <h3 className="text-xl font-semibold mt-6 mb-4">
                    Important Note
                </h3>
                <p className="mb-4 text-red-500">
                    Please ensure that your private key is kept secure and not
                    exposed publicly. Leaking your private key can compromise
                    the security of your application.
                </p>
            </div>
        </div>
    );
};

export default page;
