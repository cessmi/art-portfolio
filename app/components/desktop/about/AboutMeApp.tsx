import DesktopWindow from "../DesktopWindow";
import { aboutWindowDefinitions } from "../data";
import type {
  DesktopWindowDefinition,
  DesktopWindowUiState,
  Position,
} from "../types";
import AboutDoingWindow from "./AboutDoingWindow";
import AboutLikesWindow from "./AboutLikesWindow";
import AboutMainWindow from "./AboutMainWindow";
import AboutPhotoWindow from "./AboutPhotoWindow";

type AboutMeAppProps = {
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

function contentForWindow(id: string) {
  switch (id) {
    case "about-main":
      return <AboutMainWindow />;
    case "about-photo":
      return <AboutPhotoWindow />;
    case "about-doing":
      return <AboutDoingWindow />;
    case "about-likes":
      return <AboutLikesWindow />;
    default:
      return null;
  }
}

function styleForWindow(
  windowDef: DesktopWindowDefinition,
  position: Position,
  isMaximized: boolean,
) {
  if (isMaximized) {
    return {
      left: "4%",
      top: "6%",
      width: "92%",
      height: "70%",
    };
  }

  return {
    left: `${position.x}%`,
    top: `${position.y}%`,
    width: `${windowDef.size.width}%`,
    height: `${windowDef.size.height}%`,
  };
}

export default function AboutMeApp({
  positions,
  order,
  windowStates,
  draggingWindowId,
  onWindowDragStart,
  onWindowFocus,
  onWindowClose,
  onWindowMinimize,
  onWindowMaximize,
}: AboutMeAppProps) {
  const visibleWindows = aboutWindowDefinitions.filter((windowDef) => {
    const state = windowStates[windowDef.id];
    return state?.isOpen && !state.isMinimized;
  });

  if (visibleWindows.length === 0) {
    return null;
  }

  return (
    <>
      {visibleWindows.map((windowDef) => {
        const position = positions[windowDef.id];
        const state = windowStates[windowDef.id];

        return (
          <DesktopWindow
            key={windowDef.id}
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
            style={styleForWindow(windowDef, position, state.isMaximized)}
          >
            {contentForWindow(windowDef.id)}
          </DesktopWindow>
        );
      })}
    </>
  );
}
