import { useEffect, useState } from "react";
import { TerminalSection } from "@/components/TerminalSection";
import { StatusBar } from "@/components/StatusBar";
import { VimCommandIndicator } from "@/components/VimCommandIndicator";
import { VimHelpDialog } from "@/components/VimHelpDialog";
import { useVimKeybindings } from "@/hooks/useVimKeybindings";
import { useActiveSection } from "@/hooks/useActiveSection";
import { Card } from "@/components/ui/card";

const Index = () => {
  const [typedText, setTypedText] = useState("");
  const fullText = "Welcome to my portfolio";

  // Updated line numbers — hero starts at line 1, everything else moved up
  const sections = [
    { line: 1, element: "#hero" },
    { line: 5, element: "#about" },
    { line: 19, element: "#projects" },
    { line: 34, element: "#skills" },
    { line: 49, element: "#contact" },
  ];

  const { commandBuffer, showCommand } = useVimKeybindings({ sections, scrollSpeed: 80 });
  const activeSection = useActiveSection(["hero", "about", "projects", "skills", "contact"]);

  useEffect(() => {
    if (typedText.length < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText(fullText.slice(0, typedText.length + 1));
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [typedText]);

  const projects = [
    { name: "Kanooni Sathi", description: "A RAG system for Nepal’s legal information", tech: ["Python", "Flutter"] },
    { name: "Cure Health", description: "Medical booking app", tech: ["Flutter", "Django"] },
  ];

  const skills = [
    { category: "Languages", items: ["Python", "C", "PHP", "Java"] },
    { category: "Domain", items: ["Backend Development", "Fullstack Applications", "AI & Machine learning"] },
    { category: "Tools", items: ["Docker", "Git", "FastAPI", "Laravel", "Filament", "Redis", "Django"] },
    { category: "Misc", items: ["Nix", "Linux-CLI", "Figma"] },
  ];

  return (
    <div className="min-h-screen bg-background pb-16">
      <VimCommandIndicator command={commandBuffer} show={showCommand} />
      <VimHelpDialog />
      <div className="border-b border-border bg-card sticky top-0 z-40">
        <div className="flex items-center gap-2 px-4 py-2">
          <div className="flex items-center gap-2 bg-terminal-surface px-4 py-1.5 rounded-t border-t-2 border-primary">
            <span className="text-primary text-xs">●</span>
            <span className="text-sm">portfolio.py</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Hero Section – now starts at line 1 */}
        <div id="hero" className="mb-16 scroll-mt-4">
          <div className="flex gap-4 mb-8">
            <div className={`line-number text-right w-12 pt-1 transition-all duration-300 ${activeSection === "hero" ? "text-primary font-bold scale-110" : "text-muted-foreground"}`}>
              {activeSection === "hero" && <span className="mr-1 text-terminal-cyan">→</span>}1
            </div>
            <div className="flex-1 pl-6">
              <h1 className="text-5xl font-bold mb-4">
                <span className="text-terminal-yellow">"NAME"</span>
                <span className="text-foreground">:</span>{" "}
                <span className="text-primary">"Pratham Khanal"</span>
                {/* <span className="text-foreground">,</span> */}
                <span className="animate-blink text-foreground">|</span>
              </h1>
            </div>
          </div>
          <div className="flex gap-4 mb-4">
            <div className={`line-number text-right w-12 pt-1 transition-all duration-300 ${activeSection === "hero" ? "text-primary font-bold" : "text-muted-foreground"}`}>2</div>
            <div className="flex-1 pl-6">
              <h2 className="text-xl text-secondary mb-2">
                <span className="text-terminal-yellow">"ROLE"</span>
                <span className="text-foreground">:</span>{" "}
                <span className="text-primary">"CS Grad"</span>
                {/* <span className="text-foreground">,</span> */}
              </h2>
            </div>
          </div>
          <div className="flex gap-4 mb-4">
            <div className={`line-number text-right w-12 pt-1 transition-all duration-300 ${activeSection === "hero" ? "text-primary font-bold" : "text-muted-foreground"}`}>3</div>
            <div className="flex-1 pl-6">
              <p className="text-muted-foreground">
                <span className="text-terminal-yellow">"FFS"</span>
                <span className="text-foreground">:</span>{" "}
                <span className="text-primary">"I build tools and projects that solve practical problems"</span>
              </p>
            </div>
          </div>
          <div className="flex gap-4 mb-8">
            <div className={`line-number text-right w-12 pt-1 transition-all duration-300 ${activeSection === "hero" ? "text-primary font-bold" : "text-muted-foreground"}`}>4</div>
            <div className="flex-1"><div className="text-sm text-muted-foreground">{""}</div></div>
          </div>
        </div>

        {/* About – line 9 */}
        <div id="about" className="scroll-mt-4">
          <TerminalSection lineNumber={5} title="About" isActive={activeSection === "about"}>
            <p className="text-foreground leading-relaxed mb-4"><span className="text-terminal-cyan">def</span> <span className="text-terminal-yellow">get_about_me</span>():</p>
            <p className="text-muted-foreground leading-relaxed pl-4 mb-4">
              <span className="text-terminal-cyan">return</span> <span className="text-primary">"""</span>
              <span className="block pl-4">people summarize stuff, write something that inspires them, or something that says they are open to possibilities</span>
              <span className="text-primary">"""</span>
            </p>
          </TerminalSection>
        </div>

        {/* Projects – line 19 */}
        <div id="projects" className="scroll-mt-4">
          <TerminalSection lineNumber={19} title="Projects" isActive={activeSection === "projects"}>
            <p className="text-foreground mb-4"><span className="text-terminal-blue">projects</span> <span className="text-foreground">=</span> [</p>
            <div className="space-y-4 pl-4">
              {projects.map((project, index) => (
                <Card key={index} className="p-6 bg-card border-border hover:border-primary transition-colors">
                  <div className="flex flex-col">
                    <div className="flex items-start gap-2 mb-3"><span className="text-foreground">{"{"}</span></div>
                    <div className="pl-4 space-y-2">
                      <h3 className="text-xl font-bold mb-2"><span className="text-terminal-yellow">"name"</span>:<span className="text-primary">"{project.name}"</span>,</h3>
                      <p className="text-muted-foreground mb-3"><span className="text-terminal-yellow">"description"</span>:<span className="text-primary">"{project.description}"</span>,</p>
                      <div className="flex flex-wrap gap-2 items-center">
                        <span className="text-terminal-yellow">"tech"</span>: [
                        {project.tech.map((tech, i) => (
                          <span key={i}>
                            <span className="text-xs px-3 py-1  text-terminal-cyan">"{tech}"</span>
                            {i < project.tech.length - 1 && <span>,</span>}
                          </span>
                        ))}
                        ]
                      </div>
                    </div>
                    <div className="flex items-start gap-2 mt-3"><span className="text-foreground">{"}"},</span></div>
                  </div>
                </Card>
              ))}
            </div>
            <p className="text-foreground mt-4">]</p>
          </TerminalSection>
        </div>

        {/* Skills – line 34 */}
        <div id="skills" className="scroll-mt-4">
          <TerminalSection lineNumber={34} title="Skills" isActive={activeSection === "skills"}>
            <p className="text-foreground mb-4"><span className="text-terminal-blue">skills</span> = {"{"}</p>
            <div className="grid md:grid-cols-2 gap-6 pl-4">
              {skills.map((g, i) => (
                <div key={i} className="space-y-2">
                  <h3 className="text-lg font-bold"><span className="text-terminal-yellow">"{g.category}"</span>: [</h3>
                  <div className="flex flex-wrap gap-2 pl-4">
                    {g.items.map((s, j) => (
                      <span key={j}>
                        <span className="px-3 py-1  text-foreground  text-primary ">"{s}"</span>
                        {j < g.items.length - 1 && <span>,</span>}
                      </span>
                    ))}
                  </div>
                  <span>]{i < skills.length - 1 ? "," : ""}</span>
                </div>
              ))}
            </div>
            <p className="text-foreground mt-4">{"}"}</p>
          </TerminalSection>
        </div>

        {/* Contact – line 49 */}
        <div id="contact" className="scroll-mt-4">
          <TerminalSection lineNumber={49} title="Contact" isActive={activeSection === "contact"}>
            <p className="text-foreground mb-4"><span className="text-terminal-blue">contact</span> = {"{"}</p>
            <div className="space-y-3 pl-4">
              <p><span className="text-terminal-yellow">"email"</span>: <span className="text-primary">"prathamkhanal962@gmail.com"</span>,</p>
              <p><span className="text-terminal-yellow">"github"</span>: <span className="text-primary">"github.com/prathamkhanal17"</span>,</p>
              <p><span className="text-terminal-yellow">"linkedin"</span>: <span className="text-primary">"linkedin.com/in/prathamkhanal"</span></p>
            </div>
            <p className="text-foreground mt-4">{"}"}</p>
          </TerminalSection>
        </div>

        {/* Footer */}
        <div className="flex gap-4 mt-16 pt-8 border-t border-border">
          <div className="line-number text-right w-12 pt-1 text-muted-foreground">59</div>
          <div className="flex-1">
            <p className="text-sm text-muted-foreground">
              <span className="text-terminal-cyan">if</span> <span className="text-terminal-blue">__name__</span> == <span className="text-primary">"__main__"</span>:
            </p>
            <p className="text-sm text-muted-foreground pl-4 mt-1"><span className="text-terminal-yellow">main</span>()</p>
          </div>
        </div>
      </div>
      <StatusBar />
    </div>
  );
};

export default Index;
