import * as React from 'react';
import {TextField, Box, styled, Typography, createTheme, ThemeProvider, Stack} from "@mui/material";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {useEffect} from "react";

// Theme Augmentation Required for TS -- https://mui.com/x/react-date-pickers/getting-started/#typescript
import type {} from '@mui/x-date-pickers/themeAugmentation';

// Declare Props & Types
export interface DateRangePickerProps {
    theme?: any;
    startLabelText?: string;
    endLabelText?: string;
    // External State MGMT 👇
    externalStateStartDate?: any | Date;
    externalStateEndDate?: any | Date;
    // Seek to improve these types in next iteration
    // To be used primarily as redux actions dispatching new start and end date states
    externalStateSetStartDateDispatch?: any;
    externalStateSetEndDateDispatch?: any;
}

const DateRangePicker = (props: DateRangePickerProps) => {

    // Declare Component States
    const dayjs = require('dayjs')

    const [startDate, setStartDate] = React.useState<any | null >(dayjs(JSON.stringify(dayjs().year()) + "-01-01"))
    const [endDate, setEndDate] = React.useState<any | null >(dayjs())

    const [openStart, setOpenStart] = React.useState<boolean>(false)
    const [openEnd, setOpenEnd] = React.useState<boolean>(false)

    // Design System Theme
    const theme = props.theme ? props.theme : createTheme({
        palette: {
            primary: {
                main: "#241743",
                light: "#EBE2FF"
            }
        }
    })

    // Styled Components
    const LabelText = styled(Typography)(({theme}) => ({
        fontSize: `12px`,
        textAlign: `left`,
        fontWeight: 600,
        color: theme.palette.grey["600"],
    }))

    const DateTextField = styled(TextField)(({theme}) => ({
        '& .MuiInputBase-root': {
            borderRadius: 50,
            fontWeight: 400,
            marginTop: `5px`,
            fontSize: `12px`,
            padding: `0px`,
            color: theme.palette.grey["700"],
            textAlign: 'center',
        },
        '& .open': {
            backgroundColor: theme.palette.primary.light + "!important",
        },
        '& .MuiInputBase-input': {
            padding: `15px 10px`,
            textAlign: 'center',
            borderRadius: `50px`,
            backgroundColor: theme.palette.grey["50"],
            '&:hover': {
                backgroundColor: theme.palette.primary.light,
            },
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: theme.palette.grey["300"],
            },
            '&:hover fieldset': {
                borderColor: theme.palette.grey["300"],
                color: theme.palette.grey["700"],
            },
            '&.Mui-focused fieldset': {
                borderColor: theme.palette.primary.main,

            },
        },
    }))

    useEffect(() => {
        let startTextField = document.querySelector('#start-date-text-field')
        let endTextField = document.querySelector('#end-date-text-field')
        // Change the class based on whether the dialog is open or not
        openStart ? startTextField?.classList.add('open') : startTextField?.classList.add('closed')
        openEnd ? endTextField?.classList.add('open') : endTextField?.classList.add('closed')
    })

    return (
        <ThemeProvider theme={theme}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Box sx={{display: `flex`, justifyContent: `space-between`, width: `100%`}}>
                    <Stack sx={{position: `relative`}}>
                        <LabelText>{props.startLabelText? props.startLabelText : "Start Date"}</LabelText>
                        <DatePicker
                            PaperProps={{sx: {boxShadow: 0, border: `1px solid ${theme.palette.grey['300']}`}}}
                            PopperProps={{disablePortal: true, sx: {top: `0 !important`, transform: `translate(0px, 80px) !important`}}}
                            open={openStart}
                            InputAdornmentProps={{style: { display: 'none' }}}
                            onOpen={() => setOpenStart(true)}
                            onClose={() => setOpenStart(false)}
                            // Should try to control the value and on change props better so that redux usage is forced
                            // Users should not be able to set an external start date without setting a dispatch for the start date
                            views={['year', 'month', 'day']}
                            value={props.externalStateStartDate ? props.externalStateStartDate: startDate}
                            inputFormat={'LL'}
                            onChange={(newValue) => {
                                props.externalStateSetStartDateDispatch ? props.externalStateSetStartDateDispatch : setStartDate(newValue);
                            }}
                            renderInput={(params) => (
                                <DateTextField
                                    id={'start-date-text-field'}
                                    {...params} onClick={(e) => setOpenStart(true)}/>
                            )}
                            disableFuture
                            minDate={dayjs('2010-01-01')}
                            maxDate={dayjs()}
                        />
                    </Stack>
                    <Stack sx={{position: `relative`}}>
                        <LabelText>{props.endLabelText? props.endLabelText : "End Date"}</LabelText>
                        <DatePicker
                            PaperProps={{sx: {boxShadow: 0, border: `1px solid ${theme.palette.grey['300']}`}}}
                            PopperProps={{disablePortal: true, sx: {top: `0 !important`, inset: `auto !important`, right: `0 !important`, transform: `translate(0px, 80px) !important`}}}
                            value={props.externalStateEndDate ? props.externalStateEndDate: endDate}
                            onChange={(newValue) => {
                                props.externalStateSetEndDateDispatch ? props.externalStateSetEndDateDispatch : setEndDate(newValue);
                            }}
                            open={openEnd}
                            InputAdornmentProps={{style: { display: 'none' }}}
                            onOpen={() => setOpenEnd(true)}
                            onClose={() => setOpenEnd(false)}
                            renderInput={(params) => (
                                <DateTextField
                                    id={'end-date-text-field'}
                                    {...params}
                                    onClick={(e) => setOpenEnd(true)}/>
                            )}
                            disableFuture
                            inputFormat={'LL'}
                            minDate={startDate}
                            maxDate={dayjs()}
                        />
                    </Stack>
                </Box>
            </LocalizationProvider>
        </ThemeProvider>
    )
}

export default DateRangePicker;