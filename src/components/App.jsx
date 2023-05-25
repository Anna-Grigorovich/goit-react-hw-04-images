import React, { useState, useEffect } from 'react';
import getImages from '../services/Api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Modal } from './Modal/Modal';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';

// export class App extends Component {
//   state = {
//     input: '',
//     query: [],
//     error: null,
//     status: 'idle',
//     showModal: false,
//     largeImg: '',
//     page: 1,
//   };

//   componentDidUpdate(prevProps, prevState) {
//     const nextQuery = this.state.input;
//     const prevQuery = prevState.input;
//     const nextPage = this.state.page;
//     const prevPage = prevState.page;

//     if (prevQuery !== nextQuery || prevPage !== nextPage) {
//       this.setState({ status: 'pending' });
//       getImages(nextQuery, nextPage)
//         .then(({ hits }) => {
//           if (prevQuery === nextQuery) {
//             this.setState({
//               query: [...prevState.query, ...hits],
//               status: 'resolved',
//             });
//           } else {
//             this.setState({
//               query: [...hits],
//               status: 'resolved',
//             });
//           }
//         })
//         .catch(error => this.setState({ error, status: 'rejected' }));
//     }
//   }

//   formSubmit = input => {
//     if (input !== this.state.input) {
//       this.setState({ input: input.toLowerCase(), page: 1 });
//     }
//   };
//   toggleModal = () => {
//     this.setState(({ showModal }) => ({ showModal: !showModal }));
//   };
//   handleClickImg = e => {
//     const large = e.currentTarget.dataset.src;
//     this.setState({ largeImg: large, showModal: true });
//   };
//   handleClickLoad = () => {
//     this.setState(({ page }) => ({
//       page: page + 1,
//     }));
//   };

//   render() {
//     const { showModal, query, largeImg, status, error } = this.state;
//     return (
//       <>
//         <ToastContainer />
//         {status === 'rejected' && <h1>{error.message}</h1>}
//         <Searchbar formSubmit={this.formSubmit} />
//         <ImageGallery query={query} onClickImg={this.handleClickImg} />
//         {showModal && (
//           <Modal onClose={this.toggleModal}>
//             <img src={largeImg} alt="" />
//           </Modal>
//         )}
//         {status === 'pending' && <Loader />}
//         {query.length >= 12 && <Button onClick={this.handleClickLoad} />}
//       </>
//     );
//   }
// }

export function App () {
 const [input, setInput] = useState("");
 const [query, setQuery] = useState([]);
 const [error, setError] = useState(null);
 const [status, setStatus] = useState('idle');
 const [showModal, setShowModal] = useState(false);
 const [largeImg, setLargeImg] = useState("");
 const [page, setPage] = useState(1);

useEffect(()=> {
if(!input) {
  return;
}
setStatus('pending');
      getImages(input, page)
        .then(({ hits, total }) => {
          if (total === 0){
             toast.warn('Нет ничего с таким названием');
          }
        setQuery( prev => {          
          return [...prev, ...hits];
        })
        setStatus('resolved');}
        )
        .catch(error =>{ setError(error); setStatus('rejected')});
    }, [input, page])

 const formSubmit = input => {
      setInput( state => {
        if (state !== input){
          setQuery([])
          return input.toLowerCase();
        }
      })
      setPage(1)
    }
 const toggleModal = () => {
  setShowModal(!showModal);
  };

 const handleClickImg = e => {
 const large = e.currentTarget.dataset.src;
    setLargeImg(large);
    setShowModal(true);
  };

 const handleClickLoad = () => {
  setPage(state => state +1)
  };  
return (
  <>
    <ToastContainer />
    {status === 'rejected' && <h1>{error.message}</h1>}
    <Searchbar formSubmit={formSubmit} />
    <ImageGallery query={query} onClickImg={handleClickImg} />
    {showModal && (
      <Modal onClose={toggleModal}>
        <img src={largeImg} alt="" />
      </Modal>
    )}
    {status === 'pending' && <Loader />}
    {query.length >= 12 && <Button onClick={handleClickLoad} />}
  </>
);


  };



