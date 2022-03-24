import type {AuthStackParamList} from './AuthNavigator';
import type {TabParamList} from './TabNavigator';
import type {HomeParamList} from './TabNavigator';

type RootStackParamList = AuthStackParamList & HomeParamList & TabParamList;

// export type RootStackParamList = AuthStackParamList & XXXStackParamList  &  YYYStackParamList  ;

// very important to type check useNavigation hook
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
