import React from 'react';
import { Droppable } from 'react-beautiful-dnd';

import { styles } from '../styles';

import BradorBlock from "./BradorBlock";

function Bradors({bradors}) {
    return (
        <div style={styles.bradorsList}>
            <Droppable droppableId={"bradorsList"}>
                {
                    provided => (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                            {bradors.map((brador, index) => (
                                <BradorBlock brador={brador} index={index} key={brador.id}/>
                            ))}
                            {provided.placeholder}
                        </div>
                    )
                }
            </Droppable>
        </div>
    )
}

export default Bradors;
