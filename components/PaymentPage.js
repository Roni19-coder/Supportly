"use client";

import React, { useEffect, useState } from "react";
import Script from "next/script";
import { initiate } from "../actions/useractions";
import { useSearchParams } from "next/navigation";

const PaymentPage = ({ username }) => {

  const displayName = username;

  const searchParams = useSearchParams();

  const [payments, setPayments] = useState([]);

  const [showMessage, setShowMessage] = useState(false);

  const [paymentform, setPaymentform] = useState({
    name: "",
    message: "",
    amount: "",
  });

  useEffect(() => {

    const paymentdone = searchParams.get("paymentdone");

    if (paymentdone === "true") {

      setShowMessage(true);

      setTimeout(() => {
        setShowMessage(false);
      }, 4000);
    }

    getPayments();

  }, []);

  const getPayments = async () => {

    const res = await fetch(
      `/api/payments?username=${username}`
    );

    const data = await res.json();

    setPayments(data);
  };

  const handleChange = (e) => {

    setPaymentform({
      ...paymentform,
      [e.target.name]: e.target.value,
    });
  };

  const pay = async (money) => {

    if (!window.Razorpay) {

      alert("Razorpay SDK failed to load");

      return;
    }

    try {

      const order = await initiate(
        money,
        username,
        paymentform
      );

      const options = {

        key: order.key,

        amount: order.amount,

        currency: order.currency,

        name: "Supportly",

        description: "Support Creator",

        image: "/R.webp",

        order_id: order.id,

        callback_url:
          "http://localhost:3000/api/razorpay",

        prefill: {

          name: paymentform.name,

          email: "test@example.com",

          contact: "9999999999",
        },

        notes: {

          message: paymentform.message,
        },

        theme: {

          color: "#3399cc",
        },

        modal: {

          ondismiss: function () {

            setPaymentform({
              name: "",
              message: "",
              amount: "",
            });

            alert("Payment Cancelled");
          },
        },
      };

      const rzp1 =
        new window.Razorpay(options);

      rzp1.on(
        "payment.failed",
        function () {

          setPaymentform({
            name: "",
            message: "",
            amount: "",
          });

          alert("Payment Failed");
        }
      );

      rzp1.open();

    }

    catch (error) {

      console.log(error);

      setPaymentform({
        name: "",
        message: "",
        amount: "",
      });

      alert("Payment Failed");
    }
  };

  return (

    <>

      <Script src="https://checkout.razorpay.com/v1/checkout.js" />

      {

        showMessage && (

          <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 bg-green-600 text-white px-6 py-3 rounded-md shadow-lg">

            Payment Successful

          </div>
        )
      }

      {/* Cover Section */}

      <div className="cover w-full relative">

        <img
          className="object-cover w-full h-[180px] sm:h-[220px]"
          src="/hands.jpg"
          alt="cover"
        />

        {/* Profile Image */}

        <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 border-2 border-white rounded-full">

          <img
            className="rounded-full w-24 h-24 sm:w-[100px] sm:h-[100px]"
            src="/R.webp"
            alt="profile"
          />

        </div>

      </div>

      {/* Info Section */}

      <div className="info flex flex-col justify-center items-center mt-16 text-white mx-auto px-4 text-center">

        <div className="text-2xl font-bold break-all">

          @{displayName}

        </div>

        <div className="text-slate-400">

          Web Developer

        </div>

        <div className="text-sm text-slate-500 mt-2">

          {payments.length} Payments · ₹

          {

            payments.reduce(
              (total, item) =>
                total + Number(item.amount),
              0
            )
          }

          {" "}Raised

        </div>

      </div>

      {/* Payment Section */}

      <div className="payment flex flex-col lg:flex-row gap-4 justify-center items-stretch w-[95%] sm:w-[90%] max-w-5xl mx-auto my-6 min-h-[350px]">

        {/* Supporters */}

        <div className="supporter flex-1 rounded-md text-white p-4 bg-slate-800 flex flex-col h-[350px]">

          <h2 className="text-lg font-bold mb-4">

            Supporters

          </h2>

          <div className="overflow-y-auto flex-1 pr-2">

            <ul className="space-y-4 text-sm text-slate-300">

              {

                payments.length === 0 && (

                  <li>No payments yet</li>
                )
              }

              {

                payments.map((p, i) => {

                  return (

                    <li
                      key={i}
                      className="flex items-start gap-3"
                    >

                      <img
                        src="/images.png"
                        alt="user"
                        width={40}
                        className="rounded-full"
                      />

                      <span className="break-words">

                        {p.name} donated{" "}

                        <span className="font-bold">

                          ₹{p.amount}

                        </span>

                        {" "}with a message "{p.message}"

                      </span>

                    </li>
                  );
                })
              }

            </ul>

          </div>

        </div>

        {/* Make Payment */}

        <div className="makepayment flex-1 rounded-md text-white bg-slate-800 p-4 h-fit">

          <h2 className="text-lg font-bold mb-4">

            Make a Payment

          </h2>

          <div className="space-y-3">

            <input
              type="text"
              name="name"
              value={paymentform.name}
              onChange={handleChange}
              className="border border-slate-700 bg-slate-700 rounded p-2 w-full text-white"
              placeholder="Enter Name"
            />

            <input
              type="text"
              name="message"
              value={paymentform.message}
              onChange={handleChange}
              className="border border-slate-700 bg-slate-700 rounded p-2 w-full text-white"
              placeholder="Enter Message"
            />

            <input
              type="number"
              name="amount"
              value={paymentform.amount}
              onChange={handleChange}
              className="border border-slate-700 bg-slate-700 rounded p-2 w-full text-white"
              placeholder="Enter Amount"
            />

            <button
              type="button"
              onClick={() =>
                pay(paymentform.amount)
              }
              className="text-white w-full bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl font-medium rounded-md text-sm px-4 py-2.5 text-center"
            >

              Pay

            </button>

          </div>

          {/* Quick Pay */}

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-5">

            <button
              className="border border-slate-600 rounded-md p-3 hover:bg-slate-700"
              onClick={() => pay(500)}
            >

              Pay ₹500

            </button>

            <button
              className="border border-slate-600 rounded-md p-3 hover:bg-slate-700"
              onClick={() => pay(1000)}
            >

              Pay ₹1000

            </button>

            <button
              className="border border-slate-600 rounded-md p-3 hover:bg-slate-700"
              onClick={() => pay(2000)}
            >

              Pay ₹2000

            </button>

          </div>

        </div>

      </div>

    </>
  );
};

export default PaymentPage;