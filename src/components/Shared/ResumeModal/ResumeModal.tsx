// import Image from 'next/image';
import Modal from 'react-modal'; // Importing react-modal
import { useState } from 'react';

import styles from './resumeModal.module.css';

export const ResumeModal = (
    { 
        isButton,
    }:{ 
        isButton: boolean 
    }) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => setModalIsOpen(true);
    const closeModal = () => setModalIsOpen(false);
    return (
        <>
            {isButton == true ?
                <button onClick={openModal} className={styles.modal__button}>View my resume</button> :
                <a onClick={openModal} className={styles.modal__openLink}>My resume</a>
            }
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Resume Modal"
                className={`${styles.resumeModal} max-w-[100%] w-[90vw] md:w-[70%] h-[76vh] md:h-[98vh] flex flex-col justify-between items-center overflow-auto`}
                ariaHideApp={false}
                overlayClassName={styles.resumeModal__overlay}
            >
                <button onClick={closeModal} className={`${styles.resumeModal__closeButton} hidden md:flex`}>X</button>
                <iframe src="/Resume.pdf#zoom=100" className={`hidden md:block ${styles.modal__file}`} ></iframe>
                <iframe src="https://drive.google.com/file/d/1R-oRjCwTx6o-EJEBMV4kHcQoJya7OMyP/preview" className={`block md:hidden ${styles.modal__file}`} ></iframe>
                <div className="flex mt-16 md:hidden block">
                    <button onClick={closeModal} className={styles.resumeModal__mobileCloseButton}>Close</button>
                </div>
            </Modal>
        </>
    )
}