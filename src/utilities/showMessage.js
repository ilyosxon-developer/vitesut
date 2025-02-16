export const showMessage = (setMessage, msg) => {
    setMessage(msg);
  
    // 3 soniyadan keyin xabarni o‘chirish
    setTimeout(() => {
      setMessage("");
    }, 3000);
  };
  