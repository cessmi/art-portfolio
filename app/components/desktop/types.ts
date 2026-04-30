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
  href?: string;
};

export type ShortcutDocument = {
  id: string;
  title: string;
  companionTitle?: string;
  companionText?: string;
  companionHref?: string;
  companionLabel?: string;
} & (
  | {
      kind: "text";
      content: string;
    }
  | {
      kind: "pdf";
      documentSrc: string;
    }
  | {
      kind: "image";
      imageSrc: string;
      imageAlt: string;
      imageDisplay?: "contain" | "scroll";
      imageWidth?: number;
      imageHeight?: number;
    }
  | {
      kind: "flipbook";
      documentSrc: string;
    }
  | {
      kind: "video";
      videoSrc: string;
      posterSrc?: string;
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
