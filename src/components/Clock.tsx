import React, { useMemo } from 'react';
import { Cell, Pie, PieChart, type PieLabel } from 'recharts';
import { type Slice } from '@/types/slice';
import { convertTimeToNum } from '@/utils/time';

const UNSCHEDULED_COLOR = 'lightgray';
const RADIAN = Math.PI / 180;

interface ClockProps {
  data: Array<Slice>;
  size?: number;
}

export const Clock = ({ data, size }: ClockProps) => {
  const createBlank = (duration: number) => {
    return {
      value: duration,
      name: 'Unscheduled',
      color: UNSCHEDULED_COLOR,
    };
  };
  const dataWithBlanks = useMemo(() => {
    const slices = [...data];
    const output = [];
    const MAX = 24;
    let count = 0;

    while (count !== MAX) {
      if (slices.length && slices[0]) {
        const nextSliceTime = convertTimeToNum(slices[0].start);

        if (count === nextSliceTime) {
          // Next slice is at the current spot
          const currentSlice = slices.shift();
          if (!currentSlice) throw new Error('No current slice!');
          const start = convertTimeToNum(currentSlice.start);
          const end = convertTimeToNum(currentSlice.end);
          output.push({ ...currentSlice, value: end - count });
          count += end - start;
        } else {
          // Next slice is some time away
          const blankTime = nextSliceTime - count;
          output.push(createBlank(blankTime));
          count += blankTime;
        }
      } else {
        // No additional slices left in array, just fill till end
        const blankTime = MAX - count;
        output.push(createBlank(blankTime));
        count += blankTime;
      }
    }

    return output;
  }, [data]);

  const renderCustomizedLabel = (
    props: {
      cx: number;
      cy: number;
      midAngle: number;
      innerRadius: number;
      outerRadius: number;
      percent: number;
      index: number;
    } & Slice,
  ) => {
    const { cx, cy, midAngle, innerRadius, outerRadius, percent, index, name } =
      props;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
      >
        {name}
      </text>
    );
  };

  return (
    <PieChart width={800} height={800}>
      <Pie
        dataKey="value"
        startAngle={90}
        endAngle={-270}
        data={dataWithBlanks}
        cx={400}
        cy={300}
        innerRadius={25}
        outerRadius={300}
        fill="#8884d8"
        stroke="none"
        label={renderCustomizedLabel}
        labelLine={false}
      >
        {dataWithBlanks.map((entry, index) => (
          <Cell
            key={`cell-${index}`}
            fill={entry.color}
            onClick={() => {
              console.log('Clicked:', entry);
            }}
          />
        ))}
      </Pie>
      {/*{needle(value, data, cx, cy, iR, oR, '#d0d000')}*/}
    </PieChart>
  );
};
