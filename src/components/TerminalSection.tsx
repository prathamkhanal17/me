import { ReactNode } from "react";

interface TerminalSectionProps {
  lineNumber: number;
  title: string;
  children: ReactNode;
  isActive?: boolean;
}

export const TerminalSection = ({ lineNumber, title, children, isActive = false }: TerminalSectionProps) => {
  return (
    <section className="mb-12 animate-fadeIn">
      <div className="flex gap-4">
        <div className={`line-number text-right w-12 pt-1 transition-all duration-300 ${
          isActive 
            ? "text-primary font-bold scale-110" 
            : "text-muted-foreground"
        }`}>
          {isActive && <span className="mr-1 text-terminal-cyan">→</span>}
          {lineNumber}
        </div>
        <div className="flex-1">
          <h2 className={`text-2xl font-bold mb-6 transition-colors duration-300 ${
            isActive ? "text-primary" : "text-secondary"
          }`}>
            <span className="text-muted-foreground"># </span>
            {title}
          </h2>
          <div className={`pl-6 border-l-2 transition-colors duration-300 ${
            isActive ? "border-primary" : "border-terminal-surface"
          }`}>
            {children}
          </div>
        </div>
      </div>
    </section>
  );
};
