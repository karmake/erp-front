import { useState } from "react";
import Slider from "rc-slider";
import Tooltip from "rc-tooltip";

const handle = (props) => {
  const { value, dragging, index, ...restProps } = props;
  return (
    <Tooltip
      key={index}
      placement="top"
      overlay={value}
      visible={dragging}
      prefixCls="rc-slider-tooltip">
      <Slider.Handle value={value} {...restProps} />
    </Tooltip>
  );
};

export default function VerticalSlider() {
  const [value, setValue] = useState(30);

  const handleChange = (value) => setValue(value);

  return (
    <div style={{ height: "200px" }}>
      <Slider handle={handle} vertical value={value} onChange={handleChange} />
    </div>
  );
}
