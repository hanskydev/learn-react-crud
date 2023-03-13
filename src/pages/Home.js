// React
import React from "react";

// React Router
import { Link } from "react-router-dom";

// PrimeReact Components
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Panel } from "primereact/panel";

const Home = () => {
    return (
        <div className="p-d-flex p-flex-column p-ai-center p-4">
            <Panel header="Learning React with Spring Boot">
                <Card title="Introduction" className="mb-4">
                    <p>
                        This is my personal project where I&apos;m learning how to build a simple CRUD app. This project
                        uses React for the frontend and Spring Boot for the backend.
                    </p>
                </Card>
                <Link to="/admin/dashboard">
                    <Button label="Get Started" icon="pi pi-play" className="p-button-success" />
                </Link>
            </Panel>
        </div>
    );
};

export default Home;
