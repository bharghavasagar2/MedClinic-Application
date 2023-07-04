
import { RESET_PROPERTY } from "../../commonConfig/commonConfig";
export const resetProperty = (reducer, property) => ({
  type: RESET_PROPERTY,
  reducer,
  property,
});
