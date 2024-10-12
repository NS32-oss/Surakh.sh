import React from "react";
import FlickeringGrid from "./ui/flickering-grid";

const GradientFlicker = () => {
    return (
        <div
            style={{
                position: "relative",
                width: "100%",
                height: "300px" /* Adjust height as needed */,
            }}
        >
            {/* FlickeringGrid with lowest z-index */}
            <FlickeringGrid
                className="z-0 absolute size-full"
                color="#6B7280"
                maxOpacity={0.5}
                flickerChance={0.1}
                squareSize={4}
                gridGap={6}
            />

            {/* Gradient div above FlickeringGrid */}
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    background:
                        "linear-gradient(to bottom, rgba(107,114,128,0.5), transparent)",
                    zIndex: 1, // Ensure gradient is above FlickeringGrid
                }}
            ></div>

            {/* Main content with highest z-index */}
            <div style={{ position: "relative", zIndex: 2 }}>
                {/* Your main content goes here */}
            </div>
        </div>
    );
};

export default GradientFlicker;
