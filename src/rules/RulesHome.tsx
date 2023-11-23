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
            <div className="flex flex-row w-full space-x-4 m-4">
                <ExistingRules />
                <AddRule />
            </div>
        </>
    )
}
