import { useState } from "react";
import Slider from "rc-slider";
import Tooltip from "rc-tooltip";

const handle = (props) => {
  const { value, dragging, index, ...restProps } = props;
  return (
    <Tooltip
      prefixCls="rc-slider-tooltip"
      overlay={value}
      visible={dragging}
      placement="top"
      key={index}>
      <Slider.Handle value={value} {...restProps} />
    </Tooltip>
  );
};

export default function MultiRangeSlider() {
  const [value, setValue] = useState([15, 35, 65, 85]);
  const handleChange = (value) => setValue(value);

  return <Slider range value={value} handle={handle} onChange={handleChange} />;
}
