export interface User {
  _id: string;
  email: string;
  username: string;
  profilePic: string;
}

export interface AuthContextType {
  loading: boolean;
  user: User | null;
  storeToken: (token: string) => void;
  authenticateUser: () => void;
  logout: () => void;
}
