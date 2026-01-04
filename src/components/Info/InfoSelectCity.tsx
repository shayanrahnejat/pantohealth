import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import type { SelectChangeEvent } from "@mui/material/Select";
import type { Theme } from "@emotion/react";
import useMap from "@/store/store";
const ITEM_HEIGHT = 44;
const ITEM_PADDING_TOP = 4;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name: string, personName: string[], theme: Theme) {
  return {
    fontWeight: personName.includes(name)
      ? theme?.typography.fontWeightMedium
      : theme?.typography.fontWeightRegular,
  };
}

export default function InfoSelectCity() {
  const [datas, setDatas] = React.useState([]);
  const [names, setNames] = React.useState<string[]>([]);
  const [personName, setPersonName] = React.useState<string>("all");

  const changeCity: any = useMap((state) => state.setCurrent);
  const setCoords: any = useMap((state) => state.setCoords);

  React.useEffect(() => {
    changeCity(personName);
  }, [personName]);

  React.useEffect(() => {
    setCoords(datas);
    const nameList = Array.from(
      new Set(datas.map((data: { city: string }) => data.city))
    );
    nameList.push("all");
    setNames(nameList);
  }, [datas]);

  React.useEffect(() => {
    async function setData() {
      const request = await fetch(
        "https://gist.githubusercontent.com/neysidev/bbd40032f0f4e167a1e6a8b3e99a490c/raw/fc7dc242f41393845d90edaa99e32e28f1ddfe24/train-stations.json"
      );
      if (!request.ok) {
        console.error("an error occured!");
        window.alert("an error occured!");
      }
      const res = await request.json();
      setDatas(res);
    }
    setData();
  }, []);

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;

    setPersonName(value);
  };

  return (
    <div>
      <FormControl
        className="min-[748px]:w-75 min-[428px]:w-40 w-25"
        sx={{ m: 1 }}
      >
        <InputLabel id="city-select-label" className="text-white! border-white">
          City
        </InputLabel>
        <Select
          labelId="city-select-label"
          id="city-select"
          className="rounded-2xl! text-white! bg-[#67686b]"
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput className="" label="Name" />}
          MenuProps={MenuProps}
        >
          {names.map((name) => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
