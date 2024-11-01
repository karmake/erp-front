import { useState } from "react";
import Slider from "rc-slider";

export default function BasicSlider() {
  const [value, setValue] = useState(30);
  const handleChange = (value) => setValue(value);

  return <Slider value={value} onChange={handleChange} />;
}
