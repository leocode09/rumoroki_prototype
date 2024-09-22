import React from 'react';
import * as Slider from '@radix-ui/react-slider';
import { cn } from "@/lib/utils";

interface RangeSliderProps {
  value?: number;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  labelStart?: string;
  labelEnd?: string;
}

const RangeSlider: React.FC<RangeSliderProps> = ({
  value = 0,
  onChange,
  min = 0,
  max = 10,
  labelStart,
  labelEnd
}) => {
  const handleChange = (newValue: number[]) => {
    onChange && onChange(newValue[0]);
  };

  return (
    <div className="w-full">
      <Slider.Root
        className="relative flex items-center select-none touch-none w-full h-5"
        value={[value]}
        max={max}
        min={min}
        step={1}
        onValueChange={handleChange}
      >
        <Slider.Track className="bg-primary/20 relative grow rounded-full h-2">
          <Slider.Range className="absolute bg-primary rounded-full h-full" />
        </Slider.Track>
        {[...Array(9)].map((_, index) => (
          <div
            key={index}
            className={cn(
              "absolute top-1/2 w-1 h-1 rounded-full transform -translate-x-1/2 -translate-y-1/2 bg-primary",
            )}
            style={{ left: `${(index + 1) * 10}%` }}
          />
        ))}
        <Slider.Thumb
          className="block w-5 h-5 bg-background border-2 border-primary rounded-full focus:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-opacity-75"
        />
      </Slider.Root>
      <div className="flex justify-between mt-1">
        <span className="text-sm text-muted-foreground">{labelStart}</span>
        <span className="text-sm text-muted-foreground">{labelEnd}</span>
      </div>
    </div>
  );
};

export default RangeSlider;