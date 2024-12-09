import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthRoutes from "./AuthRoutes/AuthRoutes";
import PublicRoutes from "./PublicRoutes/PublicRoutes";
import { useSelector } from "react-redux";
import { StatusBar } from "react-native";

const Routes = () => {

    const userAuthToken = useSelector((state) => state.userAuth);
    console.log('User Auth Token from Routes.js --->', userAuthToken);

    return (
        <NavigationContainer>
            <StatusBar backgroundColor="#2CABE2" barStyle="default" />
            {!!userAuthToken ? <AuthRoutes /> : <PublicRoutes />}
        </NavigationContainer>

    )

};
export default Routes;