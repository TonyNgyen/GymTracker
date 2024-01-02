import React from 'react'
import styles from "./footer.module.css"

function Footer() {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>Tony</div>
      <div className={styles.text}>
        Tony creative thoughts agency © All rights reserved.
      </div>
    </div>
  )
}

export default Footer