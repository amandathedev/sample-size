import React, { useState, useEffect } from 'react';
import { Typography, Box, RadioGroup, FormControlLabel, Radio, TextField, Button, Slider } from '@mui/material';
import { calculateSampleSize } from './mathUtils';
import EffectChart from './components/EffectChart';

const App = () => {
  const [baselineRate, setBaselineRate] = useState(20);
  const [isAbsolute, setIsAbsolute] = useState(false);
  const [sampleSize, setSampleSize] = useState('-');
  const [power, setPower] = useState(95);
  const [significanceLevel, setSignificanceLevel] = useState(5);
  const [minDetectableEffect, setMinDetectableEffect] = useState(5);
  const [isChartVisible, setIsChartVisible] = useState(true); // Set to true by default to show the chart first
  const [sampleSizes, setSampleSizes] = useState([]);
  const [traffic, setTraffic] = useState(5000);
  const [days, setDays] = useState(0);

  useEffect(() => {
    const delta = isAbsolute ? minDetectableEffect : baselineRate * (minDetectableEffect / 100);
    const calculatedSampleSize = calculateSampleSize(baselineRate, delta, isAbsolute, power, significanceLevel);
    setSampleSize(Number.isFinite(calculatedSampleSize) ? Math.ceil(calculatedSampleSize) : '-');
  
    if (calculatedSampleSize) {
      const totalSampleSize = calculatedSampleSize * 2;
      const calculatedDays = Math.ceil(totalSampleSize / traffic);
      setDays(calculatedDays);
    }
  }, [baselineRate, isAbsolute, power, significanceLevel, minDetectableEffect, traffic]);  

  useEffect(() => {
    const newSampleSizes = Array.from({ length: 100 }, (_, i) => {
      const mde = i + 1;
      const delta = isAbsolute ? mde : baselineRate * (mde / 100);
      const sampleSize = Math.max(calculateSampleSize(baselineRate, delta, isAbsolute, power, significanceLevel), 10);
      return { detectableEffect: mde, sampleSize };
    });
    setSampleSizes(newSampleSizes);
  }, [baselineRate, isAbsolute, power, significanceLevel]);

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

  const handleToggleChart = () => {
    setIsChartVisible(!isChartVisible);
  };

  if (isChartVisible) {
    return (
      <Box className="App" sx={{ p: 3, width: '560px' }}>
        <EffectChart baselineRate={baselineRate} sampleSizes={sampleSizes} />

        <Box sx={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 3, mt: 3 }}>
          <Box sx={{ display: 'grid', gridTemplateRows: 'auto auto', gap: 2 }}>
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
            <TextField
              label="Baseline (%)"
              type="number"
              value={baselineRate}
              onChange={handleInputChange(setBaselineRate)}
              size="small"
              inputProps={{ max: 9999, min: 0.01 }}
            />
            <TextField
              label="Power (%)"
              type="number"
              value={power}
              onChange={handleInputChange(setPower)}
              size="small"
              inputProps={{ max: 99, min: 50 }}
            />
          </Box>

          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
            <TextField
              label="Traffic (Users per day)"
              type="number"
              value={traffic}
              onChange={handleInputChange(setTraffic)}
              size="small"
              inputProps={{ max: 999999, min: 1 }}
            />
            <TextField
              label="Significance (%)"
              type="number"
              value={significanceLevel}
              onChange={handleInputChange(setSignificanceLevel)}
              size="small"
              inputProps={{ max: 10, min: 1 }}
            />
          </Box>

          </Box>

          <Box>
            <RadioGroup
              value={isAbsolute ? 'Absolute' : 'Relative'}
              onChange={handleRadioChange}
              sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
            >
              <FormControlLabel value="Absolute" control={<Radio />} label="Absolute" />
              <FormControlLabel value="Relative" control={<Radio />} label="Relative" />
            </RadioGroup>
          </Box>
        </Box>

        <Typography variant="body1" sx={{ mt: 2 }}>
          To detect a
          <span style={{ fontWeight: 'bold', color: '#1976d2', marginLeft: '5px', marginRight: '5px' }}>{minDetectableEffect}%</span>
          improvement from a
          <span style={{ fontWeight: 'bold', color: '#1976d2', marginLeft: '5px', marginRight: '5px' }}>{baselineRate}%</span>
          conversion rate, you'll need
          <span style={{ fontWeight: 'bold', color: '#1976d2', marginLeft: '5px', marginRight: '5px' }}>{sampleSize.toLocaleString()}</span>
          users per variation. For a two-variant test, you'll need a total of
          <span style={{ fontWeight: 'bold', color: '#1976d2', marginLeft: '5px', marginRight: '5px' }}>{(sampleSize * 2).toLocaleString()}</span>
          users. Based on your current traffic of
          <span style={{ fontWeight: 'bold', color: '#1976d2', marginLeft: '5px', marginRight: '5px' }}>{traffic.toLocaleString()}</span>
          users per day, the experiment should run for
          <span style={{ fontWeight: 'bold', color: '#1976d2', marginLeft: '5px', marginRight: '5px' }}>{days}</span>days.
        </Typography>


        <Box sx={{ mt: 3 }}>
          <Button
            onClick={handleToggleChart}
            variant="contained"
            fullWidth
            sx={{ mt: 'auto', fontWeight: 'bold', borderWidth: '2px' }}
          >
            Go to Inputs
          </Button>
        </Box>

      </Box>
    );
  }

  return (
    <Box className="App" sx={{ p: 3, width: '280px' }}>
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

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        <RadioGroup
          value={isAbsolute ? 'Absolute' : 'Relative'}
          onChange={handleRadioChange}
          row
          sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}
        >
          <FormControlLabel value="Absolute" control={<Radio />} label="Absolute" />
          <FormControlLabel value="Relative" control={<Radio />} label="Relative" />
        </RadioGroup>
      </Box>

      <Box sx={{ mt: 3 }}>
        <Typography sx={{ mb: 1 }}>Statistical power 1−β:</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Slider
            value={power}
            min={50}
            max={99}
            step={1}
            onChange={handleSliderChange(setPower)}
            valueLabelDisplay="auto"
            aria-labelledby="power-slider"
            sx={{ flex: 1 }}
          />
          <Typography sx={{ ml: 2, width: '40px', textAlign: 'right' }}>{power}%</Typography>
        </Box>
      </Box>

      <Box sx={{ mt: 3 }}>
        <Typography sx={{ mb: 1 }}>Significance level α:</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Slider
            value={significanceLevel}
            min={1}
            max={10}
            step={0.5}
            onChange={handleSliderChange(setSignificanceLevel)}
            valueLabelDisplay="auto"
            aria-labelledby="significance-slider"
            sx={{ flex: 1 }}
          />
          <Typography sx={{ ml: 2, width: '40px', textAlign: 'right' }}>{significanceLevel}%</Typography>
        </Box>
      </Box>

      <Button onClick={handleToggleChart} variant="contained" fullWidth sx={{ mt: 3 }}>
        View Chart
      </Button>
    </Box>
  );
};

export default App;
