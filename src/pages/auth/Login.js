import React, {useState} from "react";
import {Form, Input, Button} from "antd";
import {UserOutlined, LockOutlined} from "@ant-design/icons";
import PropTypes from "prop-types";
import "../../style/Login.css";
import Register from "./Register";
import api from "../../api";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";


export default function Login({setToken}) {
    const [loading, setLoading] = useState(false)
    const [logs, setLogs] = useState(false);
    const handleSubmit = async (values) => {
        const {email, password} = values;

        try {
            const res = await api.login({email, password});
            console.log("res", res.data.token)

            if (res.data.token) {
            const token = res.data.token
                localStorage.setItem("token", token);
                setToken(res);
                setLoading(true)
                const hora = Date.now();
                localStorage.setItem("hora", hora);
                window.location.reload();
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Credenciales invalidas...",
                    text: "Error",
                });
            }
        } catch (error) {
            console.error(error);
        }
    };

    if (logs) {
        return <Register logs={logs} setLogs={setLogs}/>;
    }
    if (loading) {
        <div style={{width: '100%', height: '100%'}}>
            <p style={{color: 'blue', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                Loading
            </p>
        </div>
    }
    return (
        <div className="container">
            <div
                style={{
                    display: "flex",
                    background: "#fff",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "20px",
                    padding: "10px",
                    flexDirection: "column",
                }}
            >
                <h1 style={{fontWeight: "bold", color: "#000"}}>Login</h1>
                <Form
                    name="normal_login"
                    className="login-form"
                    onFinish={handleSubmit}
                    // onSubmitCapture={handleSubmit}
                >
                    <Form.Item
                        name="email"
                        rules={[
                            {
                                required: true,
                                type: "email",
                                message: "The input is not valid E-mail!",
                            },
                        ]}
                    >
                        <Input
                            prefix={<UserOutlined className="site-form-item-icon"/>}
                            placeholder="Username"
                        />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: "Please input your Password!",
                            },
                        ]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon"/>}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button
                            style={{
                                background: "green",
                                borderRadius: "20px",
                                marginRight: "10px",
                                marginLeft: "10px",
                                color: "#fff",
                            }}
                            type="prymary"
                            htmlType="submit"
                            className="login-form-button"
                        >
                            Log in
                        </Button>
                        Or{" "}
                        <Button
                            onClick={() => {
                                setLogs(!logs);
                                console.log(logs);
                            }}
                        >
                            Sing Up
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired,
};
