import { createStore } from 'vuex'

export default createStore({
    state: {
        user: '',
        isLoading: false,
        isAuth: false,
        token: '',
        isConnected: true,
        authMethod: 'signup',
    },
    mutations: {
        initStore(state) {
            if (localStorage.getItem('user') && localStorage.getItem('token')) {
                state.isAuth = true;
                state.authMethod = 'profile';
                state.user = localStorage.getItem('user');
                state.token = localStorage.getItem('token');
            } else {
                state.user = '';
                state.token = '';
                state.isAuth = false;
                state.authMethod = 'signup';
            }
        },
        setUser(state, user) {
            state.user = user;
        },
        setIsLoading(state, status) {
            state.isLoading = status;
        },
        setIsConnected(state, status) {
            state.isConnected = status;
        },
        setAuthMethod(state, status) {
            state.authMethod = status;
        },
        setToken(state, token) {
            state.token = token;
        },
        removeToken(state) {
            state.token = '';
        },
        removeUser(state) {
            state.user = '';
        },
    },
    actions: {},
    modules: {}
})