import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userSlice from "./userSlice";

const persistConfig = {
    key: 'root',
    storage
};

const rootReducer = combineReducers({
    user: userSlice
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware({
            serializableCheck: false
        })
});

export const persistor = persistStore(store);
export default store;