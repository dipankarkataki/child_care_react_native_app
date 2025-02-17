import Pusher from "pusher-js/react-native";
import TokenManager from "./src/api/TokenManager";
import UrlProvider from "./src/api/UrlProvider";


// Enable pusher logging - disable in production
Pusher.logToConsole = true;

// Initialize Pusher
const initializePusher = async () => {
    
    // Retrieve the token using TokenManager
    const token = await TokenManager.getToken();
  
    if (!token) {
      console.error('No access token found for Pusher authentication.');
      return null;
    }
  
    // Initialize Pusher with the retrieved token
    const pusher = new Pusher('efeacd9a0e2a14af0758', {
      cluster: 'us2',
      // authEndpoint: UrlProvider.local_url+'/broadcasting/auth',
      authEndpoint: UrlProvider.staging_url+'/broadcasting/auth', // Adjust as per your backend
      auth: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
      enabledTransports: ['ws', 'wss'], // Restrict to WebSockets
      forceTLS: true, // Ensure TLS is used
    });
  
    return pusher;
  };
  
export default initializePusher;