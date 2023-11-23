import {useState} from "react";
import tickIcon from "../assets/check.svg";
import unTickIcon from "../assets/cancel.svg";

export default function RulesSwitch() {
    const [enabled, setEnabled] = useState(false);
    const text = enabled ? 'Rules Enabled' : 'Rules Disabled, Click to enable';
    const icon = enabled ? tickIcon : unTickIcon;

    const onClick = () => {
        setEnabled(!enabled);
    }

    return (
        <button
            className="mt-4 flex flex-row justify-center"
            onClick={onClick}
        >
            <img className="mr-2" src={icon} alt="rules"></img>
            {text}
        </button>
    );
}
