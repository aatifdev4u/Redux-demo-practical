const redux = require('redux')
const reduxLogger = require('redux-logger')
const combineReducers = redux.combineReducers
const createStore = redux.createStore
const applyMiddleware = redux.applyMiddleware
const logger = reduxLogger.createLogger()


// Actiontype constatnt
const BUY_CAKE = 'BUY_CAKE';
const BUY_ICECREAM = 'BUY_ICECREAM';

// action  creator
const buyCake = ()=>{
    return {
        type: BUY_CAKE,
        info: "First Redux action"
    }
}

const buyIcecream = ()=>{
    return {
        type: BUY_ICECREAM,
        info: "First Redux action"
    }
}

// Intial state of the application
// const intialState = {
//     numOfCakes: 10
// }

const intialCakeState = {
    numOfCakes: 10
}
const intialIcecreamState = {
    numOfIcecreams: 20
}

// reducer (prevState, action) => newstate
// const reducer = (state=intialState, action) => {
//     switch(action.type){
//         case BUY_CAKE: return {
//             numOfCakes: state.numOfCakes - 1
//         }
//         default: return state
//     }
// }

const cakeReducer = (state=intialCakeState, action) => {
    switch(action.type){
        case BUY_CAKE: return {
            numOfCakes: state.numOfCakes - 1
        }
        default: return state
    }
}

const iceCreamReducer = (state=intialIcecreamState, action) => {
    switch(action.type){
        case BUY_ICECREAM: return {
            numOfIcecreams: state.numOfIcecreams - 1
        }
        default: return state
    }
}

// Createstore
const rootReducer = combineReducers({
    cake: cakeReducer,
    icecream: iceCreamReducer
})

// const store = createStore(reducer)
const store = createStore(rootReducer, applyMiddleware(logger))
console.log('Intial State: ', store.getState())
const unsubscribe = store.subscribe(()=> console.log('Updated Store: ', store.getState()))
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyIcecream())
store.dispatch(buyIcecream())
store.dispatch(buyIcecream())
unsubscribe()