import React, { FC } from "react";
import { Modal, Box } from "@mui/material";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  activeItem: string | number;
  component: React.ElementType; // Updated type for a component
  setRoute?: (route: string) => void;
};

const CustomModel: FC<Props> = ({ open, setOpen, setRoute, component: Component }) => {
  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        className="absolute top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-slate-900 rounded-[8px] shadow-md p-4 outline-none max-w-[90%] w-[450px]"
      >
        <Component setOpen={setOpen} setRoute={setRoute} />
      </Box>
    </Modal>
  );
};

export default CustomModel;
