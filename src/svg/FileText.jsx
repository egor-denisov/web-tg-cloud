import * as React from "react";

const Icon = ({
  size = 48,
  strokeWidth = 1.5,
  color = "currentColor",
  ...props
}) => (
  <svg
    width={size}
    height={size}
    fill="none"
    stroke={color}
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={strokeWidth}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M7.75 19.25h8.5a2 2 0 0 0 2-2V9L14 4.75H7.75a2 2 0 0 0-2 2v10.5a2 2 0 0 0 2 2Z" />
    <path d="M18 9.25h-4.25V5" />
    <path d="M9.75 15.25h4.5" />
    <path d="M9.75 12.25h4.5" />
  </svg>
);

export default Icon;
