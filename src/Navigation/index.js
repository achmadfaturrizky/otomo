import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import Home from './app';

const switchNavigator = createSwitchNavigator({
  App: Home,
});

export default createAppContainer(switchNavigator);
