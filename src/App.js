import React, { useState, useEffect } from 'react';
import { Slider, Typography, Box, RadioGroup, FormControlLabel, Radio, TextField } from '@mui/material';
import { calculateSampleSize } from './mathUtils';

const App = () => {
  const [baselineRate, setBaselineRate] = useState(20);
  const [minDetectableEffect, setMinDetectableEffect] = useState(5);
  const [isAbsolute, setIsAbsolute] = useState(true); // State variable for radio buttons
  const [sampleSize, setSampleSize] = useState('-');
  const [power, setPower] = useState(75);
  const [significanceLevel, setSignificanceLevel] = useState(5);

  useEffect(() => {
    if (minDetectableEffect <= 0 || baselineRate <= 0 || minDetectableEffect > 9999 || baselineRate > 9999) {
      setSampleSize('-');
    } else {
      const delta = isAbsolute ? minDetectableEffect : baselineRate * (minDetectableEffect / 100);
      const calculatedSampleSize = calculateSampleSize(baselineRate, delta, isAbsolute, power, significanceLevel);
      setSampleSize(Number.isFinite(calculatedSampleSize) ? Math.ceil(calculatedSampleSize) : '-');
    }
  }, [baselineRate, minDetectableEffect, isAbsolute, power, significanceLevel]);

  const handleSliderChange = (setter) => (event, value) => {
    setter(value);
  };

  const handleInputChange = (setter) => (event) => {
    let value = event.target.value;
    if (value === '') {
      setter('');
    } else {
      value = Math.min(parseFloat(value), 9999);
      setter(parseFloat(value) || 0);
    }
  };

  const handleRadioChange = (event) => {
    setIsAbsolute(event.target.value === 'Absolute');
  };

  return (
    <Box className="App" sx={{ p: 3, width: '260px' }}>
      <Box sx={{ textAlign: 'center', mb: 2 }}>
        <Typography variant="subtitle1">Sample Size</Typography>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
          {sampleSize}
        </Typography>
        <Typography variant="body2">per variation</Typography>
      </Box>

      <TextField
        label="Baseline conversion rate (%)"
        type="number"
        value={baselineRate}
        onChange={handleInputChange(setBaselineRate)}
        fullWidth
        margin="normal"
        inputProps={{ max: 9999, min: 0.01 }}
      />

      <TextField
        label="Minimum Detectable Effect (%)"
        type="number"
        value={minDetectableEffect}
        onChange={handleInputChange(setMinDetectableEffect)}
        fullWidth
        margin="normal"
        inputProps={{ max: 9999, min: 0.01 }}
      />

      <RadioGroup value={isAbsolute ? 'Absolute' : 'Relative'} onChange={handleRadioChange} row>
        <FormControlLabel value="Absolute" control={<Radio />} label="Absolute" />
        <FormControlLabel value="Relative" control={<Radio />} label="Relative" />
      </RadioGroup>

      <Box sx={{ display: 'flex', alignItems: 'center', mt: 3 }}>
        <Typography sx={{ flex: 1, textAlign: 'center' }}>Statistical power 1−β:</Typography>
        <Slider
          value={power}
          min={50}
          max={99}
          step={1}
          onChange={handleSliderChange(setPower)}
          valueLabelDisplay="auto"
          aria-labelledby="power-slider"
          sx={{ flex: 2 }}
        />
        <Typography sx={{ flex: 1, textAlign: 'right' }}>{power}%</Typography>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', mt: 3 }}>
        <Typography sx={{ flex: 1, textAlign: 'center' }}>Significance level α:</Typography>
        <Slider
          value={significanceLevel}
          min={1}
          max={10}
          step={0.5}
          onChange={handleSliderChange(setSignificanceLevel)}
          valueLabelDisplay="auto"
          aria-labelledby="significance-slider"
          sx={{ flex: 2 }}
        />
        <Typography sx={{ flex: 1, textAlign: 'right' }}>{significanceLevel}%</Typography>
      </Box>
    </Box>
  );
};

export default App;
