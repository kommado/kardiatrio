import {Dispatch, ReactNode, SetStateAction} from "react";
import * as yup from "yup";
import {useFormik} from "formik";
import {Typography, Paper, Button, Box} from "@mui/material";

export function ApplicationForm(children: ReactNode, currentStep: number, setActiveStep: Dispatch<SetStateAction<number>>)  {
    const validationSchema = yup.object({});

    const formik = useFormik({
        initialValues: {},
        validationSchema: validationSchema,
        onSubmit: (values) => {
            setActiveStep(currentStep + 1)
            console.log(values)
        },
    });

    return (
        <Paper elevation={2}>
            <Typography sx={{mt: 2, mb: 1}} variant="h4">Application config</Typography>
            <form onSubmit={formik.handleSubmit}>
                {children}
            </form>
        </Paper>
    )
}