import Image from "next/image";
import Modal from 'react-modal'; // Importing react-modal
import { useState } from 'react';

import styles from './resumeModal.module.css';

export const ResumeModal = ({ isButton }: { isButton: boolean }) => {
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
                className={`${styles.resumeModal} max-w-[100%] md:h-[95vh] md:w-[auto] flex items-center overflow-auto`}
                ariaHideApp={false}
                overlayClassName={styles.resumeModal__overlay}
            >
                <button onClick={closeModal} className={styles.resumeModal__closeButton}>X</button>
                <Image
                    src="/resume.svg"
                    alt="Santiago"
                    className={styles.modal__mainImage}
                    width={400}
                    height={900}
                />
            </Modal>
        </>
    )
}