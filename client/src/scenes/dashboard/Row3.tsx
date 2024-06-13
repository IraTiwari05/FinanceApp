/*import { DataGrid, GridCellParams } from '@mui/x-data-grid';
import DashboardBox from '../../components/DashboardBox';
import { useGetKpisQuery, useGetProductsQuery, useGetTransactionsQuery } from '../../state/api';
import BoxHeader from '../../components/BoxHeader';
import { useTheme } from '@emotion/react';
import { FlexBetween } from '../../components/FlexBetween';
import{Box,Typography,} from "@mui/material";
import { Cell, Pie, PieChart } from 'recharts';
import { useMemo } from 'react';

const Row3 = () => {
  const {palette}=useTheme();
  const pieColors=[palette.primary[800],palette.primary[500]];
  const{data:kpiData}=useGetKpisQuery();
 const {data:productData}=useGetProductsQuery(); 
const {data:transactionData}=useGetTransactionsQuery();

const pieChartData = useMemo(() => {
  if (kpiData) {
    const totalExpenses = kpiData[0].totalExpenses;
    return Object.entries(kpiData[0].expensesByCategory).map(
      ([key, value]) => {
        return [
          {
            name: key,
            value: value,
          },
          {
            name: `${key} of Total`,
            value: totalExpenses - value,
          },
        ];
      }
    );
  }
}, [kpiData]);


const productColumns=[
  {
    field:"_id",
    headerName:"_id",
    flex:1,
  },
  {
    field:"expense",
    headerName:"Expense",
    flex:0.5,
    renderCell:(params:GridCellParams)=>`$${params.value ?? 'N/A'}`,
  },
  {
    field:"price",
    headerName:"Price",
    flex:0.5,
    renderCell:(params:GridCellParams)=>`$${params.value ?? 'N/A'}`,
  },
];
const transactionColumns=[
  {
    field:"_id",
    headerName:"_id",
    flex:1,
  },
  {
    field:"buyer",
    headerName:"Buyer",
    flex:0.67,
  },
  {
    field:"amount",
    headerName:"Amount",
    flex:0.35,
    renderCell:(params:GridCellParams)=>`$${params.value  ?? 'N/A'}`,
  },
  {
    field:"productIds",
    headerName:"Count",
    flex:0.35,
    renderCell:(params:GridCellParams)=>(params.value as Array<string> )?.length ?? 'N/A',
  },
];
console.log("transactionData",transactionData);

  return (
    <>
      <DashboardBox gridArea="g" >
      <BoxHeader title="List of Products" sideText={`${productData?.length ?? 0} products`}></BoxHeader>
      <Box 
      mt='0.5rem'
      p='0 0.5rem'
      height='75%'
      sx={{
        "& .MuiDataGrid-root":{
          color:palette.grey[300],
          border:"none"
        },
        "& .MuiDataGrid-cell":{
            borderBottom:`1px solid ${palette.grey[800]}!important`,
        },
        "& .MuiDataGrid-columnHeaders":{
          borderBottom:`1px solid ${palette.grey[800]}!important`,
        },
        "& .MuiDataGrid-columnSeparator":{
          visibilty:"hidden",        },       
      }}
      ><DataGrid
      columnHeaderHeight={25}
      rowHeight={35}
      hideFooter={true}
        rows={productData || [] }
        columns={productColumns}
      ></DataGrid></Box>
      
      </DashboardBox>


      <DashboardBox gridArea="h">
        
      <BoxHeader title="Recent Orders" sideText={`${transactionData?.length} latest transactions`}></BoxHeader>
      <Box 
      mt='1rem'
      p='0 0.5rem'
      height='80%'
      sx={{
        "& .MuiDataGrid-root":{
          color:palette.grey[300],
          border:"none"
        },
        "& .MuiDataGrid-cell":{
            borderBottom:`1px solid ${palette.grey[800]}!important`,
        },
        "& .MuiDataGrid-columnHeaders":{
          borderBottom:`1px solid ${palette.grey[800]}!important`,
        },
        "& .MuiDataGrid-columnSeparator":{
          visibility:"hidden",        },       
      }}
      ><DataGrid
      columnHeaderHeight={25}
      rowHeight={35}
      hideFooter={true}
        rows={transactionData || [] }
        columns={transactionColumns}
      ></DataGrid></Box>
      </DashboardBox>
     

      <DashboardBox gridArea="i">
       <BoxHeader title="Expenses By Category" sideText='+4%'>  </BoxHeader>
          <FlexBetween mt='0.5rem' gap='0.5rem' p='0 0rem' textAlign='center' flexWrap='wrap'>
          {pieChartData?.map((data,i)=>(

<Box key={`${data[0].name}-${i}`} >
<PieChart width={110} height={100} margin={{top:-55}} >
   <Pie
      stroke='none'
      data={data}
      innerRadius={15}
      outerRadius={20}
      paddingAngle={2}
     dataKey="value"
    >
     {data.map((entry, index) => (
        <Cell key={`cell-${index}`} fill={pieColors[index]} />
  ))}
</Pie>

</PieChart>
<Typography variant='h5'>{data[0].name}</Typography>
</Box>
          ))}
            
          </FlexBetween>
      </DashboardBox>
      <DashboardBox gridArea="j" />
    </>
  );
};

export default Row3;*/
import { DataGrid, GridCellParams } from '@mui/x-data-grid';
import DashboardBox from '../../components/DashboardBox';
import { useGetKpisQuery, useGetProductsQuery, useGetTransactionsQuery } from '../../state/api';
import BoxHeader from '../../components/BoxHeader';
import { useTheme } from '@emotion/react';
import { FlexBetween } from '../../components/FlexBetween';
import { Box, Typography } from "@mui/material";
import { Cell, Pie, PieChart } from 'recharts';
import { useMemo } from 'react';

const Row3 = () => {
  const { palette } = useTheme();
  const pieColors = [palette.primary[800], palette.primary[500]];
  const { data: kpiData } = useGetKpisQuery();
  const { data: productData } = useGetProductsQuery();
  const { data: transactionData } = useGetTransactionsQuery();

  const pieChartData = useMemo(() => {
    if (kpiData) {
      const totalExpenses = kpiData[0].totalExpenses;
      return Object.entries(kpiData[0].expensesByCategory).map(
        ([key, value]) => {
          return [
            {
              name: key,
              value: value,
            },
            {
              name: `${key} of Total`,
              value: totalExpenses - value,
            },
          ];
        }
      );
    }
  }, [kpiData]);

  const productColumns = [
    {
      field: "_id",
      headerName: "_id",
      flex: 1,
    },
    {
      field: "expense",
      headerName: "Expense",
      flex: 0.5,
      renderCell: (params: GridCellParams) => `$${params.value ?? 'N/A'}`,
    },
    {
      field: "price",
      headerName: "Price",
      flex: 0.5,
      renderCell: (params: GridCellParams) => `$${params.value ?? 'N/A'}`,
    },
  ];

  const transactionColumns = [
    {
      field: "_id",
      headerName: "_id",
      flex: 1,
    },
    {
      field: "buyer",
      headerName: "Buyer",
      flex: 0.67,
    },
    {
      field: "amount",
      headerName: "Amount",
      flex: 0.35,
      renderCell: (params: GridCellParams) => `$${params.value ?? 'N/A'}`,
    },
    {
      field: "productIds",
      headerName: "Count",
      flex: 0.35,
      renderCell: (params: GridCellParams) => (params.value as Array<string>)?.length ?? 'N/A',
    },
  ];

  return (
    <>
      <DashboardBox gridArea="g">
        <BoxHeader title="List of Products" sideText={`${productData?.length ?? 0} products`} />
        <Box
          mt='0.5rem'
          p='0 0.5rem'
          height='75%'
          sx={{
            "& .MuiDataGrid-root": {
              color: palette.grey[300],
              border: "none"
            },
            "& .MuiDataGrid-cell": {
              borderBottom: `1px solid ${palette.grey[800]}!important`,
            },
            "& .MuiDataGrid-columnHeaders": {
              borderBottom: `1px solid ${palette.grey[800]}!important`,
            },
            "& .MuiDataGrid-columnSeparator": {
              visibility: "hidden",
            },
          }}
        >
          <DataGrid
            columnHeaderHeight={25}
            rowHeight={35}
            hideFooter={true}
            rows={productData || []}
            columns={productColumns}
          />
        </Box>
      </DashboardBox>

      {/* 2nd BOX */}

      <DashboardBox gridArea="h">
        <BoxHeader title="Recent Orders" sideText={`${transactionData?.length} latest transactions`} />
        <Box
          mt='1rem'
          p='0 0.5rem'
          height='80%'
          sx={{
            "& .MuiDataGrid-root": {
              color: palette.grey[300],
              border: "none"
            },
            "& .MuiDataGrid-cell": {
              borderBottom: `1px solid ${palette.grey[800]}!important`,
            },
            "& .MuiDataGrid-columnHeaders": {
              borderBottom: `1px solid ${palette.grey[800]}!important`,
            },
            "& .MuiDataGrid-columnSeparator": {
              visibility: "hidden",
            },
          }}
        >
          <DataGrid
            columnHeaderHeight={25}
            rowHeight={35}
            hideFooter={true}
            rows={transactionData || []}
            columns={transactionColumns}
          />
        </Box>
      </DashboardBox>

      {/* 3rd BOX */}

      <DashboardBox gridArea="i">
        <BoxHeader title="Expenses Breakdown By Category" sideText='+4%' />
        <FlexBetween mt='2rem' gap='2px' p='0 6rem' textAlign='center' flexWrap='wrap'>
          {pieChartData?.map((data, i) => (
            <Box key={`${data[0].name}-${i}`} sx={{ margin: '-6rem', textAlign: 'center' ,width:'50%',height:'100%'}}>
              <PieChart width={110} height={50}  margin={{ top: 0, bottom: 0 }}>
                <Pie
                  stroke='none'
                  data={data}
                  innerRadius={12}
                  outerRadius={22}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={pieColors[index]} />
                  ))}
                </Pie>
              </PieChart>
              <Typography variant='subtitle2'>{data[0].name}</Typography>
            </Box>
          ))}
        </FlexBetween>
      </DashboardBox>

      <DashboardBox gridArea="j">
        <BoxHeader title="Overall Summary and Explanation Data" sideText='+4%'></BoxHeader>
        <Box height="10px" margin="0.5rem 1rem 0.4rem 1rem" bgcolor={palette.primary[800]} borderRadius='1rem'>
          <Box height="10px" bgcolor={palette.primary[600]} borderRadius='1rem' width='40%'></Box>
        </Box>
        <Typography margin="0 1rem" variant='h6'>
        o be, or not to be: that is the question: whether 'tis nobler in the mind to su
        o be, or not to be: that is the question: whether 'tis nobler in the mind to su
        </Typography>
      </DashboardBox>
    </>
  );
};

export default Row3;

