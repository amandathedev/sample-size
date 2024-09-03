import React, { useState, useEffect } from 'react';
import { Slider, Typography, Box, RadioGroup, FormControlLabel, Radio, TextField } from '@mui/material';
import { calculateSampleSize } from './mathUtils';

const App = () => {
  const [baselineRate, setBaselineRate] = useState(20);
  const [minDetectableEffect, setMinDetectableEffect] = useState(5);
  const [option, setOption] = useState('Absolute');
  const [sampleSize, setSampleSize] = useState(0);
  const [power, setPower] = useState(75);
  const [significanceLevel, setSignificanceLevel] = useState(5);

  useEffect(() => {
    const calculatedSampleSize = calculateSampleSize(baselineRate, minDetectableEffect, option, power, significanceLevel);
    setSampleSize(calculatedSampleSize);
  }, [baselineRate, minDetectableEffect, option, power, significanceLevel]);

  const handleSliderChange = (setter) => (event, value) => {
    setter(value);
  };

  const handleInputChange = (setter) => (event) => {
    const value = event.target.value;
    if (value === '') {
      setter(''); // Allow empty value
    } else {
      setter(parseFloat(value) || 0); // Only set as number if not empty
    }
  };

  const handleOptionChange = (event) => {
    setOption(event.target.value);
  };

  return (
    <Box className="App" sx={{ p: 3, width: '300px' }}>
      <Typography gutterBottom>Sample size: {sampleSize} per variation</Typography>

      <TextField
        label="Baseline conversion rate (%)"
        type="number"
        value={baselineRate}
        onChange={handleInputChange(setBaselineRate)}
        fullWidth
        margin="normal"
        inputProps={{ max: 100 }}
      />

      <TextField
        label="Minimum Detectable Effect (%)"
        type="number"
        value={minDetectableEffect}
        onChange={handleInputChange(setMinDetectableEffect)}
        fullWidth
        margin="normal"
        inputProps={{ max: 100 }}
      />

      <RadioGroup value={option} onChange={handleOptionChange} row>
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
