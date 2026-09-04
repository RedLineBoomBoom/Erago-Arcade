import React from 'react';
import { BonusStageHub } from './bonus/BonusStageHub';

interface BonusStageMiniGameProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BonusStageMiniGame: React.FC<BonusStageMiniGameProps> = (props) => {
  return <BonusStageHub {...props} />;
};

export default BonusStageMiniGame;
