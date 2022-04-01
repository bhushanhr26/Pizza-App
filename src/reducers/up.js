
const initial = 0;
const initial1 = 'data'
export const changeTheNumber = (state =initial,action)=>{
    switch(action.type){
        case 'increment': return state + 1;
        case 'decrement': return state - 1;
        default: return state
    }

}

export const sortData = (state = initial1,action)=>{
    switch(action.type){
        case 'rating':
            return initial1.sort((a, b) => (state.rating > state.rating ? -1 : 1));
        case 'price': return initial1.sort((a, b) => (state.price > state.price ? -1 : 1));
       default : return initial1   
    }
}
