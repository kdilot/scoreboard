import React from 'react';
import styles from './Button.module.scss';

//  size : [sm, md, lg]
//  <Button title={'btn'} size={'lg'} onClick={() => { console.log('event') }} />

const Button = ({
  title = 'btn',
  size = 'md',
  full = false,
  round = false,
  fontSize = '1rem',
  fontWeight,
  background,
  border,
  onClick
}) => {
  return (
    <>
      <button className={`${size === 'lg' ? styles.btn__lg : size === 'sm' ? styles.btn__sm : styles.btn__md} ${full && styles.btn__full} ${round ? styles.btn__rd : ''}`} style={{ fontSize: fontSize, background: background, fontWeight: fontWeight, border: border }} onClick={onClick}>
        {title}
      </button>
    </>
  )
}

export default Button;