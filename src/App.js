import {useState } from 'react';
import './App.css';
import CropTable1 from './component/CropTable1.js';
import CropTable2 from './component/CropTable2.js';
import {MantineProvider} from '@mantine/core';
import data from './data.js'

function App() {
  const [analysis, setAnalysis] = useState("general");
  return (
    <MantineProvider>
      <div className="App">
        <h1>Crop Data Analysis</h1>
        <select id="analysis_type" name="type" onChange={(e)=>setAnalysis(e.target.value)}>
          <option value="general">general</option>
          <option value="avarage">avarage</option>
        </select>

        {analysis === "general" && <CropTable1/>}
        {analysis === "avarage" && <CropTable2 data={data}/>}
      
      </div>
    </MantineProvider>
  );
}

export default App;
