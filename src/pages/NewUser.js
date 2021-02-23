import React, {useState, useRef, useEffect} from "react";
import FilteredGrid from "../components/Filtergrid";
import {useFormik} from "formik";
import * as Yup from "yup";
import "../style/form.css";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import api from '../api'

export default function NewUser() {
    const [rows, setRows] = useState();
    const [columns, setColumns] = useState();
    const [completed, setCompleted] = useState(false);
    const grid = useRef();
    const [errortext, setErrortext] = useState("");

    const formik = useFormik({
        initialValues: {
            firstname: "",
            lastname: "",
            email: "",
            phone: "",
            date: "",
        },
        validationSchema: Yup.object({
            firstname: Yup.string()
                .min(3, "Mininum 3 characters")
                .required("Required!"),
            lastname: Yup.string()
                .required("Required!")
                .min(3, "Minimo 3 caracteres"),
            email: Yup.string().email("Invalid email").required("Required!"),
            phone: Yup.number()
                .positive()
                .min(8, "Mininum 8 digit")
                .required("Required!"),
            date: Yup.string().min(2, "Mininum 2 characters").required("Requiered!"),
        }),
        onSubmit: async (values) => {
            // //   console.log(values);
            // const {firstname, lastname, email, phone, date} = values;
            // //   const info = JSON.stringify(values, null, 2);
            // const final = [];
            // const res = await api.registers({
            //     firstname: firstname,
            //     lastname: lastname,
            //     email: email,
            //     phone: phone,
            //     date: date,
            // })
            //
            // const val = res.data;
            // final.push(val.data);
            // console.log(val);
            // setCompleted(true);
            // setRows([val.data]);
            //
            // !completed &&
            // Swal.fire({
            //     icon: "success",
            //     title: "Registro completo...",
            //     text: "Registro en la tabla",
            // });
        },
    });

    // all job consulta
    // const fetchJobs = async () => {
    //     const finalarrray = [];
    //     const res = await api.getJob()
    //     console.log("El valor esta aqui mamon=>", res.data);
    //     finalarrray.push(res.data.result);
    //     setRows(finalarrray);
    // };
    // useEffect(() => {
    //     fetchJobs();
    // }, []);
    // //columnas
    // useEffect(() => {
    //     setColumns([
    //         {
    //             title: "Firstname",
    //             dataIndex: "firstname",
    //             key: "1",
    //             fixed: "left",
    //             width: 200,
    //             ...grid.current.getColumnSearch("firstname"),
    //         },
    //         {
    //             title: "Lastname",
    //             dataIndex: "lastname",
    //             key: "2",
    //             width: 200,
    //             ...grid.current.getColumnSearch("lastname"),
    //         },
    //         {
    //             title: "Email",
    //             dataIndex: "email",
    //             key: "3",
    //             width: 200,
    //             ...grid.current.getColumnSearch("email"),
    //         },
    //         {
    //             title: "Phone",
    //             dataIndex: "phone",
    //             key: "4",
    //             width: 200,
    //             ...grid.current.getColumnSearch("phone"),
    //         },
    //         {
    //             title: "Date",
    //             dataIndex: "date",
    //             key: "5",
    //             width: 200,
    //             ...grid.current.getColumnSearch("date"),
    //         },
    //     ]);
    // }, []);
    return (
        <div className="App">
            <h1>Nuevo trabajo</h1>

            <form onSubmit={formik.handleSubmit}>
                <div className="form-content">
                    <div className="form">
                        <label className="form-label">Firstname:</label>
                        <input
                            className="form-input"
                            type="text"
                            name="firstname"
                            value={formik.values.firstname}
                            onChange={formik.handleChange}
                        />
                        {formik.errors.firstname && formik.touched.firstname && (
                            <p style={{color: "red"}}>{formik.errors.firstname}</p>
                        )}
                    </div>
                    <div className="form">
                        <label className="form-label">Lastname:</label>
                        <input
                            className="form-input"
                            type="text"
                            name="lastname"
                            value={formik.values.lastname}
                            onChange={formik.handleChange}
                        />
                        {formik.errors.lastname && formik.touched.lastname && (
                            <p style={{color: "red"}}>{formik.errors.lastname}</p>
                        )}
                    </div>
                    <div className="form">
                        <label className="form-label">Email:</label>
                        <input
                            className="form-input"
                            type="text"
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                        />
                        {formik.errors.email && formik.touched.email && (
                            <p style={{color: "red"}}>{formik.errors.email}</p>
                        )}
                    </div>
                </div>
                <div className="form-content">
                    <div className="form">
                        <label className="form-label">Phone</label>
                        <input
                            className="form-input"
                            type="number"
                            name="phone"
                            value={formik.values.phone}
                            onChange={formik.handleChange}
                        />
                        {formik.errors.phone && formik.touched.phone && (
                            <p style={{color: "red"}}>{formik.errors.phone}</p>
                        )}
                    </div>
                    <div className="form">
                        <label className="form-label">Date</label>
                        <input
                            style={{paddingLeft: 10, paddingRight: 10}}
                            type="date"
                            min="2020-01-01"
                            max="2023-01-01"
                            name="startDate"
                            value={formik.values.date}
                            onChange={formik.handleChange}
                        />
                        {formik.errors.date && formik.touched.date && (
                            <p style={{color: "red"}}>{formik.errors.date}</p>
                        )}
                    </div>
                </div>

                <div>
                    {!errortext ? null : <h2 style={{color: "red"}}>{errortext}</h2>}
                </div>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        margin: "20px",
                    }}
                >
                    <button className="btn" type="submit">
                        Registrar Usuario
                    </button>
                </div>
            </form>
            <div>
                <FilteredGrid ref={grid} columns={columns} rows={rows}/>
            </div>
        </div>
    );
}
