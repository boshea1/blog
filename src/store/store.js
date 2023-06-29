const { createStore, action } = require("easy-peasy");

const store = createStore({
    loggedIn: false,
    LogInOut: action((state, payload)=>{
        state.loggedIn =  !state.loggedIn
    })
})

export default store;