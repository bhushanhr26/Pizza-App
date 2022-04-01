import {changeTheNumber,sortData} from './up';
import { combineReducers } from 'redux';
 
const rootReducer = combineReducers({
    changeTheNumber:changeTheNumber,
    sortData:sortData
})
export default rootReducer;