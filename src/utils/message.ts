import { ElMessage } from "element-plus";

const showMessage = (msg: any, type: any, callback?: any) => {
  ElMessage({
    type: type,
    message: msg,
    duration: 2000,
    onClose: () => {
      if (callback) {
        callback();
      }
    },
  });
};
const message = {
  error: (msg: any, callback?: any) => {
    showMessage(msg, "error", callback);
  },
  success: (msg: any, callback?: any) => {
    showMessage(msg, "success", callback);
  },
  warning: (msg: any, callback?: any) => {
    showMessage(msg, "warning", callback);
  },
};

export default message;
