import { useState } from 'react';
import type { AppKey, AppData } from '../types/workspace';
import { appData, appIconConfigs } from '../data/workspaceData';
import AppIcon from './AppIcon';

const InteractiveWorkspace: React.FC = () => {
  const [selectedApp, setSelectedApp] = useState<AppKey>('notion');
  const [selectedTab, setSelectedTab] = useState<number>(1);

  const currentApp: AppData = appData[selectedApp];

  const handleAppSelect = (appKey: AppKey): void => {
    setSelectedApp(appKey);
    setSelectedTab(1); // Reset to first tab when switching apps
  };

  const handleTabSelect = (tabId: number): void => {
    setSelectedTab(tabId);
  };

  return (
    <div className="p-5 overflow-clip">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <div className="w-4 h-4 bg-black rounded-sm flex items-center justify-center text-xs">
          {currentApp.icon}
        </div>
        <span className="text-sm font-medium text-gray-600">{currentApp.name}</span>
      </div>
      
      {/* Workspace Tabs */}
      <div className="overflow-x-auto scrollbar-hide mb-3">
        <div className="flex gap-1 min-w-max">
          {currentApp.workspaces.map((workspace) => (
            <div
              key={workspace.id}
              onClick={() => handleTabSelect(workspace.id)}
              className={`px-4 py-1.5 rounded-lg text-center min-w-max cursor-pointer transition-all ${
                selectedTab === workspace.id
                  ? 'bg-indigo-100 border-2 border-indigo-300'
                  : 'bg-white border border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className={`text-sm font-medium ${
                selectedTab === workspace.id ? 'text-indigo-600' : 'text-gray-700'
              }`}>
                {workspace.name}
              </div>
              <div className="text-xs text-gray-500">{workspace.workspace}</div>
            </div>
          ))}
        </div>
      </div>
      
      {/* App Icons Row */}
      <div className="overflow-hidden bg-white py-4 px-4 rounded-xl shadow-sm min-w-max">
        <div className="flex items-center gap-6 min-w-max">
          {appIconConfigs.map((config) => (
            <AppIcon
              key={config.key}
              appKey={config.key}
              selectedApp={selectedApp}
              onSelect={handleAppSelect}
              bgColor={config.bgColor}
              borderColor={config.borderColor}
              iconSrc={config.iconSrc}
              shape={config.shape}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default InteractiveWorkspace;