import type { AppKey, AppData, AppIconConfig } from '../types/workspace';

// Import icon assets
import codeIcon from '../assets/workspaceIcons/code-icon.png';

// App icon configurations - All using images now
export const appIconConfigs: AppIconConfig[] = [
  {
    key: 'focusflow',
    bgColor: 'bg-gradient-to-br from-red-400 to-pink-500',
    borderColor: 'border-red-300',
    iconSrc: codeIcon,
    alt: 'Focus Flow',
  },
  {
    key: 'notion',
    bgColor: 'bg-white',
    borderColor: 'border-blue-400',
    iconSrc: codeIcon,
    alt: 'Notion',
  },
  {
    key: 'figma',
    bgColor: 'bg-black',
    borderColor: 'border-purple-400',
    iconSrc: codeIcon,
    alt: 'Figma',
  },
  {
    key: 'word',
    bgColor: 'bg-blue-600',
    borderColor: 'border-blue-300',
    iconSrc: codeIcon,
    alt: 'Microsoft Word',
  },
  {
    key: 'vscode',
    bgColor: 'bg-white',
    borderColor: 'border-green-400',
    iconSrc: codeIcon,
    alt: 'VS Code',
  },
  {
    key: 'steadytune',
    bgColor: 'bg-black',
    borderColor: 'border-yellow-400',
    iconSrc: codeIcon,
    alt: 'SteadyTune',
  },
  {
    key: 'profile',
    bgColor: 'bg-orange-400',
    borderColor: 'border-orange-300',
    iconSrc: codeIcon,
    alt: 'Profile',
    shape: 'rounded-full',
  },
  {
    key: 'moreapps',
    bgColor: 'bg-red-500',
    borderColor: 'border-red-300',
    iconSrc: codeIcon,
    alt: 'More Apps',
  },
];

// App data with workspaces
export const appData: Record<AppKey, AppData> = {
  focusflow: {
    name: 'FOCUS FLOW',
    icon: '⬨',
    workspaces: [
      {
        id: 1,
        name: 'Deep Work Sessions',
        workspace: 'Productivity',
        active: true,
      },
      { id: 2, name: 'Study Timer', workspace: 'Learning', active: false },
      { id: 3, name: 'Meeting Blocks', workspace: 'Work', active: false },
      { id: 4, name: 'Creative Time', workspace: 'Personal', active: false },
    ],
  },
  notion: {
    name: 'NOTION',
    icon: '📝',
    workspaces: [
      {
        id: 1,
        name: 'DotOS Notes',
        workspace: "Vinny's Workspace",
        active: true,
      },
      {
        id: 2,
        name: '1-on-1 Meeting Notes',
        workspace: "Vinny's Workspace",
        active: false,
      },
      {
        id: 3,
        name: 'Project Timeline',
        workspace: "Vinny's Workspace",
        active: false,
      },
      { id: 4, name: 'Task Manager', workspace: "Vinny's", active: false },
    ],
  },
  figma: {
    name: 'FIGMA',
    icon: '🎨',
    workspaces: [
      {
        id: 1,
        name: 'UI Design System',
        workspace: 'Design Team',
        active: true,
      },
      {
        id: 2,
        name: 'Portfolio Mockups',
        workspace: 'Personal',
        active: false,
      },
      { id: 3, name: 'Client Projects', workspace: 'Agency', active: false },
    ],
  },
  word: {
    name: 'MICROSOFT WORD',
    icon: '📄',
    workspaces: [
      { id: 1, name: 'Resume Draft', workspace: 'Personal', active: true },
      { id: 2, name: 'Meeting Notes', workspace: 'Work', active: false },
      { id: 3, name: 'Blog Posts', workspace: 'Writing', active: false },
    ],
  },
  vscode: {
    name: 'VS CODE',
    icon: '💻',
    workspaces: [
      { id: 1, name: 'Portfolio Website', workspace: 'Personal', active: true },
      {
        id: 2,
        name: 'React Projects',
        workspace: 'Development',
        active: false,
      },
      { id: 3, name: 'API Services', workspace: 'Backend', active: false },
    ],
  },
  steadytune: {
    name: 'STEADYTUNE',
    icon: '🎵',
    workspaces: [
      { id: 1, name: 'Chill Vibes Playlist', workspace: 'Music', active: true },
      { id: 2, name: 'Focus Beats', workspace: 'Productivity', active: false },
      { id: 3, name: 'Workout Mix', workspace: 'Fitness', active: false },
    ],
  },
  profile: {
    name: 'PROFILE',
    icon: '👤',
    workspaces: [
      {
        id: 1,
        name: 'Personal Dashboard',
        workspace: 'Overview',
        active: true,
      },
      {
        id: 2,
        name: 'Settings & Preferences',
        workspace: 'Config',
        active: false,
      },
      { id: 3, name: 'Activity Log', workspace: 'History', active: false },
    ],
  },
  moreapps: {
    name: 'MORE APPS',
    icon: '❤',
    workspaces: [
      { id: 1, name: 'App Store', workspace: 'Discovery', active: true },
      {
        id: 2,
        name: 'Recently Used',
        workspace: 'Quick Access',
        active: false,
      },
      { id: 3, name: 'Favorites', workspace: 'Bookmarks', active: false },
    ],
  },
};
