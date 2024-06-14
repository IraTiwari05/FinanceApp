import DashboardBox from '../../components/DashboardBox';
import { useGetKpisQuery, useGetProductsQuery } from '../../state/api';
import { ResponsiveContainer,LineChart, XAxis, YAxis,ZAxis, Tooltip,Line,CartesianGrid,PieChart,Pie, Cell, ScatterChart, Scatter } from 'recharts';
import BoxHeader from '../../components/BoxHeader';
import { useTheme } from '@emotion/react';
import { useMemo } from 'react';
import { FlexBetween } from '../../components/FlexBetween';
import { Box, Typography } from '@mui/material';

const pieData=[
  {name:"Group A", value:600},
  {name:"Group B", value:400},
]


const Row2 = () => {
  const{data: productData}=useGetProductsQuery();
  const {data:operationalData}=useGetKpisQuery();
  const theme: any = useTheme();
  const palette=theme.palette;
  const pieColors=[palette.primary[800],palette.primary[300]]
  const operationalExpenses=useMemo(()=>{
    return(
      operationalData &&
      operationalData[0].monthlyData.map(({ month, operationalExpenses, nonOperationalExpenses }) => {
        return {
          name: month.substring(0, 3),
          "Operational Expenses":operationalExpenses,
           "Non-Operational Expenses":nonOperationalExpenses,
        };
      })
    );
  },[operationalData]);
  const productExpenseData=useMemo(()=>{
    return(
      productData &&
      productData.map(({ _id,price,expense }) => {
        return {
          id:_id,
          price:price,
          expense:expense,
        };
      })
    );
  },[productData]);
  return (
    <>
      <DashboardBox gridArea="d">
      <BoxHeader 
      title="Operational vs Non-Operational Expenses"        
      sideText='+4%'
      />
      <ResponsiveContainer width="100%" height="100%">
        <LineChart    
          data={operationalExpenses}
          margin={{
            top: 20,
            right: 0,
            left: -10,
            bottom: 20,
          }}
        >
          
         
          <CartesianGrid vertical={false} stroke={palette.grey[800]} />
          <XAxis dataKey="name" tickLine={false} style={{ fontSize: "10px" }} />
          <YAxis yAxisId="left" orientation='left' tickLine={false} axisLine={false} style={{ fontSize: "10px" }} />
          <YAxis yAxisId="right" orientation='right' tickLine={false} axisLine={false} style={{ fontSize: "10px" }} />
          <Tooltip />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="Non-Operational Expenses"
            stroke={palette.tertiary[500]}
          />
          <Line
             yAxisId="right"
             type="monotone"
             dataKey="Operational Expenses"
             stroke={palette.primary.main}
          />
        </LineChart>
      </ResponsiveContainer>
      </DashboardBox>
      
      <DashboardBox gridArea="e">
     <BoxHeader title='Campaigns and Targets' sideText='+4%'/>
     <FlexBetween mt='0.25rem' gap='1.5rem' pr='1rem'>
      <PieChart width={110} height={100} margin={{
        top:-40,
        right:10,
        left:10,
        bottom:0
      }} >
        <Pie
          stroke='none'
          data={pieData}
          innerRadius={15}
          outerRadius={30}
          paddingAngle={2}
         dataKey="value"
        >
          {pieData.map(( entry,index) => (
            <Cell key={`cell-${entry}`} fill={pieColors[index]} />
          ))}
        </Pie>

      </PieChart>
      <Box ml='-0.7rem' marginTop='-2.5rem' flexBasis="40%" textAlign='center'>
         <Typography variant="h5" >Target Sales</Typography>
         <Typography m='0.3rem 0' variant='h3' color={palette.primary[300]} >83</Typography>
         
      </Box>
      <Box  flexBasis="40%" mt='-3.5rem' mr='1rem'>
         <Typography variant="h5" >Losses in Revenue</Typography>
         <Typography variant='h6'>Losses are down 25%</Typography>
         <Typography mt='0.4rem' variant='h5'  >Profit Margins</Typography>
         <Typography variant='h6'>Margins are up by 30% from last month</Typography>
      </Box>
      </FlexBetween>

      </DashboardBox>
      <DashboardBox gridArea="f" >
      <BoxHeader title='Product Prices vs Expenses' sideText='+4%'></BoxHeader>

      <ResponsiveContainer width="100%" height='100%'>
        
        <ScatterChart
          margin={{
            top: 10,
            right: 30,
            bottom: 20,
            left: -15,
          }}
        >
          <CartesianGrid  stroke={palette.grey[800]}/>
          <XAxis type="number" dataKey="price" name="price" axisLine={false} tickLine={false} style={{fontSize:"10px"}}tickFormatter={(v)=>`$${v}`}/>
          <YAxis type="number" dataKey="expense" name="expense" axisLine={false} tickLine={false} style={{fontSize:"10px"}}tickFormatter={(v)=>`$${v}`}/>
          <ZAxis type="number" range={[20]} />
          <Tooltip formatter={(v)=>`$${v}`} />
          <Scatter name="Product Expense Ratio" data={productExpenseData} fill={palette.tertiary[500]} />
        </ScatterChart>
      </ResponsiveContainer>
      </DashboardBox>
    </>
  );
};

export default Row2;
