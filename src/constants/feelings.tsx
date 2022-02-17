import {
  AngerFeeling,
  AnxietyFeeling,
  DistractedFeeling,
  ExcitedFeeling,
  FearFeeling,
  GuiltFeeling,
  JoyFeeling,
  LonelyFeeling,
  NeutralFeeling,
  SadFeeling,
  StressFeeling,
  TiredFeeling,
} from 'ui';

const FEELINGS: Array<{
  name: string;
  icon: any;
}> = [
  {name: 'Anger', icon: AngerFeeling},
  {name: 'Anxiety', icon: AnxietyFeeling},
  {name: 'Distracted', icon: DistractedFeeling},
  {name: 'Excited', icon: ExcitedFeeling},
  {name: 'Fear', icon: FearFeeling},
  {name: 'Guilt', icon: GuiltFeeling},
  {name: 'Joy', icon: JoyFeeling},
  {name: 'Lonely', icon: LonelyFeeling},
  {name: 'Neutral', icon: NeutralFeeling},
  {name: 'Sad', icon: SadFeeling},
  {name: 'Stress ', icon: StressFeeling},
  {name: 'Tired', icon: TiredFeeling},
];

export default FEELINGS;
