import icon from "../src/assets/mocking-bird.jpg";
import {useNavigate} from "react-router-dom";

export default function Header() {
    const navigate = useNavigate();
    return (
        <button className="bg-stone-700 text-gray-50 px-4 py-2 text-3xl flex flex-row items-center rounded-none w-full"
            role="presentation"
            onClick={() => navigate('/')}
        >
            <img className="w-6 h-6 mr-4" src={icon} alt=""/>
            <span>Mocking Bird</span>
        </button>
    )
}
