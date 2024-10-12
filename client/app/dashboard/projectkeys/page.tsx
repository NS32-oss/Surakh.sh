import ButtonWithHandler from "../components/ButtonWithHandler";

export default function Page() {
    return (
        <div className="">
            <div className="font-mono p-4 md:p-8">
                <p className="text-sm md:text-base">
                    As an owner of the project, you can view and manage API keys
                    in this project
                </p>
                <p className="text-sm md:text-base mt-2">
                    Do not share your API keys with others, or expose it in the
                    browser or other client
                </p>
            </div>
            <div className="p-4 md:p-8 text-center">
                <div className="">
                    <ButtonWithHandler />
                </div>
            </div>
        </div>
    );
}
