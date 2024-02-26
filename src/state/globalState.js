export default function globalState() {
  let instance = null;

  function createInstance() {
    let freezePlayer = false;
    let locale = "french";
    let fontSize = 32;

    return {
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
