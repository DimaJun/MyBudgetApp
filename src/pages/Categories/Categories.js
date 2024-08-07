import { useState, useEffect } from "react";

import styles from "./Categories.module.scss";

import manageIcon from "../../assets/icons/plus.svg";

import { CategoriesModal } from "./components/CategoriesModal";

import 'react-toastify/ReactToastify.css';
import { ToastContainer, toast, Bounce} from "react-toastify";

export const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const storedCategories =
      JSON.parse(localStorage.getItem("categories")) || [];
    if (storedCategories) {
      setCategories(storedCategories);
    }
  }, []);

  const notifyDuplicate = () =>
    toast("Such a category already exists!", {
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

  const handleAddCategory = (categoryName) => {
    if (categories.includes(categoryName)) {
      notifyDuplicate();
      return;
    }

    const newCategories = [...categories, categoryName];
    setCategories(newCategories);
    localStorage.setItem("categories", JSON.stringify(newCategories));
    setIsModalOpen(false);
  };

  return (
    <div className={styles.Categories}>
      <div className="wrapper">
        <div className={styles.CategoriesWrapper}>
          <h2 className={styles.CategoriesTitle}>Categories</h2>
          <ul className={styles.CategoriesList}>
            {categories.length > 0 ? (
              categories.map((category, index) => (
                <li key={index} className={styles.CategoriesListItem} title={category}>
                  {category.length > 30 ? `${category.slice(0, 31)}..` : category}
                </li>
              ))
            ) : (
              <li className={styles.CategoriesListItem}>
                No categories available
              </li>
            )}
          </ul>
          <button
            className={styles.CategoriesOpenModal}
            type="button"
            onClick={() => setIsModalOpen(true)}
          >
            <img src={manageIcon} alt="add category" width={25} height={25} />
            <span>Add category</span>
          </button>
        </div>
      </div>
      {isModalOpen && (
        <CategoriesModal
          onAddCategory={handleAddCategory}
          onClose={() => setIsModalOpen(false)}
        />
      )}
      <ToastContainer/>
    </div>
  );
};
