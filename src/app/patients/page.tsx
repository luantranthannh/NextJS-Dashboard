"use client";
import { useState } from "react";
import Layout from "../components/layout";
import PatientsList from "./patientsList";
export default function Patients() {
  const [addPatient, setAddPatient] = useState(false);
  return (
    <>
      <Layout>
        <>
              <PatientsList />
        </>
      </Layout>
    </>
  );
}
