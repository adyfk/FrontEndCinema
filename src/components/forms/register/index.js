import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import Grid from '@material-ui/core/Grid'
import Slide from '@material-ui/core/Slide'
import useStyles from './styles'
import { TextField, DialogTitle, Typography } from '@material-ui/core'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

export default function Component({ open, onClose, onOpen, onLoginOpen }) {
  const classes = useStyles()
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: ''
  })
  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value })
  }
  return (
    <Dialog open={open} TransitionComponent={Transition} keepMounted onClose={onClose} maxWidth="xs">
      <Typography fontSize="small" className={classes.btnClose} onClick={onClose}>
        _
      </Typography>
      {/* <Close  /> */}
      <div className={classes.body}>
        <DialogTitle>Register</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item lg={12} md={12}>
              <TextField
                InputLabelProps={{ shrink: true }}
                className={classes.TextField}
                fullWidth
                label="Nama"
                value={values.name}
                onChange={handleChange('name')}
                margin="normal"
              />
            </Grid>
            <Grid item lg={12} md={12}>
              <TextField
                InputLabelProps={{ shrink: true }}
                className={classes.TextField}
                fullWidth
                label="Email"
                value={values.email}
                onChange={handleChange('email')}
                margin="normal"
              />
            </Grid>
            <Grid item lg={12} md={12}>
              <TextField
                InputLabelProps={{ shrink: true }}
                className={classes.TextField}
                type="password"
                fullWidth
                label="Password"
                value={values.password}
                onChange={handleChange('password')}
                margin="normal"
              />
            </Grid>
            <Grid item lg={12} md={12}>
              <div className={classes.pT10} />
              <Button color="primary" fullWidth size="large" variant="outlined">
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
