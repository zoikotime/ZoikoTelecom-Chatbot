import { useChat } from "../hooks/useChat";
import { MessageBubble } from "./MessageBubble";
import { WelcomeCard } from "./WelcomeCard";

export function MessageList() {
  const { messages, messagesRef } = useChat();

  return (
    <section
      ref={messagesRef}
      className="scrollbar-slim flex-1 overflow-y-auto px-3 py-4 sm:px-4 sm:py-5 lg:px-6 xl:px-7"
    >
      <div className="mx-auto w-full max-w-6xl 2xl:max-w-[1320px]">
        {messages.map((message) =>
          message.type === "welcome" ? (
            <WelcomeCard key={message.id} time={message.time} />
          ) : (
            <MessageBubble key={message.id} message={message} />
          )
        )}
      </div>
    </section>
  );
}
