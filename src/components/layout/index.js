import React, { Fragment } from 'react'
import clsx from 'clsx'
import { useTheme } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import Button from '@material-ui/core/Button'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import InboxIcon from '@material-ui/icons/MoveToInbox'
import MailIcon from '@material-ui/icons/Mail'
import AccountCircle from '@material-ui/icons/AccountCircle'
import useStyles from './styles'
import LoginDialog from '../forms/login'
import RegisterDialog from '../forms/register'

export default function MiniDrawer({ children }) {
  const classes = useStyles()
  const theme = useTheme()
  const [open, setOpen] = React.useState(false)
  const [openLogin, setLoginDialog] = React.useState(false)
  const [openRegister, setRegisterDialog] = React.useState(false)
  const login = false

  function handleDrawerOpen() {
    setOpen(true)
  }
  function handleDrawerClose() {
    setOpen(false)
  }
  function handleLoginDialogOpen() {
    setLoginDialog(true)
  }
  function handleLoginDialogClose() {
    setLoginDialog(false)
  }
  function handleRegisterDialogOpen() {
    setRegisterDialog(true)
  }
  function handleRegisterDialogClose() {
    setRegisterDialog(false)
  }

  return (
    <div className={classes.root}>
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open
        })}
      >
        <Toolbar>
          {login && (
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, {
                [classes.hide]: open
              })}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" noWrap>
            Cinema Studio
          </Typography>
          <div className={classes.grow} />
          {!login ? (
            <Fragment>
              <Button disableRipple color="secondary" onClick={handleLoginDialogOpen} className={classes.btnLogin} size="small">
                Login
              </Button>
              <Button color="secondary" onClick={handleRegisterDialogOpen} variant="outlined" size="small">
                Register
              </Button>
            </Fragment>
          ) : (
            <IconButton edge="end" aria-haspopup="true" color="inherit">
              <AccountCircle />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
      {login && (
        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open
            })
          }}
          open={open}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={handleDrawerClose}>{theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}</IconButton>
          </div>
          <Divider />
          <List>
            {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
              <ListItem classes={{ gutters: classes.listGutters }} button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Drawer>
      )}
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <LoginDialog
          open={openLogin}
          onOpen={handleLoginDialogOpen}
          onClose={handleLoginDialogClose}
          onRegisterOpen={() => {
            setLoginDialog(false)
            setRegisterDialog(true)
          }}
        />
        <RegisterDialog
          open={openRegister}
          onOpen={handleRegisterDialogOpen}
          onClose={handleRegisterDialogClose}
          onLoginOpen={() => {
            setRegisterDialog(false)
            setLoginDialog(true)
          }}
        />
        {children}
      </main>
    </div>
  )
}
