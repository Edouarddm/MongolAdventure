export default function globalStateManager() {
  let instance = null;

  function createInstance() {
    let previousScene = null;
    let freezePlayer = false;
    let locale = "english";
    let fontSize = 30;

    return {
      setPreviousScene(sceneName) {
        previousScene = sceneName;
      },
      getPreviousScene: () => previousScene,

      setFreezePlayer(value) {
        freezePlayer = value;
      },
      getFreezePlayer: () => freezePlayer,

      setFontSize(value) {
        fontSize = value;
      },
      getFontSize: () => fontSize,

      setLocale(value) {
        locale = value;
      },
      getLocal: () => locale,
    };
  }

    return {
      getInstance() {
        if (!instance){
          instance = createInstance();
        }

        return instance;
      }
    }
}
