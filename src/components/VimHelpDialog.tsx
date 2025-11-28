import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";

export const VimHelpDialog = () => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <Card className="fixed bottom-20 right-4 z-50 bg-card border-primary p-4 max-w-sm animate-fadeIn">
      <div className="space-y-2">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-bold text-primary">Vim Keybindings Active</h3>
          <button
            onClick={() => setShow(false)}
            className="text-muted-foreground hover:text-foreground text-xs"
          >
            ✕
          </button>
        </div>
        <div className="text-xs space-y-1 text-muted-foreground font-mono">
          <div className="flex justify-between">
            <span className="text-terminal-cyan">j / k</span>
            <span>scroll down / up</span>
          </div>
          <div className="flex justify-between">
            <span className="text-terminal-cyan">gg / G</span>
            <span>top / bottom</span>
          </div>
          <div className="flex justify-between">
            <span className="text-terminal-cyan">Ctrl+d / Ctrl+u</span>
            <span>half page</span>
          </div>
          <div className="flex justify-between">
            <span className="text-terminal-cyan">[number]</span>
            <span>jump to section</span>
          </div>
        </div>
      </div>
    </Card>
  );
};
