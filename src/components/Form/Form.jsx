import { FiSearch } from 'react-icons/fi';
import style from './Form.module.css';
import { useState } from 'react';

export const Form = ({onSubmit}) => {
  const [searchQuery, setSearchQuery] = useState('')
  const handleChange = (e) => {
    setSearchQuery(e.target.value)
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!searchQuery.trim()){
      return alert('cant be empty')
    }
    onSubmit(searchQuery)
    setSearchQuery('')
  }

  
  return <form className={style.form}
  onSubmit={handleSubmit}>
  <button className={style.button} type="submit">
    <FiSearch size="16px" />
  </button>

  <input
  onChange={handleChange}
  value={searchQuery}
    className={style.input}
    placeholder="What do you want to write?"
    name="search"
    required
    autoFocus
  />
</form>;
};
