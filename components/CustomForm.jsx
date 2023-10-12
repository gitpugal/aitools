import React from "react";
import EmployeeCard from "./EmployeeCard";

const CustomForm = () => {
  const employee = [
    { name: "pugal", age: 10, emplyeeOfMont: true },
    { name: "kghj", age: 40, emplyeeOfMont: false },
    { name: "kjh", age: 10 , emplyeeOfMont: false},
    { name: "sccx", age: 60, emplyeeOfMont: false },
    { name: "yuoi", age: 10, emplyeeOfMont: false },
  ];
  const data = [
    // Insurance
    {
      name: "carinsurance",
      fields: [
        { name: "age", datatype: "number", placeholder: "Age" },
        {
          name: "Status",
          datatype: "select",
          placeholder: "Status",
          options: ["married", "unmarried"],
        },
        {
          name: "gender",
          datatype: "gender",
          placeholder: "Gender",
          options: ["male", "female"],
        },
        {
          name: "drivingYears",
          datatype: "number",
          placeholder: "Driving years",
        },
        { name: "discount", datatype: "number", placeholder: "Percent" },
        { name: "carname", datatype: "text", placeholder: "Name" },
        { name: "carmodel", datatype: "text", placeholder: "Model" },
        { name: "caryear", datatype: "number", placeholder: "Year" },
        { name: "carcc", datatype: "number", placeholder: "CC" },
      ],

      data: [
        "I'm a",
        "Marital status",
        "Gender",
        "My driving experience is",
        "My no claims discount is",
        "My car name is ",
        "My car model is ",
        "My car's purchase year is",
        "My Car's CC",
      ],
    },

    {
      name: "travelinsurance",
      fields: [
        { name: "age", datatype: "number", placeholder: "Age" },
        {
          name: "Status",
          datatype: "select",
          placeholder: "Status",
          options: ["married", "unmarried"],
        },
        {
          name: "gender",
          datatype: "gender",
          placeholder: "Gender",
          options: ["male", "female"],
        },
        {
          name: "travel insurance",
          datatype: "select",
          placeholder: "who",
          options: ["just me", "Another"],
        },
        { name: "place", datatype: "text", placeholder: "Place" },
        { name: "date", datatype: "number", placeholder: "from Date" },
        { name: "date", datatype: "number", placeholder: "to Date" },
      ],

      data: [
        "I'm a looking for",
        "Marital status",
        "Gender",
        "Travel insurance for",
        "I'm going to",
        "Add another destination",
      ],
    },

    {
      name: "healthinsurance",
      fields: [
        { name: "age", datatype: "number", placeholder: "Age" },
        { name: "age", datatype: "number", placeholder: "My spouse age" },
        {
          name: "Status",
          datatype: "select",
          placeholder: "who",
          options: ["me", "my spouse", "me and my spouse"],
        },
        {
          name: "gender",
          datatype: "select",
          placeholder: "Gender",
          options: ["male", "female"],
        },
        {
          name: "Status",
          datatype: "select",
          placeholder: "Status",
          options: ["Hospitalisation", "Outbpatient", "Maternity"],
        },
      ],

      data: [
        "I'm a",
        "My spouse age is",
        "I want to cover",
        "Gender",
        "This insurance should cover:",
      ],
    },

    // creditcard

    {
      name: "creditcard",
      fields: [
        {
          name: "Reward",
          datatype: "select",
          placeholder: "Reward",
          options: ["Cashback", "air miles"],
        },
        { name: "money", datatype: "number", placeholder: "Money" },

        { name: "RM", datatype: "number", placeholder: "RM" },
        {
          name: "spend",
          datatype: "text",
          placeholder: "Spend money",
          options: ["general", "Shopping", "groceries"],
        },
      ],

      data: [
        "I would like my card to reward me with:",
        "In a month, I spend",
        "I spend...",
      ],
    },

    // Loans

    {
      name: "homeloan",
      fields: [
        { name: "name", datatype: "text", placeholder: "Name" },
        { name: "age", datatype: "number", placeholder: "Age" },
        {
          name: "Status",
          datatype: "select",
          placeholder: "Status",
          options: ["married", "unmarried"],
        },
        {
          name: "gender",
          datatype: "gender",
          placeholder: "Gender",
          options: ["male", "female"],
        },

        { name: "address", datatype: "text", placeholder: "Address" },
        {
          name: "contactnumber",
          datatype: "number",
          placeholder: "Phone number",
        },
      ],

      data: [
        "My name is",
        "I'm a looking for",
        "Marital status",
        "Gender",
        "My address is",
        "My contact number is",
      ],
    },

    {
      name: "personalloan",
      fields: [
        { name: "name", datatype: "text", placeholder: "Name" },
        { name: "age", datatype: "number", placeholder: "Age" },
        {
          name: "Status",
          datatype: "select",
          placeholder: "Status",
          options: ["married", "unmarried"],
        },
        {
          name: "gender",
          datatype: "gender",
          placeholder: "Gender",
          options: ["male", "female"],
        },

        { name: "address", datatype: "text", placeholder: "Address" },
        {
          name: "contactnumber",
          datatype: "number",
          placeholder: "Phone number",
        },
      ],

      data: [
        "My name is",
        "I'm a looking for",
        "Marital status",
        "Gender",
        "My address is",
        "My contact number is",
      ],
    },
  ];
  return (
    <div className="w-screen  bg-black pt-60 min-h-screen">
      {employee.map((employee) => (
        <EmployeeCard {...employee} />
      ))}
    </div>
  );
};

export default CustomForm;

// props = {name="x", age="10",}
