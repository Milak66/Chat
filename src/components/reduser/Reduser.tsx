import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ChatMessage {
    message: string;
}

interface InitialState {
    isAdminSettingsOpen: boolean;
    message: string;
    tryGetMessage: boolean;
    userChat: ChatMessage[];
}

const initialState: InitialState = {
    isAdminSettingsOpen: false,
    message: "",
    tryGetMessage: true,
    userChat: []
};

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        onOpenAdminSettings: (state, action: PayloadAction<boolean>) => {
            state.isAdminSettingsOpen = action.payload;
        },
        createMessage: (state, action: PayloadAction<string>) => {
            state.message = action.payload;
        },
        onTryGetMessages: (state, action: PayloadAction<boolean>) => {
            state.tryGetMessage = action.payload;
        },
        setUserChat: (state, action: PayloadAction<ChatMessage[]>) => {
            state.userChat = action.payload;
        }
    }
});

export const { 
    onOpenAdminSettings, 
    createMessage, 
    onTryGetMessages,
    setUserChat 
} = chatSlice.actions;

export default chatSlice.reducer;