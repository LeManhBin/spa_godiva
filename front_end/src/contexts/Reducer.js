export const reducer = (state, action) => {
  switch (action.type) {
      case "OPEN_MODEL": {
          return {
              ...state,
              isOpenRegisterModal: true
          }
      }
      case "CLOSE_MODEL": {
          return {
              ...state,
              isOpenRegisterModal: false
          }
      }
      default:
          break;
  }
}