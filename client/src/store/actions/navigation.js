import { DRAWER_OPEN } from "../constants/constants"



export const toggleDrawer = drawerOpen => {
  return { type: DRAWER_OPEN, payload: { drawerOpen } }
}