import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ChatMessage {
    id: string; 
    message: string;
}

interface InitialState {
    isAdminSettingsOpen: boolean;
    message: string;
    userChat: ChatMessage[];
}

const initialState: InitialState = {
    isAdminSettingsOpen: false,
    message: "",
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
        setUserChat: (state, action: PayloadAction<ChatMessage[]>) => {
            state.userChat = action.payload;
        }
    }
});

export const { onOpenAdminSettings, createMessage, setUserChat } = chatSlice.actions;

export default chatSlice.reducer;