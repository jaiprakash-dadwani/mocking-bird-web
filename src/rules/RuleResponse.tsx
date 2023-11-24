import {useState} from "react";
import {useAppDispatch, useAppSelector} from "../app/hooks.ts";
import {patchRule, selectEndpoint, selectRulesData} from "../app/globalSlice.ts";
import {Condition, Rule} from "../model/RulesModels.ts";

interface RuleResponseData {
    delay: string,
    httpCode: string,
    headers: string,
    responseBody: string,
}

export default function RuleResponse() {
    const [responseData, setResponseData] = useState({
        delay: "0", httpCode: "200", headers: "{'Content-Type': 'application/json'}", responseBody: "{'status': 'success'}"
    });
    const rulesData = useAppSelector(selectRulesData);
    const source = useAppSelector(selectEndpoint);
    const dispatch = useAppDispatch();

        const handleChange = (key: string, value: string) => {
            const newData: RuleResponseData = {
                delay: responseData.delay,
                httpCode: responseData.httpCode,
                headers: responseData.headers,
                responseBody: responseData.responseBody,
            }
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            newData[key] = value;
            console.log(newData);
            setResponseData(newData)
        }

        const handleSave = () => {
            const newConditions: Condition[] = [];
            console.log("rulesData---", rulesData);
            if (!rulesData) return;

            Object.values(rulesData).forEach((data) => {
                if (data.condition && data.value) {
                    newConditions.push({
                        conditionName: data.condition,
                        conditionValue: data.value
                    });
                }
            })

            const newRule: Rule = {
                sourceApplication: source || '',
                apiMethod: rulesData[0]?.method || "GET",
                conditions: newConditions,
                ruleEnabled: true,
                response: responseData.responseBody
            }
            dispatch(patchRule(newRule));
        }

        return (
        <div className="pt-10">
            <p className="p-2 bg-stone-700 text-stone-100">Changes to (response)</p>
            <div className="grid grid-cols-6 space-x-6 m-2">
                <div className="col-span-3 text-sm" key="delay-title">Delay</div>
                <div className="col-span-3 text-sm" key="status-title">HTTP status code</div>
            </div>
            <div className="grid grid-cols-6 space-x-6 m-2">
                <input
                    type="number"
                    onChange={(val) => handleChange('delay', val.target.value)}
                    className="col-span-3 px-2"
                    placeholder="2"
                    defaultValue={responseData.delay}
                />
                <input
                    type="string"
                    onChange={(val) => handleChange('httpCode', val.target.value)}
                    className="col-span-3 px-2"
                    placeholder="200"
                    defaultValue={responseData.httpCode}
                />
            </div>
            <div className="grid grid-cols-6 space-x-6 m-2 mt-8">
                <div className="col-span-3 text-sm" key="delay-title">Request Header</div>
                <div className="col-span-3 text-sm" key="status-title">Response Body</div>
            </div>
            <div className="grid grid-cols-6 space-x-6 m-2">
                <textarea
                    onChange={(val) => handleChange('headers', val.target.value)}
                    className="col-span-3 px-2 h-20"
                    placeholder=""
                    defaultValue={responseData.headers}
                />
                <textarea
                    onChange={(val) => handleChange('body', val.target.value)}
                    className="col-span-3 px-2"
                    placeholder=""
                    defaultValue={responseData.responseBody}
                />
            </div>
            <div className="w-full flex pt-10 justify-center items-center">
                <button
                    className=""
                    onClick={handleSave}
                >
                    Save Rule
                </button>
            </div>
        </div>
    )
}
