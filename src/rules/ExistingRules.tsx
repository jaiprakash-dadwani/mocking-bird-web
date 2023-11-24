import {useAppDispatch, useAppSelector} from "../app/hooks.ts";
import {fetchRulesBySource, patchRule, selectEndpoint, selectRulesList} from "../app/globalSlice.ts";
import {Rule} from "../model/RulesModels.ts";
import editIcon from '../assets/edit.svg';
import tickIcon from '../assets/check.svg';
import toggleOn from '../assets/toggle_on.svg';
import toggleOff from '../assets/toggle_off.svg';

import {useEffect, useState} from "react";

function ExistingRule({data, index}: {data: Rule, index: number}) {
    const [isEdit, setEdit] = useState(false);
    const [textValue, setTextValue] = useState('');
    const dispatch = useAppDispatch();

    const handleClick = () => {
        if (isEdit) dispatch(patchRule({...data, response: textValue || data.response}))
        setEdit(!isEdit)
    }

    const handleEnable = () => {
        dispatch(patchRule({...data, ruleEnabled: !data.ruleEnabled}))
    }

    return (
        <div className={`grid ${isEdit ? "grid-cols-11" : "grid-cols-8"} space-x-6 m-2`}>
            <div className="col-span-1" key="ruleId-title">{index+1}</div>
            <div className="col-span-1" key="ruleId-title">{data.apiMethod}</div>
            <div className="col-span-2" key="contition-title">{data.conditions[0]?.conditionValue}</div>
            <div className="col-span-3" key="req-title">{data.response}</div>
            {isEdit && <input type="text" defaultValue={data.response} className="col-span-3" onChange={(e) => setTextValue(e.target.value)}></input>}
            <div className="col-span-1 flex flex-row" key="conflict-title">
                <button className="bg-white w-28" onClick={handleClick}><img src={isEdit ? tickIcon : editIcon} alt="edit"/></button>
                <button className="bg-white w-36" onClick={handleEnable}><img src={data.ruleEnabled ? toggleOn : toggleOff} alt="enable"/></button>
            </div>
        </div>
    )
}

export default function ExistingRules() {
    const rulesList = useAppSelector(selectRulesList);
    const dispatch = useAppDispatch();
    const source = useAppSelector(selectEndpoint) || '';

    useEffect(() => {
        dispatch(fetchRulesBySource(source));
    }, [dispatch, source]);

    return (
        <div>
            <div className="mr-6"></div>
            <div className="text-stone-900 text-3xl mb-4">Your rules</div>

            {rulesList
                ? (
                    <div className="flex flex-col">
                        <div className="border-b-2 border-stone-900 w-full h-0.5 mb-4" key="divider"/>
                        {rulesList.map((data, index) => <ExistingRule data={data} index={index}/>)}
                    </div>
                )
                : (
                    <div className="">No rules yet</div>
                )}
        </div>
    )
}
