import { useTheme } from "@emotion/react";
import { useMemo, useState } from "react";
import { useGetKpisQuery } from "../../state/api";
import DashboardBox from "../../components/DashboardBox";
import { FlexBetween } from "../../components/FlexBetween";
import { Box, Typography,Button } from "@mui/material";
import { CartesianGrid, Tooltip ,Legend, Line, LineChart, ResponsiveContainer, XAxis, Label } from "recharts";
import { YAxis } from "recharts";
import { DataPoint } from "regression";
import * as regression from 'regression';



const Predictions=()=>{
  const theme: any = useTheme();
  const palette=theme.palette;
    const [isPredictions, setIsPredictions]=useState(false);
    const {data:kpiData}=useGetKpisQuery();
 
    const formattedData=useMemo(()=>{
        if(!kpiData) return [];
         const monthData=kpiData[0].monthlyData;
         const formatted: Array<DataPoint>=monthData.map(({revenue},i:number)=>{
            return [i,revenue]
         }
        );
        const regressionLine=regression.linear(formatted);
        return monthData.map(({month,revenue},i:number)=>{
            return {
                name:month,
                "Actual Revenue":revenue,
                "Regression Line":regressionLine.points[i][1],
                "Predicted Revenue":regressionLine.predict(i+12)[1]
            }
        })

    },[kpiData])

    return(
        <DashboardBox width='100%' height='100%'
        p="1rem" overflow='hidden'>
          <FlexBetween m='1rem 2.5rem'>
            <Box>
            <Typography variant='h3'>Revenue and Predictions</Typography>
            <Typography variant='h6'>Charted revenue and predicted revenue based on a simple linear regression model</Typography>
            </Box>
            <Button onClick={()=>setIsPredictions(!isPredictions)}
                sx={{
                    color:palette.grey[900],
                    bgcolor:palette.primary[400],
                    boxShadow:"0.1rem 0.1rem 0.1 rem 0.1rem rgba(0,0,0,.4"
                }}
            >
                Show Predicted Revenue for Next Year
            </Button>
          </FlexBetween>
          <ResponsiveContainer width="100%" height="100%">
        <LineChart    
          data={formattedData}
          margin={{
            top: 20,
            right: 75,
            left: 20,
            bottom: 80,
          }}
        >
          
         
          <CartesianGrid strokeDasharray="3 3"  stroke={palette.grey[800]} />
          <XAxis dataKey="name" tickLine={false} style={{ fontSize: "10px" }} >
            <Label value="Month" offset={-5} position="insideBottom"></Label>
          </XAxis>
          <YAxis domain={[12000,26000]} tickFormatter={(v)=>`$${v}`} axisLine={{strokeWidth:'0'}} style={{ fontSize: "10px" }}>
            <Label value="Revenue in USD" angle={-90} offset={-5} position="insideLeft"></Label>
            </YAxis>
          <Tooltip />
          <Legend verticalAlign="top" />

          <Line
            type="monotone"
            dataKey="Actual Revenue"
            stroke={palette.primary.main}
            strokeWidth={0}
            dot={{strokeWidth:5}}
          />
          <Line
             type="monotone"
             dataKey="Regression Line"
             stroke="#8884d8"
             dot={false}
          />
          {isPredictions &&  (
            <Line
            strokeDasharray='5 5'
            dataKey="Predicted Revenue"
            stroke={palette.secondary[500]}
         />
         )}
        </LineChart>
      </ResponsiveContainer>
        </DashboardBox>
    )
};
export default Predictions;