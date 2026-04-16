export type ShortcutKind = "folder" | "file" | "trash";

export type Position = {
  x: number;
  y: number;
};

export type DesktopShortcut = {
  id: string;
  label: string;
  kind: ShortcutKind;
  position: Position;
};

export type ShortcutWindowItem = {
  id: string;
  label: string;
  kind: ShortcutKind;
  documentId?: string;
};

export type ShortcutDocument = {
  id: string;
  title: string;
} & (
  | {
      kind: "text";
      content: string;
    }
  | {
      kind: "pdf";
      documentSrc: string;
    }
);

export type DockItem = {
  id: string;
  label: string;
  src: string;
};

export type DesktopWindowTheme = "blue" | "paper";

export type DesktopWindowDefinition = {
  id: string;
  title: string;
  position: Position;
  size: {
    width: number;
    height: number;
  };
  theme: DesktopWindowTheme;
  animationDelayMs?: number;
};

export type DesktopWindowUiState = {
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
};
