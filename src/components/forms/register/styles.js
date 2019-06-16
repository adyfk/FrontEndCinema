import { makeStyles } from '@material-ui/core/styles'
export default makeStyles(() => ({
  btnClose: {
    position: 'absolute',
    right: 15,
    cursor: 'pointer',
    color: 'grey',
    '&Actived': {
      color: 'red'
    },
    fontWeight: 700
  },
  TextField: {
    marginTop: 0
  },
  body: {
    width: 368,
    paddingTop: 15,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 10
  },
  pT10: {
    paddingTop: 10
  },
  linkDaftar: {
    fontWeight: 700,
    cursor: 'pointer'
  }
}))
