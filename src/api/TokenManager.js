import AsyncStorage from "@react-native-async-storage/async-storage";

const TOKEN_KEY = 'AccessToken';
const UserId = 'UserId';
const CustomerProfileIdAuthorizeNet = 'CustomerProfileId'

let cachedToken = null;
let cachedUserId = null;
let cachedCustomerProfileIdAuthorizeNet = null;

const TokenManager = {
    /**
     * Retrieves the token.
     * First checks the in-memory cache; if not found, retrieves from AsyncStorage.
     * @returns {Promise<string|null>} The token or null if not found.
     */
    getToken: async () => {
        if (cachedToken) {
            return cachedToken;
        }
        try {
            const token = await AsyncStorage.getItem(TOKEN_KEY);
            cachedToken = token;
            return token;
        } catch (error) {
            console.error('Error retrieving token from AsyncStorage:', error);
            return null;
        }
    },

    /**
     * Sets the token in both in-memory cache and AsyncStorage.
     * @param {string} token - The token to set.
     * @returns {Promise<void>}
     */
    setToken: async (token) => {
        try {
            cachedToken = token;
            await AsyncStorage.setItem(TOKEN_KEY, token);
        } catch (error) {
            console.error('Error setting token in AsyncStorage:', error);
        }
    },

    /**
     * Removes the token from both in-memory cache and AsyncStorage.
     * @returns {Promise<void>}
     */
    removeToken: async () => {
        try {
            cachedToken = null;
            await AsyncStorage.removeItem(TOKEN_KEY);
        } catch (error) {
            console.error('Error removing token from AsyncStorage:', error);
        }
    },

    getUserId: async () => {
        if (cachedUserId) {
            return cachedUserId;
        }
        try {
            const userId = await AsyncStorage.getItem(UserId);
            cachedUserId = userId;
            return userId;
        } catch (error) {
            console.error('Error retrieving token from AsyncStorage:', error);
            return null;
        }
    },

    /**
     * Sets the userId in both in-memory cache and AsyncStorage.
     * @param {string} userId - The userId to set.
     * @returns {Promise<void>}
     */
    setUserId: async (userId) => {
        try {
            cachedUserId = userId;
            await AsyncStorage.setItem(UserId, userId);
        } catch (error) {
            console.error('Error setting token in AsyncStorage:', error);
        }
    },

    /**
     * Removes the token from both in-memory cache and AsyncStorage.
     * @returns {Promise<void>}
     */
    removeUserId: async () => {
        try {
            cachedUserId = null;
            await AsyncStorage.removeItem(UserId);
        } catch (error) {
            console.error('Error removing token from AsyncStorage:', error);
        }
    },





    getCustomerProfileId: async () => {
        if (cachedCustomerProfileIdAuthorizeNet) {
            return cachedCustomerProfileIdAuthorizeNet;
        }
        try {
            const profileId = await AsyncStorage.getItem(CustomerProfileIdAuthorizeNet);
            cachedCustomerProfileIdAuthorizeNet = profileId;
            return profileId;
        } catch (error) {
            console.error('Error retrieving token from AsyncStorage:', error);
            return null;
        }
    },

    /**
     * Sets the userId in both in-memory cache and AsyncStorage.
     * @param {string} userId - The userId to set.
     * @returns {Promise<void>}
     */
    setCustomerProfileId: async (profileId) => {
        try {
            cachedCustomerProfileIdAuthorizeNet = profileId;
            await AsyncStorage.setItem(CustomerProfileIdAuthorizeNet, profileId);
        } catch (error) {
            console.error('Error setting token in AsyncStorage:', error);
        }
    },

    /**
     * Removes the token from both in-memory cache and AsyncStorage.
     * @returns {Promise<void>}
     */
    removeCustomerProfileId: async () => {
        try {
            cachedCustomerProfileIdAuthorizeNet = null;
            await AsyncStorage.removeItem(CustomerProfileIdAuthorizeNet);
        } catch (error) {
            console.error('Error removing token from AsyncStorage:', error);
        }
    }
};

export default TokenManager;