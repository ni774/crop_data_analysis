import React from 'react';
import cropsData from "../data.js";
import {Table} from '@mantine/core'
import '../style/cropTable1.css';

export default function CropTable() {
    //* console.log("data----->", cropsData[0].Year)
    //* console.log("total length",cropsData.length) 

    /***********************return year in integer form from json data ************/
    const getYear = (crop) => {
        const yearString = crop.Year.substring(crop.Year.length - 4, crop.Year.length);
        const year = parseInt(yearString, 10); // Changed to parseInt for clarity
        //?  console.log("year", year);
        return year;
    }
    //* getYear(cropsData[0])

    /*********************sort data by year ************/
    const data = cropsData.sort((a, b) => {
        const yearA = getYear(a);
        const yearB = getYear(b);
        return yearA - yearB;
    });

    // const tempItem = data[922];
    // console.log(tempItem["Crop Production (UOM:t(Tonnes))"]===""?"zero":"notZero")

    /****************year wise data *************/
    const processData = (data) => {
        const yearMap = {};

        data.forEach(item => {
            const year = getYear(item);
            let production = parseFloat(item["Crop Production (UOM:t(Tonnes))"]) || 0;
            // console.log("Production", production);
            // if (isNaN(production)) { 
            //     production = 0;
            // }

            if (!yearMap[year]) {
                yearMap[year] = {
                    maxCrop: item["Crop Name"],
                    maxProduction: production,
                    minCrop: item["Crop Name"],
                    minProduction: production
                };
            } else {
                if (production > yearMap[year].maxProduction) {
                    yearMap[year].maxCrop = item["Crop Name"];
                    yearMap[year].maxProduction = production;
                }
                if (production < yearMap[year].minProduction) {
                    yearMap[year].minCrop = item["Crop Name"];
                    yearMap[year].minProduction = production;
                }
            }
        });
        return yearMap;
    };

    const yearData = processData(data);
    // console.log("yearData", yearData);

    const rows = () => Object.entries(yearData).map(([year, crops]) => (
        <Table.Tr key={year} className="table_row" >
            <Table.Td className="cell">{year}</Table.Td>
            <Table.Td className="cell">{crops.maxCrop} ({crops.maxProduction} tonnes)</Table.Td>
            <Table.Td className="cell">{crops.minCrop} ({crops.minProduction} tonnes)</Table.Td>
        </Table.Tr>
    ));

    return (
        <div className='container'>
            {/* mantine UI is not working with CRA i think so applied custom css */}
            <Table>
                <thead>
                    <Table.Tr className="table_row" style={{fontWeight: "bold"}} >
                        <Table.Td className="cell">Year</Table.Td>
                        <Table.Td className="cell">Crop with Max Production in Year</Table.Td>
                        <Table.Td className="cell">Crop with Min Production in Year</Table.Td>
                    </Table.Tr>
                </thead>
                <Table.Tbody>
                    {rows()}
                </Table.Tbody>
            </Table>
        </div>
    );
}
