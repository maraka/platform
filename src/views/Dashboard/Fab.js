import React, { Component, Icon } from 'react';
import { Container, Button, Link } from 'react-floating-action-button'


class FabIcon extends Component {
    render() {
        return (

                <Container>
                    <Link href="#"
                        tooltip="Listar cursos para mi"
                        styles={{ backgroundColor: "#838BC5", color: "#ffffff" }}
                        icon="fa fa-road" />
                    <Link href="#"
                        tooltip="Agregar un reto"
                        styles={{ backgroundColor: "#838BC5", color: "#ffffff" }}
                        icon="fa fa-hand-scissors-o" />
                    <Link href="#/uploadlead"
                        tooltip="Crear nueva idea para debate"
                        styles={{ backgroundColor: "#838BC5", color: "#ffffff" }}
                        icon="fa fa-lightbulb-o" />

                    <Button className="fab-item btn btn-lg text-white"
                        icon="fa fa-plus"
                        rotate={true}
                        styles={{ backgroundColor: "#838BC5", color: "#ffffff" }}
                         />
                </Container>

        );
    }
}


export default FabIcon;

