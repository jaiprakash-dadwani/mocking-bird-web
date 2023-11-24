import {useEffect, useState} from "react";
import RuleRows, {RuleData} from "./RuleRows.tsx";
import RuleResponse from "./RuleResponse.tsx";
import {useAppDispatch} from "../app/hooks.ts";
import {setCurrentRuleData} from "../app/globalSlice.ts";

export default function AddRule() {
    const [ruleData, setRuleData] = useState<RuleData[]>([{}]);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setCurrentRuleData(ruleData));
    }, [ruleData, dispatch]);

    const handleChange = (key: string, value: string, index: number) => {
        if (ruleData.length > index) {
            // const data: RuleData[] = [];
            const newData = ruleData;
            if (key === 'condition') {
                newData[index] = {...newData[index], condition: value};
            } else if (key === 'method') {
                newData[index] = {...newData[index], method: value};
            } else if (key === 'value') {
                newData[index] = {...newData[index], value: value};
            }
            setRuleData(newData);
            dispatch(setCurrentRuleData(ruleData));
        }
    }

    const handleDelete = (index: number) => {
        const data: RuleData[] = [];
        const newData = data.concat([...ruleData]);
        newData.splice(index, 1);
        setRuleData(newData);
    }
    console.log(ruleData);
    return (
        <div className="flex flex-col bg-stone-100 text-stone-900 p-4">
            <div className="text-3xl mb-2" key="title">Add new rule</div>
            <div className="border-b-2 border-stone-900 w-full h-0.5 mb-4" key="divider"/>
            <>
                <p className="p-2 bg-stone-700 text-stone-100">Rule conditions (request)</p>
                <div className="grid grid-cols-6 space-x-6 m-2">
                    <div className="col-span-1 w-120" key="method-title">Method</div>
                    <div className="col-span-2" key="condition-title">Condition</div>
                    <div className="col-span-3" key="value-title">Match value</div>
                </div>
                <RuleRows rowsData={ruleData} handleChange={handleChange} handleDelete={handleDelete} />
                <button
                    className="flex m-auto mr-0"
                    onClick={() => {
                        const data: RuleData[] = [];
                        const newData = data.concat([...ruleData]);
                        newData.push({method: "AND"});
                        setRuleData(newData);
                    }}
                >
                    + Add Condition
                </button>
            </>
            <RuleResponse />
        </div>
    )
}
