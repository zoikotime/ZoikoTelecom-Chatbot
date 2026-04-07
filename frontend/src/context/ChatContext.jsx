import { createContext, useContext, useEffect, useReducer, useRef } from "react";

import { starterSuggestions } from "../data/uiConfig";
import { sendChatMessage } from "../services/chatService";
import { timeStampLabel } from "../utils/chat";

const ChatContext = createContext(null);

const suggestionInputMap = {
  "\u{1F50D} Exploring plans": "Exploring plans",
  "\u{1F4F1} Bringing your own phone": "Bring your own phone",
  "\u{1F504} Switching from another carrier": "Switch carriers",
  "\u{2753} Something else": "Something else",
};

function getFixedSuggestions() {
  return starterSuggestions;
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
  messages: [createWelcomeMessage()],
};

function chatReducer(state, action) {
  switch (action.type) {
    case "SET_INPUT":
      return {
        ...state,
        input: action.payload,
      };

    case "ADD_MESSAGE":
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };

    case "SET_TYPING":
      return {
        ...state,
        typing: action.payload,
      };

    case "RESET_CHAT":
      return {
        ...initialState,
        messages: [createWelcomeMessage()],
      };

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
    const text = (suggestionInputMap[rawText] || rawText).trim();

    if (!text || state.typing) {
      return;
    }

    // Frontend flow:
    // 1. Add the user bubble locally.
    // 2. Call the backend chat API.
    // 3. Add the bot reply from the API response.
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
      const payload = await sendChatMessage(text);
      await new Promise((resolve) => setTimeout(resolve, 700));

      dispatch({
        type: "ADD_MESSAGE",
        payload: {
          id: `${Date.now()}-bot`,
          type: "message",
          sender: "bot",
          text: payload.response,
          suggestions: payload.suggestions?.length
            ? payload.suggestions
            : getFixedSuggestions(),
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
          text:
            "I couldn't reach the GoLite server right now. Please make sure the Express backend is running on the configured API URL.",
          suggestions: getFixedSuggestions(),
          time: timeStampLabel(),
        },
      });
    } finally {
      dispatch({ type: "SET_TYPING", payload: false });
    }
  }

  function clearChat() {
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
