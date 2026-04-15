import { ChatHeader } from "../../components/ChatHeader";
import { ChatInput } from "../../components/ChatInput";
import { MessageList } from "../../components/MessageList";
import { MobileQuickActions } from "../../components/MobileQuickActions";
import { Sidebar } from "../../components/Sidebar";
import { TypingIndicator } from "../../components/TypingIndicator";
import { WelcomeCard } from "../../components/WelcomeCard";
import { useChat } from "../../hooks/useChat";

export default function Home() {
  const { typing } = useChat();

  return (
    <div className="h-dvh min-h-0 w-full overflow-hidden bg-shell bg-dashboard font-body text-ink transition-colors duration-300">
      {/* Ambient blobs */}
      <div className="pointer-events-none fixed inset-0 opacity-80">
        <div className="absolute left-[4%] top-[8%] h-28 w-28 rounded-full bg-accent/20 blur-3xl sm:h-40 sm:w-40 lg:left-[8%] lg:top-[10%] lg:h-64 lg:w-64" />
        <div className="absolute bottom-[6%] right-[4%] h-32 w-32 rounded-full bg-warning/20 blur-3xl sm:h-44 sm:w-44 lg:bottom-[8%] lg:right-[10%] lg:h-72 lg:w-72" />
      </div>

      <div className="relative mx-auto flex h-dvh min-h-0 w-full max-w-[1800px] gap-0 p-0 sm:gap-2 sm:p-2 md:gap-3 md:p-3 xl:gap-4 xl:p-4 2xl:px-6">
        {/* Sidebar — xl+ only */}
        <Sidebar />

        {/* Main chat panel */}
        <main className="relative flex h-full min-w-0 flex-1 flex-col overflow-hidden rounded-none border-0 border-border bg-panel/88 shadow-panel backdrop-blur-xl sm:rounded-[16px] sm:border md:rounded-[20px] lg:rounded-[26px] 2xl:rounded-4xl">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-24" />
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
