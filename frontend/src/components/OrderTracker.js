import React from "react";

export default function OrderTracker({ status }) {
  const steps = [
    "Confirmed",
    "Processing",
    "Packed",
    "Shipped",
    "Out for Delivery",
    "Delivered",
  ];

  const currentStep = steps.indexOf(status);

  return (
    <div className="my-4">
      <h5 className="mb-3">Track Order</h5>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        {steps.map((step, index) => (
          <React.Fragment key={step}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                minWidth: "90px",
              }}
            >
              <div
                style={{
                  width: "35px",
                  height: "35px",
                  borderRadius: "50%",
                  background:
                    index <= currentStep ? "#28a745" : "#d6d6d6",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: "bold",
                }}
              >
                {index <= currentStep ? "✓" : index + 1}
              </div>

              <small
                style={{
                  marginTop: "8px",
                  textAlign: "center",
                  fontWeight:
                    index <= currentStep ? "bold" : "normal",
                }}
              >
                {step}
              </small>
            </div>

            {index !== steps.length - 1 && (
              <div
                style={{
                  flex: 1,
                  height: "4px",
                  background:
                    index < currentStep ? "#28a745" : "#d6d6d6",
                  margin: "0 8px",
                }}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}