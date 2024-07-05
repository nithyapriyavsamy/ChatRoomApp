import _ from 'lodash';

const initialState: any = {
    members: [],
    messages:[],
  }

  export const ChatReducer : any = (state:any = initialState, action : any)=>{
    switch(action.type){
        case 'UPDATE_MEMBERS':
            return{
                ...state,
                members:action.payload
            }
        case 'UPDATE_MESSAGES':
            let msgs: any = state.messages
            msgs.push(action.payload);
            let uniqueMessages: any = _.uniqBy(msgs, "id") 
            return{
                ...state,
                messages: uniqueMessages
            }
        case 'RESET_DATA':
            return{
                ...state,
                messages: [],
                members:[]
            }
        default:
            return state; 
    }
  }