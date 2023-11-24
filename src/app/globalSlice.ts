import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import type { AppState } from './store';
import {get, patch} from "../api/api.ts";
import {ENDPOINTS} from "../constants.ts";
import {Rule} from "../model/RulesModels.ts";
import {History} from "../model/ConsoleModels.ts";
import {RuleData} from "../rules/RuleRows.tsx";
import {getHistory, getRuleList, patchNewRule} from "../MockData.ts";

export interface GlobalState {
    isLoading: boolean;
    appSource: string[],
    endPoint: string | undefined,
    rulesList: Rule[],
    currentRule: Partial<Rule>,
    history: History[],
    currentRuleData: Partial<RuleData>[],
}

const initialState: GlobalState = {
    isLoading: false,
    appSource: ["gpl-bff", "lending-adaptor", "gpl-payment-adaptor"],
    endPoint: undefined,
    rulesList: [],
    currentRule: {},
    history: getHistory(),
    currentRuleData: [],
};

export const globalSlice = createSlice({
    name: 'global',
    initialState,
    reducers: {
        setIsLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        setAppSource: (state, action: PayloadAction<string[]>) => {
            state.appSource = action.payload;
        },
        setRulesList: (state, action: PayloadAction<Rule[]>) => {
            state.rulesList = action.payload;
        },
        setCurrentRule: (state, action: PayloadAction<Partial<Rule>>) => {
            state.currentRule = {...state.currentRule, ...action.payload};
        },
        setCurrentRuleData: (state, action: PayloadAction<Partial<RuleData>[]>) => {
            state.currentRuleData = {...state.currentRuleData, ...action.payload};
        },
        setHistory: (state, action: PayloadAction<History[]>) => {
            state.history = action.payload;
        },
        setSelectedEndPoint: (state, action: PayloadAction<string>) => {
            state.endPoint = action.payload;
        },
    },
});

export const {
    setIsLoading, setAppSource, setSelectedEndPoint,
    setRulesList, setCurrentRule, setHistory,
    setCurrentRuleData
} = globalSlice.actions;

export const selectIsLoading = (state: AppState) => state.global.isLoading;
export const selectAppSource = (state: AppState) => state.global.appSource;
export const selectEndpoint = (state: AppState) => state.global.endPoint;
export const selectRulesList = (state: AppState) => state.global.rulesList;
export const selectCurrentRule = (state: AppState) => state.global.currentRule;
export const selectHistory = (state: AppState) => state.global.history;
export const selectRulesData = (state: AppState) => state.global.currentRuleData;

export const fetchApplicationSource = createAsyncThunk(
    'applicationSourceList',
    async (_, { dispatch }) => {
        dispatch(setIsLoading(true));
        try {
            const data = await get<string[]>(ENDPOINTS.SOURCE_LIST);
            dispatch(setAppSource(data));
        } catch (err) {
            console.log('api error', err);
        } finally {
            dispatch(setIsLoading(false));
        }
    }
);

export const fetchRulesBySource = createAsyncThunk(
    'rulesList',
    async (source: string, { dispatch }) => {
        dispatch(setIsLoading(true));
        try {
            const data = await get<Rule[]>(`${ENDPOINTS.RULES_LIST}?sourceApplication=${source}`);
            dispatch(setRulesList(data));
        } catch (err) {
            console.log('api error', err);
        } finally {
            dispatch(setIsLoading(false));
        }
    }
);

export const patchRule = createAsyncThunk(
    'addRule',
    async (rule: Rule, { dispatch }) => {
        dispatch(setIsLoading(true));
        try {
            await patch<string[]>(ENDPOINTS.RULES_LIST, {
                data: {rule},
            });
            patchNewRule(rule);
            dispatch(setRulesList(getRuleList()));
        } catch (err) {
            console.log('api error', err);
        } finally {
            dispatch(setIsLoading(false));
        }
    }
);


export const fetchHistoryForSource = createAsyncThunk(
    'history',
    async (source: string, { dispatch }) => {
        dispatch(setIsLoading(true));
        try {
            const data = await get<History[]>(`${ENDPOINTS.HISTORY}?source_application=${source}`);
            dispatch(setHistory(data));
        } catch (err) {
            console.log('api error', err);
        } finally {
            dispatch(setIsLoading(false));
        }
    }
);

export default globalSlice.reducer;
