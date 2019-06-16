import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import Grid from '@material-ui/core/Grid'
import Slide from '@material-ui/core/Slide'
import useStyles from './styles'
import { TextField, DialogTitle, Typography } from '@material-ui/core'
import * as userService from '../../../services/userService'
import auth from '../../../services/authServices'
import Joi from 'joi-browser'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

export default function Component({ location, open, onClose, onOpen, onLoginOpen }) {
  const [errors, setErrors] = useState({})
  const [values, setValues] = useState({
    email: '',
    password: '',
    name: ''
  })
  const classes = useStyles()
  const schema = {
    email: Joi.string()
      .required()
      .email()
      .label('Email'),
    password: Joi.string()
      .min(6)
      .required()
      .label('Password'),
    name: Joi.string().min(6)
  }
  function validate() {
    const options = { abortEarly: false }
    const { error } = Joi.validate(values, schema, options)
    if (!error) return null
    const newErrors = {}
    for (let item of error.details) newErrors[item.path[0]] = item.message
    return newErrors
  }
  function validateProperty({ name, value }) {
    const obj = { [name]: value }
    const { error } = Joi.validate(obj, { [name]: schema[name] })
    return error ? error.details[0].message : null
  }
  const handleChange = name => event => {
    const error = { ...errors }
    const errorMessage = validateProperty({ name, value: event.target.value })
    if (errorMessage) error[name] = errorMessage
    else delete error[name]
    setErrors(error)
    setValues({ ...values, [name]: event.target.value })
  }
  function handleSubmit() {
    const error = validate()
    setErrors(error || {})
    if (error) return
    doSubmit()
  }
  async function doSubmit() {
    try {
      const { data } = await userService.register(values)
      auth.loginWithJwt(data)
      window.location = '/'
    } catch (error) {
      if (error.response || error.response.status === 400) {
        const errorX = { ...errors }
        errorX.email = error.response.data
        setErrors(errorX)
      }
    }
  }
  function renderTextField({ type = 'text', label, name }) {
    return (
      <TextField
        InputLabelProps={{ shrink: true }}
        className={classes.TextField}
        type={type}
        fullWidth
        label={label}
        value={values[name]}
        onChange={handleChange(name)}
        margin="normal"
        error={Boolean(errors[name])}
        helperText={errors[name] || ''}
      />
    )
  }
  return (
    <Dialog
      scroll="body"
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={onClose}
      maxWidth="xs"
    >
      <Typography fontSize="small" className={classes.btnClose} onClick={onClose}>
        _
      </Typography>
      {/* <Close  /> */}
      <div className={classes.body}>
        <DialogTitle>Register</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item lg={12} md={12}>
              {renderTextField({ label: 'Nama', name: 'name' })}
            </Grid>
            <Grid item lg={12} md={12}>
              {renderTextField({ label: 'Email', name: 'email' })}
            </Grid>
            <Grid item lg={12} md={12}>
              {renderTextField({ label: 'Password', name: 'password', type: 'password' })}
            </Grid>
            <Grid item lg={12} md={12}>
              <div className={classes.pT10} />
              <Button
                color="primary"
                fullWidth
                size="large"
                variant="outlined"
                onClick={handleSubmit}
              >
                Register
              </Button>
            </Grid>
            <Grid item lg={12} md={12} align="center">
              <div className={classes.pT10} />
              <Typography variant="body2">
                Sudah punya akun Cinema?{' '}
                <span className={classes.linkDaftar} onClick={onLoginOpen}>
                  Login
                </span>
              </Typography>
            </Grid>
            <Grid item lg={12} md={12} align="right">
              <Typography variant="caption">© Cinema Studio</Typography>
            </Grid>
          </Grid>
        </DialogContent>
      </div>
    </Dialog>
  )
}
