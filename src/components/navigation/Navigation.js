import React, { useContext } from "react";
import { useMediaQuery, Drawer } from "@mui/material";
import GlobalContext from "../../GlobalContext";
import NavigationContent from "./NavigationContent";

const NavigationDrawer = () => {
  const matches = useMediaQuery("(max-width:560px)");
  const { showNavigationDrawer, setShowNavigationDrawer } =
    useContext(GlobalContext);

  return (
    <>
      {/* turn the component into a drawer for mobile view */}
      {matches ? (
        <Drawer
          anchor="left"
          open={showNavigationDrawer}
          onClose={() => setShowNavigationDrawer(false)}
          ModalProps={{
            keepMounted: true,
          }}
        >
          <NavigationContent />
        </Drawer>
      ) : (
        <NavigationContent />
      )}
    </>
  );
};

export default NavigationDrawer;
