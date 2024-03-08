export default function globalStateManager() {
  let instance = null;

  function createInstance() {
    let previousScene = null;
    let freezePlayer = false;
    let locale = "french";
    let fontSize = 30;
    let isGhostDefeated = false;
    let isSonSaved = false;

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

      setIsGhostDefeated(value) {
        isGhostDefeated = value;
      },
      getIsGhostDefeated: () => isGhostDefeated,

      setIsSonSaved(value) {
        isSonSaved = value;
      },
      getIsSonSaved: () => isSonSaved,
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
