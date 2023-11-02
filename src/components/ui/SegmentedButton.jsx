import { SegmentedControl } from "@mantine/core";

function SegmentedButton({ onChange, data }) {
  return (
    <SegmentedControl
      size="xs"
      onChange={onChange} // format:  (arg) => dispatch(changeDataAsPerTime(arg))
      data={data}
    />
  );
}

export default SegmentedButton;
