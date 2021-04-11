import React from "react";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
import ReplayIcon from "@material-ui/icons/Replay";
import Typography from "@material-ui/core/Typography";

import { ButtonText } from "../common/enum";
import { Store } from "../common/model";

interface ImagesViewerActionsProps {
  storeList: Store[] | undefined;
  selectedStore: number;
  isLoading: boolean;
  handleSelectStore: (selectedStore: number) => void;
  handleRefresh: (selectedStore: number) => void;
}

const ImagesViewerActions = (props: ImagesViewerActionsProps) => {
  const { storeList, selectedStore, isLoading, handleSelectStore, handleRefresh } = props;
  return (
    <>
      <FormControl
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          marginBottom: "10px"
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
          {storeList?.map(({ storeID, name }) => (
            <MenuItem key={storeID} value={storeID}>
              {name}
            </MenuItem>
          ))}
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
      <Typography variant="caption" style={{ marginBottom: "10px" }}>
        *app will auto refresh every 30 seconds
      </Typography>
    </>
  );
};

export default ImagesViewerActions;
