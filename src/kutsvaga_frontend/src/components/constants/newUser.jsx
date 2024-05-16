import BasicModal from "./basicModal"
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import Box from '@mui/material/Box';
import { TextField } from "@mui/material"
import { useEffect, useState } from "react";

const defaultInputValues = {
    userId:"",
    email:"",
    phoneNumber:""
}

function NewUser( { open, onClose } ){
    const [values, setvalues] = useState(defaultInputValues)
    const style = {
        inputField:{
            flexDirection:'column',
            display:'flex',
            marginTop:'-3px',
            marginBottom:'15px',
            '.MuiInput-root':{
                marginBottom:'20px',
            },
        },
    }
    // const handleChange = (value) => {
    //     setvalues(value)
    //     console.log(value)
    // }
    const validate = () => Yup.object().shape({
        userId: Yup.string()
        .required("User Id is required")
        .min(6, "User Id must be atleast 6  characters"),
        email:Yup.string()
        .required("Email is required")
        .email("Email is Invalid"),
        phoneNumber:Yup.string()
    });
    const {
        register,
        handleSubmit,
        formState : { errors },
    } = useForm({
        resolver: yupResolver(validate)
    })
    const addUser = (value) => {
        console.log(value)
    }
    
    useEffect(() => {
        if(open) setvalues(defaultInputValues)
    }, [open])
    function getContent(){
        return(
            <Box>
                <Box sx={style.inputField}>
                        <TextField p={3}
                            sx={{width:'100%'}}
                            placeholder="User Id"
                            label="UserId"
                            name="userId"
                            variant="standard"
                            // onChange={(e) => handleChange({...values, userId: e.target.value})}
                            {...register('userId')}
                            error={errors.userId ? true : false}
                            helperText={errors.userId?.message}
                            // value={values.userId}
                        />
                        <TextField
                            p={3}
                            sx={{width:'100%'}}
                            placeholder="Email"
                            label="Email"
                            name="email"
                            variant="standard"
                            // onChange={(e) => handleChange({...values, email: e.target.value})}
                            {...register('email')}
                            error={errors.email ? true : false}
                            helperText={errors.email?.message}
                            // value={values.email}
                        />
                        <TextField p={3}
                            sx={{width:'100%'}}
                            placeholder="Phone Number"
                            label="Phone Number"
                            name="phoneNumber"
                            variant="standard"
                            // onChange={(e) => handleChange({...values, phoneNumber: e.target.value})}
                            {...register('phoneNumber')}
                            error={errors.phoneNumber ? true : false}
                            helperText={errors.phoneNumber?.message}
                            // value={values.phoneNumber}
                        />
                    </Box>
            </Box>
        )
    }
    return(
        <BasicModal 
            open={open}
            onClose={onClose}
            title="New User"
            subTitle="Fill Out the Inputs"
            content={getContent()}
            validate={handleSubmit(addUser)}
        >

        </BasicModal>
    )
}

export default NewUser