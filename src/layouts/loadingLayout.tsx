import { DefaultLayout } from "./defaultLayout";
import { Stack,Typography,Box } from "@mui/material";
import { Icon } from '@iconify/react/dist/iconify.js';

export interface LoadingLayoutProps{
    isLoading:boolean;
    children:React.ReactNode;
}


export const LoadingLayout = (props:LoadingLayoutProps):JSX.Element =>{
    return (<>
        <DefaultLayout>
            
            {(props.isLoading ?
                <Stack sx={{width:"100%",padding:"0px",margin:"0px"}} direction="column" alignContent="center" alignItems="center" justifyContent="center">
                    <Typography>Yükleniyor ...</Typography>
                    <Box  sx={{ display: 'flex', margin:"0px",padding:"0px",justifyContent: 'center', alignItems: 'center', height: '300px' }}>
                        <Icon icon="svg-spinners:ring-resize" width="75" height="75" style={{color:"dark"}} />
                    </Box>
                </Stack>
                :
                props.children
            )}
        </DefaultLayout>
    </>);
}