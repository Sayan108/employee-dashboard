import { TFormData } from "@/components/modalForm";
import { addNewEmployeeInList } from "@/redux/application.slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import emailjs from "@emailjs/browser";

const emailConfig = {
  EMAIL_JS_SERVICE_ID: "service_pu9zppn",
  EMAIL_JS_TEMPLATE_ID: "template_1duef7k",
  EMAIL_JS_PUBLIC_KEY: "blZslsANB0MujPRi_",
};

const useEmployeeServices = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const sendUserEmail = async (user: TFormData) => {
    try {
      const templateParams = {
        user_name: user.name,
        user_email: user.email,
        user_phone: user.phone || "N/A",
        user_role: user.role || "N/A",
        user_joiningDate: user.joiningDate,
      };
      emailjs.init({
        publicKey: emailConfig.EMAIL_JS_PUBLIC_KEY,

        blockHeadless: true,
      });

      const response = await emailjs.send(
        emailConfig.EMAIL_JS_SERVICE_ID,
        emailConfig.EMAIL_JS_TEMPLATE_ID,
        templateParams
      );

      console.log("Email sent successfully!", response);
    } catch (error) {
      console.error("Failed to send email:", error);
    }
  };

  const addNewEmployee = async (employeeData: TFormData) => {
    setLoading(true);
    try {
      dispatch(addNewEmployeeInList(employeeData));
      await sendUserEmail(employeeData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    addNewEmployee,
  };
};

export default useEmployeeServices;
