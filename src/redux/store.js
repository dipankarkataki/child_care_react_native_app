import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER, FLUSH } from "redux-persist";
import rootReducer from "./rootReducer";
import AsyncStorage from "@react-native-async-storage/async-storage";

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    // if you want to persist this part of the state
    // whitelist: ['reducer key'],
    // if you do not want to persist this part of the state
    // blacklist: ['reducer key']
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(store);

export default store;