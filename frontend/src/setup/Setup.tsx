import {createTheme, ThemeProvider} from "@mui/material/styles";
import {Box, Button, Container, CssBaseline, Paper, Stack, Step, StepLabel, Stepper, Typography} from "@mui/material";
import {Dispatch, SetStateAction, useState} from "react";
import {ProfileForm} from "./steps/Profile";
import {ApplicationForm} from "./steps/Application";
import {DataStorageForm} from "./steps/DataStorage";

const steps = ["Data Storage", "Application Basic config", "Application User"]

const navButtons = (currentStep: number, setActiveStep: Dispatch<SetStateAction<number>>) => (
    <Box sx={{display: 'flex', flexDirection: 'row', pt: 2}}>
        <Button
            onClick={() => setActiveStep(currentStep - 1)}
            color="inherit"
            disabled={currentStep == 0}
            sx={{mr: 1}}
        >
            Back
        </Button>
        <Box sx={{flex: '1 1 auto'}}/>
        <Button type="submit">
            {currentStep == steps.length - 1  ? 'Complete' : 'Next ' }
        </Button>
    </Box>
)

export function Setup() {
    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
    });

    const [activeStep, setActiveStep] = useState(0);

    const stepComponents = [
        DataStorageForm(
            navButtons(0, setActiveStep),
            0,
            setActiveStep
        ),
        ApplicationForm(
            navButtons(1, setActiveStep),
            1,
            setActiveStep
        ),
        ProfileForm(
            navButtons(2, setActiveStep),
            2,
            setActiveStep
        )
    ]


    return (
        <ThemeProvider theme={darkTheme}>
            <CssBaseline/>
            <Container maxWidth="lg" >
                <Box sx={{ width: '100%' }} textAlign="center" alignItems="center">
                    <Stack spacing={5}>
                        <Paper elevation={2}><Typography variant="h3">Setup</Typography></Paper>
                        <Stepper activeStep={activeStep}>
                            {steps.map((label, index) => {
                                    return (
                                        <Step key={index}>
                                            <StepLabel>{label}</StepLabel>
                                        </Step>
                                    );
                            })                        }

                        </Stepper>
                        {stepComponents[activeStep]}
                    </Stack>
                </Box>
            </Container>
        </ThemeProvider>
    )
}