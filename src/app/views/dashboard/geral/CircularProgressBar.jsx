import { useEffect, useState } from "react";
import { VictoryPie, VictoryAnimation, VictoryLabel } from "victory";

export default function CircularProgressBar({ percent }) {
  const [state, setState] = useState({
    percent: percent || 0,
    data: [
      { x: 1, y: percent || 0 },
      { x: 2, y: 100 - (percent || 0) }
    ]
  });

  useEffect(() => {
    setState({
      percent,
      data: [
        { x: 1, y: percent },
        { x: 2, y: 100 - percent }
      ]
    });
  }, [percent]);

  return (
    <div style={{ height: "250px" }}>
      <svg viewBox="0 0 400 400" width="100%" height="100%">
        <VictoryPie
          standalone={false}
          animate={{ duration: 1000 }}
          width={400}
          height={400}
          data={state.data}
          innerRadius={120}
          cornerRadius={25}
          labels={() => null}
          style={{
            data: {
              fill: ({ datum }) => {
                const color = datum.y > 30 ? "green" : "red";
                return datum.x === 1 ? color : "transparent";
              }
            }
          }}
        />

        <VictoryAnimation duration={1000} data={state}>
          {(newProps) => (
            <VictoryLabel
              x={200}
              y={200}
              textAnchor="middle"
              verticalAnchor="middle"
              text={`${Math.round(newProps.percent)}%`}
              style={{ fontSize: 45 }}
            />
          )}
        </VictoryAnimation>
      </svg>
    </div>
  );
}
