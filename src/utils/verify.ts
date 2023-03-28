// 正则表达式
const regs = {
  email: /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/,
  number: /^([0] | [1 - 9][0 - 9]*)$/,
  password: /^(?=.*\d)(?=.*[a-zA-Z])[\da-zA-Z~!@#$%^&*_]{8,18}$/,
};

const verify = (rule: any, value: any, reg: any, callback: any) => {
  if (value) {
    if (reg.test(value)) {
      callback();
    } else {
      callback(new Error(rule.message));
    }
  } else {
    callback();
  }
};

export default {
  email: (rule: any, value: any, callback: any) => {
    return verify(rule, value, regs.email, callback);
  },
  number: (rule: any, value: any, callback: any) => {
    return verify(rule, value, regs.number, callback);
  },
  password: (rule: any, value: any, callback: any) => {
    return verify(rule, value, regs.password, callback);
  },
};

// const verify = {
//   email: (rule: any, value: any, callback: any) => {
//     const regpEmail = /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/;
//     if (value) {
//       if (regpEmail.test(value)) {
//         callback();
//       } else {
//         callback(new Error(rule.message));
//       }
//     } else {
//       callback();
//     }
//   },
//   number: (rule: any, value: any, callback: any) => {
//     const regpNumber = /^([0] | [1 - 9][0 - 9]*)$/;
//     if (value) {
//       if (regpNumber.test(value)) {
//         callback();
//       } else {
//         callback(new Error(rule.message));
//       }
//     } else {
//       callback();
//     }
//   },
//   password: (rule: any, value: any, callback: any) => {
//     const regpPassword = /^(?=.[0-9])(?=.[a-zA-Z])(?=.*[^a-zA-Z0-9]).{8,18}$/;
//     if (value) {
//       if (regpPassword.test(value)) {
//         callback();
//       } else {
//         callback(new Error(rule.message));
//       }
//     } else {
//       callback();
//     }
//   },
// };

// export default verify;
