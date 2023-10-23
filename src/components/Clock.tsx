import React, { useCallback, useMemo, useState } from 'react';
import { Cell, LabelList, Pie, PieChart, type PieLabel } from 'recharts';
import { ContentType } from 'recharts/types/component/Label';
import { type Slice } from '@/types/slice';
import { convertNumToTime, convertTimeToNum } from '@/utils/time';

const UNSCHEDULED_COLOR = 'lightgray';
const RADIAN = Math.PI / 180;
const PIE_CONFIG = {
  startAngle: 90,
  endAngle: -270,
  cx: '50%',
  cy: '50%',
};

interface ClockProps {
  data: Array<Slice>;
  size?: number;
}

export const Clock = ({ data }: ClockProps) => {
  const [active, setActive] = useState(9999);

  const createBlank = (duration: number) => {
    return {
      value: duration,
      name: 'Unscheduled',
      color: UNSCHEDULED_COLOR,
    };
  };

  const renderClockLabel = (
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
    const { cx, cy, outerRadius, midAngle, name } = props;

    const SHOW_LABEL_VALUE = ['00:00', '06:00', '12:00', '18:00'];

    if (!SHOW_LABEL_VALUE.includes(name)) return null;

    console.log('Props:', props);

    const radius = outerRadius;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    return (
      <text
        x={x}
        y={y}
        fill="black"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
      >
        {name}
      </text>
    );
  };

  const renderCustomizedLabel = useCallback(
    (
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
      const {
        cx,
        cy,
        midAngle,
        innerRadius,
        outerRadius,
        percent,
        index,
        name,
      } = props;
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
    },
    [],
  );

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
          output.push({
            ...currentSlice,
            value: end - count,
          });
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

  return (
    <PieChart width={800} height={800} style={{ border: '2px solid blue' }}>
      <Pie
        {...PIE_CONFIG}
        dataKey="value"
        data={dataWithBlanks}
        outerRadius="80%"
        fill="#8884d8"
        // label={renderCustomizedLabel}
        labelLine={false}
        onMouseEnter={(_, index) => {
          setActive(index);
        }}
        onMouseLeave={() => {
          setActive(9999);
        }}
      >
        {dataWithBlanks.map((entry, index) => {
          const isBlank = entry.name === 'Unscheduled';
          const isHover = active === index;

          return (
            <Cell
              key={`cell-${index}`}
              fill={isBlank && isHover ? 'gray' : entry.color}
              onClick={() => {
                console.log('Clicked:', entry);
              }}
              stroke={isHover ? 'cyan' : undefined}
              strokeWidth={isHover ? 3 : 0}
            />
          );
        })}
      </Pie>
      <Pie
        {...PIE_CONFIG}
        data={Array(24)
          .fill(1)
          .map((_, index) => ({
            name: convertNumToTime(index),
            value: 1,
          }))}
        dataKey="value"
        innerRadius="75%"
        fill="#82ca9d"
        labelLine={false}
        label={renderClockLabel}
      />
      {/*{needle(value, data, cx, cy, iR, oR, '#d0d000')}*/}
    </PieChart>
  );
};
