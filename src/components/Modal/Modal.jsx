import { useEffect } from 'react';
import c from './Modal.module.css';
import PropTypes from 'prop-types';

export const Modal = ({onClose, children}) => {
 useEffect (() => {
  window.addEventListener('keydown', handleEsc);
  return () => {
  window.removeEventListener('keydown', handleEsc);
  }
 })
  
 const handleEsc = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };
 const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

    return (
      <div className={c.overlay} onClick={handleBackdropClick}>
        <div className={c.modal}>{children}</div>
      </div>
    );
  
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.any.isRequired,
};




// export class Modal extends Component {
//   componentDidMount() {
//     window.addEventListener('keydown', this.handleEsc);
//   }
//   componentWillUnmount() {
//     window.removeEventListener('keydown', this.handleEsc);
//   }
//   handleEsc = e => {
//     if (e.code === 'Escape') {
//       this.props.onClose();
//     }
//   };
//   handleBackdropClick = e => {
//     if (e.currentTarget === e.target) {
//       this.props.onClose();
//     }
//   };
//   render() {
//     return (
//       <div className={c.overlay} onClick={this.handleBackdropClick}>
//         <div className={c.modal}>{this.props.children}</div>
//       </div>
//     );
//   }
// }