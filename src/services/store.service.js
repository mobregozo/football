export const stateManager  = {
    state : { 
        filter: {
            type: null,
            value: null
        }
    },    
    setFilter (key, newValue) {
        this.state[key] = newValue;
    },
    clearFilter (){
        this.state.filter = {
            type: null,
            value: null
        }
    }
}