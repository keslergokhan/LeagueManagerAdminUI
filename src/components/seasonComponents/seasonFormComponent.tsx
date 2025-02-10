import { useState } from "react";
import { ReadLeagueDto } from "../../entities/dtos/leagues/readLeagueDto";
import { TableContainer,Table,TableCell,TableRow,TableHead,TableBody} from "@mui/material";
import { SeasonService } from "../../services/seasonService";
import { ToastHelper } from "../../commons/helpers/toastHelpers";
import { ReadSeasonDto } from "../../entities/dtos/seasons/readSeasonDto";

export interface SeasonFormComponentProps {
    league:ReadLeagueDto
}

export const SeasonFormComponent = (props:SeasonFormComponentProps):JSX.Element =>{

    const seasonService = new SeasonService();
    const [seasonList,setSeasonList] = useState<Array<ReadSeasonDto>>();

    seasonService.GetAllSeasonByLeagueID(props.league.id).then(x=>{
        setSeasonList(x.data);
    }).catch(x=>{
        console.log(x);
        ToastHelper.DefaultError();
    })

    const Row = (data:ReadSeasonDto,i:number):JSX.Element => {
        return (
            <TableRow key={i}>
                <TableCell>1</TableCell>
                <TableCell align="right">{data.name}</TableCell>
            </TableRow>
        );
    }

    const Body = ():JSX.Element =>{
        return (
            <>
                {seasonList?.map((x,i)=>{
                    return Row(x,i);
                })}
            </>
        );
    }

    return (
        <>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ADET</TableCell>
                            <TableCell align="right">BAŞLIK</TableCell>
                        </TableRow>
                    </TableHead>
                
                    <TableBody>
                        <Body></Body>
                    </TableBody>

                </Table>
            </TableContainer>
        </>
    );
}