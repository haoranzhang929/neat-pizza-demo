import React from "react";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
import ReplayIcon from "@material-ui/icons/Replay";

import { ButtonText } from "../common/enum";

interface ImagesViewerActionsProps {
  selectedStore: number;
  isLoading: boolean;
  handleSelectStore: (selectedStore: number) => void;
  handleRefresh: (selectedStore: number) => void;
}

const ImagesViewerActions = (props: ImagesViewerActionsProps) => {
  const { selectedStore, isLoading, handleSelectStore, handleRefresh } = props;
  return (
    <>
      <FormControl
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          marginBottom: "20px"
        }}
      >
        <InputLabel id="store-select-label">Store</InputLabel>
        <Select
          labelId="store-select-label"
          id="store-select"
          value={selectedStore}
          onChange={e => handleSelectStore(Number(e.target.value))}
        >
          <MenuItem value={0}>Select a Store</MenuItem>
          <MenuItem value={1}>Store 1</MenuItem>
          <MenuItem value={2}>Store 2</MenuItem>
        </Select>
        <Button
          color="primary"
          startIcon={<ReplayIcon />}
          onClick={() => {
            if (selectedStore !== 0) {
              handleRefresh(selectedStore);
            }
          }}
          disabled={isLoading || selectedStore === 0}
          style={{ marginLeft: "20px", marginTop: "16px" }}
        >
          {ButtonText.Rerfresh}
        </Button>
      </FormControl>
    </>
  );
};

export default ImagesViewerActions;