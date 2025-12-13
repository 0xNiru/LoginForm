const naya_account = document.getElementById("naya_acc_banao");
if (naya_account) {
  naya_account.addEventListener("click", () => {
    window.location.href = "signup.html";
  });
}
document.getElementById("signupForm").addEventListener("submit", async (e) => {
  e.preventDefault();

const dd = document.getElementById("date").value;
const mm = document.getElementById("month").value;
const yyyy = document.getElementById("year").value;

const dob = `${yyyy}-${mm.padStart(2, "0")}-${dd.padStart(2, "0")}`;

const mail = document.getElementById("signup_wala_mail").value;
const pswd = document.getElementById("signup_wala_passwd").value;
const first_name = document.getElementById("first_name").value;
const last_name = document.getElementById("last_name").value;

const intejaar_karo = await fetch("http://localhost:3000/signup", {
  method: "POST",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded"
  },
  body: new URLSearchParams({
    mail,
    pswd,
    first_name,
    last_name,
    dob
  })
});

const dikhao = await intejaar_karo.json();

if (dikhao.success) {
    window.location.href = "/login.html";
  } else {
    alert(dikhao.error);
  }
});