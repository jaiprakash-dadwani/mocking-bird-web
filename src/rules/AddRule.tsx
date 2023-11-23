import {useEffect, useState} from "react";
import RuleRows, {RuleData} from "./RuleRows.tsx";
import RuleResponse from "./RuleResponse.tsx";

export default function AddRule() {
    const [ruleData, setRuleData] = useState<RuleData[]>([{}]);

    useEffect(() => {
        console.log(ruleData);
    }, [ruleData]);

    const handleChange = (key: string, value: string, index: number) => {
        if (ruleData.length > index) {
            const data: RuleData[] = [];
            const newData = data.concat([...ruleData]);
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            newData[index][key] = value;
            setRuleData(newData);
        }
    }

    const handleDelete = (index: number) => {
        const data: RuleData[] = [];
        const newData = data.concat([...ruleData]);
        newData.splice(index, 1);
        setRuleData(newData);
    }

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
