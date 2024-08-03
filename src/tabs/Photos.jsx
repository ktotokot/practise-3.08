// import { getPhotos } from 'apiService/photos';
import { Form, Text } from 'components';
import { useEffect, useState } from 'react';

export const Photos = () => {
  const [query, setQuery] = useState('')
const [page, setPage] = useState(1)
const [images, setImages] = useState([])


useEffect(()=> {
const fetchImages = async() => {

}



}, [])

const onHandleSubmit = (searchQuery) => {
setQuery(searchQuery)




}

  return (
    <>
    <Form onSubmit={onHandleSubmit}/>
      <Text textAlign="center">Let`s begin search 🔎</Text>
    </>
  );
};
