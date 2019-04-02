import React, { Component } from 'react'
import T from 'prop-types'
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Button from '@material-ui/core/Button'

class MySnackbar extends Component {
  state = { msg: '' }

  componentWillReceiveProps = ({ msg }) => this.setState({ msg })

  handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') return
    this.setState({ msg: '' })
  }

  render = () => {
    const { msg } = this.state
    const { onClickUndo } = this.props
    return (
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        open={!!msg}
        autoHideDuration={6000}
        onClose={this.handleCloseSnackbar}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">{msg}</span>}
        action={[
          <Button key="undo" color="secondary" size="small" onClick={onClickUndo}>
            UNDO
          </Button>,
          <IconButton key="close" aria-label="Close" color="inherit" onClick={this.handleCloseSnackbar}>
            <CloseIcon />
          </IconButton>,
        ]}
      />
    )
  }
}

MySnackbar.defaultProps = {
  msg: '',
}

MySnackbar.propTypes = {
  msg: T.string,
  onClickUndo: T.func,
}

export default MySnackbar
