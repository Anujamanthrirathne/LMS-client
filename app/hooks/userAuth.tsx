import { useSelector } from "react-redux";

// Define the state type for the Redux store
interface RootState {
  auth: {
    user: any; // Ideally, replace 'any' with a specific type (e.g., 'User')
  };
}

// Custom hook renamed to follow React conventions
export default function useUserAuth() {
  const { user } = useSelector((state: RootState) => state.auth);

  return !!user; // Returns true if the user exists, false otherwise
}
