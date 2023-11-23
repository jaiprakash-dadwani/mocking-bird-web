import Header from "../Header.tsx";
import {Navigate} from "react-router-dom";
// import RulesSwitch from "./RulesSwitch.tsx";
import History from "./History.tsx";
import EditMocks from "./EditMocks.tsx";
import {useAppSelector} from "../app/hooks.ts";
import {selectEndpoint} from "../app/globalSlice.ts";

function ConsoleHome() {
    const endPoint = useAppSelector(selectEndpoint);
    if (!endPoint) return <Navigate to='/' />

    const getBody = () => (
        <div className="m-4 flex flex-col space-y-4">
            <div className="flex flex-row w-full">
                <div className="flex flex-row space-x-4 items-center">
                    <div className="flex flex-row px-4 items-center space-x-4 bg-stone-100">
                        <span>Selected Service:</span>
                        <span className="text-2xl font-medium">{endPoint}</span>
                    </div>
                    {/*<RulesSwitch />*/}
                    <EditMocks />
                </div>
            </div>
            <div className="border-b-2 border-stone-900 w-full h-0.5" key="divider"/>
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
