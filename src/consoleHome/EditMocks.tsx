import {useNavigate} from "react-router-dom";

export default function EditMocks() {
    const navigate = useNavigate();
    const onClick = () => {
        navigate('/console/edit')
    }
    return (
        <button
            className="mt-4"
            onClick={onClick}
        >
            Add / Edit Mocking Rules
        </button>
    )
}
