import { DEMO1,DEMO2 } from "../actions_type";

export const demo1Action = value=>({type:DEMO1,data:value});
export const demo2Action = value=>({type:DEMO2,data:value});