import React from 'react';
import styles from './RoundNameText.module.scss';

const RoundNameText = (props) => {
  const { index, setName } = props
  const ordinalIndicator = ['st', 'nd', 'th'] // less than 10
  return (
    <h2 className={styles.set}>{setName !== 'oi' ? `${setName} ${index + 1}` : (index > 2 ? `${index + 1} ${ordinalIndicator[2]}`  : `${index + 1}${ordinalIndicator[index]}`)}</h2>
  )
}

export default RoundNameText;