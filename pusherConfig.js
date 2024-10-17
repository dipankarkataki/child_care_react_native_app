import Pusher from "pusher-js/react-native";
import TokenManager from "./src/api/TokenManager";


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
    const pusher = new Pusher('e380d37c497e588d96e1', {
      cluster: 'us2',
      authEndpoint: 'http://192.168.31.99/api/broadcasting/auth', // Adjust as per your backend
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