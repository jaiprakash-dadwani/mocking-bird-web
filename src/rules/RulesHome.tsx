import Header from "../Header.tsx";
import AddRule from "./AddRule.tsx";
import ExistingRules from "./ExistingRules.tsx";
import {useLocation} from "react-router-dom";

export default function RulesHome() {
    const location = useLocation();
    console.log(location.state);
    return (
        <>
            <Header />
            <div className="flex flex-col w-full m-4 space-y-4">
                <ExistingRules />
                <AddRule />
            </div>
        </>
    )
}
