export const StatusBar = () => (
  <div className="fixed bottom-0 left-0 right-0 bg-terminal-surface border-t border-border px-4 py-2 text-sm font-mono flex justify-between items-center z-50">
    <div className="flex gap-6">
      <span className="text-primary">NORMAL</span>
      <span className="text-muted-foreground">portfolio.py</span>
      <span className="text-muted-foreground">utf-8</span>
    </div>
    <div className="flex gap-6 text-muted-foreground">
      <span>Python</span>
      <span>Ln 1, Col 19</span>
    </div>
  </div>
);
