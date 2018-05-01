import actions from "./actions";

const initialState = {
  user: null,
  balance: 0,
  requests: []
};

function popcornProject(state, action) {
  if (typeof state === "undefined") {
    return initialState;
  }
  console.log(action);

  switch (action.type) {
    case actions.SAVE_USER:
      return {
        ...state,
        user: action.payload
      };
      break;
    case actions.SAVE_BALANCE:
      return {
        ...state,
        balance: action.payload
      };
      break;
    case actions.SAVE_REQUESTS:
      return {
        ...state,
        requests: action.payload
      };
      break;
    default:
  }
  // For now, don't handle any actions
  // and just return the state given to us.
  return state;
}

export default popcornProject;
