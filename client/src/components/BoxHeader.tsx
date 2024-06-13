import { useTheme } from "@emotion/react";
import { Box,Typography } from "@mui/material";
import { FlexBetween } from "./FlexBetween";

type Props={
    icon?:React.ReactNode;
    title:string;
    sideText:string;

};

const BoxHeader=({icon,title,sideText} :Props)=>{
    const {palette}=useTheme();

    return(
    <FlexBetween color={palette.grey[400] }
    margin="0.5rem 1rem 0 1rem">
     <FlexBetween>
        {icon}
        <Box width="100%">
          <Typography variant="h4" mb="-0.1rem">
            {title}
          </Typography>
        </Box>
     </FlexBetween>
     <Typography variant="h5" fontWeight="700" color={palette.secondary[500]}>
        {sideText}
     </Typography>
    </FlexBetween>
    )
}
export default BoxHeader