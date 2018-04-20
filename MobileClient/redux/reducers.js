import actions from "./actions";

const initialState = {
  user: null
};

function popcornProject(state, actions) {
  if (typeof state === "undefined") {
    return initialState;
  }

  switch (action.type) {
    case actions.SAVE_USER:
      return Object.assign({}, state, {
        user: action.payload
      });
      break;
    default:
  }
  // For now, don't handle any actions
  // and just return the state given to us.
  return state;
}

export default popcornProject;
