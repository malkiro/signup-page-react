import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {
    Button,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl,
    FormLabel,
    FormHelperText,
    TextField,
    Checkbox,
} from '@mui/material';
import './SignUp.css';

export default function SignUp() {
    const marginTop = { marginTop: 5 }
    const initialValues = {
        name: '',
        email: '',
        gender: '',
        phoneNumber: '',
        password: '',
        confirmPassword: '',
        termsAndConditions: false
    }
    const validationSchema = Yup.object().shape({
        name: Yup.string().min(3, "It's too short").required("Required"),
        email: Yup.string().email("Enter valid email").required("Required"),
        gender: Yup.string().oneOf(["male", "female"], "Required").required("Required"),
        phoneNumber: Yup.number().typeError("Enter valid Phone Number").required('Required'),
        password: Yup.string().min(8, "Password minimum length should be 8").required("Required"),
        confirmPassword: Yup.string().oneOf([Yup.ref('password')], "Password not matched").required("Required"),
        termsAndConditions: Yup.string().oneOf(["true"], "Accept terms & conditions")
    })

    const onSubmit = (values, props) => {
        console.log(values)
        setTimeout(() => {
            props.resetForm()
            props.setSubmitting(false)
        }, 2000)
    }

    return (
        <div className='form-page'>
            <h1 style={{ textAlign: "center", marginTop: "0" }}>Sign Up here....</h1>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                {(props) => (
                    <Form>
                        <Field as={TextField} fullWidth name="name" label='Name *' size="small"
                            placeholder="Enter your name" helperText={<ErrorMessage name="name" />} />
                        <br /><br />

                        <Field as={TextField} fullWidth name="email" label='Email *' size="small"
                            placeholder="Enter your email" helperText={<ErrorMessage name="email" />} />
                        <br /><br />

                        <Field as={TextField} fullWidth name="phoneNumber" label='Phone Number  *' size="small"
                            placeholder="Enter your phone number" helperText={<ErrorMessage name="phoneNumber" />} />
                        <br /><br />

                        <Field as={TextField} fullWidth name='password' type="password" size="small"
                            label='Password  *' placeholder="Enter your password"
                            helperText={<ErrorMessage name="password" />} />
                        <br /><br />

                        <Field as={TextField} fullWidth name="confirmPassword" type="password" size="small"
                            label='Confirm Password  *' placeholder="Confirm your password"
                            helperText={<ErrorMessage name="confirmPassword" />} />
                        <br /><br />

                        <FormControl component="fieldset" style={marginTop} >
                            <FormLabel component="legend" size="small">Gender *</FormLabel>
                            < Field as={RadioGroup} aria-label="gender" name="gender" style={{ display: 'initial' }}>
                                <FormControlLabel size="small" value="female" control={<Radio />} label="Female" />
                                <FormControlLabel size="small" value="male" control={<Radio />} label="Male" />
                            </ Field>
                        </FormControl>
                        <FormHelperText><ErrorMessage name="gender"/></FormHelperText>

                        <FormControlLabel
                            control={<Field as={Checkbox} name="termsAndConditions" size="small" />}
                            label="I accept the terms and conditions. *"
                        />
                        <FormHelperText><ErrorMessage name="termsAndConditions" /></FormHelperText>
                        <br />
                        <Button type='submit' variant='contained'>Sign up</Button>

                    </Form>
                )}
            </Formik>
        </div>
    )
}
