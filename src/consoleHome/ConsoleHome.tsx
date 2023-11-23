import Header from "../Header.tsx";
import {Navigate} from "react-router-dom";
import RulesSwitch from "./RulesSwitch.tsx";
import History from "./History.tsx";
import EditMocks from "./EditMocks.tsx";
import {useAppSelector} from "../app/hooks.ts";
import {selectEndpoint} from "../app/globalSlice.ts";

function ConsoleHome() {
    const endPoint = useAppSelector(selectEndpoint);
    if (!endPoint) return <Navigate to='/' />

    const getBody = () => (
        <div className="m-4 flex flex-row space-x-4">
            <div className="flex flex-col w-full">
                <div className="text-stone-900 text-3xl mb-4">Your mock details</div>
                <div className="flex flex-row px-4 items-center space-x-4 bg-stone-100">
                    <span>Selected Service</span>
                    <span className="text-3xl font-medium">{endPoint}</span>
                </div>
                <RulesSwitch />
                <EditMocks />
            </div>
            <History />
        </div>
    )

    return (
        <div className="w-full">
            <Header />
            {getBody()}
        </div>
    )
}

export default ConsoleHome;
