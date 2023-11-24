import {Rule} from "./model/RulesModels.ts";
import {History} from "./model/ConsoleModels.ts";

export let STORED_RULES: Rule[] = [{
    ruleId: 'randomId1',
    sourceApplication: "gpl-bff",
    apiMethod: "GET",
    conditions: [{
        conditionName: "PATH_STARTS_WITH",
        conditionValue: "/balance"
    }, {
        conditionName: "BODY_MATCHES",
        conditionValue: "{'id': 123456}"
    }],
    response: '{}',
    ruleEnabled: true,
},
    {
        ruleId: 'randomId3',
        sourceApplication: "gpl-bff",
        apiMethod: "PATCH",
        conditions: [{
            conditionName: "BODY_MATCHES",
            conditionValue: "{'id': 123456}"
        }],
        response: '{}',
        ruleEnabled: true,
    }]

export function getRuleList() {
    console.log(STORED_RULES);
    return STORED_RULES
}

export function patchNewRule(rule: Rule) {
    if (rule.ruleId) {
        const index = STORED_RULES.findIndex((oldRule) => oldRule.ruleId === rule.ruleId);
        STORED_RULES = STORED_RULES.splice(index, 1);
        STORED_RULES.push(rule)
    } else {
        rule.ruleId = `randomId${(Math.random() * 100)}`
        STORED_RULES.push(rule);
    }
}

export function getHistory(): History[] {
    return [{
        id: 'string1',
        matchingRules: 'randomId1',
        responseRuleId: 1,
        request: "{application-type: 'application/json'}",
        response: "{success: true, data: {text: 'Awesome demo'}}",
        sourceApplication: 'gpl-bff',
    },{
            id: 'string2',
            matchingRules: '',
            responseRuleId: 2,
            request: "{}",
            response: "{success: true, data: {balance: 'Not enough to show'}}",
            sourceApplication: 'gpl-bff',
        }]
}
