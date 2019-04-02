import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import T from 'prop-types'
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Button from '@material-ui/core/Button'

import styles from './snackbar.module.scss'

class MySnackbar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      msg: props.msg,
    }
  }

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
          <Button className={onClickUndo ? '' : styles.hideButton} key="undo" color="secondary" size="small" onClick={onClickUndo}>
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

MySnackbar.open = function(msg, onClickUndo) {
  ReactDOM.render(<MySnackbar key={Math.random()} msg={msg} onClickUndo={onClickUndo} />, document.getElementById('snackbar'))
}

export default MySnackbar
