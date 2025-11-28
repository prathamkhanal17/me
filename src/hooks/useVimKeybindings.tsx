import { useEffect, useState, useCallback } from "react";

interface VimKeybindingsConfig {
  sections?: { line: number; element: string }[];
  scrollSpeed?: number;
}

export const useVimKeybindings = ({ sections = [], scrollSpeed = 50 }: VimKeybindingsConfig = {}) => {
  const [lastKey, setLastKey] = useState<string>("");
  const [commandBuffer, setCommandBuffer] = useState<string>("");
  const [showCommand, setShowCommand] = useState(false);

  const smoothScroll = useCallback((targetY: number) => {
    window.scrollTo({
      top: targetY,
      behavior: "smooth",
    });
  }, []);

  const scrollBy = useCallback((amount: number) => {
    const currentY = window.scrollY;
    smoothScroll(currentY + amount);
  }, [smoothScroll]);

  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      // Ignore if typing in an input/textarea
      if (
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      const key = event.key;
      setLastKey(key);

      // Handle number inputs for section jumping
      if (/^[0-9]$/.test(key)) {
        setCommandBuffer((prev) => prev + key);
        setShowCommand(true);
        setTimeout(() => setShowCommand(false), 2000);
        return;
      }

      // Handle section jumping with numbers
      if (commandBuffer && /^[0-9]+$/.test(commandBuffer)) {
        const sectionNumber = parseInt(commandBuffer);
        const section = sections.find((s) => s.line === sectionNumber);
        
        if (section) {
          const element = document.querySelector(section.element);
          if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }
        setCommandBuffer("");
        setShowCommand(false);
        return;
      }

      switch (key) {
        case "j":
          event.preventDefault();
          scrollBy(scrollSpeed);
          setCommandBuffer("");
          break;
        case "k":
          event.preventDefault();
          scrollBy(-scrollSpeed);
          setCommandBuffer("");
          break;
        case "g":
          if (lastKey === "g") {
            event.preventDefault();
            smoothScroll(0);
            setLastKey("");
            setCommandBuffer("");
          }
          break;
        case "G":
          event.preventDefault();
          smoothScroll(document.documentElement.scrollHeight);
          setCommandBuffer("");
          break;
        case "d":
          if (event.ctrlKey) {
            event.preventDefault();
            scrollBy(window.innerHeight / 2);
          }
          setCommandBuffer("");
          break;
        case "u":
          if (event.ctrlKey) {
            event.preventDefault();
            scrollBy(-window.innerHeight / 2);
          }
          setCommandBuffer("");
          break;
        case "Escape":
          setCommandBuffer("");
          setShowCommand(false);
          setLastKey("");
          break;
        default:
          if (key !== "g") {
            setLastKey("");
          }
      }

      // Clear lastKey after a short delay
      setTimeout(() => setLastKey(""), 500);
    },
    [lastKey, commandBuffer, scrollBy, smoothScroll, scrollSpeed, sections]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [handleKeyPress]);

  return { commandBuffer, showCommand };
};
