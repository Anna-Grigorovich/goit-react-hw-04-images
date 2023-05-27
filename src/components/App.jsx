import React, { useState, useEffect } from 'react';
import getImages from '../services/Api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Modal } from './Modal/Modal';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';

export function App() {
  const [input, setInput] = useState('');
  const [query, setQuery] = useState([]);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');
  const [showModal, setShowModal] = useState(false);
  const [largeImg, setLargeImg] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (!input) {
      return;
    }
    setStatus('pending');
    getImages(input, page)
      .then(({ hits, total }) => {
        if (total === 0) {
          toast.warn('Нет ничего с таким названием');
        }
        setQuery(prev => {
          return [...prev, ...hits];
        });
        setStatus('resolved');
      })
      .catch(error => {
        setError(error);
        setStatus('rejected');
      });
  }, [input, page]);

  const formSubmit = newInput => {
    if (newInput !== input) {
      setQuery([]);
      setInput(newInput.toLowerCase());
      setPage(1);
    }
    // setInput( state => {
    //   if (state !== input){
    //     setQuery([])
    //     return input.toLowerCase();
    //   }
    // })
    // setPage(1)
  };
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleClickImg = e => {
    const large = e.currentTarget.dataset.src;
    setLargeImg(large);
    setShowModal(true);
  };

  const handleClickLoad = () => {
    setPage(state => state + 1);
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
}
