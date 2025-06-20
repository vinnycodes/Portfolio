import { hover } from 'framer-motion';
import type { AppIconProps } from '../types/workspace';

// Reusable AppIcon component - Image-only version
const AppIcon: React.FC<AppIconProps> = ({
  appKey,
  selectedApp,
  onSelect,
  bgColor,
  iconSrc,
  alt = 'app icon',
  borderColor,
  shape = 'rounded-lg',
}) => {
  const isSelected = selectedApp === appKey;
  const baseClasses = `w-16 h-16 flex items-center justify-center cursor-pointer transition-all bg-gray-50 rounded-md shadow-md transition-all duration-200 border-[3px]-transparent relative group`;
  // const baseClasses = `w-12 h-12 ${bgColor} ${shape} flex items-center justify-center cursor-pointer transition-all`;
  const selectedClasses = isSelected
    ? `border-2  ${borderColor} inset-shadow-2xs shadow-lg z-10`
    : 'hover:shadow-md group';

  const iconElement = (
    <img
      src={iconSrc.src}
      alt={alt}
      className="w-14 h-14 object-contain z-10"
    />
  );

  return (
    <div
      onClick={() => onSelect(appKey)}
      className={`${baseClasses} ${selectedClasses}`}
    >
      {shape === 'rounded-full' ? (
        <div className="w-full h-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
          {iconElement}
        </div>
      ) : (
        iconElement
      )}
      {isSelected && (
        <div className="z-0 bg-[#dbddff] border-[3px] border-indigo-500 rounded-[14px] -m-2.5 absolute inset-0" />
      )}
      {!isSelected && (
        <div className="hidden z-0 border-4 group-hover:block group-hover:bg-[#F2F3F7] group-hover:border-gray-300 rounded-[14px] -m-2.5 absolute inset-0" />
      )}
    </div>
  );
};

export default AppIcon;
