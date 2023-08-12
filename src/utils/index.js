export const saveLocalstorage = (value) => {
  return new Promise((res, rej) => {
    if (value.amount % 2 === 0) {
      const interval = setTimeout(() => {
        localStorage.setItem("form", JSON.stringify(value));

        res({ success: true });
        clearInterval(interval);
      }, 1000);
    } else {
      rej({ success: false });
    }
  });
};

export const debounce = (func, wait, immediate) => {
  let timeout;

  return function executedFunction() {
    const context = this;
    const args = arguments;

    const later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };

    const callNow = immediate && !timeout;

    clearTimeout(timeout);

    timeout = setTimeout(later, wait);

    if (callNow) func.apply(context, args);
  };
};
