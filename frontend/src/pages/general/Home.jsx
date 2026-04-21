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
      {/* Ambient blobs */}
      <div className="pointer-events-none fixed inset-0 opacity-60">
        <div className="absolute left-[4%] top-[8%] h-32 w-32 rounded-full bg-accent/15 blur-3xl lg:h-56 lg:w-56" />
        <div className="absolute bottom-[6%] right-[4%] h-36 w-36 rounded-full bg-warning/15 blur-3xl lg:h-64 lg:w-64" />
      </div>

      <div className="relative mx-auto flex h-dvh min-h-0 w-full max-w-450 gap-0 p-0 sm:gap-2 sm:p-2 md:gap-3 md:p-3 xl:gap-4 xl:p-4 2xl:px-6">
        {/* Sidebar — xl+ only */}
        <Sidebar />

        {/* Main chat panel */}
        <main className="relative flex h-full min-w-0 flex-1 flex-col overflow-hidden rounded-none border-0 border-border bg-panel/88 shadow-panel backdrop-blur-xl sm:rounded-2xl sm:border md:rounded-[22px] lg:rounded-[28px]">
          <ChatHeader />
          <MobileQuickActions />
          <MessageList />
          {typing && <TypingIndicator />}
          <ChatInput />
        </main>
      </div>
    </div>
  );
}