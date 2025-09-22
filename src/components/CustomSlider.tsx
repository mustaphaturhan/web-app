import { Fragment, useState, useEffect } from 'react';
import { Form, Label, Popup, Icon } from 'semantic-ui-react';
import { Slider } from '@mui/material';
import { type debounce } from 'throttle-debounce';
import {
  settingsInit,
  settingsInitTruckOverride,
} from '@/Controls/settings-options';

import PropTypes from 'prop-types';
import type { RootState } from '@/store';

interface CustomSliderProps {
  settings: RootState['common']['settings'];
  option: {
    param: keyof RootState['common']['settings'];
    settings: {
      min: number;
      max: number;
      step: number;
    };
    unit: string;
  };
  profile: string;
  handleUpdateSettings: debounce<
    ({ name, value }: { name: string; value: number }) => void
  >;
}

const CustomSlider = ({
  settings,
  option,
  profile,
  handleUpdateSettings,
}: CustomSliderProps) => {
  const { min, max, step } = option.settings;
  const [sliderVal, setSliderVal] = useState(
    parseFloat(settings[option.param] as unknown as string)
  );

  useEffect(() => {
    setSliderVal(parseFloat(settings[option.param] as unknown as string));
  }, [settings, option.param]);

  // todo: in here, handle change can be undefined, number and string in same time.
  // we should come up with better type instead of any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (value?: any) => {
    // reset

    if (isNaN(value)) {
      value =
        profile === 'truck'
          ? settingsInitTruckOverride[option.param]
          : settingsInit[option.param];
    }
    if (value < min) {
      value = min;
    } else if (value > max) {
      value = max;
    }

    setSliderVal(parseFloat(value));
    handleUpdateSettings({
      name: option.param,

      value: parseFloat(value),
    });
  };

  return (
    <Fragment>
      <Form.Group inline>
        <Popup
          content="Reset Value"
          size="tiny"
          trigger={
            <Icon name="repeat" size="small" onClick={() => handleChange()} />
          }
        />
        <Form.Input
          width={16}
          size="small"
          type="number"
          step="any"
          value={sliderVal}
          placeholder="Enter Value"
          name={option.param}
          onChange={(e) => handleChange((e.target as HTMLInputElement).value)}
        />
        <Popup
          content="Units"
          size="tiny"
          trigger={
            <Label basic size="small" style={{ cursor: 'default' }}>
              {option.unit}
            </Label>
          }
        />
      </Form.Group>
      <div>
        <Slider
          min={min}
          size="small"
          max={max}
          step={step}
          value={sliderVal}
          color="secondary"
          aria-label="Default"
          valueLabelDisplay="auto"
          onChange={(e) => {
            handleChange((e.target as HTMLInputElement).value);
          }}
        />
      </div>
    </Fragment>
  );
};

CustomSlider.propTypes = {
  option: PropTypes.object,
  settings: PropTypes.object,
  profile: PropTypes.string,
  handleUpdateSettings: PropTypes.func,
};

export default CustomSlider;
