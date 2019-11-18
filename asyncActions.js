const redux = require('redux')
const createStore = redux.createStore
const applyMiddleware = redux.applyMiddleware
const axios = require('axios')
const thunkMiddleware = require('redux-thunk').default


const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST';
const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';

// actions creator
const fetchUsersRequest = ()=>{
    return {
        type: FETCH_USERS_REQUEST
    }
}

const fetchUsersSuccess = (users)=>{
    console.log(users);
    return {
        type: FETCH_USERS_SUCCESS,
        payload: users
    }
}

const fetchUsersFailure = (error)=>{
    return {
        type: FETCH_USERS_FAILURE,
        payload: error
    }
}

const fetchUsers = ()=>{
    return (dispatch)=>{
        dispatch(fetchUsersRequest())
        // make a API call to get data
        axios.get('https://jsonplaceholder.typicode.com/users')
        .then(response => {
            // response.data return the data
            // console.log(response.data);
            const users = response.data.map(user => user.id);
            console.log(users);
            dispatch(fetchUsersSuccess(users))
        })
        .catch(error => {
            // error.message is the error description
            dispatch(fetchUsersFailure(error.message))

        })

    }
}

// Intial State of the application
const intialState = {
    loading: false,
    users: [],
    error: ''
}

// Reducer (state, action) => newState
const reducer = (state=intialState, action) => {
    switch(action.type){
        case FETCH_USERS_REQUEST:
            return{
                loading: true
            }
        case FETCH_USERS_SUCCESS:
            return{
                loading:false,
                users: action.payload,
                error: ''
            }
        case FETCH_USERS_FAILURE:
            return{
                loading:false,
                users: [],
                error: action.payload
            }
    }
}

const store = createStore(reducer, applyMiddleware(thunkMiddleware));
store.subscribe(()=> console.log(store.getState()))
store.dispatch(fetchUsers())
