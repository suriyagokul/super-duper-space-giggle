import React from "react";
import { Jumbotron, Button } from "react-bootstrap";
import Layout from "./Layout";

function PaymentSuccess() {
  return (
        <div>
        <Layout> </Layout>
          <div className="home-component">
            
          <div class="fixed top-0 left-0 w-full h-full flex items-center justify-center">
  <div class="relative w-64 bg-white p-6 rounded-lg shadow-xl">
    <div class="flex items-center justify-between mb-3">
      <h2 class="text-lg font-medium">Payment Successful</h2>
      <img src="https://lh3.googleusercontent.com/u/0/d/1E40YifnCjeyQo81IWfz5SPqbUbyYf5ck=w567-h423-p-k-nu-iv1"/>
    </div>
    <p class="text-gray-600 text-base">Your payment was successful. Thank you for your purchase!</p>
    <button class="bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-600 mt-3">Close</button>
  </div>
</div>

          </div>
            
          </div>
    
  );
}

export default PaymentSuccess;

