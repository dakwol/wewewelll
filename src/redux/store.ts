import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'; // Middleware для асинхронных действий
import rootReducer from './reducers'; // Ваш корневой reducer

const middleware = [thunk]; // Может содержать и другие middleware

const store = createStore(
    rootReducer,
    applyMiddleware(...middleware)
);

export default store;
