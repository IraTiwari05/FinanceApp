import { useMemo } from 'react';
import DashboardBox from '../../components/DashboardBox';
import { useGetKpisQuery } from '../../state/api';
import { ResponsiveContainer, AreaChart,LineChart,BarChart, Bar, XAxis, YAxis, Tooltip, Area, Legend,Line,CartesianGrid } from 'recharts';
import { useTheme } from '@emotion/react';
import BoxHeader from '../../components/BoxHeader';


const Row1 = () => {
  const theme: any = useTheme();
  const palette = theme.palette;
  const { data } = useGetKpisQuery();
  console.log("data:", data);

  const revenueExpenses = useMemo(() => {
    return (
      data &&
      data[0].monthlyData.map(({ month, revenue, expenses }) => {
        return {
          name: month.substring(0, 3),
          revenue: revenue,
          expenses: expenses,
        };
      })
    );
  }, [data]);
  const revenueProfit = useMemo(() => {
    return (
      data &&
      data[0].monthlyData.map(({ month, revenue, expenses }) => {
        return {
          name: month.substring(0, 3),
          revenue: revenue,
         profit:(revenue-expenses).toFixed(2),
        };
      })
    );
  }, [data]);
  const  revenue= useMemo(() => {
    return (
      data &&
      data[0].monthlyData.map(({ month, revenue }) => {
        return {
          name: month.substring(0, 3),
          revenue: revenue,
        };
      })
    );
  }, [data]);

  return (
    <>
      <DashboardBox gridArea="a">
      
     

        <BoxHeader 
        title="Revenue and Expenses"        
        sideText='+4%'
        />
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            width={500}
            height={400}
            data={revenueExpenses}
            margin={{
              top: 15,
              right: 25,
              left: -10,
              bottom: 15,
            }}
          >
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={palette.primary.main} stopOpacity={0.5} />
                <stop offset="95%" stopColor={palette.primary.main} stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={palette.secondary.main} stopOpacity={0.5} />
                <stop offset="95%" stopColor={palette.secondary.main} stopOpacity={0} />
              </linearGradient>
            </defs>
            
            <XAxis dataKey="name" tickLine={false} style={{ fontSize: "10px" }} />
            <YAxis tickLine={false} axisLine={{ strokeWidth: "0" }} style={{ fontSize: "10px" }} domain={[8000, 23000]} />
            <Tooltip />
            <Legend align='left' verticalAlign='top' iconType="circle" iconSize={8} wrapperStyle={{marginTop:-15, marginLeft:25, fontSize:12}} />

            <Area
              type="monotone"
              dataKey="revenue"
              dot={true}
              stroke={palette.primary.main}
              fillOpacity={1}
              fill="url(#colorRevenue)"
            />
            <Area
              type="monotone"
              dataKey="expenses"
              dot={true}
              stroke={palette.secondary.main}
              fillOpacity={1}
              fill="url(#colorExpenses)"
            />
          </AreaChart>
        </ResponsiveContainer>
        </DashboardBox>
   
        {/*2nd Chart */}
    
      <DashboardBox gridArea="b" >
    

      <BoxHeader 
      title="Profit and Revenue"        
      sideText='+4%'
      />
      <ResponsiveContainer width="100%" height="100%">
        <LineChart    
          data={revenueProfit}
          margin={{
            top: 20,
            right: 0,
            left: -10,
            bottom: 20,
          }}
        >
          
         
          <CartesianGrid vertical={false} stroke={palette.grey[800]} />
          <XAxis dataKey="name" tickLine={false} style={{ fontSize: "10px" }} />
          <YAxis yAxisId="left" tickLine={false} axisLine={false} style={{ fontSize: "10px" }} />
          <YAxis yAxisId="right" orientation='right' tickLine={false} axisLine={false} style={{ fontSize: "10px" }} />
          <Tooltip />
          <Legend height={20} wrapperStyle={{
            margin: '0 0 10px 0'
          }} />

          <Line
            yAxisId="left"
            type="monotone"
            dataKey="profit"
            stroke={palette.tertiary[500]}
          />
          <Line
             yAxisId="right"
             type="monotone"
             dataKey="revenue"
             stroke={palette.primary.main}
          />
        </LineChart>
      </ResponsiveContainer>
      </DashboardBox>
 
       {/*3rd Box */}  

      <DashboardBox gridArea="c">
      <BoxHeader 
          title="Revenue Month by Month"        
          sideText='+4%'
          />
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
          width={500}
          height={300}
          data={revenue}
          margin={{
            top: 17,
            right: 15,
            left: -5,
            bottom: 35,
          }}
        >
          <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={palette.primary.main} stopOpacity={0.5} />
                <stop offset="95%" stopColor={palette.primary.main} stopOpacity={0} />
                </linearGradient>
          </defs>
          
          <CartesianGrid vertical={false} stroke={palette.grey[800]} />
          <XAxis dataKey="name" axisLine={false} tickLine={false} style={{fontSize:"10px"}}/>
          <YAxis  axisLine={false} tickLine={false} style={{fontSize:"10px"}} />
          <Tooltip wrapperStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.75)', padding: '0px', color: '#fff' }} contentStyle={{ color: "#71f5de" }} />
    
          <Bar dataKey="revenue" fill="url(#colorRevenue)"  />
        </BarChart>
      </ResponsiveContainer>
    
      
      </DashboardBox>
    </>
  );
};

export default Row1;


/*import React from 'react';
import { useMemo } from 'react';
import DashboardBox from '../../components/DashboardBox';
import { useGetKpisQuery } from '../../state/api';
import { ResponsiveContainer, AreaChart, LineChart, BarChart, Bar, XAxis, YAxis, Tooltip, Area, Legend, Line, CartesianGrid, TooltipProps } from 'recharts';
import { useTheme } from '@emotion/react';
import BoxHeader from '../../components/BoxHeader';

interface CustomTooltipProps extends TooltipProps<number, string> {}

// Custom Tooltip Component
const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.75)', border: '1px solid #ccc', padding: '5px', color: '#fff' }}>
        <p>{label}</p>
        <p>{`${payload[0].name} : ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

const Row1 = () => {
  const theme = useTheme();
  const palette = theme.palette;
  const { data } = useGetKpisQuery();
  console.log("data:", data);

  const revenueExpenses = useMemo(() => {
    return (
      data &&
      data[0].monthlyData.map(({ month, revenue, expenses }) => {
        return {
          name: month.substring(0, 3),
          revenue: revenue,
          expenses: expenses,
        };
      })
    );
  }, [data]);

  const revenueProfit = useMemo(() => {
    return (
      data &&
      data[0].monthlyData.map(({ month, revenue, expenses }) => {
        return {
          name: month.substring(0, 3),
          revenue: revenue,
          profit: (revenue - expenses).toFixed(2),
        };
      })
    );
  }, [data]);

  const revenue = useMemo(() => {
    return (
      data &&
      data[0].monthlyData.map(({ month, revenue }) => {
        return {
          name: month.substring(0, 3),
          revenue: revenue,
        };
      })
    );
  }, [data]);

  return (
    <>
      <DashboardBox gridArea="a">
       
        <BoxHeader title="Revenue and Expenses" sideText="+4%" />
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            width={500}
            height={400}
            data={revenueExpenses}
            margin={{
              top: 15,
              right: 25,
              left: -10,
              bottom: 15,
            }}
          >
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={palette.primary.main} stopOpacity={0.5} />
                <stop offset="95%" stopColor={palette.primary.main} stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={palette.secondary.main} stopOpacity={0.5} />
                <stop offset="95%" stopColor={palette.secondary.main} stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="name" tickLine={false} style={{ fontSize: "10px" }} />
            <YAxis tickLine={false} axisLine={{ strokeWidth: "0" }} style={{ fontSize: "10px" }} domain={[8000, 23000]} />
            <Tooltip content={<CustomTooltip />} />
            <Legend align="left" verticalAlign="top" iconType="circle" iconSize={8} wrapperStyle={{ marginTop: -15, marginLeft: 25, fontSize: 12 }} />
            <Area type="monotone" dataKey="revenue" dot={true} stroke={palette.primary.main} fillOpacity={1} fill="url(#colorRevenue)" />
            <Area type="monotone" dataKey="expenses" dot={true} stroke={palette.secondary.main} fillOpacity={1} fill="url(#colorExpenses)" />
          </AreaChart>
        </ResponsiveContainer>
      </DashboardBox>

     
      <DashboardBox gridArea="b">
        <BoxHeader title="Profit and Revenue" sideText="+4%" />
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={revenueProfit}
            margin={{
              top: 20,
              right: 0,
              left: -10,
              bottom: 20,
            }}
          >
            <CartesianGrid vertical={false} stroke={palette.grey[800]} />
            <XAxis dataKey="name" tickLine={false} style={{ fontSize: "10px" }} />
            <YAxis yAxisId="left" tickLine={false} axisLine={false} style={{ fontSize: "10px" }} />
            <YAxis yAxisId="right" orientation="right" tickLine={false} axisLine={false} style={{ fontSize: "10px" }} />
            <Tooltip content={<CustomTooltip />} />
            <Legend height={20} wrapperStyle={{ margin: '0 0 10px 0', fontSize: '12px' }} />
            <Line yAxisId="left" type="monotone" dataKey="profit" stroke={palette.tertiary[500]} />
            <Line yAxisId="right" type="monotone" dataKey="revenue" stroke={palette.primary.main} />
          </LineChart>
        </ResponsiveContainer>
      </DashboardBox>

   
      <DashboardBox gridArea="c">
        <BoxHeader title="Revenue Month by Month" sideText="+4%" />
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={revenue}
            margin={{
              top: 17,
              right: 15,
              left: -5,
              bottom: 35,
            }}
          >
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={palette.secondary[300]} stopOpacity={0.8} />
                <stop offset="95%" stopColor={palette.tertiary[300]} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke={palette.primary[300]} />
            <XAxis dataKey="name" axisLine={false} tickLine={false} style={{ fontSize: "10px" }} />
            <YAxis axisLine={false} tickLine={false} style={{ fontSize: "10px" }} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="revenue" fill="url(#colorRevenue)" />
          </BarChart>
        </ResponsiveContainer>
      </DashboardBox>
    </>
  );
};

export default Row1;*/
