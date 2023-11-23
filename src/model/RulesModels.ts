export interface Condition {
    conditionName: string,
    conditionValue: string,
}

export interface Rule {
    ruleId?: string,
    sourceApplication: string,
    apiMethod: string,
    apiUrl: string,
    conditions: Condition[],
    enable: boolean,
}
