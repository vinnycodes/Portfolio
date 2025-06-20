// Type definitions for the workspace system

export type AppKey =
  | 'focusflow'
  | 'notion'
  | 'figma'
  | 'word'
  | 'vscode'
  | 'steadytune'
  | 'profile'
  | 'moreapps';

export type IconShape = 'rounded-lg' | 'rounded-full';

export interface Workspace {
  id: number;
  name: string;
  workspace: string;
  active: boolean;
}

export interface AppData {
  name: string;
  icon: string;
  workspaces: Workspace[];
}

export interface AppIconConfig {
  key: AppKey;
  bgColor: string;
  borderColor: string;
  iconSrc: ImageMetadata | HTMLImageElement;
  alt: string;
  shape?: IconShape;
}

export interface AppIconProps {
  appKey: AppKey;
  selectedApp: AppKey;
  onSelect: (appKey: AppKey) => void;
  bgColor: string;
  iconSrc: ImageMetadata | HTMLImageElement;
  alt?: string;
  borderColor: string;
  shape?: IconShape;
}
