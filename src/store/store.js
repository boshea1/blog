const { createStore, action } = require("easy-peasy");

const store = createStore({
    loggedIn: false,
    LogInOut: action((state, payload)=>{
        state.loggedIn =  !state.loggedIn
    }),
    blogs: [],
    setBlogs: action((state, payload)=>{
        state.blogs = payload
    })
})


export default store;