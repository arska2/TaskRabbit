import { Box, Button, FormHelperText, TextField } from "@mui/material"
import React from "react"
import ImageUploader from "../images/ImageUploader"



export const EditProfile = () => {
    const [newPassword, setNewPassword] = React.useState('')
    const [confirmPassword, setConfirmPassword] = React.useState('')
    const [error, setError] = React.useState(false)


    const handleNewPassWordChange = (event) => {
        setNewPassword(event.target.value)
        setError(false)
    }

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value)
        setError(false)
    }

    const onOkButtonClicked = () => {
        if (newPassword !== confirmPassword) {
            setError(true)
        } else {
            console.log('Change things')
        }
    }


    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>





                <Box
                    component="form"
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        '& .MuiTextField-root': { m: 1, width: '100%' },
                        '& .MuiButton-root': { m: 1, width: '100%' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <h2>Change Password</h2>

                    <TextField
                        id="outlined-password-input"
                        label="Current password"
                        type="password"
                        autoComplete="current-password"
                    />
                    <TextField
                        id="outlined-password-input"
                        label="New password"
                        type="password"
                        autoComplete="current-password"
                        value={newPassword}
                        onChange={handleNewPassWordChange}
                    />
                    <TextField
                        id="outlined-password-input"
                        label="Confirm password"
                        type="password"
                        autoComplete="current-password"
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                        error={error}
                    />
                    {error && <FormHelperText error>Passwords do not match</FormHelperText>}
                    <Button variant="contained" onClick={onOkButtonClicked}>OK</Button>
                </Box>



            </div>
            <div>
                <h2>Change Profile Picture</h2>
                <ImageUploader imageType={"profile"} />
                <h2>Change Header Image</h2>
                <ImageUploader imageType={"header"} />
            </div>
        </div>


    )

}