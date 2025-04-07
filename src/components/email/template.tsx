import * as React from "react";

interface EmailTemplateProps {
  name: string;
  email: string;
  message: string;
}

export const EmailTemplate = ({ name, email, message }: EmailTemplateProps) => (
  <div
    style={{
      fontFamily: "Arial, sans-serif",
      maxWidth: "600px",
      margin: "0 auto",
      padding: "20px",
    }}
  >
    <div
      style={{
        backgroundColor: "#f8f9fa",
        padding: "20px",
        borderRadius: "8px",
        border: "1px solid #e9ecef",
      }}
    >
      <h1
        style={{
          color: "#212529",
          fontSize: "24px",
          marginBottom: "20px",
          borderBottom: "2px solid #0d6efd",
          paddingBottom: "10px",
        }}
      >
        New Contact Form Submission
      </h1>

      <div style={{ marginBottom: "15px" }}>
        <strong style={{ color: "#495057" }}>From:</strong>
        <p style={{ margin: "5px 0", color: "#212529" }}>{name}</p>
      </div>

      <div style={{ marginBottom: "15px" }}>
        <strong style={{ color: "#495057" }}>Email:</strong>
        <p style={{ margin: "5px 0", color: "#212529" }}>{email}</p>
      </div>

      <div style={{ marginBottom: "15px" }}>
        <strong style={{ color: "#495057" }}>Message:</strong>
        <div
          style={{
            backgroundColor: "#fff",
            padding: "15px",
            borderRadius: "4px",
            marginTop: "5px",
            border: "1px solid #dee2e6",
          }}
        >
          <p style={{ margin: "0", color: "#212529", whiteSpace: "pre-wrap" }}>
            {message}
          </p>
        </div>
      </div>

      <div
        style={{
          marginTop: "20px",
          paddingTop: "15px",
          borderTop: "1px solid #dee2e6",
          fontSize: "12px",
          color: "#6c757d",
        }}
      >
        <p style={{ margin: "0" }}>
          This message was sent from your website contact form.
        </p>
      </div>
    </div>
  </div>
);
