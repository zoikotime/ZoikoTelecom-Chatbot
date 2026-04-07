import { ChatHeader } from "../../components/ChatHeader";
import { ChatInput } from "../../components/ChatInput";
import { MessageList } from "../../components/MessageList";
import { MobileQuickActions } from "../../components/MobileQuickActions";
import { Sidebar } from "../../components/Sidebar";
import { TypingIndicator } from "../../components/TypingIndicator";
import { useChat } from "../../hooks/useChat";

export default function Home() {
  const { typing } = useChat();

  return (
    <div className="h-dvh min-h-0 w-full overflow-hidden bg-shell bg-dashboard font-body text-ink transition-colors duration-300">
      <div className="pointer-events-none fixed inset-0 opacity-80">
        <div className="absolute left-[4%] top-[8%] h-40 w-40 rounded-full bg-accent/20 blur-3xl sm:h-52 sm:w-52 lg:left-[8%] lg:top-[10%] lg:h-64 lg:w-64" />
        <div className="absolute bottom-[6%] right-[4%] h-44 w-44 rounded-full bg-warning/20 blur-3xl sm:h-60 sm:w-60 lg:bottom-[8%] lg:right-[10%] lg:h-72 lg:w-72" />
      </div>

      <div className="relative mx-auto flex h-dvh min-h-0 w-full max-w-[1800px] gap-2 p-2 sm:gap-3 sm:p-3 md:gap-4 md:p-4 2xl:px-6">
        <Sidebar />

        <main className="relative flex h-full min-w-0 flex-1 flex-col overflow-hidden rounded-[20px] border border-border bg-panel/88 shadow-panel backdrop-blur-xl sm:rounded-[24px] lg:rounded-[28px] 2xl:rounded-4xl">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-44 " />
          <ChatHeader />
          <MobileQuickActions />
          <MessageList />
          {typing ? <TypingIndicator /> : null}
          <ChatInput />
        </main>
      </div>
    </div>
  );
}
