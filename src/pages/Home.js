import React from "react";
import {
    CheckCircleTwoTone,
    ThunderboltTwoTone,
    DollarTwoTone,
} from "@ant-design/icons";
import "../style/home.css";

const Home = () => {
    return (
        <div
            className="respo"
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
            }}
        >
            <div className="acti">
                <h2 style={{margin: "auto", textAlign: 'center'}}>Total Users : {' '}30 users registrados</h2>
                {/*<span className="us"></span>*/}
                <DollarTwoTone style={{fontSize: 38,marginLeft:'10px'}} twoToneColor="#52c41a"/>
            </div>
            <div className="acti">
                <h2 style={{margin: "auto", textAlign: 'center'}}>Users :{' '}5 activos</h2>
                {/*<span className="us"></span>*/}
                <CheckCircleTwoTone style={{fontSize: 38,marginLeft:'10px'}} twoToneColor="#52c41a"/>
            </div>
            <div className="acti">
                <h2 style={{margin: "auto", textAlign: 'center'}}>Users :{' '}10 disponibles</h2>
                {/*<span className="us"></span>*/}
                <ThunderboltTwoTone style={{fontSize: 38,marginLeft:'10px'}} twoToneColor="blue"/>
            </div>
        </div>
    );
};

export default Home;
