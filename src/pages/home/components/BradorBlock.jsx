import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

import { Link } from 'react-router-dom';
import { styles } from '../styles';

import { DragIndicatorRounded } from "@material-ui/icons";

function BradorBlock({ brador, index, uid }) {
    return (
        <Draggable draggableId={brador.id} index={index}>
            {provided => (
                <div
                    {...provided.draggableProps}
                    // {...provided.draggableProps.style}
                    ref={provided.innerRef}
                    style={{
                        ...provided.draggableProps.style,
                        ...styles.brador
                    }}
                >
                    <div
                        {...provided.dragHandleProps}
                        style={styles.bradorDragHandleHolder}
                    >
                        <DragIndicatorRounded
                            style={styles.bradorDragHandle}
                        />
                    </div>
                    <span style={styles.bradorTitle}><Link to={`/b/${index}`}>{brador.title}</Link></span>
                    <div style={styles.bradorLastUpdated}>
                        <span>{brador.lastUpdated}</span>
                        <span style={styles.bradorSmallSpan}>Last Updated</span>
                    </div>
                    <div style={styles.bradorCreated}>
                        <span>{brador.created}</span>
                        <span style={styles.bradorSmallSpan}>Created</span>
                    </div>
                </div>
            )}
        </Draggable>
    )
}

export default BradorBlock
