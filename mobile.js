// ================= Mobile specific JS =================
console.log("Mobile JS loaded!");

// Optional: Auto-scroll sa conversation kapag open ang keyboard
const userInputMobile = document.getElementById('user-input');
userInputMobile.addEventListener('focus', () => {
  setTimeout(() => {
    userInputMobile.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }, 300);
});
