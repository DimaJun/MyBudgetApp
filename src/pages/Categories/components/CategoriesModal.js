import { useState } from "react";
import styles from "./CategoriesModal.module.scss";
import { toast, Bounce } from "react-toastify";

export const CategoriesModal = ({ onAddCategory, onClose }) => {
  const [categoryName, setCategoryName] = useState("");

  const notifyEmpty = () =>
    toast("Category name cannot be empty!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (categoryName.trim()) {
      onAddCategory(categoryName);
      setCategoryName("");
    } else {
      notifyEmpty();
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.Modal} onClick={(e) => handleOverlayClick(e)}>
      <div className={styles.ModalContent}>
        <h3 className={styles.ModalTitle}>Add New Category</h3>
        <form onSubmit={handleSubmit}>
          <input
            className={styles.ModalInput}
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            placeholder="Category name"
          />
          <div className={styles.ModalFormButtons}>
            <button className={styles.ModalSubmit} type="submit">
              Add
            </button>
            <button className={styles.ModalClose} onClick={onClose}>
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
