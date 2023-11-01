import { Flex, FlexProps, useColorMode } from '@chakra-ui/react';
import { Pie as PieType, type Slice } from '@prisma/client';
import React, { useCallback, useMemo } from 'react';
import {
  Cell,
  Label,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { useMediaQuery } from '@/hooks';
import {
  convertNumToTime,
  convertTimeToNum,
  sortByStartTime,
} from '@/utils/time';

const RADIAN = Math.PI / 180;
const PIE_CONFIG = {
  startAngle: 90,
  endAngle: -270,
  cx: '50%',
  cy: '50%',
};

interface ClockProps extends FlexProps {
  name: string;
  settings: Pick<PieType, 'showUnscheduled'>;
  data: Array<Pick<Slice, 'name' | 'start' | 'end' | 'color'>>;
}

export const Clock = ({ data, name, settings, ...rest }: ClockProps) => {
  const { colorMode } = useColorMode();
  const isDarkMode = colorMode === 'dark';
  const isLargerThan580 = useMediaQuery('(min-width: 580px)');
  const isLargerThan640 = useMediaQuery('(min-width: 640px)');
  const UNSCHEDULED_COLOR = isDarkMode ? '#484848' : 'lightgray';
  const OUTER_RING_COLOR = isDarkMode ? '#1D4044' : '#82ca9d';

  const createBlank = (duration: number) => {
    return {
      value: duration,
      name: settings.showUnscheduled ? 'Unscheduled' : '',
      color: UNSCHEDULED_COLOR,
    };
  };

  const renderClockLabel = (
    props: {
      cx: number;
      cy: number;
      startAngle: number;
      innerRadius: number;
      outerRadius: number;
      percent: number;
      index: number;
    } & Slice,
  ) => {
    const { cx, cy, outerRadius, startAngle, name } = props;

    const SHOW_LABEL_VALUE = ['00:00', '06:00', '12:00', '18:00'];
    const SIDE_LABEL_VALUES = ['06:00', '18:00'];
    const PADDING = isLargerThan640 ? 8 : 2;

    const isSideValue = SIDE_LABEL_VALUES.includes(name);
    const isBottomValue = name === '12:00';

    if (!SHOW_LABEL_VALUE.includes(name)) return null;

    const radius = outerRadius + PADDING;
    const x = cx + radius * Math.cos(-startAngle * RADIAN);
    const y = cy + radius * Math.sin(-startAngle * RADIAN);
    return (
      <text
        x={x}
        y={y}
        fill={isDarkMode ? 'white' : 'black'}
        textAnchor={isSideValue ? (x > cx ? 'start' : 'end') : 'middle'}
        dominantBaseline={
          isSideValue ? 'central' : isBottomValue ? 'hanging' : 'text-bottom'
        }
      >
        {isLargerThan580 ? name : name.slice(0, 2)}
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
        middleRadius: number;
        outerRadius: number;
        percent: number;
        index: number;
      } & Slice,
    ) => {
      const { cx, cy, midAngle, middleRadius, name } = props;
      const radius = middleRadius;
      const x = cx + radius * Math.cos(-midAngle * RADIAN);
      const y = cy + radius * Math.sin(-midAngle * RADIAN);

      return (
        <text
          x={x}
          y={y}
          fill="white"
          // textAnchor={x > cx ? 'start' : 'end'}
          textAnchor="middle"
          fontWeight="bold"
          fontSize={isLargerThan640 ? '16px' : '12px'}
          dominantBaseline="middle"
        >
          {name}
        </text>
      );
    },
    [],
  );

  const dataWithBlanks = useMemo(() => {
    const slices = [...data].sort(sortByStartTime);
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
  }, [data, colorMode, settings.showUnscheduled]);

  return (
    <Flex width={{ base: '95%', lg: '80%', xl: 1020 }} marginX="auto" {...rest}>
      <ResponsiveContainer aspect={1} width="100%">
        <PieChart>
          <Pie
            {...PIE_CONFIG}
            dataKey="value"
            data={dataWithBlanks}
            outerRadius="84%"
            innerRadius="15%"
            fill="#8884d8"
            label={renderCustomizedLabel}
            labelLine={false}
          >
            <Label
              style={{
                fill: isDarkMode ? 'white' : '',
              }}
              value={name}
              position="center"
            />
            {dataWithBlanks.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
            <Tooltip cursor={false} />
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
            innerRadius="84%"
            outerRadius="87%"
            fill={OUTER_RING_COLOR}
            labelLine={false}
            label={renderClockLabel}
          />
        </PieChart>
      </ResponsiveContainer>
    </Flex>
  );
};
