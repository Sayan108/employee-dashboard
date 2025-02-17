import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import useEmployeeServices from "@/hooks/useEmployee";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { formatDate } from "@/utils";

// Helper function to format date
// const formatDate = (date: Date) => {
//   return date.toLocaleDateString("en-GB"); // Format as dd/mm/yyyy (can change this format)
// };

const formSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Invalid email format"),
  phone: z
    .string()
    .regex(/^\d{10,15}$/, "Phone must be 10-15 digits")
    .optional(),
  role: z.enum(["Developer", "Designer", "Manager"], {
    required_error: "Role is required",
  }),
  joiningDate: z
    .string()
    .refine(
      (date) => new Date(date) <= new Date(),
      "Joining date must be a past or current date"
    ),
});

export type TFormData = z.infer<typeof formSchema>;

const ModalForm: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TFormData>({
    resolver: zodResolver(formSchema),
  });

  const { addNewEmployee } = useEmployeeServices();

  const onSubmit = (data: TFormData) => {
    addNewEmployee(data);
    console.log("Form Data:", data);
    setIsOpen(false); // Close modal after successful submission
  };

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      {/* Open Modal Button */}
      <button onClick={() => setIsOpen(true)} style={styles.openButton}>
        + Add Employee
      </button>

      {/* Modal Overlay */}
      {isOpen && (
        <div
          style={styles.overlay}
          onClick={() => {
            reset();
            setIsOpen(false);
          }}
        >
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            {/* Close Button */}
            <button
              onClick={() => {
                reset();
                setIsOpen(false);
              }}
              style={styles.closeButton}
            >
              ×
            </button>

            <h2 style={styles.header}>Add Employee</h2>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} style={styles.form}>
              {/* Name Field */}
              <div style={styles.formGroup}>
                <label style={styles.label}>Name</label>
                <input
                  {...register("name")}
                  style={styles.input}
                  placeholder="Enter name"
                />
                {errors.name && (
                  <span style={styles.error}>{errors.name.message}</span>
                )}
              </div>

              {/* Email Field */}
              <div style={styles.formGroup}>
                <label style={styles.label}>Email</label>
                <input
                  {...register("email")}
                  style={styles.input}
                  placeholder="Enter email"
                />
                {errors.email && (
                  <span style={styles.error}>{errors.email.message}</span>
                )}
              </div>

              {/* Phone Number Field */}
              <div style={styles.formGroup}>
                <label style={styles.label}>Phone Number (Optional)</label>
                <input
                  {...register("phone")}
                  style={styles.input}
                  placeholder="Enter phone number"
                />
                {errors.phone && (
                  <span style={styles.error}>{errors.phone.message}</span>
                )}
              </div>

              {/* Role Dropdown */}
              <div style={styles.formGroup}>
                <label style={styles.label}>Role</label>
                <select {...register("role")} style={styles.input}>
                  <option value="">Select Role</option>
                  <option value="Developer">Developer</option>
                  <option value="Designer">Designer</option>
                  <option value="Manager">Manager</option>
                </select>
                {errors.role && (
                  <span style={styles.error}>{errors.role.message}</span>
                )}
              </div>

              {/* Joining Date Field using React Datepicker */}
              <div style={styles.formGroup}>
                <label style={styles.label}>Joining Date</label>
                <div
                  style={{
                    ...styles.input,
                    alignSelf: "flex-start",
                    width: "90%",
                    alignItems: "flex-start",
                  }}
                >
                  <Controller
                    name="joiningDate"
                    control={control}
                    defaultValue={formatDate(new Date().toISOString())}
                    render={({ field }) => (
                      <div style={{ alignItems: "flex-start" }}>
                        <DatePicker
                          showIcon
                          selected={field.value ? new Date(field.value) : null}
                          onChange={(date: Date | null) =>
                            field.onChange(date ? date.toISOString() : "")
                          }
                          maxDate={new Date()}
                          dateFormat="yyyy/MM/dd"
                          placeholderText="Select a date"
                        />
                      </div>
                    )}
                  />
                </div>
                {errors.joiningDate && (
                  <span style={styles.error}>{errors.joiningDate.message}</span>
                )}
              </div>

              {/* Buttons */}
              <div style={styles.buttonGroup}>
                <button type="submit" style={styles.submitButton}>
                  Submit
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  style={styles.cancelButton}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// Inline styles
const styles: Record<string, React.CSSProperties> = {
  openButton: {
    backgroundColor: "#007BFF",
    color: "white",
    padding: "10px 16px",
    borderRadius: "4px",
    border: "none",
    cursor: "pointer",
  },
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },
  modal: {
    position: "relative",
    background: "white",
    padding: "24px",
    borderRadius: "8px",
    width: "400px",
    boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.3)",
  },
  closeButton: {
    position: "absolute",
    top: "8px",
    right: "12px",
    background: "transparent",
    border: "none",
    fontSize: "20px",
    cursor: "pointer",
  },
  header: {
    marginBottom: "16px",
    fontSize: "20px",
    fontWeight: "bold",
    color: "black",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },
  label: {
    fontSize: "14px",
    fontWeight: "bold",
    alignSelf: "flex-start",
    color: "black",
  },
  input: {
    padding: "8px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    fontSize: "14px",
    color: "black",
    width: "90%",
  },
  error: {
    color: "red",
    fontSize: "12px",
    alignSelf: "flex-start",
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "12px",
  },
  submitButton: {
    backgroundColor: "#4CAF50",
    color: "white",
    padding: "10px 16px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  cancelButton: {
    backgroundColor: "#ccc",
    color: "black",
    padding: "10px 16px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default ModalForm;
