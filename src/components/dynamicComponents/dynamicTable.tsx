import {
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button,
    Stack,
    Box,
} from '@mui/material'
import { Icon } from '@iconify/react/dist/iconify.js';
import { useEffect, useRef, useState } from 'react';
import { CmsCardBody } from '../shareds/cmsCardBody';
import { ToastHelper } from '../../commons/helpers/toastHelpers';
import { IResultControl, IResultDataControl } from '../../commons/base/baseResultControl';
import { Formik,Form,FormikState, useFormik, FormikProps } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';




export interface DynamicTableProp<TRequest,TResposne> {
    /**
     * Tablo üzerindeki başlık
     */
    Title:string;
    /**
     * Yeni bir kayıt ekle buttonuna basıldığında aktif olacak html/form tasarımı.
     */
    AddFormHtml:()=>JSX.Element;
    AddFormSubmitHandlerAsync:(values:TRequest | any)=>Promise<any>;
    /**
     * Tablo içerisinde güncelleme işlemi sonrası aktif olacak html/form tasarımı.
     * @param data Tabloda güncelleme işlemi yapılmak istenen kayıt.
     * @returns 
     */
    UpdateHtml:(data:TResposne)=>JSX.Element;
    UpdateFormSubmitHandlerAsync:(values:TRequest | any)=>Promise<IResultControl>;
    UpdateFormHtmlAfterHandlerAsync?:(values:TRequest | any)=>Promise<void>;
    /**
     * Tabloda silme işlemi tetiklendiğinde çalıştırılacak method
     * @param event 
     * @param data Tabloda silme işlemi yapılmak istenen kayıt.
     * @returns 
     */
    DeleteHandlerAsync:(event:React.MouseEvent<HTMLButtonElement>,data:TResposne)=>Promise<void>;
    /**
     * Tablonun header alanı
     */
    TableHeadHtml:JSX.Element;
    /**
     * Tablonun oluşturulacak satır içeriği
     * @param data Satır kayıtları
     * @returns 
     */
    TableRow:(data:TResposne)=>JSX.Element;
    GetDataServiceAsync:()=>Promise<IResultDataControl<Array<TResposne>>>;
    ValidationSchema:Yup.AnyObject;
    InitialValues:TRequest;
    UseStateData:TRequest
}


export const DynamicTable = (props:DynamicTableProp<any,any>):JSX.Element => {
    const [updateHtmlShow,setUpdateHtmlShow] = useState<boolean>(false);
    const [addHtmlShow,setAddHtmlShow] = useState<boolean>(false);
    const [updateHtml,setUpdateHtml] = useState<JSX.Element>(<></>);
    const [updateButtonShow,setUpdateButtonShow] = useState<boolean>(true);
    const [addButtonShow,setAddButtonShow] = useState<boolean>(true);
    const [dataLoading,setDataLoading] = useState<number>(0);
    const updateFormik = useRef<FormikProps<any>>(null);

    const data = useRef(new Array<any>);
    const GetDataServiceAsyncHandlerAsync = async () =>{
        await props.GetDataServiceAsync().then(x=>{
            if(!x.isSuccess){
                ToastHelper.Error(<>An unexpected technical problem occurred!</>);
                return x.data;
            }else{           
                data.current = x.data;
            }
        }).catch(x=>{
            ToastHelper.Error(<>An unexpected technical problem occurred!</>);
        }).finally(()=>{
            setDataLoading(dataLoading+1);
        })
        
    }

    useEffect(()=>{
        GetDataServiceAsyncHandlerAsync();
    },[]);
   

    const updateButtonClickHandler = (data:any)=>{
        setAddHtmlShow(false);
        setUpdateHtmlShow(true);
        setUpdateButtonShow(false);
        setAddButtonShow(false);
        setUpdateHtml(props.UpdateHtml(data));
        
    }

    const deleteButtonClickHandlerAsync = async (event:React.MouseEvent<HTMLButtonElement>,data:any) =>{
        ToastHelper.YesNoToast({content:(<>Silmek istiyor musun ?</>),yesHandlerAsync:async ()=>{
            await props.DeleteHandlerAsync(event,data);
            await GetDataServiceAsyncHandlerAsync();
        }})

    }

    const UpdateFormSubmitHandlerAsync = async (values:any,resetForm:(nextState?: Partial<FormikState<any>> | undefined) => void)=>{
        await props.UpdateFormSubmitHandlerAsync(values).then(x=>{
            if(x && x.isSuccess){
                ToastHelper.Success(<>Güncelleme işlemi başarılı</>);
                UpdateHtmlCencelHandler();
            }else{
                ToastHelper.Error(<>Beklenmedik teknik bir problem yaşandı !</>);
            }

            if(props.UpdateFormHtmlAfterHandlerAsync){
                props.UpdateFormHtmlAfterHandlerAsync(values);
            }
        });
        await GetDataServiceAsyncHandlerAsync();
        resetForm();
    }


    const UpdateHtmlCencelHandler = ()=>{
        setUpdateButtonShow(true);
        setUpdateHtmlShow(false);
        setAddButtonShow(true);
    }
    const UpdateHtml = ():JSX.Element=>{
        
        return (
            <CmsCardBody xlCol={12} xxlCol={12}>
                <Box sx={{width:"100%"}}>
                    <Formik 
                        innerRef={updateFormik}
                        initialValues={props.UseStateData}
                        validationSchema={props.ValidationSchema}
                        onSubmit={async (values,{resetForm} )=>{await UpdateFormSubmitHandlerAsync(values,resetForm);}}>
                        {({ resetForm  }) => (
                            <Form>
                                {updateHtml}
                                <Stack 
                                    direction="row" 
                                    spacing={2}
                                    justifyContent={'flex-end'}
                                    sx={{margin:"15px 0px 10px 0px"}}
                                    >
                                    <Button variant="outlined" size="small" color="error" onClick={UpdateHtmlCencelHandler} >İptal</Button>
                                    <Button type='submit' variant="outlined" size="small" color="success" >Güncelle</Button>
                                </Stack>
                            </Form>
                        )}
                    </Formik>
                </Box>
            </CmsCardBody>
        );
    }

    const addButtonClickHandler = (event:React.MouseEvent<HTMLButtonElement>)=>{
        setUpdateHtmlShow(false);
        setUpdateButtonShow(false);
        setAddHtmlShow(true);
    }

    const AddFormSubmitHandlerAsync = async (values:any,resetForm:(nextState?: Partial<FormikState<any>> | undefined) => void)=>{
        await props.AddFormSubmitHandlerAsync(values);
        document.querySelectorAll(".MuiAutocomplete-clearIndicator")?.forEach(x=>{
            if(x as HTMLElement){
                const selectClear = x as HTMLElement;
                selectClear.click();
            }
        })
        await GetDataServiceAsyncHandlerAsync();
        resetForm();
    }

    const AddHtml = ():JSX.Element=>{
        const AddHtml = props.AddFormHtml();
        const AddHtmlCencelHandler = ()=>{
            setUpdateButtonShow(true);
            setAddHtmlShow(false);
        }
        return (
            <CmsCardBody xlCol={12} xxlCol={12}>
                <Box sx={{width:"100%"}}>
                    <Formik 
                        initialValues={props.InitialValues}
                        validationSchema={props.ValidationSchema} 
                        onSubmit={async (values,{resetForm} )=>{await AddFormSubmitHandlerAsync(values,resetForm);}}>
                        {({ resetForm  }) => (
                            <Form>
                                {AddHtml}
                                <Stack 
                                    direction="row" 
                                    spacing={2}
                                    justifyContent={'flex-end'}
                                    sx={{margin:"15px 0px 10px 0px"}}
                                    >
                                    <Button variant="outlined" size="small" color="error" onClick={AddHtmlCencelHandler} >İptal</Button>
                                    <Button variant="outlined" size="small" type='submit' color="success" >Kaydet</Button>
                                </Stack>
                            </Form>
                        )}
                    </Formik>
                </Box>
            </CmsCardBody>
        );
    }

    const rowCount = 1;
    return (<>
        {
            (dataLoading) ?
            (
                <>
                    {(updateHtmlShow?<>Güncelle</>:"")}
                    {(addHtmlShow?<>Yeni Ekle</>:"")}
                    {(updateHtmlShow?UpdateHtml():"")}
                    {(addHtmlShow?AddHtml():"")}
                    
                    <CmsCardBody xlCol={12} xxlCol={12}>
                        <TableContainer>
                            <Stack direction="row" alignItems="center"  justifyContent={"space-between"}>
                                <Typography> {props.Title} </Typography>
                                <Stack direction="row" spacing={2}>
                                    {
                                        dataLoading<=30?(<Button variant="contained" size="small" color="primary" onClick={()=>{GetDataServiceAsyncHandlerAsync();ToastHelper.Success(<>Veriler çekildi.</>);}} ><Icon icon="material-symbols:refresh" width="24" height="24"  style={{color: "#fff"}} /></Button>):("")
                                    }
                                    
                                    {
                                        addButtonShow ? (<Button variant="contained" size="small" color="success" onClick={addButtonClickHandler} endIcon={<Icon icon="akar-icons:pencil" width="24" height="24"  />}>Yeni Ekle</Button>):""
                                    }
                                </Stack>
                                
                            </Stack>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Adet</TableCell>
                                        {props.TableHeadHtml}
                                        <TableCell align="right">İşlem</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        data.current.map((x,i)=>(
                                            <TableRow key={i}>
                                                <TableCell>{rowCount+i}</TableCell>
                                                {props.TableRow(x)}
                                                <TableCell align="right">
                                                    <Stack direction="row-reverse" spacing={2}  alignItems="flex-end">
                                                        {
                                                            updateButtonShow ? (<Button variant="outlined" size="small"  onClick={(e)=>updateButtonClickHandler(x)} endIcon={<Icon icon="akar-icons:pencil" width="24" height="24"  />}>Güncelle</Button>):""
                                                        }
                                                        <Button variant="outlined" size="small"  onClick={async (e)=>await deleteButtonClickHandlerAsync(e,x)}  color="error"  endIcon={<Icon icon="weui:delete-filled" width="24" height="24"  style={{color: "error"}} />}>Sil</Button>
                                                    </Stack>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </CmsCardBody>
                </>
                
            ):(
                <Stack sx={{width:"100%",padding:"0px",margin:"0px"}} direction="column" alignContent="center" alignItems="center" justifyContent="center">
                    <Typography>Yükleniyor ...</Typography>
                    <Box  sx={{ display: 'flex', margin:"0px",padding:"0px",justifyContent: 'center', alignItems: 'center', height: '300px' }}>
                        <Icon icon="svg-spinners:ring-resize" width="75" height="75" style={{color:"dark"}} />
                    </Box>
                </Stack>
            )
        }
    </>);
}