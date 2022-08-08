// Import Statements
import * as React from 'react';
import {useState, useEffect} from "react";
import {Box, Container, styled, Typography, Button, createTheme, ThemeProvider} from "@mui/material";

// Declare Types
export interface CookiesProps {
    color: string;
}

const CookiesBanner = (props: CookiesProps) => {

    const [cookieConsent, setCookieConsent] = useState<boolean>(false);

    const getCookieValue = (name: string) => (
        document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)')?.pop() || ''
    )

    useEffect(() => {

        const documentCookiesConsent = getCookieValue('CookieConsent') === "true"

        setCookieConsent(documentCookiesConsent)

    }, [cookieConsent])

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {

        const target = event.target as HTMLButtonElement;

        event.preventDefault();

        let expires = "expires=" + new Date(new Date().setDate(new Date().getDate() + 365)).toUTCString();

        // Logic
        if (target.id === "reject-button") {
            document.cookie = `CookieConsent=false;${expires}`
            setCookieConsent(false)
            document.getElementById('#cookies-container')!.style.display = 'none';
        } else if (target.id === "accept-button") {
            document.cookie = `CookieConsent=true;${expires}`
            setCookieConsent(true)
        }
    }

    const myTheme = createTheme({
        palette: {
            primary: {
                main: props.color,
            }
    }})

    const CookiesContainer = styled(Container)(({theme}) => ({
        maxWidth: `90%`,
        backgroundColor: `#fff`,
        display: `flex`,
        justifyContent: `space-between`,
        alignItems: `center`,
        borderRadius: `5px`,
        boxShadow: `0px 8px 15px 0px rgba(0, 0, 0, 0.10)`,
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        position: `fixed`,
        bottom: theme.spacing(2),
        left: 0,
        right: 0,
        marginLeft: `auto`,
        marginRight: `auto`,
        zIndex: `10000000`
    }))

    const CookiesButtonFlex = styled(Box)(({theme}) => ({
        display: `flex`,
        [theme.breakpoints.down('sm')] : {
            flexDirection: `column-reverse`,
            flexWrap: `wrap`,
            gap: `.5em`
        }
    }))

    const CookiesTextBox = styled(Box)(() => ({
        display: `flex`,
        flexDirection: `column`,
    }))

    const CookiesText = styled(Typography)(({theme}) => ({
        fontSize: `14px`,
        textAlign: `left`,
        fontWeight: 200,
        color: `#888888`,
        [theme.breakpoints.down('md')] : {
            fontSize: `10px`
        }
    }))

    const CustomButton = styled(Button)(({theme}) => ({
        width: `max-content !important`,
        minWidth: `150px`,
        fontSize: `12px`,
        height: `min-content`,
        marginLeft: theme.spacing(1),
        [theme.breakpoints.down('md')] : {
            fontSize: `10px`,
            minWidth: `145px`,
        },
        [theme.breakpoints.down('sm')] : {
            fontSize: `8px`,
            minWidth: `125px`,
        }
    }))
    if (!cookieConsent) {
        return (
            <ThemeProvider theme={myTheme}>
            <CookiesContainer id={"cookies-container"}>
                <CookiesTextBox>
                    <CookiesText>This site uses cookies.</CookiesText>
                    <CookiesText>By continuing to browse you are agreeing to the use of cookies detailed in our <span style={{textDecoration: 'underline'}}><a href={"https://ubdc.ac.uk/privacy-and-cookies/"} rel="noreferrer" target={"_blank"}>privacy policy</a>.</span></CookiesText>
                </CookiesTextBox>
                <CookiesButtonFlex>
                    <CustomButton id={"reject-button"} onClick={handleClick} variant={'outlined'}>No Thanks</CustomButton>
                    <CustomButton id={"accept-button"} onClick={handleClick} variant={'contained'}>{"That's OK"}</CustomButton>
                </CookiesButtonFlex>
            </CookiesContainer>
            </ThemeProvider>
        );
    } else {
        return <></>
    }
}

export default CookiesBanner;