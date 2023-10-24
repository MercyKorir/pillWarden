import { useState } from "react";
import styles from "../styles/CreateMedication.module.css";

const CreateMedication = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    dosage: "",
  });

  const handleChange = (event) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className={styles.container}>
      <h1>Create Medication</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div>
          <label htmlFor="medicationName" className={styles.label}>
            Name
          </label>
          <input
            type="text"
            id="medicationName"
            name="medicationName"
            value={formData.name}
            onChange={handleChange}
            className={styles.input}
          />
        </div>
        <div>
          <label htmlFor="medicationDescription" className={styles.label}>
            Description
          </label>
          <input
            type="text"
            id="medicationDescription"
            name="medicationDescription"
            value={formData.description}
            onChange={handleChange}
            className={styles.input}
          />
        </div>
        <div>
          <label htmlFor="medicationDosage" className={styles.label}>
            Dosage
          </label>
          <input
            type="text"
            id="medicationDosage"
            name="medicationDosage"
            value={formData.dosage}
            onChange={handleChange}
            className={styles.input}
          />
        </div>
        <button type="submit" className={styles.button}>
          Add Schedule
        </button>
      </form>
    </div>
  );
};

export default CreateMedication;
