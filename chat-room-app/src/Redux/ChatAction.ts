export const UpdateMembers = (data : any) => {
    return {
        type: "UPDATE_MEMBERS",
        payload: data
    }
}

export const UpdateMessages = (data : any) => {
    return {
        type: "UPDATE_MESSAGES",
        payload: data
    }
}

export const ResetData = () => {
    return {
        type: "RESET_DATA"
    }
}