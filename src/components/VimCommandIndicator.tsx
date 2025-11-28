interface VimCommandIndicatorProps {
  command: string;
  show: boolean;
}

export const VimCommandIndicator = ({ command, show }: VimCommandIndicatorProps) => {
  if (!show && !command) return null;

  return (
    <div className="fixed top-4 right-4 z-50 bg-terminal-surface border border-primary px-4 py-2 rounded shadow-lg animate-fadeIn">
      <div className="flex items-center gap-2">
        <span className="text-terminal-yellow font-bold">:</span>
        <span className="text-foreground font-mono">{command}</span>
        <span className="animate-blink text-primary">▊</span>
      </div>
    </div>
  );
};
