import { createContext, useContext, useEffect, useReducer, useRef } from "react";

import { starterSuggestions } from "../data/uiConfig";
import { sendChatMessage } from "../services/chatService";
import { createSessionId, timeStampLabel } from "../utils/chat";

const ChatContext = createContext(null);
const STORAGE_KEY = "zoiko-chat-session-id";

function getFixedSuggestions() {
  return starterSuggestions;
}

function getOrCreateSessionId() {
  if (typeof window === "undefined") {
    return createSessionId();
  }

  const existing = window.localStorage.getItem(STORAGE_KEY);
  if (existing) {
    return existing;
  }

  const sessionId = createSessionId();
  window.localStorage.setItem(STORAGE_KEY, sessionId);
  return sessionId;
}

function createWelcomeMessage() {
  return {
    id: `welcome-${Date.now()}`,
    type: "welcome",
    time: "Just now",
    suggestions: getFixedSuggestions(),
  };
}

const initialState = {
  input: "",
  typing: false,
  sessionId: getOrCreateSessionId(),
  messages: [createWelcomeMessage()],
};

function chatReducer(state, action) {
  switch (action.type) {
    case "SET_INPUT":
      return { ...state, input: action.payload };
    case "ADD_MESSAGE":
      return { ...state, messages: [...state.messages, action.payload] };
    case "SET_TYPING":
      return { ...state, typing: action.payload };
    case "RESET_CHAT": {
      const nextSessionId = getOrCreateSessionId();
      return {
        ...initialState,
        sessionId: nextSessionId,
        messages: [createWelcomeMessage()],
      };
    }
    default:
      return state;
  }
}

export function ChatProvider({ children }) {
  const [state, dispatch] = useReducer(chatReducer, initialState);
  const messagesRef = useRef(null);

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [state.messages, state.typing]);

  function setInput(value) {
    dispatch({ type: "SET_INPUT", payload: value });
  }

  async function sendMessage(overrideText) {
    const rawText = (overrideText || state.input).trim();
    if (!rawText || state.typing) {
      return;
    }

    dispatch({
      type: "ADD_MESSAGE",
      payload: {
        id: `${Date.now()}-user`,
        type: "message",
        sender: "user",
        text: rawText,
        time: timeStampLabel(),
      },
    });
    dispatch({ type: "SET_INPUT", payload: "" });
    dispatch({ type: "SET_TYPING", payload: true });

    try {
      const payload = await sendChatMessage(rawText, state.sessionId);
      await new Promise((resolve) => setTimeout(resolve, 450));

      dispatch({
        type: "ADD_MESSAGE",
        payload: {
          id: `${Date.now()}-bot`,
          type: "message",
          sender: "bot",
          text: payload.response,
          suggestions: payload.suggestions?.length ? payload.suggestions : getFixedSuggestions(),
          ctas: payload.ctas || [],
          time: timeStampLabel(),
        },
      });
    } catch (_error) {
      dispatch({
        type: "ADD_MESSAGE",
        payload: {
          id: `${Date.now()}-error`,
          type: "message",
          sender: "bot",
          text: "Something went wrong. Please try again or speak to an agent.",
          suggestions: ["Back to Main Menu", "Speak to an Agent"],
          ctas: [],
          time: timeStampLabel(),
        },
      });
    } finally {
      dispatch({ type: "SET_TYPING", payload: false });
    }
  }

  function clearChat() {
    if (typeof window !== "undefined") {
      const sessionId = createSessionId();
      window.localStorage.setItem(STORAGE_KEY, sessionId);
    }
    dispatch({ type: "RESET_CHAT" });
  }

  function handleInputKeyDown(event) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  }

  const value = {
    input: state.input,
    messages: state.messages,
    typing: state.typing,
    messagesRef,
    setInput,
    sendMessage,
    clearChat,
    handleInputKeyDown,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}

export function useChatContext() {
  const context = useContext(ChatContext);

  if (!context) {
    throw new Error("useChatContext must be used inside ChatProvider");
  }

  return context;
}
