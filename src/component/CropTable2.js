import React from 'react'
import { Table } from '@mantine/core';
import '../style/cropTable1.css';

const calculateAverages = (data) => {
    const crops = {};
    
    data.forEach(item => {
      const cropName = item["Crop Name"];
      const yieldProduction = parseFloat(item["Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))"]) || 0;
      const cultivationArea = parseFloat(item["Area Under Cultivation (UOM:Ha(Hectares))"]) || 0;
      // console.log("values", cropName, "+", yieldProduction, "+", cultivationArea);
      
      if (!crops[cropName]) {
        crops[cropName] = { totalyieldProduction: 0, totalYield: 0, count: 0 };
      }
      
      if (yieldProduction) crops[cropName].totalyieldProduction += yieldProduction;
      if (cultivationArea) crops[cropName].totalYield += cultivationArea;
      crops[cropName].count += 1;
    });
    
    return Object.keys(crops).map(cropName => ({
      cropName,
      averageyieldProduction: (crops[cropName].totalyieldProduction / crops[cropName].count).toFixed(3),
      averageYield: (crops[cropName].totalYield / crops[cropName].count).toFixed(3),
    }));
};

export default function CropTable2({data}) {
        
    const averages = calculateAverages(data);
    // console.log(averages);


  return (
    <>
      <div className='container'>        
      <table>
        <thead>
          <tr className="table_row">
            <th className="cell">Crop Name</th>
            <th className="cell">Average yieldProduction (tonnes)</th>
            <th className="cell">Average Yield (kg/ha)</th>
          </tr>
        </thead>
        <tbody>
          {averages.map((crop, index) => (
            <tr key={index} className="table_row">
              <td className="cell">{crop.cropName}</td>
              <td className="cell">{crop.averageyieldProduction}</td>
              <td className="cell">{crop.averageYield}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </>
  );
}
