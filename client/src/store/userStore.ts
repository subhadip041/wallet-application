import { create } from 'zustand';
import axios from 'axios';

type User = {
  firstname: string;
  lastname: string;
  username: string;
  token: string;
};

type UserState = {
  user: User | null;
  firstname: string;
  lastname: string;
  username: string;
  password: string;
  loading: boolean;
  error: string | null;
  signin: (username: string, password: string) => Promise<void>;
  signup: (firstname: string, lastname: string, username: string, password: string) => Promise<void>;
  logout: () => void;
};

export const useUserStore = create<UserState>((set) => ({
  user: null,
  firstname: '',
  lastname: '',
  username: '',
  password: '',
  loading: false,
  error: null,

  signin: async (username, password) => {
    set({ loading: true, error: null });
    try {
      const res = await axios.post<{ token: string }>('http://localhost:3400/api/v1/user/signin', { "username":username, "password":password });
      const token = res.data.token;
      localStorage.setItem('auth_Token',token)
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      console.log(res.data)
      // const user: User = {
      //   firstname: '',
      //   lastname: '',
      //   username,
      //   token,
      // };

      // set({ user, loading: false });
    } catch (err: any) {
      set({ error: err.response?.data?.message || 'Signin failed', loading: false });
    }
  },

  signup: async (firstname, lastname, username, password) => {
    set({ loading: true, error: null });
    try {
      const res = await axios.post<{ token: string }>('/api/signup', {
        firstname,
        lastname,
        username,
        password,
      });

      const token = res.data.token;

      const user: User = {
        firstname,
        lastname,
        username,
        token,
      };

      set({ user, loading: false });
      localStorage.setItem('auth_token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } catch (err: any) {
      set({ error: err.response?.data?.message || 'Signup failed', loading: false });
    }
  },

  logout: () => {
    localStorage.removeItem('auth_token');
    delete axios.defaults.headers.common['Authorization'];
    set({ user: null });
  },
}));
