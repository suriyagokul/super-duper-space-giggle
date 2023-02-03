import axios from "axios";

export default function Payment() {
  const data = axios
    .post("http://localhost:3000/razorpay", {
      // method: "POST",
    })
    .then((res) => res.json());

  const options = {
    key: "rzp_test_X1wZYb6otQHSOG",
    currency: data.currency,
    amount: 100, // In paise 100 paise --> 1Rs/- 1000 paise = 100/-
    name: "Door to Door HealthCare",
    description: "Testing First Transaction",
    image: "http://localhost:3000/logo.png",
    // callback_url: 'https://suryagokul-super-duper-space-giggle-4gx7r75rxg6hqq7j-3000.preview.app.github.dev/home',
    // redirect: true,
    order_id: data.id,
    handler: function (response) {
      alert("PAYMENT_ID : " + response.razorpay_payment_id);
      alert("ORDER_ID : " + response.razorpay_order_id);
      alert(response.razorpay_signature);
    },
    prefill: {
      name: "Surya Gokul",
      email: "peddintigokul946@gmail.com",
      contact: "8074327742",
    },
  };
  const paymentObject = new window.Razorpay(options);
  paymentObject.open();
}
