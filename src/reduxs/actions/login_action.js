import { TEST1,TEST2 } from "../actions_type";
 const test1Action = value=>({type:TEST1,data:value});
 const test2Action = value=>({type:TEST2,data:value});
 export {test1Action,test2Action}