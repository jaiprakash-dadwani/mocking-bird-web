export interface Condition {
    conditionName: string,
    conditionValue: string,
}

export interface Rule {
    ruleId?: string,
    sourceApplication: string,
    apiMethod: string,
    response: string,
    conditions: Condition[],
    ruleEnabled: boolean,
}
