import {useAppDispatch, useAppSelector} from "../app/hooks.ts";
import {fetchHistoryForSource, selectEndpoint, selectHistory} from "../app/globalSlice.ts";
import {History} from "../model/ConsoleModels.ts";
import {useEffect} from "react";
import {Navigate} from "react-router-dom";

export function HistoryRow({data}: {data: History}) {
    return (
        <div className="grid grid-cols-9 space-x-6 m-2">
            <div className="col-span-1" key="ruleId-title">{data.responseRuleId}</div>
            <div className="col-span-3" key="req-title">{data.request}</div>
            <div className="col-span-3" key="res-title">{data.response}</div>
            <div className="col-span-2" key="conflict-title">{data.matchingRules}</div>
        </div>
    )
}

export default function HistoryList() {
    const history = useAppSelector(selectHistory);
    const historyPresent = history.length > 0;
    const dispatch = useAppDispatch();
    const source = useAppSelector(selectEndpoint);

    useEffect(() => {
        if (source) dispatch(fetchHistoryForSource(source));
    }, [source, dispatch]);

    if (!source) return <Navigate to='/' replace />

    return (
        <div className="flex flex-col w-full h-full">
            <div className="text-stone-900 text-3xl mb-4">Your mock request history</div>
            {!historyPresent ? (
                <div className="flex flex-grow">Nothing here yet. Try to hit the mock api</div>
                )
                : (
                    <div className="flex flex-col">
                        <div className="grid grid-cols-9 space-x-6 m-2">
                            <div className="col-span-1 text-sm font-semibold" key="delay-title">Rule Id</div>
                            <div className="col-span-3 text-sm font-semibold" key="status-title">Request</div>
                            <div className="col-span-3 text-sm font-semibold" key="status-title">Response</div>
                            <div className="col-span-2 text-sm font-semibold" key="status-title">Matching rules</div>
                        </div>
                        <div className="border-b-2 border-stone-900 w-full h-0.5 mb-4" key="divider"/>
                        {history.map((data) => <HistoryRow data={data} />)}
                    </div>
                )}
        </div>
    )
}
