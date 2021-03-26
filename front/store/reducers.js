const { combineReducers } = require("redux");
const { authReduser } = require("./auth/reducers");

export default combineReducers({
  auth: authReduser,
});
