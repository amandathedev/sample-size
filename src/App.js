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
    <Box className="App" sx={{ p: 1 }}>
      <Typography variant="h6" gutterBottom sx={{ fontSize: '14px', fontWeight: 'bold' }}>Sample size: {sampleSize} per variation</Typography>

      <TextField
        label="Baseline conversion rate (%)"
        type="number"
        value={baselineRate}
        onChange={handleInputChange(setBaselineRate)}
        fullWidth
        margin="dense"
        inputProps={{ max: 100 }}
        sx={{ mb: 1 }}
      />

      <TextField
        label="Minimum Detectable Effect (%)"
        type="number"
        value={minDetectableEffect}
        onChange={handleInputChange(setMinDetectableEffect)}
        fullWidth
        margin="dense"
        inputProps={{ max: 100 }}
        sx={{ mb: 1 }}
      />

      <RadioGroup value={option} onChange={handleOptionChange} row sx={{ justifyContent: 'center', mb: 1 }}>
        <FormControlLabel value="Absolute" control={<Radio size="small" />} label={<Typography sx={{ fontSize: '12px' }}>Absolute</Typography>} />
        <FormControlLabel value="Relative" control={<Radio size="small" />} label={<Typography sx={{ fontSize: '12px' }}>Relative</Typography>} />
      </RadioGroup>

      <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
        <Typography sx={{ flex: 1, textAlign: 'center', fontSize: '12px' }}>Statistical power 1−β:</Typography>
        <Slider
          value={power}
          min={50}
          max={99}
          step={1}
          onChange={handleSliderChange(setPower)}
          valueLabelDisplay="auto"
          aria-labelledby="power-slider"
          sx={{ flex: 2, ml: 1, mr: 1 }}
          size="small"
        />
        <Typography sx={{ flex: 1, textAlign: 'right', fontSize: '12px' }}>{power}%</Typography>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
        <Typography sx={{ flex: 1, textAlign: 'center', fontSize: '12px' }}>Significance level α:</Typography>
        <Slider
          value={significanceLevel}
          min={1}
          max={10}
          step={0.5}
          onChange={handleSliderChange(setSignificanceLevel)}
          valueLabelDisplay="auto"
          aria-labelledby="significance-slider"
          sx={{ flex: 2, ml: 1, mr: 1 }}
          size="small"
        />
        <Typography sx={{ flex: 1, textAlign: 'right', fontSize: '12px' }}>{significanceLevel}%</Typography>
      </Box>
    </Box>
  );
};

export default App;
