import DesktopWindow from "../DesktopWindow";
import { linksWindowDefinitions } from "../data";
import type { DesktopWindowUiState, Position } from "../types";
import LinksContent from "./LinksContent";

type LinksAppProps = {
  positions: Record<string, Position>;
  order: string[];
  windowStates: Record<string, DesktopWindowUiState>;
  draggingWindowId: string | null;
  onWindowDragStart: (
    id: string,
    event: React.PointerEvent<HTMLDivElement>,
  ) => void;
  onWindowFocus: (id: string) => void;
  onWindowClose: (id: string) => void;
  onWindowMinimize: (id: string) => void;
  onWindowMaximize: (id: string) => void;
};

function zIndexFor(order: string[], id: string) {
  const index = order.indexOf(id);
  return 40 + (index === -1 ? 0 : index);
}

export default function LinksApp({
  positions,
  order,
  windowStates,
  draggingWindowId,
  onWindowDragStart,
  onWindowFocus,
  onWindowClose,
  onWindowMinimize,
  onWindowMaximize,
}: LinksAppProps) {
  const windowDef = linksWindowDefinitions[0];
  const position = positions[windowDef.id];
  const state = windowStates[windowDef.id];

  if (!state.isOpen || state.isMinimized) {
    return null;
  }

  return (
    <DesktopWindow
      title={windowDef.title}
      theme={windowDef.theme}
      zIndex={zIndexFor(order, windowDef.id)}
      isDragging={draggingWindowId === windowDef.id}
      isMaximized={state.isMaximized}
      animationDelayMs={windowDef.animationDelayMs}
      onTitlePointerDown={(event) => onWindowDragStart(windowDef.id, event)}
      onFocus={() => onWindowFocus(windowDef.id)}
      onClose={() => onWindowClose(windowDef.id)}
      onMinimize={() => onWindowMinimize(windowDef.id)}
      onMaximize={() => onWindowMaximize(windowDef.id)}
      style={
        state.isMaximized
          ? {
              left: "4%",
              top: "6%",
              width: "92%",
              height: "72%",
            }
          : {
              left: `${position.x}%`,
              top: `${position.y}%`,
              width: `${windowDef.size.width}%`,
              height: `${windowDef.size.height}%`,
            }
      }
    >
      <LinksContent />
    </DesktopWindow>
  );
}
