import { createStore } from "redux";
import {ChatReducer} from './ChatReducer';


const store = createStore(ChatReducer);

export default store;