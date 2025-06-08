import './LottieIcon.css'
import Lottie from 'lottie-react';
import {
  notcoin,
  stickerPack,
  dogs,
  earn,
  community,
  notPixel,
  notGames,
} from '../../assets/';

const iconAlias = {
  notcoin,
  'sticker pack': stickerPack,
  dogs,
  earn,
  community,
  'not pixel': notPixel,
  'not games': notGames,
};

type IconId = keyof typeof iconAlias;

interface LottieIconProps {
  iconId: string;
  loop?: boolean;
  className?: string;
  onClick?: () => void;
}

export default function LottieIcon({
  iconId,
  loop = true,
  onClick,
  className
}: LottieIconProps) {
  const normalizedId = iconId.toLowerCase().trim();
  const animationData = iconAlias[normalizedId as IconId];

  if (!animationData) return null;

  return (
    <Lottie
      className={`lottie-icon ${className}`}
      animationData={animationData}
      loop={loop}
      onClick={onClick}
    />
  )
}
