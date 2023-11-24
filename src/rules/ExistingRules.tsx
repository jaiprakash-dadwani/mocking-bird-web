import {useAppDispatch, useAppSelector} from "../app/hooks.ts";
import {fetchRulesBySource, selectEndpoint, selectRulesList} from "../app/globalSlice.ts";
import {Rule} from "../model/RulesModels.ts";
import editIcon from '../assets/edit.svg';
import {useEffect} from "react";

function ExistingRule({data, index}: {data: Rule, index: number}) {
    return (
        <div className="grid grid-cols-9 space-x-6 m-2">
            <div className="col-span-1" key="ruleId-title">{index+1}</div>
            <div className="col-span-1" key="ruleId-title">{data.apiMethod}</div>
            <div className="col-span-1" key="req-title">{data.response}</div>
            <div className="col-span-3" key="res-title"></div>
            <div className="col-span-2 flex flex-row" key="conflict-title">
                <button className="bg-white w-8"><img src={editIcon} alt="edit"/></button>
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
