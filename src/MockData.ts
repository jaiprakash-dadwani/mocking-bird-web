import {Rule} from "./model/RulesModels.ts";
import {History} from "./model/ConsoleModels.ts";

export let STORED_RULES: Rule[] = [{
    ruleId: 'randomId1',
    sourceApplication: "gpl-bff",
    apiMethod: "GET",
    apiUrl: "/balance",
    conditions: [{
        conditionName: "PATH_STARTS_WITH",
        conditionValue: "/balance"
    }, {
        conditionName: "BODY_MATCHES",
        conditionValue: "{'id': 123456}"
    }],
    enable: true,
},
    {
        ruleId: 'randomId3',
        sourceApplication: "gpl-bff",
        apiMethod: "PATCH",
        apiUrl: "/order",
        conditions: [{
            conditionName: "BODY_MATCHES",
            conditionValue: "{'id': 123456}"
        }],
        enable: true,
    }]

export function getRuleList() {
    return STORED_RULES
}

export function patchRule(rule: Rule) {
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
        conflictingRuleIs: ['randomId1', 'randomId3'],
        ResponseRuleId: 'randomId1',
        request: "{application-type: 'application/json'}",
        response: "{success: true, data: {text: 'Awesome demo'}}",
        sourceApplication: 'gpl-bff',
    },{
            id: 'string2',
            conflictingRuleIs: [],
            ResponseRuleId: 'randomId3',
            request: "{}",
            response: "{success: true, data: {balance: 'Not enough to show'}}",
            sourceApplication: 'gpl-bff',
        }]
}
