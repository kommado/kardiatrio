import {Dispatch, ReactNode, SetStateAction, useState} from "react";
import * as yup from "yup";
import {useFormik} from "formik";
import {SubmitProfile} from "../../../wailsjs/go/main/App";
import {
    Box,
    Button,
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Paper,
    TextField,
    Typography
} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {main} from "../../../wailsjs/go/models";
import Profile = main.Profile;

export function ProfileForm(children: ReactNode, currentStep: number, setActiveStep: Dispatch<SetStateAction<number>>) {
    const validationSchema = yup.object({});

    const formik = useFormik({
        initialValues: Profile.createFrom({}),
        validationSchema: validationSchema,
        onSubmit: (values) => {
            SubmitProfile(values).finally(() => (setActiveStep(currentStep + 1)))

        },
    });

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    return (
        <Paper elevation={2}>
            <Typography sx={{mt: 2, mb: 1}} variant="h4">User information</Typography>
            <form onSubmit={formik.handleSubmit}>
                <TextField
                    fullWidth
                    id="first_name"
                    name="first_name"
                    label="First Name"
                    sx={{m: 1, width: '50%'}}
                    value={formik.values.first_name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.first_name && Boolean(formik.errors.first_name)}
                    helperText={formik.touched.first_name && formik.errors.first_name}
                />

                <TextField
                    fullWidth
                    id="last_name"
                    name="last_name"
                    label="Last Name"
                    sx={{m: 1, width: '50%'}}
                    value={formik.values.last_name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.last_name && Boolean(formik.errors.last_name)}
                    helperText={formik.touched.last_name && formik.errors.last_name}
                />

                <TextField
                    fullWidth
                    id="email"
                    name="email"
                    label="Email"
                    sx={{m: 1, width: '50%'}}
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                />

                <FormControl sx={{m: 1, width: '50%'}} variant="outlined">
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <OutlinedInput
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff/> : <Visibility/>}
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Password"
                    />
                </FormControl>
                {children}
            </form>
        </Paper>
    )

}