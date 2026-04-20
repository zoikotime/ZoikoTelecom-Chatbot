import { useChat } from "../hooks/useChat";
import { MessageBubble } from "./MessageBubble";
import { WelcomeCard } from "./WelcomeCard";

export function MessageList() {
  const { messages, messagesRef } = useChat();

  return (
    <section
      ref={messagesRef}
      className="
        scrollbar-slim flex-1 overflow-y-auto
        px-2.5 py-3
        sm:px-4 sm:py-4
        md:px-5 md:py-5
        lg:px-6 lg:py-6
        xl:px-8
      "
    >
      <div className="mx-auto w-full max-w-3xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-6xl">
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