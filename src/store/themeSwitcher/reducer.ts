import actions from './actions';
import { isCurrentThemeDark } from './config';

const defaultTheme = 'light';

const initState = {
  themeName: defaultTheme,
  isDark: false  
};

export default function ThemesSwitcher(state = initState, action) {
  switch (action.type) {
    case actions.CHANGE_THEME:
      const newTheme = action.payload.theme;
      // localStorage.setItem('theme', newTheme);
      return {
        ...state,
        themeName: newTheme,
        isDark: false  
      };
    default:
      return state;
  }
}
