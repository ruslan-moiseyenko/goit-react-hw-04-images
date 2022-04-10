import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import { Backdrop, ModalContent } from './modal.styed';



const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      console.log('On Modal Escape');
      this.props.onClose();
    }
  }

  handleClick = e => {
    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  }

  render() {
    return createPortal(
      <Backdrop className="modal__backdrop" onClick={this.handleClick}>
        <ModalContent className="modal__content">
          {this.props.children}
        </ModalContent>
      </Backdrop>,
      modalRoot,
    );
  }
}
