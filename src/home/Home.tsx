import {useEffect, useState} from "react";
import Header from "../Header.tsx";
import {useNavigate} from "react-router-dom";
import Dropdown from "../components/Dropdown.tsx";
import {fetchApplicationSource, selectAppSource, selectEndpoint, setSelectedEndPoint} from "../app/globalSlice.ts";
import {useAppDispatch, useAppSelector} from "../app/hooks.ts";

function Home() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const selectedEndPoint = useAppSelector(selectEndpoint);
    const [endpoint, setEndpoint] = useState(selectedEndPoint);
    const [error, setError] = useState(false);
    const options = useAppSelector(selectAppSource);
    const dropDownOptions: Record<string, string>[] = options.map((op) => {return {key: op, name: op}});

    useEffect(() => {
        console.log('came inside');
        dispatch(fetchApplicationSource());
    }, [dispatch]);

    const onClick = () => {
        setError(!endpoint);
        if (endpoint) {
            dispatch(setSelectedEndPoint(endpoint));
            navigate(`console`)
        }
    }

    const getBody = () => (
        <div className="m-6 h-96 flex flex-row">
            <div className="p-6 bg-stone-100 mr-6 flex flex-col">
                <div className="text-2xl">Start here and select the service to start mocking the APIs</div>
                <Dropdown
                    name="method"
                    handleChange={(e) => {
                        setError(!e);
                        setEndpoint(e);
                    }}
                    placeholder="Please select the service"
                    options={dropDownOptions}
                    defaultValue={selectedEndPoint}
                    data-testid="method"
                    classname="py-2"
                />
                <button
                    type="button"
                    className="text-xl bg-stone-700 text-stone-100 mt-6 w-auto"
                    onClick={onClick}
                >
                    Get Started
                </button>
                {error && <p className="text-red-600"> Please select endpoint first</p>}
            </div>
            <div className="text-stone-700 font-medium text-5xl max-w-xl flex items-center p-2">
                <p>Welcome to the fastest way of mocking your apis for independent and quick development</p>
            </div>
        </div>
    )

    return (
        <div className="flex flex-col items-center w-full h-full">
            <Header />
            {getBody()}
        </div>
    )
}

export default Home;
