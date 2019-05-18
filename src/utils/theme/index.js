import logger from 'utils/logger';

let currentTheme = {};
let themeSet = false;


function theme(t) {
  if (arguments.length > 0) {
    themeSet = true;
    currentTheme = t;
  }
  if (!themeSet) {
    logger.warn('No JS theme has been set, use hx.theme(obj) to initialise theme variables');
  }
  return currentTheme;
}

function getThemeVariable(varName) {
  return getComputedStyle(document.body).getPropertyValue(varName);
}

export {
  theme,
  getThemeVariable,
};
